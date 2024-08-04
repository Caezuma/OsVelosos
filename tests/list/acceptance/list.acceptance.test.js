require('../../../src/api/core/config/loadEnv');
const request = require('supertest');
const { createListSchema, getListSchema } = require('../../../src/api/schemas/listschema');
const app = require('../../../src/app');
const Joi = require('joi');
const apiToken = process.env.TOKEN;
const boardId = process.env.BOARD_ID2;

describe('List Acceptance Tests', () => {
  let createdListId;

  afterAll(async () => {
    if (createdListId) {
      await request(app)
        .delete(`/trello/lists/${createdListId}/list`)
        .set('Authorization', `Bearer ${apiToken}`);
    }
  });

  test('Create a list and verify ID', async () => {
    const response = await request(app)
      .post('/trello/lists')
      .send({ name: 'Acceptance Test List', idBoard: boardId })
      .set('Authorization', `Bearer ${apiToken}`);

    expect(response.status).toBe(200);

    const { error } = createListSchema.validate(response.body);
    expect(error).toBeUndefined();

    createdListId = response.body.id;
    expect(typeof createdListId).toBe('string');
  });

  test('Verify list is on the correct board', async () => {
    const response = await request(app)
      .get(`/trello/lists/${createdListId}/board`)
      .set('Authorization', `Bearer ${apiToken}`);

    expect(response.status).toBe(200);

    const boardResponseSchema = Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required()
    }).unknown(true);

    const { error } = boardResponseSchema.validate(response.body);
    expect(error).toBeUndefined();
    expect(response.body.id).toBe(boardId);
  });

  test('Ensure list can be updated and retrieved', async () => {
    const newName = 'Updated Acceptance Test List';

    const updateResponse = await request(app)
      .put(`/trello/lists/${createdListId}`)
      .send({ name: newName })
      .set('Authorization', `Bearer ${apiToken}`);

    expect(updateResponse.status).toBe(200);

    const { error } = getListSchema.validate(updateResponse.body);
    expect(error).toBeUndefined();
    expect(updateResponse.body.name).toBe(newName);

    const getResponse = await request(app)
      .get(`/trello/lists/${createdListId}`)
      .set('Authorization', `Bearer ${apiToken}`);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe(newName);
  });
});