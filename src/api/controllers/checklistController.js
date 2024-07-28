const ChecklistService = require('../business/services/checklistService');
const logger = require('../core/logger');

exports.createChecklist = async (req, res) => {
  const { name, boardId } = req.body;

  try {
    const data = await ChecklistService.createChecklist(name, boardId);
    res.status(200).json(data);
  } catch (error) {
    logger.error(`createChecklist: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

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

exports.updateChecklist = async (req, res) => {
  const { checklistId } = req.params;
  const { name } = req.body;

  try {
    const data = await ChecklistService.updateChecklist(checklistId, name);
    res.status(200).json(data);
  } catch (error) {
    logger.error(`updateChecklist: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteChecklist = async (req, res) => {
  const { checklistId } = req.params;

  try {
    await ChecklistService.deleteChecklist(checklistId);
    res.status(200).json({ message: 'Checklist deleted successfully' });
  } catch (error) {
    logger.error(`deleteChecklist: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

exports.getChecklistField = async (req, res) => {
  const { checklistId } = req.params;
  const field = 'name';

  try {
    const data = await ChecklistService.getChecklistField(checklistId, field);
    res.status(200).json({ name: data._value });
  } catch (error) {
    logger.error(`getChecklistField: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};


exports.getChecklistBoard = async (req, res) => {
  const { checklistId } = req.params;

  try {
    const data = await ChecklistService.getChecklistBoard(checklistId);
    res.status(200).json(data);
  } catch (error) {
    logger.error(`getChecklistBoard: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

exports.getChecklistCard = async (req, res) => {
  const { checklistId } = req.params;

  try {
    const data = await ChecklistService.getChecklistCard(checklistId);
    res.status(200).json(data);
  } catch (error) {
    logger.error(`getChecklistCard: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

exports.getChecklistCheckItems = async (req, res) => {
  const { checklistId } = req.params;

  try {
    const data = await ChecklistService.getChecklistCheckItems(checklistId);
    res.status(200).json(data);
  } catch (error) {
    logger.error(`getChecklistCheckItems: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

exports.getChecklistName = async (req, res) => {
  const { checklistId } = req.params;

  try {
    const data = await ChecklistService.getChecklistName(checklistId);
    res.status(200).json(data);
  } catch (error) {
    logger.error(`getChecklistName: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};