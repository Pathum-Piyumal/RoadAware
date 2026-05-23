import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ReportImage = sequelize.define('ReportImage', {
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
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'report_images',
  timestamps: true,
});

export default ReportImage;
