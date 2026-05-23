import { body } from 'express-validator';

export const reportCreateValidation = [
  body('title').trim().notEmpty().withMessage('Title is required.'),
  body('description').trim().notEmpty().withMessage('Description is required.'),
  body('categoryId').isInt().withMessage('Valid category ID is required.'),
  body('severity').isIn(['low', 'medium', 'high', 'critical']).withMessage('Invalid severity level.'),
  body('latitude').isFloat({ min: -90, max: 90 }).withMessage('Latitude must be a valid float between -90 and 90.'),
  body('longitude').isFloat({ min: -180, max: 180 }).withMessage('Longitude must be a valid float between -180 and 180.'),
  body('locationName').trim().notEmpty().withMessage('Location name is required.'),
];

export const reportStatusUpdateValidation = [
  body('status').isIn(['reported', 'in_progress', 'resolved', 'rejected']).withMessage('Invalid report status.'),
];
