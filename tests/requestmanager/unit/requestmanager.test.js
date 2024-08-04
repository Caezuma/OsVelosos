const axios = require('axios');
const fs = require('fs');
const RequestManager = require('../RequestManagerMock');

jest.mock('axios');
jest.mock('fs');
jest.mock('path', () => ({
  join: jest.requireActual('path').join,
}));

describe('RequestManager', () => {
  let requestManager;
  let axiosInstance;

  beforeEach(() => {
    fs.readFileSync.mockImplementation((filePath) => {
      if (filePath.endsWith('env.json')) {
        return JSON.stringify({ KEY: 'mockKey', TOKEN: 'mockToken' });
      } else if (filePath.endsWith('config.json')) {
        return JSON.stringify({ api: { baseUrl: 'http://mockapi.com' } });
      }
    });

    axiosInstance = {
      request: jest.fn(),
      defaults: {
        params: {
          key: 'mockKey',
          token: 'mockToken',
        },
      },
    };

    axios.create.mockReturnValue(axiosInstance);

    RequestManager.instance = null;

    requestManager = new RequestManager();
  });

  test('should create a singleton instance', () => {
    const anotherInstance = new RequestManager();
    expect(requestManager).toBe(anotherInstance);
  });

  test('should initialize axios instance with correct configuration', () => {
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'http://mockapi.com',
      params: {
        key: 'mockKey',
        token: 'mockToken',
      },
    });
  });

  test('should make a successful request', async () => {
    const mockResponse = { data: { success: true } };
    axiosInstance.request.mockResolvedValue(mockResponse);

    const response = await requestManager.request('GET', '/endpoint');
    expect(response).toEqual(mockResponse.data);
  });

  test('should handle request errors', async () => {
    const mockError = { response: { data: 'Error message' } };
    axiosInstance.request.mockRejectedValue(mockError);

    await expect(requestManager.request('GET', '/endpoint')).rejects.toThrow('Error message');
  });

  test('should handle generic errors', async () => {
    const mockError = new Error('Generic error');
    axiosInstance.request.mockRejectedValue(mockError);

    await expect(requestManager.request('GET', '/endpoint')).rejects.toThrow('Generic error');
  });

  test('should include default params in the request', async () => {
    const mockResponse = { data: { success: true } };
    axiosInstance.request.mockResolvedValue(mockResponse);

    await requestManager.request('GET', '/endpoint');

    expect(axiosInstance.request).toHaveBeenCalledWith(expect.objectContaining({
      params: {
        key: 'mockKey',
        token: 'mockToken',
      },
    }));
  });

  test('should override default params with provided params', async () => {
    const mockResponse = { data: { success: true } };
    axiosInstance.request.mockResolvedValue(mockResponse);

    const customParams = { extraParam: 'customValue' };
    await requestManager.request('GET', '/endpoint', { params: customParams });

    expect(axiosInstance.request).toHaveBeenCalledWith(expect.objectContaining({
      params: expect.objectContaining({
        key: 'mockKey',
        token: 'mockToken',
        extraParam: 'customValue',
      }),
    }));
  });

  test('should pass additional options to axios request', async () => {
    const mockResponse = { data: { success: true } };
    axiosInstance.request.mockResolvedValue(mockResponse);

    const additionalOptions = { headers: { 'Custom-Header': 'value' } };
    await requestManager.request('POST', '/endpoint', { method: 'POST', body: { data: 'test' }, ...additionalOptions });

    expect(axiosInstance.request).toHaveBeenCalledWith(expect.objectContaining({
      method: 'POST',
      data: { data: 'test' },
      headers: { 'Custom-Header': 'value' },
    }));
  });

  test('should handle missing response data gracefully', async () => {
    const mockError = { response: {} };
    axiosInstance.request.mockRejectedValue(mockError);

    await expect(requestManager.request('GET', '/endpoint')).rejects.toThrow("");
  });

  test('should handle empty error response', async () => {
    const mockError = {}; 
    axiosInstance.request.mockRejectedValue(mockError);

    await expect(requestManager.request('GET', '/endpoint')).rejects.toThrow("");
  });

  test('should handle network errors gracefully', async () => {
    const mockError = new Error('Network error');
    axiosInstance.request.mockRejectedValue(mockError);

    await expect(requestManager.request('GET', '/endpoint')).rejects.toThrow('Network error');
  });


  test('should handle multiple requests with singleton instance', async () => {
    const mockResponse1 = { data: { success: true } };
    const mockResponse2 = { data: { success: false } };

    axiosInstance.request
      .mockResolvedValueOnce(mockResponse1)
      .mockResolvedValueOnce(mockResponse2);

    const response1 = await requestManager.request('GET', '/endpoint1');
    const response2 = await requestManager.request('GET', '/endpoint2');

    expect(response1).toEqual(mockResponse1.data);
    expect(response2).toEqual(mockResponse2.data);
  });

  test('should pass data to the request correctly', async () => {
    const mockResponse = { data: { success: true } };
    axiosInstance.request.mockResolvedValue(mockResponse);

    const data = { key: 'value' };
    await requestManager.request('POST', '/endpoint', { data });

    expect(axiosInstance.request).toHaveBeenCalledWith(expect.objectContaining({
      data,
    }));
  });

  test('should handle invalid options gracefully', async () => {
    axiosInstance.request.mockImplementation(() => {
      throw new Error('Invalid options');
    });

    await expect(requestManager.request('GET', '/endpoint', { invalidOption: 'value' }))
      .rejects.toThrow('Invalid options');
  });
});