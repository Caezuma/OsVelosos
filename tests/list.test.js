require('../src/api/core/config/loadEnv');
const request = require('supertest');
const app = require('../src/app');
const Joi = require('joi');

describe('List Tests', () => {
  const apiToken = process.env.TOKEN;
  const apiKey = process.env.KEY;
  let testListId;

  beforeAll(async () => {
    const createListResponse = await request(app)
      .post('/trello/lists')
      .send({
        name: 'Test List',
        idBoard: '668fc3d8649e248a2c596f92'
      })
      .set('Authorization', `Bearer ${apiToken}`);
      
    testListId = createListResponse.body.id;
  });

  afterAll(async () => {
    await request(app)
      .delete(`/trello/lists/${testListId}`)
      .set('Authorization', `Bearer ${apiToken}`);
  });

  test('Create a new List', async () => {
    const response = await request(app)
      .post(`/trello/lists`)
      .send({ name: 'OsVelosos', idBoard: '668fc3d8649e248a2c596f92' })
      .set('Authorization', `Bearer ${apiToken}`);

    expect(response.status).toBe(200);

    const schema = Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      idBoard: Joi.string().required()
    }).unknown(true);

    const { error } = schema.validate(response.body);
    expect(error).toBeUndefined();
  });

  test('Get a List', async () => {
    const response = await request(app)
      .get(`/trello/lists/${testListId}`)
      .set('Authorization', `Bearer ${apiToken}`);

    expect(response.status).toBe(200);

    const schema = Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      idBoard: Joi.string().required()
    }).unknown(true);

    const { error } = schema.validate(response.body);
    expect(error).toBeUndefined();
  });

  test('Get Cards in a List', async () => {
    const listId = '668846741b7e0386e8646731';
    const response = await request(app)
      .get(`/trello/lists/${listId}/cards`)
      .set('Authorization', `Bearer ${apiToken}`);

    expect(response.status).toBe(200);

    const schema = Joi.array().items(
      Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required()
      }).unknown(true)
    );

    const { error } = schema.validate(response.body);
    expect(error).toBeUndefined();
  });

  test('Get the Board a List is on', async () => {
    const listId = '668fc3d8649e248a2c596f9b';
    const response = await request(app)
      .get(`/trello/lists/${listId}/board`)
      .set('Authorization', `Bearer ${apiToken}`);

    expect(response.status).toBe(200);

    const schema = Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required()
    }).unknown(true);

    const { error } = schema.validate(response.body);
    expect(error).toBeUndefined();
  });

  test('PUT /trello/lists/:listId should return status 200 with valid authentication', async () => {
    const response = await request(app)
      .put(`/trello/lists/${testListId}`)
      .send({ name: 'Updated List Name' })
      .set('Authorization', `Bearer ${apiToken}`); 

    expect(response.status).toBe(200);
  });

  test('PUT /trello/lists/:listId should update a list and validate the response body', async () => {
    const response = await request(app)
      .put(`/trello/lists/${testListId}`)
      .send({ name: 'Updated List Name' })
      .set('Authorization', `Bearer ${apiToken}`);

    expect(response.status).toBe(200);

    expect(response.body).toMatchObject({ name: 'Updated List Name' });

    const schema = Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required()
    }).unknown(true);

    const { error } = schema.validate(response.body);
    expect(error).toBeUndefined();
  });
});