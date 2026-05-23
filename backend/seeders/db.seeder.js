import bcrypt from 'bcryptjs';
import { User, HazardCategory } from '../models/index.js';

export const seedDatabase = async () => {
  try {
    // 1. Seed base hazard categories
    const baseCategories = [
      { name: 'Pothole', color: '#F59E0B' },
      { name: 'Debris', color: '#6B7280' },
      { name: 'Flooding', color: '#3B82F6' },
      { name: 'Broken Light', color: '#0EA5E9' },
      { name: 'Damaged Signage', color: '#3B82F6' },
      { name: 'Construction', color: '#D97706' },
      { name: 'Other', color: '#4B5563' },
    ];

    for (const cat of baseCategories) {
      await HazardCategory.findOrCreate({
        where: { name: cat.name },
        defaults: { color: cat.color },
      });
    }
    console.log('✔ Hazard categories verified/seeded.');

    // 2. Seed default admin account
    const adminEmail = 'admin@roadaware.com';
    const adminExists = await User.findOne({ where: { email: adminEmail } });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('AdminSecure123!', 10);
      await User.create({
        name: 'Admin User',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        status: 'active',
      });
      console.log(`✔ Admin user successfully seeded (${adminEmail} / AdminSecure123!)`);
    } else {
      console.log('✔ Admin user account already exists.');
    }
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
  }
};
