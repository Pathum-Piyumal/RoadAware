import express from 'express';
import { createContactSubmission } from '../controllers/contact.controller.js';
import { contactValidation } from '../validations/contact.validation.js';
import { validateRequest } from '../middleware/validation.middleware.js';

const router = express.Router();

router.post('/', contactValidation, validateRequest, createContactSubmission);

export default router;
