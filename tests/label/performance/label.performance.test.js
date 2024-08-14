require('../../../src/api/core/config/loadEnv');
const request = require('supertest');
const app = require('../../../src/app');

/**
 * @group performance
 */

describe('Label Performance Tests', () => {
  test('POST /trello/labels should handle large payloads efficiently', async () => {
    const largePayload = {
      name: 'OsVelososPURPLE',
      color: 'purple',
      idBoard: process.env.BOARD_ID2
    };

    console.time('POST /trello/labels');
    const response = await request(app)
      .post('/trello/labels')
      .send(largePayload)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);
    console.timeEnd('POST /trello/labels');
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');

    await request(app)
      .delete(`/trello/labels/${response.body.id}`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);
  });

  test('GET /trello/labels should handle multiple concurrent requests efficiently', async () => {
    const requests = Array.from({ length: 10 }, () =>
      request(app)
        .get(`/trello/labels/${process.env.LABEL_ID}`)
        .set('Authorization', `Bearer ${process.env.TOKEN}`)
    );

    console.time('GET /trello/labels');
    const responses = await Promise.all(requests);
    console.timeEnd('GET /trello/labels');

    responses.forEach(response => {
      expect(response.status).toBe(200);
    });
  });

  test('PUT /trello/labels/:labelId should complete updates within acceptable time', async () => {
    const updateData = { name: 'Updated Performance Test Label', color: 'blue' };

    console.time('PUT /trello/labels/:labelId');
    const response = await request(app)
      .put(`/trello/labels/${process.env.LABEL_ID2}`)
      .send(updateData)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);
    console.timeEnd('PUT /trello/labels/:labelId');
    
    expect(response.status).toBe(200);
  });

  test('DELETE /trello/labels/:labelId should handle deletions efficiently', async () => {
    const labelToCreate = {
      name: 'Label to be deleted',
      color: 'orange',
      idBoard: process.env.BOARD_ID2
    };

    const createResponse = await request(app)
      .post('/trello/labels')
      .send(labelToCreate)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    console.time('DELETE /trello/labels/:labelId');
    const deleteResponse = await request(app)
      .delete(`/trello/labels/${createResponse.body.id}`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);
    console.timeEnd('DELETE /trello/labels/:labelId');

    expect(deleteResponse.status).toBe(200);
  });
});