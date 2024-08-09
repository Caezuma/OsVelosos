require('../../../src/api/core/config/loadEnv');
const request = require('supertest');
const app = require('../../../src/app');
const { checklistSchema, cardSchema } = require('../../../src/api/schemas/checklistschema');

/**
 * @group integration
 */

describe('Checklist Integration Tests', () => {
    const checklistId = process.env.CHECKLIST_ID;
    const checklistId2 = process.env.CHECKLIST_ID2;
  
    test('GET /trello/checklists/:checklistId should retrieve a checklist and validate schema', async () => {
      const response = await request(app).get(`/trello/checklists/${checklistId}`);
      expect(response.status).toBe(200);
      const { error } = checklistSchema.validate(response.body);
      expect(error).toBeUndefined();
    });
  
    test('GET /trello/checklists/:checklistId2/cards should retrieve the card the checklist is on', async () => {
      const response = await request(app).get(`/trello/checklists/${checklistId2}/cards`);
      expect(response.status).toBe(200);
      const { error } = cardSchema.validate(response.body);
      expect(error).toBeUndefined();
    });
  });