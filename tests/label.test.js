require('dotenv').config();
const request = require('supertest');
const app = require('../src/app');
const Joi = require('joi');

const labelSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  color: Joi.string().required()
}).unknown(true);

describe('Authentication Tests', () => {
  test('GET /trello/labels/:labelId should require authentication', async () => {
    const labelId = '669023fd97509e27a8869661';
    const response = await request(app).get(`/trello/labels/${labelId}`);

    expect(response.status).toBe(401);
  });
});

describe('Label Tests', () => {
  test('GET /trello/labels/:labelId should retrieve a label and return status 200', async () => {
    const labelId = '669023fd97509e27a8869661';
    const response = await request(app)
      .get(`/trello/labels/${labelId}`)
      .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);

    expect(response.status).toBe(200);
    const { error } = labelSchema.validate(response.body);
    expect(error).toBeUndefined();
  });
});
