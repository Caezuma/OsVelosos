require('../../../src/api/core/config/loadEnv');
const request = require('supertest');
const app = require('../../../src/app');

/**
 * @group performance
 */

describe('Performance Tests', () => {
    test('Performance: Create multiple boards', async () => {
      jest.setTimeout(20000);
  
      const numBoards = 4;
      const createdBoardIds = [];
  
      for (let i = 0; i < numBoards; i++) {
        const response = await request(app)
          .post('/trello/boards')
          .send({ name: `PerformanceBoard${i}`, desc: 'performance test board' })
          .set('Authorization', `Bearer ${process.env.TOKEN}`);
        
        expect(response.status).toBe(200);
        createdBoardIds.push(response.body.id);
      }
  
      for (const boardId of createdBoardIds) {
        const deleteResponse = await request(app)
          .delete(`/trello/boards/${boardId}`)
          .set('Authorization', `Bearer ${process.env.TOKEN}`);
        
        expect(deleteResponse.status).toBe(200);
      }
    }, 20000);
  });