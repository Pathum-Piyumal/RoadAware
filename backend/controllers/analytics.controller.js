import { Op } from 'sequelize';
import {
  HazardReport,
  HazardCategory,
  ReportUpvote,
  Activity,
  User,
  sequelize,
} from '../models/index.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    // 1. Total reports count
    const totalReports = await HazardReport.count();

    // 2. Resolution rate
    const resolvedReports = await HazardReport.count({ where: { status: 'resolved' } });
    const resolutionRate = totalReports > 0 ? Math.round((resolvedReports / totalReports) * 100) : 0;

    // 3. In-progress reports
    const inProgressReports = await HazardReport.count({ where: { status: 'in_progress' } });

    // 4. Critical open reports
    const criticalOpen = await HazardReport.count({
      where: {
        status: 'reported',
        severity: 'critical',
      },
    });

    // 5. Area Chart Data (Last 14 Days)
    const areaChartData = [];
    for (let i = 13; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      const startOfDay = new Date(year, date.getMonth(), date.getDate(), 0, 0, 0);
      const endOfDay = new Date(year, date.getMonth(), date.getDate(), 23, 59, 59);

      const dayReports = await HazardReport.count({
        where: {
          createdAt: {
            [Op.between]: [startOfDay, endOfDay],
          },
        },
      });

      const dayResolutions = await HazardReport.count({
        where: {
          status: 'resolved',
          updatedAt: {
            [Op.between]: [startOfDay, endOfDay],
          },
        },
      });

      areaChartData.push({
        name: `${month}-${day}`,
        reports: dayReports,
        resolutions: dayResolutions,
      });
    }

    // 6. Status Breakdown Data (Pie Chart formatting)
    const reportedCount = await HazardReport.count({ where: { status: 'reported' } });
    const rejectedCount = await HazardReport.count({ where: { status: 'rejected' } });

    const statusData = [
      { name: 'Reported', value: reportedCount, color: '#3B82F6' },
      { name: 'In Progress', value: inProgressReports, color: '#F59E0B' },
      { name: 'Resolved', value: resolvedReports, color: '#10B981' },
    ];
    if (rejectedCount > 0) {
      statusData.push({ name: 'Rejected', value: rejectedCount, color: '#EF4444' });
    }

    // 7. Hazard Type Statistics (Bar Chart formatting)
    const categories = await HazardCategory.findAll({
      attributes: [
        'name',
        'color',
        [
          sequelize.literal(`(
            SELECT COUNT(*)
            FROM hazard_reports AS r
            WHERE r.categoryId = HazardCategory.id
          )`),
          'reportCount',
        ],
      ],
      order: [[sequelize.literal('reportCount'), 'DESC']],
    });

    const hazardTypeData = categories.map((c) => ({
      name: c.name,
      value: parseInt(c.getDataValue('reportCount') || 0),
      fill: c.color,
    }));

    // 8. Top Hotspots (Group by locationName)
    const hotspots = await HazardReport.findAll({
      attributes: [
        'locationName',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
      ],
      group: ['locationName'],
      order: [[sequelize.literal('count'), 'DESC']],
      limit: 6,
    });

    let maxCount = 10;
    const hotspotData = hotspots.map((spot, idx) => {
      const count = parseInt(spot.getDataValue('count') || 0);
      if (idx === 0) {
        maxCount = count > 10 ? count : 10;
      }
      return {
        id: idx + 1,
        name: spot.locationName,
        count,
        max: maxCount,
      };
    });

    // 9. Recent Activity feed (activities table join User)
    const activities = await Activity.findAll({
      include: [{ model: User, as: 'user', attributes: ['name'] }],
      order: [['createdAt', 'DESC']],
      limit: 5,
    });

    const recentActivity = activities.map((act) => {
      // Calculate relative time or format date
      const diffMs = Date.now() - new Date(act.createdAt).getTime();
      const diffMins = Math.round(diffMs / 60000);
      const diffHours = Math.round(diffMins / 60);
      const diffDays = Math.round(diffHours / 24);

      let timeText = 'Just now';
      if (diffMins > 0 && diffMins < 60) {
        timeText = `${diffMins}m ago`;
      } else if (diffHours > 0 && diffHours < 24) {
        timeText = `${diffHours}h ago`;
      } else if (diffDays > 0) {
        timeText = `${diffDays}d ago`;
      }

      return {
        id: act.id,
        title: act.action,
        location: act.details || 'System action',
        time: timeText,
        status: act.status ? act.status.toUpperCase().replace('_', ' ') : 'INFO',
        severity: act.severity ? act.severity.toUpperCase() : 'LOW',
        type: act.type || 'infrastructure',
      };
    });

    res.json({
      success: true,
      stats: {
        totalReports,
        resolutionRate,
        inProgressReports,
        criticalOpen,
        areaChartData,
        statusData,
        hazardTypeData,
        hotspotData,
        recentActivity,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getTrendAnalytics = async (req, res, next) => {
  try {
    // Return structured trend analytics for deep-dive
    // Same structure used in Recharts in Analytics.jsx
    const categories = await HazardCategory.findAll({
      attributes: [
        'name',
        [
          sequelize.literal(`(
            SELECT COUNT(*)
            FROM hazard_reports AS r
            WHERE r.categoryId = HazardCategory.id
          )`),
          'count',
        ],
      ],
    });

    const hazardTypeData = categories.map((c) => ({
      name: c.name,
      value: parseInt(c.getDataValue('count') || 0),
    }));

    // Generate resolutions metrics for trend line chart
    const areaChartData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
      const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);

      const dayResolutions = await HazardReport.count({
        where: {
          status: 'resolved',
          updatedAt: {
            [Op.between]: [startOfDay, endOfDay],
          },
        },
      });

      areaChartData.push({
        name: `${month}-${day}`,
        resolutions: dayResolutions,
      });
    }

    res.json({
      success: true,
      hazardTypeData,
      areaChartData,
    });
  } catch (error) {
    next(error);
  }
};
