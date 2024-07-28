const RequestManager = require('../../core/RequestManager');

class LabelService {
  async createLabel(name, color, idBoard) {
    return RequestManager.request('post', '/labels', {
      params: { name, color, idBoard },
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

  async updateLabelField(labelId, field, value) {
    return RequestManager.request('put', `/labels/${labelId}/${field}`, {
      params: { value },
    });
  }
}

module.exports = new LabelService();