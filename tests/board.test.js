require('../src/api/core/config/loadEnv');
const request = require('supertest');
const app = require('../src/app');
const Joi = require('joi');

describe('Board Tests', () => {
  let createdBoardId = null;

  beforeAll(async () => {
    const response = await request(app)
      .post('/trello/boards')
      .send({ name: 'TestCodeBoard', desc: 'sample board' })
      .set('Authorization', `Bearer ${process.env.TOKEN}`);
      
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ name: 'TestCodeBoard', desc: 'sample board' });

    const schema = Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      desc: Joi.string().required()
    }).unknown(true);

    const { error } = schema.validate(response.body);
    expect(error).toBeUndefined();

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
    expect(response.body).toHaveProperty('id', process.env.BOARD_ID);
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

  test('GET /trello/boards/:boardId should get the board', async () => {
    const response = await request(app)
      .get(`/trello/boards/${process.env.BOARD_ID}`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name');
  });

  test('GET /trello/boards/:boardId/actions should get actions of a board', async () => {
    const response = await request(app)
      .get(`/trello/boards/${process.env.BOARD_ID}/actions`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);
  
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /trello/boards should return 401 if authentication fails', async () => {
    const response = await request(app)
      .post('/trello/boards')
      .send({ name: 'TestCodeBoard', desc: 'sample board' })
      .set('Authorization', 'Bearer invalidToken');
      
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Invalid or missing authentication token');
  });

  test('DELETE /trello/boards/:boardId should return 401 if authentication fails', async () => {
    const deleteResponse = await request(app)
      .delete(`/trello/boards/${createdBoardId}`)
      .set('Authorization', 'Bearer invalidToken');

    expect(deleteResponse.status).toBe(401);
    expect(deleteResponse.body).toHaveProperty('error');
    expect(deleteResponse.body.error).toBe('Invalid or missing authentication token');
  });
});