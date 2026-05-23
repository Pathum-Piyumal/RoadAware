import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ReportUpvote = sequelize.define('ReportUpvote', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  reportId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'hazard_reports',
      key: 'id',
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
}, {
  tableName: 'report_upvotes',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['reportId', 'userId'],
    },
  ],
});

export default ReportUpvote;
