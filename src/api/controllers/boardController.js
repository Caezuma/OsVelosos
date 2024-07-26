const BoardService = require('../business/services/boardService');
const logger = require('../core/logger');

exports.createBoard = async (req, res) => {
  const { name, desc } = req.body;

  try {
    const data = await BoardService.createBoard(name, desc);
    res.status(200).json(data);
  } catch (error) {
    logger.error(`createBoard: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBoard = async (req, res) => {
  const { boardId } = req.params;

  try {
    await BoardService.deleteBoard(boardId);
    res.status(200).json({});
  } catch (error) {
    logger.error(`deleteBoard: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};