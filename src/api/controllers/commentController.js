const CommentService = require('../business/services/commentService');
const logger = require('../core/logger');

exports.createComment = async (req, res) => {
  const { cardId } = req.params;
  const { text } = req.body;

  try {
    const data = await CommentService.createComment(cardId, text);
    res.status(201).json({ commentId: data.id });
  } catch (error) {
    logger.error(`createComment: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

exports.getComment = async (req, res) => {
  const { cardId, commentId } = req.params;

  try {
    const data = await CommentService.getComment(cardId, commentId);
    res.status(200).json(data);
  } catch (error) {
    logger.error(`getComment: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

exports.updateComment = async (req, res) => {
  const { cardId, commentId } = req.params;
  const { text } = req.body;

  try {
    const data = await CommentService.updateComment(cardId, commentId, text);
    res.status(200).json(data);
  } catch (error) {
    logger.error(`updateComment: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  const { cardId, commentId } = req.params;

  try {
    await CommentService.deleteComment(cardId, commentId);
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    logger.error(`deleteComment: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};