const ChecklistService = require('../business/services/checklistService');
const logger = require('../core/logger');

exports.getChecklist = async (req, res) => {
  const { checklistId } = req.params;

  try {
    const data = await ChecklistService.getChecklist(checklistId);
    res.status(200).json(data);
  } catch (error) {
    logger.error(`getChecklist: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};