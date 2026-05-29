import sequelize from '../config/database.js';
import User from './User.js';
import HazardCategory from './HazardCategory.js';
import HazardReport from './HazardReport.js';
import ReportImage from './ReportImage.js';
import ReportUpvote from './ReportUpvote.js';
import Setting from './Setting.js';
import Activity from './Activity.js';
import Hotspot from './Hotspot.js';
import Session from './Session.js';
import Notification from './Notification.js';
import Comment from './Comment.js';

// Setup Associations

// User associations
User.hasMany(HazardReport, { foreignKey: 'userId', as: 'reports', onDelete: 'CASCADE' });
User.hasMany(ReportUpvote, { foreignKey: 'userId', as: 'upvotes', onDelete: 'CASCADE' });
User.hasMany(Session, { foreignKey: 'userId', as: 'sessions', onDelete: 'CASCADE' });
User.hasMany(Activity, { foreignKey: 'userId', as: 'activities', onDelete: 'SET NULL' });
User.hasMany(Notification, { foreignKey: 'userId', as: 'notifications', onDelete: 'CASCADE' });

// HazardCategory associations
HazardCategory.hasMany(HazardReport, { foreignKey: 'categoryId', as: 'reports', onDelete: 'SET NULL' });

// HazardReport associations
HazardReport.belongsTo(User, { foreignKey: 'userId', as: 'reporter' });
HazardReport.belongsTo(HazardCategory, { foreignKey: 'categoryId', as: 'category' });
HazardReport.hasMany(ReportImage, { foreignKey: 'reportId', as: 'images', onDelete: 'CASCADE' });
HazardReport.hasMany(ReportUpvote, { foreignKey: 'reportId', as: 'upvotes', onDelete: 'CASCADE' });
HazardReport.hasMany(Comment, { foreignKey: 'reportId', as: 'comments', onDelete: 'CASCADE' });

// Comment associations
Comment.belongsTo(HazardReport, { foreignKey: 'reportId', as: 'report' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'author' });
User.hasMany(Comment, { foreignKey: 'userId', as: 'comments', onDelete: 'CASCADE' });

// ReportImage associations
ReportImage.belongsTo(HazardReport, { foreignKey: 'reportId', as: 'report' });

// ReportUpvote associations
ReportUpvote.belongsTo(HazardReport, { foreignKey: 'reportId', as: 'report' });
ReportUpvote.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Session associations
Session.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Activity associations
Activity.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Notification associations
Notification.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export {
  sequelize,
  User,
  HazardCategory,
  HazardReport,
  ReportImage,
  ReportUpvote,
  Setting,
  Activity,
  Hotspot,
  Session,
  Notification,
  Comment,
};
