require('../../../src/api/core/config/loadEnv');
const request = require('supertest');
const app = require('../../../src/app');
const boardSchema = require('../../../src/api/schemas/boardschema');

describe('Functional Tests', () => {
  test('GET /trello/boards/:boardId/actions should get actions of a board', async () => {
    const response = await request(app)
      .get(`/trello/boards/${process.env.BOARD_ID}/actions`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    response.body.forEach(action => {
      const { error } = boardSchema.validate(action);
      expect(error).toBeUndefined();
    });
  });
});