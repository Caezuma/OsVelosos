const ListService = require('../business/services/listService');
const logger = require('../core/logger');

exports.createList = async (req, res) => {
  const { name, boardId } = req.body;

  try {
    const data = await ListService.createList(name, boardId);
    res.status(200).json(data);
  } catch (error) {
    logger.error(`createList: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

exports.getList = async (req, res) => {
  const { listId } = req.params;

  try {
    const data = await ListService.getList(listId);
    res.status(200).json(data);
  } catch (error) {
    logger.error(`getList: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

exports.updateList = async (req, res) => {
  const { listId } = req.params;
  const { name } = req.body;

  try {
    const data = await ListService.updateList(listId, name);
    res.status(200).json(data);
  } catch (error) {
    logger.error(`updateList: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteList = async (req, res) => {
  const { listId } = req.params;

  try {
    await ListService.deleteList(listId);
    res.status(200).json({ message: 'List deleted successfully' });
  } catch (error) {
    logger.error(`deleteList: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};