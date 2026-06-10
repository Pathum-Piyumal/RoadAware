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

    // Synchronize models (Creates tables if not exists)
    await sequelize.sync();
    console.log('✔ Database models synchronized.');

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
