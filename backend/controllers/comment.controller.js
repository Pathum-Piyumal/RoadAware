import { Comment, User } from '../models/index.js';

// GET /api/reports/:id/comments — public
export const getComments = async (req, res, next) => {
  try {
    const { id } = req.params;

    const comments = await Comment.findAll({
      where: { reportId: id },
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'name', 'avatar'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json({
      success: true,
      comments,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/reports/:id/comments — protected (requires login)
export const addComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    if (!content || content.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Comment content cannot be empty.',
      });
    }

    const comment = await Comment.create({
      reportId: id,
      userId,
      content: content.trim(),
    });

    // Return the comment with author info
    const commentWithAuthor = await Comment.findByPk(comment.id, {
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'name', 'avatar'],
        },
      ],
    });

    res.status(201).json({
      success: true,
      message: 'Comment added successfully.',
      comment: commentWithAuthor,
    });
  } catch (error) {
    next(error);
  }
};
