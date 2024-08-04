require('../../../src/api/core/config/loadEnv');
const request = require('supertest');
const app = require('../../../src/app');
const apiToken = process.env.TOKEN;
const boardId = process.env.BOARD_ID2;
const testListId = process.env.LIST_ID;

describe('List Performance Tests', () => {
  test('Create a large number of lists and measure response time', async () => {
    const numberOfLists = 10;
    const createListPromises = [];

    for (let i = 0; i < numberOfLists; i++) {
      createListPromises.push(
        request(app)
          .post('/trello/lists')
          .send({ name: `Performance Test List ${i}`, idBoard: boardId })
          .set('Authorization', `Bearer ${apiToken}`)
      );
    }

    const responses = await Promise.all(createListPromises);

    responses.forEach((response, index) => {
      if (response.status !== 200) {
        console.error(`Failed to create list at index ${index}:`, response.body);
      } else {
      }
      expect(response.status).toBe(200);
    });
  });

  test('Retrieve a list and measure response time', async () => {
    const listId = process.env.LIST_ID2;

    const response = await request(app)
      .get(`/trello/lists/${listId}?key=${process.env.KEY}&token=${apiToken}`)
      .set('Authorization', `Bearer ${apiToken}`);

    if (response.status !== 200) {
      console.error('Failed to retrieve list:', response.body);
    } else {
    }

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', listId);
  });

  test('Measure response time for updating a list', async () => {

    const response = await request(app)
      .put(`/trello/lists/${testListId}?key=${process.env.KEY}&token=${apiToken}`)
      .send({ name: 'Updated Performance Test List' })
      .set('Authorization', `Bearer ${apiToken}`);
    
    if (response.status !== 200) {
      console.error('Failed to update list:', response.body, `Status: ${response.status}`);
    } else {
    }

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', 'Updated Performance Test List');
  });
});