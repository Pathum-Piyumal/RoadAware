import express from 'express';
import {
  getAdminReports,
  updateReportStatus,
  exportReportsCSV,
  getUsers,
  toggleUserStatus,
  updateUserRole,
  getSettings,
  updateSettings,
} from '../controllers/admin.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';
import { reportStatusUpdateValidation } from '../validations/report.validation.js';
import { validateRequest } from '../middleware/validation.middleware.js';

const router = express.Router();

router.use(protect);
router.use(adminOnly);

router.get('/reports', getAdminReports);
router.put('/reports/:id/status', reportStatusUpdateValidation, validateRequest, updateReportStatus);
router.get('/reports/export', exportReportsCSV);

router.get('/users', getUsers);
router.put('/users/:id/status', toggleUserStatus);
router.put('/users/:id/role', updateUserRole);

router.get('/settings', getSettings);
router.put('/settings', updateSettings);

export default router;
