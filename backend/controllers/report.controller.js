import { HazardReport, HazardCategory, ReportImage, ReportUpvote, User, Activity } from '../models/index.js';
import { uploadBufferToCloudinary } from '../config/cloudinary.js';

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
