import { Op } from 'sequelize';
import {
  HazardReport,
  HazardCategory,
  User,
  ReportImage,
  ReportUpvote,
  Setting,
  Activity,
  sequelize,
  ReportUpdate,
} from '../models/index.js';

export const getAdminReports = async (req, res, next) => {
  try {
    const { search, type, status, severity, sort, page = 1, limit = 10 } = req.query;

    const where = {};

    // Search filter
    if (search) {
      where[Op.or] = [
        { id: { [Op.like]: `%${search}%` } },
        { title: { [Op.like]: `%${search}%` } },
        { locationName: { [Op.like]: `%${search}%` } },
      ];
    }

    // Type (Category ID or Category Name)
    if (type && type !== 'All types') {
      const category = await HazardCategory.findOne({
        where: { name: { [Op.like]: `%${type}%` } },
      });
      if (category) {
        where.categoryId = category.id;
      } else {
        where.categoryId = 0; // return nothing
      }
    }

    // Status filter
    if (status && status !== 'All statuses') {
      where.status = status.toLowerCase().replace(' ', '_');
    }

    // Severity filter
    if (severity && severity !== 'All severities') {
      where.severity = severity.toLowerCase();
    }

    // Sorting
    let order = [['createdAt', 'DESC']];
    if (sort === 'Oldest first') {
      order = [['createdAt', 'ASC']];
    } else if (sort === 'Most upvoted') {
      order = [[sequelize.literal('upvotesCount'), 'DESC']];
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const { count, rows } = await HazardReport.findAndCountAll({
      where,
      include: [
        { model: HazardCategory, as: 'category', attributes: ['id', 'name', 'color'] },
        { model: User, as: 'reporter', attributes: ['id', 'name', 'email'] },
        { model: ReportImage, as: 'images', attributes: ['imageUrl'] },
        { model: ReportUpvote, as: 'upvotes', attributes: ['userId'] },
      ],
      attributes: {
        include: [
          [
            sequelize.literal(`(
              SELECT COUNT(*)
              FROM report_upvotes AS u
              WHERE u.reportId = HazardReport.id
            )`),
            'upvotesCount',
          ],
        ],
      },
      order,
      limit: parseInt(limit),
      offset,
      distinct: true,
    });

    res.json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      reports: rows.map((r) => {
        const json = r.toJSON();
        return {
          id: `HZ-${json.id}`,
          rawId: json.id,
          title: json.title,
          description: json.description,
          location: json.locationName,
          type: json.category ? json.category.name : 'Other',
          severity: json.severity.toUpperCase(),
          status: json.status === 'in_progress' ? 'IN PROGRESS' : json.status.toUpperCase(),
          upvotes: parseInt(json.upvotesCount || 0),
          time: json.createdAt,
          reporter: json.reporter ? json.reporter.name : 'Anonymous',
          reporterEmail: json.reporter ? json.reporter.email : '',
          images: json.images,
        };
      }),
    });
  } catch (error) {
    next(error);
  }
};

export const updateReportStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // reported, in_progress, resolved, rejected
    const cleanId = id.replace('HZ-', '');

    const report = await HazardReport.findByPk(cleanId, {
      include: [{ model: HazardCategory, as: 'category' }],
    });
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Hazard report not found.',
      });
    }

    const oldStatus = report.status;
    report.status = status.toLowerCase().replace(' ', '_');
    await report.save();

    // ── Status Tracking: log a timeline entry ──────────────────────────
    await ReportUpdate.create({
      reportId: cleanId,
      status: report.status,
      comment: req.body.comment ||
        `Status updated from "${oldStatus}" to "${report.status}".`,
      updatedBy: req.user.id,
    });

    // Log Activity
    await Activity.create({
      userId: req.user.id,
      action: 'Status Updated',
      details: `Updated report HZ-${report.id} status from "${oldStatus}" to "${report.status}".`,
      type: report.category ? report.category.name.toLowerCase() : 'other',
      status: report.status,
      severity: report.severity,
    });

    res.json({
      success: true,
      message: `Report status updated to ${status}.`,
      report,
    });
  } catch (error) {
    next(error);
  }
};

export const exportReportsCSV = async (req, res, next) => {
  try {
    const { search, type, status, severity } = req.query;

    const where = {};
    if (search) {
      where[Op.or] = [
        { id: { [Op.like]: `%${search}%` } },
        { title: { [Op.like]: `%${search}%` } },
        { locationName: { [Op.like]: `%${search}%` } },
      ];
    }
    if (type && type !== 'All types') {
      const category = await HazardCategory.findOne({ where: { name: type } });
      if (category) where.categoryId = category.id;
    }
    if (status && status !== 'All statuses') {
      where.status = status.toLowerCase().replace(' ', '_');
    }
    if (severity && severity !== 'All severities') {
      where.severity = severity.toLowerCase();
    }

    const reports = await HazardReport.findAll({
      where,
      include: [
        { model: HazardCategory, as: 'category', attributes: ['name'] },
        { model: User, as: 'reporter', attributes: ['name'] },
        { model: ReportUpvote, as: 'upvotes', attributes: ['id'] },
      ],
      order: [['createdAt', 'DESC']],
    });

    // Write manual CSV string to avoid json2csv dependencies issues
    const csvHeaders = 'ID,Title,Type,Location,Severity,Status,Upvotes,Reported At,Reporter\n';
    const csvRows = reports
      .map((r) => {
        const id = `HZ-${r.id}`;
        const title = `"${r.title.replace(/"/g, '""')}"`;
        const categoryName = r.category ? r.category.name : 'Other';
        const location = `"${r.locationName.replace(/"/g, '""')}"`;
        const sev = r.severity.toUpperCase();
        const stat = r.status.toUpperCase().replace('_', ' ');
        const upvotes = r.upvotes ? r.upvotes.length : 0;
        const time = r.createdAt.toISOString();
        const reporterName = r.reporter ? r.reporter.name : 'Anonymous';

        return `${id},${title},${categoryName},${location},${sev},${stat},${upvotes},${time},${reporterName}`;
      })
      .join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=reports_export.csv');
    res.status(200).send(csvHeaders + csvRows);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: [
        'id',
        'name',
        'email',
        'role',
        'status',
        'createdAt',
        [
          sequelize.literal(`(
            SELECT COUNT(*)
            FROM hazard_reports AS hr
            WHERE hr.userId = User.id
          )`),
          'reportsCount',
        ],
        [
          sequelize.literal(`(
            SELECT COALESCE(SUM((
              SELECT COUNT(*)
              FROM report_upvotes AS ru
              WHERE ru.reportId = hr2.id
            )), 0)
            FROM hazard_reports AS hr2
            WHERE hr2.userId = User.id
          )`),
          'upvotesCount',
        ],
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json({
      success: true,
      users: users.map((u) => {
        const json = u.toJSON();
        return {
          id: json.id,
          name: json.name,
          email: json.email,
          role: json.role.toUpperCase(),
          status: json.status.toUpperCase(),
          reports: parseInt(json.reportsCount || 0),
          upvotes: parseInt(json.upvotesCount || 0),
          createdAt: json.createdAt,
        };
      }),
    });
  } catch (error) {
    next(error);
  }
};

export const toggleUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    if (user.id === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot suspend your own admin account.',
      });
    }

    user.status = user.status === 'active' ? 'suspended' : 'active';
    await user.save();

    await Activity.create({
      userId: req.user.id,
      action: user.status === 'suspended' ? 'User Suspended' : 'User Activated',
      details: `${user.status === 'suspended' ? 'Suspended' : 'Activated'} account of ${user.name} (${user.email}).`,
    });

    res.json({
      success: true,
      message: `User status changed to ${user.status}.`,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body; // admin, citizen

    if (!['admin', 'citizen'].includes(role.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role.',
      });
    }

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    if (user.id === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot demote your own admin account.',
      });
    }

    user.role = role.toLowerCase();
    await user.save();

    await Activity.create({
      userId: req.user.id,
      action: 'Role Updated',
      details: `Updated role of ${user.name} to ${user.role}.`,
    });

    res.json({
      success: true,
      message: `User role updated to ${role}.`,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const getSettings = async (req, res, next) => {
  try {
    const settings = await Setting.findAll();
    const settingsMap = {};
    settings.forEach((s) => {
      settingsMap[s.key] = s.value;
    });

    // Provide default fallback settings if table is empty
    const defaults = {
      appName: 'RoadAware',
      supportEmail: 'support@roadaware.app',
      timezone: 'UTC (Coordinated Universal Time)',
      twoFactorAuth: 'false',
      sessionTimeout: '60',
    };

    res.json({
      success: true,
      settings: { ...defaults, ...settingsMap },
    });
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (req, res, next) => {
  try {
    const settingsData = req.body; // e.g. { appName: 'RoadAware', supportEmail: '...' }

    for (const [key, value] of Object.entries(settingsData)) {
      const stringVal = String(value);
      const [setting] = await Setting.findOrCreate({
        where: { key },
        defaults: { value: stringVal },
      });
      if (setting.value !== stringVal) {
        setting.value = stringVal;
        await setting.save();
      }
    }

    await Activity.create({
      userId: req.user.id,
      action: 'Settings Updated',
      details: 'System configuration settings updated.',
    });

    res.json({
      success: true,
      message: 'Settings updated successfully.',
    });
  } catch (error) {
    next(error);
  }
};
