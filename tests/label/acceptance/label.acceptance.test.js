require('../../../src/api/core/config/loadEnv');
const request = require('supertest');
const app = require('../../../src/app');
const { labelSchema } = require('../../../src/api/schemas/labelschema');

describe('Label Acceptance Tests', () => {
  let testLabelId;

  beforeAll(async () => {
    const response = await request(app)
      .post('/trello/labels')
      .send({
        name: 'Acceptance Test Label',
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

  test('GET /trello/labels/:labelId should retrieve a label and verify business requirements', async () => {
    const labelId = process.env.LABEL_ID;
    const response = await request(app)
      .get(`/trello/labels/${labelId}`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('color');
  });

  test('POST /trello/labels should create a label and verify creation requirements', async () => {
    const response = await request(app)
      .post('/trello/labels')
      .send({
        name: 'Acceptance Creation Label',
        color: 'purple',
        idBoard: process.env.BOARD_ID2
      })
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Acceptance Creation Label');
    expect(response.body.color).toBe('purple');

    await request(app)
      .delete(`/trello/labels/${response.body.id}`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);
  });

  test('PUT /trello/labels/:labelId should update a label and verify update requirements', async () => {
    const response = await request(app)
      .put(`/trello/labels/${testLabelId}`)
      .send({
        name: 'Acceptance Test Label',
        color: 'red'
      })
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Acceptance Test Label');
    expect(response.body.color).toBe('red');
  });

  test('DELETE /trello/labels/:labelId should delete a label and verify deletion', async () => {
    const createResponse = await request(app)
      .post('/trello/labels')
      .send({
        name: 'Label to be deleted',
        color: 'orange',
        idBoard: process.env.BOARD_ID2
      })
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    const deleteLabelId = createResponse.body.id;
    const deleteResponse = await request(app)
      .delete(`/trello/labels/${deleteLabelId}`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(deleteResponse.status).toBe(200);

    const getResponse = await request(app)
      .get(`/trello/labels/${deleteLabelId}/labels`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(getResponse.status).toBe(404);
  });
});