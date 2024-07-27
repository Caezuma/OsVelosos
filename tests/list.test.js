require('../src/api/core/config/loadEnv');
const request = require('supertest');
const app = require('../src/app');
const Joi = require('joi');

describe('List Tests', () => {
  const apiToken = process.env.TOKEN;

  test('PUT /trello/lists/:listId should return status 200 with valid authentication', async () => {
    const listId = '668fc3d8649e248a2c596f9a';
    const response = await request(app)
      .put(`/trello/lists/${listId}`)
      .send({ name: 'Updated List Name' })
      .set('Authorization', `Bearer ${apiToken}`); 

    expect(response.status).toBe(200);
  });


  test('PUT /trello/lists/:listId should update a list and validate the response body', async () => {
    const listId = '668fc3d8649e248a2c596f9a';
    const response = await request(app)
      .put(`/trello/lists/${listId}`)
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