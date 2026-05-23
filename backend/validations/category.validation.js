import { body } from 'express-validator';

export const categoryValidation = [
  body('name').trim().notEmpty().withMessage('Category name is required.'),
  body('color')
    .trim()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .withMessage('Color must be a valid hex color code (e.g. #3B82F6).'),
];
