require('dotenv').config();
const axios = require('axios');

exports.updateList = async (req, res) => {
  const { listId } = req.params;
  const { name } = req.body;
  const apiKey = process.env.KEY;
  const apiToken = process.env.TOKEN;

  try {
    const response = await axios.put(`https://api.trello.com/1/lists/${listId}`, null, {
      params: {
        name,
        key: apiKey,
        token: apiToken
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};