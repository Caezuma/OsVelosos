require('../../../src/api/core/config/loadEnv');
const request = require('supertest');
const app = require('../../../src/app');

/**
 * @group e2e
 */

describe('Label E2E Tests', () => {
  let testLabelId;

  beforeAll(async () => {
    const response = await request(app)
      .post('/trello/labels')
      .send({
        name: 'E2E Test Label',
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

  test('GET /trello/labels should include newly created label', async () => {
    const response = await request(app)
      .get(`/trello/labels/${testLabelId}`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({
      id: testLabelId,
      name: 'E2E Test Label',
      color: 'blue'
    }));
  });

  test('PATCH /trello/labels/:labelId should update a label and reflect changes in GET', async () => {
    const updatedName = 'E2E Updated Label';
    await request(app)
      .patch(`/trello/labels/${testLabelId}/name`)
      .send({ value: updatedName })
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    const response = await request(app)
      .get(`/trello/labels/${testLabelId}`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedName);
  });
});