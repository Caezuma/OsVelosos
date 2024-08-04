const RequestManager = require('../../core/RequestManager');

class CommentService {
  async createComment(cardId, text) {
    return RequestManager.request('post', `/cards/${cardId}/actions/comments`, {
      params: { key: process.env.KEY, token: process.env.TOKEN, text },
    });
  }

  async getComment(commentId) {
    return RequestManager.request('get', `/actions/${commentId}`, {
      params: { key: process.env.KEY, token: process.env.TOKEN },
    });
  }

  async updateComment(cardId, commentId, text) {
    return RequestManager.request('put', `/cards/${cardId}/actions/${commentId}/text`, {
      params: { key: process.env.KEY, token: process.env.TOKEN, value: text },
    });
  }

  async deleteComment(cardId, commentId) {
    return RequestManager.request('delete', `/cards/${cardId}/actions/${commentId}/comments`, {
      params: { key: process.env.KEY, token: process.env.TOKEN },
    });
  }
}

module.exports = new CommentService();