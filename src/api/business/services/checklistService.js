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

  async getChecklistField(checklistId, field) {
    return RequestManager.request('get', `/checklists/${checklistId}/${field}`);
  }

  async getChecklistBoard(checklistId) {
    return RequestManager.request('get', `/checklists/${checklistId}/board`);
  }

  async getChecklistCard(checklistId) {
    return RequestManager.request('get', `/checklists/${checklistId}/cards`);
  }

  async getChecklistCheckItems(checklistId) {
    return RequestManager.request('get', `/checklists/${checklistId}/checkItems`);
  }
  async getChecklistName(checklistId) {
    const response = await RequestManager.request('get', `/checklists/${checklistId}/name`);
    return { name: response._value };
  }
}

module.exports = new ChecklistService();