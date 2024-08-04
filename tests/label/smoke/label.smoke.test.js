require('../../../src/api/core/config/loadEnv');
const request = require('supertest');
const app = require('../../../src/app');
const { labelSchema } = require('../../../src/api/schemas/labelschema');

describe('Label Smoke Tests', () => {
  test('GET /trello/labels/:labelId should retrieve a label and return status 200', async () => {
    const labelId = process.env.LABEL_ID;
    const response = await request(app)
      .get(`/trello/labels/${labelId}`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(200);
  });

  test('POST /trello/labels should create a label and return status 201', async () => {
    const response = await request(app)
      .post('/trello/labels')
      .send({
        name: 'Smoke Test Label',
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
      .put(`/trello/labels/${process.env.LABEL_ID}`)
      .send({
        name: 'Updated Smoke Label',
        color: 'purple'
      })
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(200);
  });

  test('DELETE /trello/labels/:labelId should delete a label and return status 200', async () => {
    const createResponse = await request(app)
      .post('/trello/labels')
      .send({
        name: 'Label to be deleted',
        color: 'orange',
        idBoard: process.env.BOARD_ID2
      })
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    const deleteResponse = await request(app)
      .delete(`/trello/labels/${createResponse.body.id}`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(deleteResponse.status).toBe(200);
  });
});