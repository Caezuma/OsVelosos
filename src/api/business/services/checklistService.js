const RequestManager = require('../../core/RequestManager');

class ChecklistService {
  async getChecklist(checklistId) {
    return RequestManager.request('get', `/checklists/${checklistId}`);
  }
}

module.exports = new ChecklistService();