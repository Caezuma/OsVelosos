const LabelService = require('../business/services/labelService');
const logger = require('../core/logger');

exports.createLabel = async (req, res) => {
  const { name, color, idBoard } = req.body;

  try {
    const data = await LabelService.createLabel(name, color, idBoard);
    res.status(201).json(data);
  } catch (error) {
    logger.error(`createLabel: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

exports.getLabel = async (req, res) => {
  const { labelId } = req.params;

  try {
    const data = await LabelService.getLabel(labelId);
    res.status(200).json(data);
  } catch (error) {
    logger.error(`getLabel: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

exports.updateLabel = async (req, res) => {
  const { labelId } = req.params;
  const { name, color } = req.body;

  try {
    const data = await LabelService.updateLabel(labelId, name, color);
    res.status(200).json(data);
  } catch (error) {
    logger.error(`updateLabel: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteLabel = async (req, res) => {
  const { labelId } = req.params;

  try {
    await LabelService.deleteLabel(labelId);
    res.status(200).json({ message: 'Label deleted successfully' });
  } catch (error) {
    logger.error(`deleteLabel: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

exports.updateLabelField = async (req, res) => {
  const { labelId, field } = req.params;
  const { value } = req.body;

  try {
    const data = await LabelService.updateLabelField(labelId, field, value);
    res.status(200).json(data);
  } catch (error) {
    logger.error(`updateLabelField: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};