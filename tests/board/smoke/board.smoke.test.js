require('../../../src/api/core/config/loadEnv');
const request = require('supertest');
const app = require('../../../src/app');
const boardSchema = require('../../../src/api/schemas/boardschema');

describe('Smoke Tests', () => {
    test('POST /trello/boards should create a board', async () => {
      const response = await request(app)
        .post('/trello/boards')
        .send({ name: 'SmokeBoard', desc: 'smoke test board' })
        .set('Authorization', `Bearer ${process.env.TOKEN}`);
        
      expect(response.status).toBe(200);
  
      const { error } = boardSchema.validate(response.body);
      expect(error).toBeUndefined();
    });
  
    test('DELETE /trello/boards/:boardId should delete a board', async () => {
      const response = await request(app)
        .post('/trello/boards')
        .send({ name: 'SmokeBoardForDelete', desc: 'smoke test board' })
        .set('Authorization', `Bearer ${process.env.TOKEN}`);
        
      const createdBoardId = response.body.id;
  
      const deleteResponse = await request(app)
        .delete(`/trello/boards/${createdBoardId}`)
        .set('Authorization', `Bearer ${process.env.TOKEN}`);
        
      expect(deleteResponse.status).toBe(200);
      expect(deleteResponse.body).toEqual({});
    });
  });