
require('../../../src/api/core/config/loadEnv');
const request = require('supertest');
const { createListSchema, getListSchema } = require('../../../src/api/schemas/listschema');
const app = require('../../../src/app');

const apiToken = process.env.TOKEN;
const boardId = process.env.BOARD_ID2;

/**
 * @group e2e
 */

describe('List E2E Tests', () => {
  let createdListId;

  afterAll(async () => {
    if (createdListId) {
      await request(app)
        .delete(`/trello/lists/${createdListId}/lists`)
        .set('Authorization', `Bearer ${apiToken}`);
    }
  });

  test('Create a list, verify it exists, and retrieve it', async () => {
    const createResponse = await request(app)
      .post('/trello/lists')
      .send({ name: 'E2E Test List', idBoard: boardId })
      .set('Authorization', `Bearer ${apiToken}`);

    expect(createResponse.status).toBe(200);

    const { error } = createListSchema.validate(createResponse.body);
    expect(error).toBeUndefined();

    createdListId = createResponse.body.id;
    expect(typeof createdListId).toBe('string');

    const getResponse = await request(app)
      .get(`/trello/lists/${createdListId}`)
      .set('Authorization', `Bearer ${apiToken}`);

    expect(getResponse.status).toBe(200);
    const { error: getError } = getListSchema.validate(getResponse.body);
    expect(getError).toBeUndefined();
    expect(getResponse.body.name).toBe('E2E Test List');
  });

  test('Update a list and verify the updated name', async () => {
    if (!createdListId) {
      console.error('Skipping update test: no listId available');
      return;
    }

    const newName = 'Updated E2E Test List';
    const updateResponse = await request(app)
      .put(`/trello/lists/${createdListId}`)
      .send({ name: newName })
      .set('Authorization', `Bearer ${apiToken}`);

    expect(updateResponse.status).toBe(200);
    const { error: updateError } = getListSchema.validate(updateResponse.body);
    expect(updateError).toBeUndefined();
    expect(updateResponse.body.name).toBe(newName);

    const getResponse = await request(app)
      .get(`/trello/lists/${createdListId}`)
      .set('Authorization', `Bearer ${apiToken}`);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe(newName);
  });
});
