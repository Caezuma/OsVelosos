const ListService = require('../business/services/listService');
const logger = require('../core/logger');

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
