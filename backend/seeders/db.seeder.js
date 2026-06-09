import bcrypt from 'bcryptjs';
import { sequelize, User, HazardCategory, HazardReport, ReportUpvote, ReportImage } from '../models/index.js';

const createMockReportForUser = async (userId, region, catIds, isResolved, createdAt, allUserIds) => {
  const titles = [
    'Major Pothole spotted',
    'Streetlight malfunctioning',
    'Road debris causing blockage',
    'Water clogging at intersection',
    'Fallen tree branch on lane',
    'Damaged pedestrian crossing sign',
    'Construction barrier misplaced',
    'Broken pavement slab'
  ];
  const descriptions = [
    'Spotted this while driving. It is dangerous for motorbikes and small cars.',
    'This issue has been persisting for a couple of days now. Needs immediate attention.',
    'It is causing traffic congestion as vehicles are forced to merge into a single lane.',
    'Please fix this before it causes a major accident.',
    'Pedestrians are having difficulty walking safely around this area.'
  ];
  const title = titles[Math.floor(Math.random() * titles.length)];
  const description = descriptions[Math.floor(Math.random() * descriptions.length)];
  const categoryId = catIds[Math.floor(Math.random() * catIds.length)];
  const severity = ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)];

  const lat = 6.9271 + (Math.random() - 0.5) * 0.05;
  const lng = 79.8612 + (Math.random() - 0.5) * 0.05;

  const report = await HazardReport.create({
    title,
    description,
    categoryId,
    severity,
    status: isResolved ? 'resolved' : 'reported',
    latitude: lat,
    longitude: lng,
    locationName: `Near Landmark, ${region}`,
    userId,
    createdAt,
    updatedAt: createdAt
  });

  // Create image
  const mockImages = [
    'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?q=80&w=600&auto=format&fit=crop'
  ];
  const imageUrl = mockImages[Math.floor(Math.random() * mockImages.length)];
  await ReportImage.create({
    reportId: report.id,
    imageUrl,
    createdAt,
    updatedAt: createdAt
  });

  // Pick random users to upvote this report
  const upvoteCount = Math.floor(Math.random() * 4) + 1; // 1 to 4 upvotes
  const shuffledUsers = allUserIds.filter(id => id !== userId).sort(() => 0.5 - Math.random());
  const upvoters = shuffledUsers.slice(0, upvoteCount);

  for (const upvoterId of upvoters) {
    await ReportUpvote.create({
      reportId: report.id,
      userId: upvoterId,
      createdAt,
      updatedAt: createdAt
    });
  }

  return report;
};

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

    // 2. Clear old data to avoid duplication and constraint violations
    console.log('⌛ Cleaning old report, user, and upvote records...');
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');
    await ReportImage.destroy({ where: {}, truncate: true });
    await ReportUpvote.destroy({ where: {}, truncate: true });
    await HazardReport.destroy({ where: {}, truncate: true });
    await User.destroy({ where: { role: 'citizen' } });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
    console.log('✔ Database clean finished.');

    // 3. Seed default admin account
    const adminEmail = 'admin@roadaware.com';
    let adminUser = await User.findOne({ where: { email: adminEmail } });

    if (!adminUser) {
      const hashedPassword = await bcrypt.hash('AdminSecure123!', 10);
      adminUser = await User.create({
        name: 'Admin User',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        status: 'active',
      });
      console.log(`✔ Admin user successfully seeded (${adminEmail} / AdminSecure123!)`);
    } else {
      const hashedPassword = await bcrypt.hash('AdminSecure123!', 10);
      adminUser.password = hashedPassword;
      adminUser.role = 'admin';
      adminUser.status = 'active';
      await adminUser.save();
      console.log('✔ Admin user account already exists (credentials verified/updated).');
    }

    // 4. Seed dynamic safety reporters (citizens)
    const seedCitizens = [
      { name: 'Pathum Piyumal', email: 'pathum@roadaware.com', region: 'Colombo 03', reportsConfig: { total: 15, resolved: 10, weekly: 3, weeklyResolved: 2, monthly: 8, monthlyResolved: 6 } },
      { name: 'Tharusha Sangeeth', email: 'tharusha@roadaware.com', region: 'Gampaha', reportsConfig: { total: 12, resolved: 8, weekly: 2, weeklyResolved: 1, monthly: 7, monthlyResolved: 5 } },
      { name: 'Lochani Ridimaliyadda', email: 'lochani@roadaware.com', region: 'Kandy', reportsConfig: { total: 9, resolved: 6, weekly: 0, weeklyResolved: 0, monthly: 5, monthlyResolved: 4 } },
      { name: 'Amara de Silva', email: 'amara@roadaware.com', region: 'Colombo 07', reportsConfig: { total: 8, resolved: 5, weekly: 0, weeklyResolved: 0, monthly: 4, monthlyResolved: 3 } },
      { name: 'Roshan Gunawardena', email: 'roshan@roadaware.com', region: 'Negombo', reportsConfig: { total: 6, resolved: 4, weekly: 2, weeklyResolved: 1, monthly: 3, monthlyResolved: 2 } },
      { name: 'Nisansala Perera', email: 'nisansala@roadaware.com', region: 'Galle', reportsConfig: { total: 5, resolved: 3, weekly: 0, weeklyResolved: 0, monthly: 3, monthlyResolved: 2 } },
      { name: 'Dinesh Fernando', email: 'dinesh@roadaware.com', region: 'Colombo 05', reportsConfig: { total: 4, resolved: 2, weekly: 1, weeklyResolved: 1, monthly: 2, monthlyResolved: 1 } },
      { name: 'Sanduni Jayasekara', email: 'sanduni@roadaware.com', region: 'Kurunegala', reportsConfig: { total: 3, resolved: 1, weekly: 1, weeklyResolved: 0, monthly: 2, monthlyResolved: 1 } },
    ];

    const categories = await HazardCategory.findAll();
    const catIds = categories.map(c => c.id);

    const createdUsers = [adminUser];

    console.log('⌛ Seeding citizen accounts...');
    for (const citizen of seedCitizens) {
      const hashedPassword = await bcrypt.hash('CitizenSecure123!', 10);
      const user = await User.create({
        name: citizen.name,
        email: citizen.email,
        password: hashedPassword,
        role: 'citizen',
        status: 'active',
      });
      createdUsers.push(user);
    }
    console.log('✔ Citizen accounts successfully seeded.');

    const allUserIds = createdUsers.map(u => u.id);

    console.log('⌛ Generating dynamic reports and upvotes across timeframes...');
    for (let idx = 1; idx < createdUsers.length; idx++) {
      const user = createdUsers[idx];
      const citizenConf = seedCitizens[idx - 1];
      const { total, weekly, weeklyResolved, monthly, monthlyResolved, resolved } = citizenConf.reportsConfig;

      // Weekly reports
      for (let i = 0; i < weekly; i++) {
        const isResolved = i < weeklyResolved;
        const daysAgo = 1 + Math.random() * 5; // 1 to 6 days ago
        const createdAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
        await createMockReportForUser(user.id, citizenConf.region, catIds, isResolved, createdAt, allUserIds);
      }

      // Monthly reports (excluding weekly)
      const monthlyRemaining = monthly - weekly;
      const monthlyResolvedRemaining = monthlyResolved - weeklyResolved;
      for (let i = 0; i < monthlyRemaining; i++) {
        const isResolved = i < monthlyResolvedRemaining;
        const daysAgo = 8 + Math.random() * 20; // 8 to 28 days ago
        const createdAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
        await createMockReportForUser(user.id, citizenConf.region, catIds, isResolved, createdAt, allUserIds);
      }

      // All-time reports (excluding monthly)
      const allTimeRemaining = total - monthly;
      const allTimeResolvedRemaining = resolved - monthlyResolved;
      for (let i = 0; i < allTimeRemaining; i++) {
        const isResolved = i < allTimeResolvedRemaining;
        const daysAgo = 32 + Math.random() * 30; // 32 to 62 days ago
        const createdAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
        await createMockReportForUser(user.id, citizenConf.region, catIds, isResolved, createdAt, allUserIds);
      }
    }
    console.log('✔ Mock hazard reports, images, and upvotes successfully seeded.');
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
  }
};
