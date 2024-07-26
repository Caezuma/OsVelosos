const RequestManager = require('../../core/RequestManager');

class BoardService {
  async createBoard(name, desc) {
    return RequestManager.request('post', '/boards/', {
      params: { name, desc },
    });
  }

  async deleteBoard(boardId) {
    return RequestManager.request('delete', `/boards/${boardId}`);
  }
}

module.exports = new BoardService();