const RequestManager = require('../../core/RequestManager');

class LabelService {
  async createLabel(name, color) {
    return RequestManager.request('post', '/labels', {
      params: { name, color },
    });
  }

  async getLabel(labelId) {
    return RequestManager.request('get', `/labels/${labelId}`);
  }

  async updateLabel(labelId, name, color) {
    return RequestManager.request('put', `/labels/${labelId}`, {
      params: { name, color },
    });
  }

  async deleteLabel(labelId) {
    return RequestManager.request('delete', `/labels/${labelId}`);
  }
}

module.exports = new LabelService();