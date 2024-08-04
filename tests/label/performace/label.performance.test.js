require('../../../src/api/core/config/loadEnv');
const request = require('supertest');
const app = require('../../../src/app');

describe('Label Performance Tests', () => {
  test('POST /trello/labels should handle large payloads efficiently', async () => {
    const largePayload = {
      name: 'OsVelososPURPLE',
      color: 'purple',
      idBoard: process.env.BOARD_ID2
    };

    const startTime = Date.now();
    const response = await request(app)
      .post('/trello/labels')
      .send(largePayload)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);
    const endTime = Date.now();

    console.log(`Response Time: ${endTime - startTime}ms`);
    
    expect(response.status).toBe(201);

    expect(endTime - startTime).toBeLessThan(2000);
    
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

    const startTime = Date.now();
    const responses = await Promise.all(requests);
    const endTime = Date.now();

    responses.forEach(response => {
      expect(response.status).toBe(200);
    });

    console.log(`Response Time: ${endTime - startTime}ms`);
    expect(endTime - startTime).toBeLessThan(1000);
  });

  test('PUT /trello/labels/:labelId should complete updates within acceptable time', async () => {
    const updateData = { name: 'Updated Performance Test Label', color: 'blue' };

    const startTime = Date.now();
    const response = await request(app)
      .put(`/trello/labels/${process.env.LABEL_ID2}`)
      .send(updateData)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);
    const endTime = Date.now();

    console.log(`Response Time: ${endTime - startTime}ms`);
    
    expect(response.status).toBe(200);
    expect(endTime - startTime).toBeLessThan(1000);
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

    const startTime = Date.now();
    const deleteResponse = await request(app)
      .delete(`/trello/labels/${createResponse.body.id}`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);
    const endTime = Date.now();

    console.log(`Response Time: ${endTime - startTime}ms`);
    
    expect(deleteResponse.status).toBe(200);
    expect(endTime - startTime).toBeLessThan(1000);
  });
});