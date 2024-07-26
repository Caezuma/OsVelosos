require('dotenv').config();
const axios = require('axios');

exports.createComment = async (req, res) => {
  const { cardId } = req.params;
  const { text } = req.body;
  const apiKey = process.env.KEY;
  const apiToken = process.env.TOKEN;

  try {
    const response = await axios.post(`https://api.trello.com/1/cards/${cardId}/actions/comments`, 
    {
      text
    }, {
      params: {
        key: apiKey,
        token: apiToken
      }
    });

    res.status(201).json({ commentId: response.data.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função para deletar um comentário
exports.deleteComment = async (req, res) => {
  const { cardId, commentId } = req.params;
  const apiKey = process.env.KEY;
  const apiToken = process.env.TOKEN;

  try {
    await axios.delete(`https://api.trello.com/1/cards/${cardId}/actions/${commentId}/comments`, {
      params: {
        key: apiKey,
        token: apiToken
      }
    });

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
