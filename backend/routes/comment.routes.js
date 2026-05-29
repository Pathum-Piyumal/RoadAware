import express from 'express';
import { getComments, addComment } from '../controllers/comment.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router({ mergeParams: true }); // mergeParams to access :id from parent

// GET /api/reports/:id/comments — public
router.get('/', getComments);

// POST /api/reports/:id/comments — protected
router.post('/', protect, addComment);

export default router;
