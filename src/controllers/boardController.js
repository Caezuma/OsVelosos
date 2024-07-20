require('dotenv').config();
const axios = require('axios');

exports.createBoard = async (req, res) => {
  const { name, desc } = req.body;
  const apiKey = process.env.KEY;
  const apiToken = process.env.TOKEN;

  if (!apiKey || !apiToken || req.headers['authorization'] !== `Bearer ${apiToken}`) {
    return res.status(401).json({ error: 'Invalid or missing authentication token' });
  }

  try {
    const response = await axios.post('https://api.trello.com/1/boards/', null, {
      params: {
        name,
        desc,
        key: apiKey,
        token: apiToken
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBoard = async (req, res) => {
  const { boardId } = req.params;
  const apiKey = process.env.KEY;
  const apiToken = process.env.TOKEN;

  if (!apiKey || !apiToken || req.headers['authorization'] !== `Bearer ${apiToken}`) {
    return res.status(401).json({ error: 'Invalid or missing authentication token' });
  }

  try {
    await axios.delete(`https://api.trello.com/1/boards/${boardId}`, {
      params: {
        key: apiKey,
        token: apiToken
      }
    });

    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};