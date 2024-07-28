const RequestManager = require('../../core/RequestManager');

class ListService {
  async createList(name, idBoard) {
    return RequestManager.request('post', '/lists', {
      params: { name, idBoard },
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

  async getCardsInList(listId) {
    return RequestManager.request('get', `/lists/${listId}/cards`);
  }

  async getBoardOfList(listId) {
    return RequestManager.request('get', `/lists/${listId}/board`);
  }
}

module.exports = new ListService();