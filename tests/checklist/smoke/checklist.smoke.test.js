require('../../../src/api/core/config/loadEnv');
const request = require('supertest');
const app = require('../../../src/app');

describe('Checklist Smoke Tests', () => {
    const checklistId = process.env.CHECKLIST_ID;
  
    test('GET /trello/checklists/:checklistId should retrieve a checklist', async () => {
      const response = await request(app).get(`/trello/checklists/${checklistId}`);
      expect(response.status).toBe(200);
    });
  
    test('GET /trello/checklists/:checklistId/checkItems should retrieve checkItems on the checklist', async () => {
      const response = await request(app).get(`/trello/checklists/${checklistId}/checkItems`);
      expect(response.status).toBe(200);
    });
  });