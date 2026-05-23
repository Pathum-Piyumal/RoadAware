import express from 'express';
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';
import { categoryValidation } from '../validations/category.validation.js';
import { validateRequest } from '../middleware/validation.middleware.js';

const router = express.Router();

router.get('/', getCategories);

// Admin-only modifying routes
router.post('/', protect, adminOnly, categoryValidation, validateRequest, createCategory);
router.put('/:id', protect, adminOnly, categoryValidation, validateRequest, updateCategory);
router.delete('/:id', protect, adminOnly, deleteCategory);

export default router;
