import express from 'express';
import { createContactSubmission, createSupportTicketSubmission } from '../controllers/contact.controller.js';
import { contactValidation } from '../validations/contact.validation.js';
import { validateRequest } from '../middleware/validation.middleware.js';

const router = express.Router();

router.post('/', contactValidation, validateRequest, createContactSubmission);
router.post('/support-ticket', createSupportTicketSubmission);

export default router;
