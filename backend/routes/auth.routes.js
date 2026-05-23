import express from 'express';
import {
  adminLogin,
  logout,
  getProfile,
  updateProfile,
  changePassword,
  uploadAvatar,
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';
import {
  loginValidation,
  profileUpdateValidation,
  changePasswordValidation,
} from '../validations/auth.validation.js';
import { validateRequest } from '../middleware/validation.middleware.js';

const router = express.Router();

// Only Admin Login is allowed on the backend auth routes
router.post('/admin/login', loginValidation, validateRequest, adminLogin);

router.use(protect);

router.get('/logout', logout);
router.get('/profile', getProfile);
router.put('/profile', profileUpdateValidation, validateRequest, updateProfile);
router.put('/change-password', changePasswordValidation, validateRequest, changePassword);
router.post('/avatar', upload.single('avatar'), uploadAvatar);

export default router;
