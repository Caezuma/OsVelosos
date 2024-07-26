const RequestManager = require('../core/RequestManager');

class CommentService {
  async createComment(cardId, text) {
    return RequestManager.request('post', `/cards/${cardId}/actions/comments`, {
      params: { text },
    });
  }

  async deleteComment(cardId, commentId) {
    return RequestManager.request('delete', `/cards/${cardId}/actions/${commentId}/comments`);
  }
}

module.exports = new CommentService();