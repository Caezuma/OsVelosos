require('../../../src/api/core/config/loadEnv');
const request = require('supertest');
const app = require('../../../src/app');

describe('Acceptance Tests', () => {
    test('POST /trello/boards should return 401 if authentication fails', async () => {
      const response = await request(app)
        .post('/trello/boards')
        .send({ name: 'TestBoard', desc: 'test board' })
        .set('Authorization', 'Bearer invalidToken');
        
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Invalid or missing authentication token');
    });
  
    test('DELETE /trello/boards/:boardId should return 401 if authentication fails', async () => {
      const deleteResponse = await request(app)
        .delete(`/trello/boards/${process.env.BOARD_ID}`)
        .set('Authorization', 'Bearer invalidToken');
  
      expect(deleteResponse.status).toBe(401);
      expect(deleteResponse.body).toHaveProperty('error');
      expect(deleteResponse.body.error).toBe('Invalid or missing authentication token');
    });
  });