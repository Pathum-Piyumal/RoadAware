import express from 'express';
import {
  register,
  login,
  adminLogin,
  logout,
  getProfile,
  updateProfile,
  changePassword,
  uploadAvatar,
  forgotPassword,
  verifyResetCode,
  resetPassword,
  googleLogin,
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';
import {
  registerValidation,
  loginValidation,
  profileUpdateValidation,
  changePasswordValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
} from '../validations/auth.validation.js';
import { validateRequest } from '../middleware/validation.middleware.js';

const router = express.Router();

// ─── Public Routes ────────────────────────────────────────────────────────────

// Citizen Registration
router.post('/register', registerValidation, validateRequest, register);

// Citizen & Admin Login
router.post('/login', loginValidation, validateRequest, login);

// Admin-specific Login
router.post('/admin/login', loginValidation, validateRequest, adminLogin);

// Google OAuth Login
router.post('/google', googleLogin);

// Password Reset Flow
router.post('/forgot-password', forgotPasswordValidation, validateRequest, forgotPassword);
router.post('/verify-code', verifyResetCode);
router.post('/reset-password', resetPasswordValidation, validateRequest, resetPassword);

// ─── Protected Routes (JWT required) ─────────────────────────────────────────
router.use(protect);

router.get('/logout', logout);
router.get('/profile', getProfile);
router.put('/profile', profileUpdateValidation, validateRequest, updateProfile);
router.put('/change-password', changePasswordValidation, validateRequest, changePassword);
router.post('/avatar', upload.single('avatar'), uploadAvatar);

export default router;
