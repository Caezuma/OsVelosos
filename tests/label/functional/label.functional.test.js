require('../../../src/api/core/config/loadEnv');
const request = require('supertest');
const app = require('../../../src/app');
const { labelSchema } = require('../../../src/api/schemas/labelschema');

/**
 * @group functional
 */

describe('Label Functional Tests', () => {
  let testLabelId;

  beforeAll(async () => {
    const response = await request(app)
      .post('/trello/labels')
      .send({
        name: 'Functional Test Label',
        color: 'blue',
        idBoard: process.env.BOARD_ID2
      })
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    testLabelId = response.body.id;
  });

  afterAll(async () => {
    if (testLabelId) {
      await request(app)
        .delete(`/trello/labels/${testLabelId}`)
        .set('Authorization', `Bearer ${process.env.TOKEN}`);
    }
  });

  test('GET /trello/labels/:labelId should retrieve a label and validate schema', async () => {
    const labelId = process.env.LABEL_ID;
    const response = await request(app)
      .get(`/trello/labels/${labelId}`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(200);
    const { error } = labelSchema.validate(response.body);
    expect(error).toBeUndefined();
  });

  test('PATCH /trello/labels/:labelId/:field should update a field on a label and validate schema', async () => {
    const response = await request(app)
      .patch(`/trello/labels/${process.env.LABEL_ID2}/name`)
      .send({ value: 'Updated Functional Label' })
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(200);
    const { error } = labelSchema.validate(response.body);
    expect(error).toBeUndefined();
  });

  test('PATCH /trello/labels/:labelId/:field with invalid field should return status 404', async () => {
    const response = await request(app)
      .patch(`/trello/labels/${process.env.LABEL_ID}/`)
      .send({ value: 'Invalid Field Test' })
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(404);
  });

  test('PUT /trello/labels/:labelId with no name should return status 200', async () => {
    const response = await request(app)
      .put(`/trello/labels/${testLabelId}`)
      .send({
        name: '',
        color: 'blue'
      })
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(200);
  });
});