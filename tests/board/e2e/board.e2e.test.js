require('../../../src/api/core/config/loadEnv');
const request = require('supertest');
const app = require('../../../src/app');
const boardSchema = require('../../../src/api/schemas/boardschema');

/**
 * @group e2e
 */

describe('Board E2E Tests', () => {
  let createdBoardId;

  beforeAll(async () => {
    const response = await request(app)
      .post('/trello/boards')
      .send({
        name: 'E2E Test Board',
        desc: 'This is a board created for E2E testing'
      })
      .set('Authorization', `Bearer ${process.env.TOKEN}`);
    
    createdBoardId = response.body.id;
  });

  afterAll(async () => {
    if (createdBoardId) {
      await request(app)
        .delete(`/trello/boards/${createdBoardId}`)
        .set('Authorization', `Bearer ${process.env.TOKEN}`);
    }
  });

  test('GET /trello/boards/:boardId should retrieve the correct board', async () => {
    const response = await request(app)
      .get(`/trello/boards/${createdBoardId}`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdBoardId);
    expect(response.body).toHaveProperty('name', 'E2E Test Board');
    expect(response.body).toHaveProperty('desc', 'This is a board created for E2E testing');
    
    const { error } = boardSchema.validate(response.body);
    expect(error).toBeUndefined();
  });

  test('PUT /trello/boards/:boardId should update the board details', async () => {
    const updatedData = {
      name: 'Updated E2E Test Board',
      desc: 'Updated description for E2E testing'
    };
    
    const response = await request(app)
      .put(`/trello/boards/${createdBoardId}`)
      .send(updatedData)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updatedData);
    
    const { error } = boardSchema.validate(response.body);
    expect(error).toBeUndefined();
  });
});