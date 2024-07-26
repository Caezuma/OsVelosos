const RequestManager = require('../core/RequestManager');

class ListService {
  async updateList(listId, name) {
    return RequestManager.request('put', `/lists/${listId}`, {
      params: { name },
    });
  }
}

module.exports = new ListService();