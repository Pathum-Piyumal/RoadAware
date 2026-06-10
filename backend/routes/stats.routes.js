import express from 'express';
import { getDashboardStats, getTrendStats } from '../controllers/stats.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);
router.use(adminOnly);

router.get('/dashboard', getDashboardStats);
router.get('/trends', getTrendStats);

export default router;
