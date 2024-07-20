require('dotenv').config();
const axios = require('axios');

exports.getLabel = async (req, res) => {
  const { labelId } = req.params;
  const apiKey = process.env.KEY;
  const apiToken = process.env.TOKEN;

  if (!req.headers?.authorization?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const response = await axios.get(`https://api.trello.com/1/labels/${labelId}`, {
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