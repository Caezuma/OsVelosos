require('../../../src/api/core/config/loadEnv');
const request = require('supertest');
const app = require('../../../src/app');
const boardSchema = require('../../../src/api/schemas/boardschema');

/**
 * @group integration
 */

describe('Integration Tests', () => {
  let createdBoardId = null;

  beforeAll(async () => {
    const response = await request(app)
      .post('/trello/boards')
      .send({ name: 'IntegrationBoard', desc: 'integration test board' })
      .set('Authorization', `Bearer ${process.env.TOKEN}`);
      
    createdBoardId = response.body.id;
  });

  afterAll(async () => {
    if (createdBoardId) {
      const deleteResponse = await request(app)
        .delete(`/trello/boards/${createdBoardId}`)
        .set('Authorization', `Bearer ${process.env.TOKEN}`);
        
      expect(deleteResponse.status).toBe(200);
      expect(deleteResponse.body).toEqual({});
    }
  });

  test('GET /trello/boards/:boardId should retrieve a board', async () => {
    const response = await request(app)
      .get(`/trello/boards/${process.env.BOARD_ID}`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(200);

    const { error } = boardSchema.validate(response.body);
    expect(error).toBeUndefined();
  });

  test('PUT /trello/boards/:boardId should update a board', async () => {
    const updateData = { name: 'UpdatedBoardName', desc: 'updated description' };
    const response = await request(app)
      .put(`/trello/boards/${process.env.BOARD_ID}`)
      .send(updateData)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updateData);
  });
});