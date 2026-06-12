import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

/**
 * ReportUpdate — stores a timestamped history entry every time
 * a hazard report's status changes. This powers the citizen timeline
 * and the admin audit log.
 */
const ReportUpdate = sequelize.define('ReportUpdate', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  reportId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('reported', 'in_progress', 'resolved', 'rejected'),
    allowNull: false,
  },
  // Optional note shown in citizen timeline (e.g. "Repair crew dispatched")
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  // Which admin/user triggered the status change (null = system/initial creation)
  updatedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'report_updates',
  timestamps: true,
});

export default ReportUpdate;
