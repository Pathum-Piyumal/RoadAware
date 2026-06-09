import express from 'express';
import {
  createReport,
  getReports,
  getReportById,
  getMapMarkers,
  toggleUpvote,
  getMyReports,
  getPublicStats,
  getLeaderboard,
} from '../controllers/report.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';
import { reportCreateValidation } from '../validations/report.validation.js';
import { validateRequest } from '../middleware/validation.middleware.js';

const router = express.Router();

// Public / Common Routes
router.get('/', getReports);
router.get('/map', getMapMarkers);
router.get('/stats', getPublicStats);
router.get('/leaderboard', getLeaderboard);
router.get('/my', protect, getMyReports);  // must be before /:id
router.get('/:id', getReportById);

// Protected Citizen Routes
router.post('/', protect, upload.single('image'), reportCreateValidation, validateRequest, createReport);
router.post('/:id/upvote', protect, toggleUpvote);

export default router;
