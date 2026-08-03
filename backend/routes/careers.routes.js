import express from 'express';
import { submitJobApplication } from '../controllers/careers.controller.js';
import { uploadDocument } from '../middleware/upload.middleware.js';

const router = express.Router();

// Public route for job applications (with single 'cv' file upload)
router.post('/apply', uploadDocument.single('cv'), submitJobApplication);

export default router;
