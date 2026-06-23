import 'dotenv/config';
import app from './src/app.js';
import { sequelize } from './models/index.js';
import { connectDB } from './config/database.js';
import { seedDatabase } from './seeders/db.seeder.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Authenticate database connection & create DB if missing
    await connectDB();

    // Synchronize models — only creates NEW tables, does not alter existing ones
    await sequelize.sync();
    console.log('✔ Database models synchronized.');

    // ── Targeted migration: add new columns if they don't already exist ──────
    const queryInterface = sequelize.getQueryInterface();
    const usersTableDesc = await queryInterface.describeTable('users');

    if (!usersTableDesc.resetCode) {
      await sequelize.query(
        'ALTER TABLE `users` ADD COLUMN `resetCode` VARCHAR(6) NULL;'
      );
      console.log('✔ Migration: added resetCode column to users table.');
    }
    if (!usersTableDesc.resetCodeExpires) {
      await sequelize.query(
        'ALTER TABLE `users` ADD COLUMN `resetCodeExpires` DATETIME NULL;'
      );
      console.log('✔ Migration: added resetCodeExpires column to users table.');
    }
    if (!usersTableDesc.googleId) {
      await sequelize.query(
        'ALTER TABLE `users` ADD COLUMN `googleId` VARCHAR(255) NULL;'
      );
      console.log('✔ Migration: added googleId column to users table.');
    }
    if (usersTableDesc.password && usersTableDesc.password.allowNull === false) {
      await sequelize.query(
        'ALTER TABLE `users` MODIFY COLUMN `password` VARCHAR(255) NULL;'
      );
      console.log('✔ Migration: altered password column to allow NULL values.');
    }

    // Create report_updates table if it does not exist
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS \`report_updates\` (
        \`id\`        INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
        \`reportId\`  INT          NOT NULL,
        \`status\`    ENUM('reported','in_progress','resolved','rejected') NOT NULL,
        \`comment\`   TEXT         NULL,
        \`updatedBy\` INT          NULL,
        \`createdAt\` DATETIME     NOT NULL,
        \`updatedAt\` DATETIME     NOT NULL,
        INDEX \`report_updates_reportId\` (\`reportId\`),
        CONSTRAINT \`ru_report_fk\` FOREIGN KEY (\`reportId\`) REFERENCES \`hazard_reports\` (\`id\`) ON DELETE CASCADE,
        CONSTRAINT \`ru_user_fk\`   FOREIGN KEY (\`updatedBy\`) REFERENCES \`users\` (\`id\`) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    console.log('✔ Migration: report_updates table verified/created.');
    // ─────────────────────────────────────────────────────────────────────────

    // Seed default admin user and base categories
    await seedDatabase();

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
};

startServer();
