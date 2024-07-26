const RequestManager = require('../../core/RequestManager');

class ListService {
  async createList(name, boardId) {
    return RequestManager.request('post', '/lists', {
      params: { name, boardId },
    });
  }

  async getList(listId) {
    return RequestManager.request('get', `/lists/${listId}`);
  }

  async updateList(listId, name) {
    return RequestManager.request('put', `/lists/${listId}`, {
      params: { name },
    });
  }

  async deleteList(listId) {
    return RequestManager.request('delete', `/lists/${listId}`);
  }
}

module.exports = new ListService();