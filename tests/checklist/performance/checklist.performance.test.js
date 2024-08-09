require('../../../src/api/core/config/loadEnv');
const request = require('supertest');
const app = require('../../../src/app');

/**
 * @group performance
 */

describe('Checklist Performance Tests', () => {
    test('Performance: Retrieve a amount number of checkItems', async () => {
      const checklistId = process.env.CHECKLIST_ID;
      const numItems = 5;
  
      for (let i = 0; i < numItems; i++) {
        await request(app).get(`/trello/checklists/${checklistId}/checkItems`);
      }
  
    });
  });