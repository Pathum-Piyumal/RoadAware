import { HazardReport, HazardCategory, ReportImage, ReportUpvote, User, Activity, ReportUpdate } from '../models/index.js';
import { uploadBufferToCloudinary } from '../config/cloudinary.js';
import { Op } from 'sequelize';

export const createReport = async (req, res, next) => {
  try {
    const { title, description, categoryId, severity, latitude, longitude, locationName } = req.body;
    const userId = req.user.id;

    // Verify Category exists
    const category = await HazardCategory.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Hazard category not found.',
      });
    }

    const report = await HazardReport.create({
      title,
      description,
      categoryId,
      severity,
      latitude,
      longitude,
      locationName,
      userId,
      status: 'reported',
    });

    let imageUrl = '';
    if (req.file) {
      imageUrl = await uploadBufferToCloudinary(req.file.buffer, 'reports');

      await ReportImage.create({
        reportId: report.id,
        imageUrl,
      });
    }

    // Log Activity
    await Activity.create({
      userId,
      action: 'Report Submitted',
      details: `Submitted report HZ-${report.id}: "${title}" at ${locationName}.`,
      type: category.name.toLowerCase(),
      status: 'reported',
      severity,
    });

    // ── Status Tracking: seed the initial 'reported' timeline entry ────────
    await ReportUpdate.create({
      reportId: report.id,
      status: 'reported',
      comment: 'Report submitted by citizen.',
      updatedBy: userId,
    });

    res.status(201).json({
      success: true,
      message: 'Hazard report submitted successfully.',
      report: {
        ...report.toJSON(),
        imageUrl,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getReports = async (req, res, next) => {
  try {
    const reports = await HazardReport.findAll({
      include: [
        { model: HazardCategory, as: 'category', attributes: ['id', 'name', 'color'] },
        { model: User, as: 'reporter', attributes: ['id', 'name', 'email', 'avatar'] },
        { model: ReportImage, as: 'images', attributes: ['id', 'imageUrl'] },
        { model: ReportUpvote, as: 'upvotes', attributes: ['id', 'userId'] },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json({
      success: true,
      reports,
    });
  } catch (error) {
    next(error);
  }
};

export const getReportById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const report = await HazardReport.findByPk(id, {
      include: [
        { model: HazardCategory, as: 'category', attributes: ['id', 'name', 'color'] },
        { model: User, as: 'reporter', attributes: ['id', 'name', 'email', 'avatar'] },
        { model: ReportImage, as: 'images', attributes: ['id', 'imageUrl'] },
        { model: ReportUpvote, as: 'upvotes', attributes: ['id', 'userId'] },
        {
          model: ReportUpdate,
          as: 'updates',
          attributes: ['id', 'status', 'comment', 'updatedBy', 'createdAt'],
          include: [
            { model: User, as: 'updater', attributes: ['id', 'name', 'avatar'] },
          ],
          order: [['createdAt', 'ASC']],
        },
      ],
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Hazard report not found.',
      });
    }

    res.json({
      success: true,
      report,
    });
  } catch (error) {
    next(error);
  }
};

export const getMapMarkers = async (req, res, next) => {
  try {
    const reports = await HazardReport.findAll({
      attributes: ['id', 'title', 'latitude', 'longitude', 'locationName', 'severity', 'status', 'createdAt'],
      include: [
        { model: HazardCategory, as: 'category', attributes: ['name'] },
        { model: ReportUpvote, as: 'upvotes', attributes: ['userId'] },
        { model: ReportImage, as: 'images', attributes: ['imageUrl'] },
      ],
      where: {
        status: ['reported', 'in_progress', 'resolved'],
      },
    });

    // Format output to match MapMonitoring markers requirement
    const markers = reports.map((r) => {
      const upvotesCount = r.upvotes ? r.upvotes.length : 0;
      return {
        id: r.id,
        lat: parseFloat(r.latitude),
        lng: parseFloat(r.longitude),
        title: r.title,
        location: r.locationName,
        type: r.category ? r.category.name : 'Other',
        status: r.status === 'in_progress' ? 'In Progress' : r.status === 'resolved' ? 'Resolved' : 'Reported',
        severity: r.severity.charAt(0).toUpperCase() + r.severity.slice(1), // capitalize
        upvotes: upvotesCount,
        time: r.createdAt,
        imageUrl: r.images && r.images.length > 0 ? r.images[0].imageUrl : null,
      };
    });

    res.json({
      success: true,
      markers,
    });
  } catch (error) {
    next(error);
  }
};

export const toggleUpvote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const report = await HazardReport.findByPk(id);
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Hazard report not found.',
      });
    }

    const existingUpvote = await ReportUpvote.findOne({
      where: { reportId: id, userId },
    });

    if (existingUpvote) {
      await existingUpvote.destroy();
      res.json({
        success: true,
        message: 'Upvote removed.',
        upvoted: false,
      });
    } else {
      await ReportUpvote.create({ reportId: id, userId });
      res.json({
        success: true,
        message: 'Upvote added.',
        upvoted: true,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getMyReports = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const reports = await HazardReport.findAll({
      where: { userId },
      include: [
        { model: HazardCategory, as: 'category', attributes: ['id', 'name', 'color'] },
        { model: ReportImage, as: 'images', attributes: ['id', 'imageUrl'] },
        { model: ReportUpvote, as: 'upvotes', attributes: ['id', 'userId'] },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json({
      success: true,
      reports,
    });
  } catch (error) {
    next(error);
  }
};

export const getPublicStats = async (req, res, next) => {
  try {
    const totalReports = await HazardReport.count();
    const resolvedReports = await HazardReport.count({
      where: { status: 'resolved' },
    });

    res.json({
      success: true,
      stats: {
        totalReports,
        resolvedReports,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getLeaderboard = async (req, res, next) => {
  try {
    const { timeframe } = req.query;
    let dateFilter = {};

    if (timeframe === 'weekly') {
      dateFilter = {
        createdAt: {
          [Op.gte]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }
      };
    } else if (timeframe === 'monthly') {
      dateFilter = {
        createdAt: {
          [Op.gte]: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        }
      };
    }

    // 1. Fetch all active users in a single query
    const users = await User.findAll({
      where: { status: 'active' },
      attributes: ['id', 'name', 'avatar', 'role'],
    });

    const userIds = users.map(u => u.id);

    // 2. Fetch all reports within timeframe in a single query
    const reports = await HazardReport.findAll({
      where: {
        userId: userIds,
        ...dateFilter
      },
      attributes: ['id', 'userId', 'status', 'locationName']
    });

    // Group reports by userId for quick memory lookup
    const reportsByUserId = {};
    for (const r of reports) {
      if (!reportsByUserId[r.userId]) {
        reportsByUserId[r.userId] = [];
      }
      reportsByUserId[r.userId].push(r);
    }

    // 3. Fetch all upvotes within timeframe in a single query
    const reportIds = reports.map(r => r.id);
    const upvotes = reportIds.length > 0
      ? await ReportUpvote.findAll({
          where: {
            reportId: reportIds,
            ...dateFilter
          },
          attributes: ['reportId']
        })
      : [];

    // Group upvotes by reportId for quick memory lookup
    const upvoteCountByReportId = {};
    for (const up of upvotes) {
      upvoteCountByReportId[up.reportId] = (upvoteCountByReportId[up.reportId] || 0) + 1;
    }

    const leaderboardData = [];

    for (const user of users) {
      const reportsOfUser = reportsByUserId[user.id] || [];
      const resolvedCount = reportsOfUser.filter(r => r.status === 'resolved').length;

      let upvotesCount = 0;
      for (const r of reportsOfUser) {
        upvotesCount += upvoteCountByReportId[r.id] || 0;
      }

      // Score formula: 100 points per report, 50 points per upvote, 200 points per resolved report
      const score = (reportsOfUser.length * 100) + (upvotesCount * 50) + (resolvedCount * 200);

      // Badge determination
      let badge = 'Observer';
      if (score >= 2000) {
        badge = 'Road Warden';
      } else if (score >= 1000 || resolvedCount >= 30) {
        badge = 'Safety Sentinel';
      } else if (score >= 500 || reportsOfUser.length >= 15) {
        badge = 'Active Observer';
      } else if (score >= 200 || reportsOfUser.length >= 5) {
        badge = 'Pothole Patrol';
      } else if (score >= 100) {
        badge = 'Community Helper';
      }

      // Region determination based on report locations
      let region = 'Citizen';
      if (reportsOfUser.length > 0) {
        const locations = reportsOfUser.map(r => r.locationName || '');
        const validLocs = locations.filter(l => l.trim().length > 0);
        if (validLocs.length > 0) {
          const parts = validLocs[0].split(',');
          const lastPart = parts[parts.length - 1].trim();
          region = lastPart.replace(/^\d+\s*|\s*\d+$/g, '') || 'Citizen';
        }
      }

      leaderboardData.push({
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        score,
        reports: reportsOfUser.length,
        resolved: resolvedCount,
        badge,
        region,
        initial: user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      });
    }

    // Sort by score descending
    leaderboardData.sort((a, b) => b.score - a.score);

    // Assign rank positions
    leaderboardData.forEach((item, index) => {
      item.rank = index + 1;
    });

    res.json({
      success: true,
      leaderboard: leaderboardData,
    });
  } catch (error) {
    next(error);
  }
};
