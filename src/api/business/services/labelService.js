const RequestManager = require('../core/RequestManager');

class LabelService {
  async getLabel(labelId) {
    return RequestManager.request('get', `/labels/${labelId}`);
  }
}

module.exports = new LabelService();