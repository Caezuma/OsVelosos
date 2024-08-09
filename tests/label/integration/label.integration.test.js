require('../../../src/api/core/config/loadEnv');
const request = require('supertest');
const app = require('../../../src/app');
const { labelSchema } = require('../../../src/api/schemas/labelschema');

/**
 * @group integration
 */

describe('Label Integration Tests', () => {
  let testLabelId;

  beforeAll(async () => {
    const response = await request(app)
      .post('/trello/labels')
      .send({
        name: 'Integration Test Label',
        color: 'green',
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

  test('GET /trello/labels/:labelId should retrieve a label and return status 200', async () => {
    const labelId = process.env.LABEL_ID;
    const response = await request(app)
      .get(`/trello/labels/${labelId}`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(200);
  });

  test('POST /trello/labels should create a label and return status 201 and valid schema', async () => {
    const response = await request(app)
      .post('/trello/labels')
      .send({
        name: 'New Integration Label',
        color: 'blue',
        idBoard: process.env.BOARD_ID2
      })
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(201);
    const { error } = labelSchema.validate(response.body);
    expect(error).toBeUndefined();

    await request(app)
      .delete(`/trello/labels/${response.body.id}`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);
  });

  test('PUT /trello/labels/:labelId should update a label and return status 200', async () => {
    const response = await request(app)
      .put(`/trello/labels/${testLabelId}`)
      .send({
        name: 'Updated Integration Label',
        color: 'red'
      })
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(200);
  });

  test('DELETE /trello/labels/:labelId should delete a label and return status 200', async () => {
    const createResponse = await request(app)
      .post('/trello/labels')
      .send({
        name: 'Label to be deleted',
        color: 'yellow',
        idBoard: process.env.BOARD_ID2
      })
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    const deleteResponse = await request(app)
      .delete(`/trello/labels/${createResponse.body.id}`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(deleteResponse.status).toBe(200);
  });
});