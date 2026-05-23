import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbName = process.env.DB_NAME || 'roadaware_db';
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || '';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 3306;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: parseInt(dbPort),
  dialect: 'mysql',
  logging: false,
});

export const connectDB = async () => {
  try {
    // 1. Connect to MySQL without database parameter to verify/create database first
    const connection = await mysql.createConnection({
      host: dbHost,
      port: parseInt(dbPort),
      user: dbUser,
      password: dbPassword,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    await connection.end();
    console.log(`✔ Database "${dbName}" verified or created successfully.`);

    // 2. Authenticate Sequelize connection
    await sequelize.authenticate();
    console.log('Database connection authenticated successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

export default sequelize;
