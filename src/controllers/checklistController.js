require('dotenv').config();
const axios = require('axios');

exports.getChecklist = async (req, res) => {
  const { checklistId } = req.params;
  const apiKey = process.env.KEY;
  const apiToken = process.env.TOKEN;

  try {
    const response = await axios.get(`https://api.trello.com/1/checklists/${checklistId}`, {
      params: {
        key: apiKey,
        token: apiToken
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};