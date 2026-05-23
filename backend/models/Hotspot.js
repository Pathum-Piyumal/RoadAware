import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Hotspot = sequelize.define('Hotspot', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  max: {
    type: DataTypes.INTEGER,
    defaultValue: 10,
  },
}, {
  tableName: 'hotspots',
  timestamps: true,
});

export default Hotspot;
