require('dotenv').config();
const request = require('supertest');
const app = require('../src/app');
const Joi = require('joi');

describe('Checklist Tests', () => {
  test('GET /trello/checklists/:checklistId should retrieve a checklist and return status 200', async () => {
    const checklistId = '669b2f7f5238594eca3abec9';
    const response = await request(app).get(`/trello/checklists/${checklistId}`);

    expect(response.status).toBe(200);

    const schema = Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      idBoard: Joi.string().required(),
      idCard: Joi.string().required(),
      checkItems: Joi.array().items(Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
        state: Joi.string().valid('complete', 'incomplete').required(),
        idChecklist: Joi.string().required()
      }).unknown(true)).required()
    }).unknown(true);

    const { error } = schema.validate(response.body);
    expect(error).toBeUndefined();
  });

  test('GET /trello/checklists/:checklistId should have correct checkItems count', async () => {
    const checklistId = '669b2f7f5238594eca3abec9';
    const response = await request(app).get(`/trello/checklists/${checklistId}`);

    expect(response.status).toBe(200);
    expect(response.body.checkItems).toHaveLength(3);
  });
});
