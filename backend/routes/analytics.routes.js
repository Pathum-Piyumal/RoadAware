import express from 'express';
import { getDashboardStats, getTrendAnalytics } from '../controllers/analytics.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);
router.use(adminOnly);

router.get('/dashboard', getDashboardStats);
router.get('/trends', getTrendAnalytics);

export default router;
