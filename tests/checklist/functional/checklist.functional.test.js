require('../../../src/api/core/config/loadEnv');
const request = require('supertest');
const app = require('../../../src/app');
const { checklistNameSchema, boardSchema } = require('../../../src/api/schemas/checklistschema');

/**
 * @group functional
 */

describe('Checklist Functional Tests', () => {
    const checklistId = process.env.CHECKLIST_ID;
    const checklistId2 = process.env.CHECKLIST_ID2;
  
    test('GET /trello/checklists/:checklistId should have correct checkItems count', async () => {
      const response = await request(app).get(`/trello/checklists/${checklistId}`)
        .set('Authorization', `Bearer ${process.env.TOKEN}`);
      
      expect(response.status).toBe(200);
      expect(response.body.checkItems).toHaveLength(3);
    });
  
    test('GET /trello/checklists/:checklistId2/name should retrieve the checklist name', async () => {
      const response = await request(app).get(`/trello/checklists/${checklistId2}/name`)
        .set('Authorization', `Bearer ${process.env.TOKEN}`);
      
      expect(response.status).toBe(200);
      const { error } = checklistNameSchema.validate(response.body);
      expect(error).toBeUndefined();
      expect(response.body.name).toBe('ChecklistTestUpdated');
    });
  
    test('GET /trello/checklists/:checklistId2/board should retrieve the board the checklist is on', async () => {
      const response = await request(app).get(`/trello/checklists/${checklistId2}/board`)
        .set('Authorization', `Bearer ${process.env.TOKEN}`);
      
      expect(response.status).toBe(200);
      const { error } = boardSchema.validate(response.body);
      expect(error).toBeUndefined();
    });
});