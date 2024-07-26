const RequestManager = require('../../core/RequestManager');

class CommentService {
  async createComment(cardId, text) {
    return RequestManager.request('post', `/cards/${cardId}/actions/comments`, {
      params: { text },
    });
  }

  async getComment(cardId, commentId) {
    return RequestManager.request('get', `/cards/${cardId}/actions/${commentId}/comments`);
  }

  async updateComment(cardId, commentId, text) {
    return RequestManager.request('put', `/cards/${cardId}/actions/${commentId}/comments`, {
      params: { text },
    });
  }

  async deleteComment(cardId, commentId) {
    return RequestManager.request('delete', `/cards/${cardId}/actions/${commentId}/comments`);
  }
}

module.exports = new CommentService();