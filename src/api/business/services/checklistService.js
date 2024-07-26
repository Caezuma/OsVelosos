const RequestManager = require('../../core/RequestManager');

class ChecklistService {
  async createChecklist(name, boardId) {
    return RequestManager.request('post', '/checklists', {
      params: { name, boardId },
    });
  }

  async getChecklist(checklistId) {
    return RequestManager.request('get', `/checklists/${checklistId}`);
  }

  async updateChecklist(checklistId, name) {
    return RequestManager.request('put', `/checklists/${checklistId}`, {
      params: { name },
    });
  }

  async deleteChecklist(checklistId) {
    return RequestManager.request('delete', `/checklists/${checklistId}`);
  }
}

module.exports = new ChecklistService();