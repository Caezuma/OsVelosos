const axios = require('axios');

class RequestManager {
  constructor() {
    if (RequestManager.instance) {
      return RequestManager.instance;
    }

    this.axiosInstance = axios.create({
      baseURL: 'https://api.trello.com/1',
      params: {
        key: process.env.KEY,
        token: process.env.TOKEN,
      },
    });

    RequestManager.instance = this;
  }

  async request(method, url, options = {}) {
    try {
      const response = await this.axiosInstance.request({
        method,
        url,
        ...options,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data : error.message);
    }
  }
}

module.exports = new RequestManager();
