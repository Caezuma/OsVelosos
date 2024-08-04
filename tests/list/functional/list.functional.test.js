require('../../../src/api/core/config/loadEnv');
const request = require('supertest');
const { createListSchema, getListSchema } = require('../../../src/api/schemas/listschema');
const app = require('../../../src/app');

const apiToken = process.env.TOKEN;
const boardId = process.env.BOARD_ID2;

describe('List Functional Tests', () => {
  let createdListId;

  beforeAll(async () => {
    const createResponse = await request(app)
      .post('/trello/lists')
      .send({ name: 'Functional Test List', idBoard: boardId })
      .set('Authorization', `Bearer ${apiToken}`);

    expect(createResponse.status).toBe(200);

    const { error } = createListSchema.validate(createResponse.body);
    expect(error).toBeUndefined();

    createdListId = createResponse.body.id;
  });

  afterAll(async () => {
    await request(app)
      .delete(`/trello/lists/${createdListId}/list`)
      .set('Authorization', `Bearer ${apiToken}`);
  });

  test('Create and validate a new list', async () => {
    const response = await request(app)
      .post('/trello/lists')
      .send({ name: 'Functional List', idBoard: boardId })
      .set('Authorization', `Bearer ${apiToken}`);

    expect(response.status).toBe(200);

    const { error } = createListSchema.validate(response.body);
    expect(error).toBeUndefined();
  });

  test('Get and validate the created list', async () => {
    const response = await request(app)
      .get(`/trello/lists/${createdListId}`)
      .set('Authorization', `Bearer ${apiToken}`);

    expect(response.status).toBe(200);

    const { error } = getListSchema.validate(response.body);
    expect(error).toBeUndefined();
    expect(response.body).toHaveProperty('name', 'Functional Test List');
  });

  test('Update a list name and validate', async () => {
    const newName = 'Updated Functional Test List';

    const updateResponse = await request(app)
      .put(`/trello/lists/${createdListId}`)
      .send({ name: newName })
      .set('Authorization', `Bearer ${apiToken}`);

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body).toHaveProperty('name', newName);

    const getResponse = await request(app)
      .get(`/trello/lists/${createdListId}`)
      .set('Authorization', `Bearer ${apiToken}`);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toHaveProperty('name', newName);
  });

  test('Get all cards in a list and validate response', async () => {
    const response = await request(app)
      .get(`/trello/lists/${createdListId}/cards`)
      .set('Authorization', `Bearer ${apiToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});