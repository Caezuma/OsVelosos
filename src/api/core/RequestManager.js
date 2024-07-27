const axios = require('axios');
const fs = require('fs');
const path = require('path');

class RequestManager {
  constructor() {
    if (RequestManager.instance) {
      return RequestManager.instance;
    }

    const envConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'config/env.json')));
    const apiConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'config/config.json')));

    this.axiosInstance = axios.create({
      baseURL: apiConfig.api.baseUrl,
      params: {
        key: envConfig.KEY,
        token: envConfig.TOKEN,
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