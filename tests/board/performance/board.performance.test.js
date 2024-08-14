require('../../../src/api/core/config/loadEnv');
const request = require('supertest');
const app = require('../../../src/app');

let createdBoardIds = [];

/**
 * @group performance
 */

describe('Performance Tests', () => {
  beforeEach(async () => {
    jest.setTimeout(20000);
    createdBoardIds = [];

    console.time('Time to create multiple boards');

    const numBoards = 2;

    for (let i = 0; i < numBoards; i++) {
      const response = await request(app)
        .post('/trello/boards')
        .send({ name: `PerformanceBoard${i}`, desc: 'performance test board' })
        .set('Authorization', `Bearer ${process.env.TOKEN}`);
      
      expect(response.status).toBe(200);
      createdBoardIds.push(response.body.id);
    }

    console.timeEnd('Time to create multiple boards');
  });

  afterEach(async () => {
    console.time('Time to delete multiple boards');

    for (const boardId of createdBoardIds) {
      const deleteResponse = await request(app)
        .delete(`/trello/boards/${boardId}`)
        .set('Authorization', `Bearer ${process.env.TOKEN}`);
      
      expect(deleteResponse.status).toBe(200);
    }

    console.timeEnd('Time to delete multiple boards');
  });

  test('Performance: Create multiple boards', () => {
    expect(createdBoardIds.length).toBe(2);
  });

  test('Performance: Delete multiple boards', () => {
    expect(createdBoardIds.length).toBe(2);
  });
});