require('../src/api/core/config/loadEnv');
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

    test('GET /trello/checklists/:checklistId2/name should retrieve the checklist name', async () => {
      const checklistId2 = '66a564f91b2a857d1d0a5960';
      const response = await request(app).get(`/trello/checklists/${checklistId2}/name`);
  
      expect(response.status).toBe(200);
  
      const schema = Joi.object({
        name: Joi.string().required()
      }).unknown(true);
  
      const { error } = schema.validate(response.body);
      expect(error).toBeUndefined();
      expect(response.body.name).toBe('ChecklistTestUpdated');
    });

  test('GET /trello/checklists/:checklistId2/board should retrieve the board the checklist is on', async () => {
    const checklistId2 = '66a564f91b2a857d1d0a5960';
    const response = await request(app).get(`/trello/checklists/${checklistId2}/board`);

    expect(response.status).toBe(200);

    const schema = Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      closed: Joi.boolean().required(),
      idOrganization: Joi.string().allow(null)
    }).unknown(true);

    const { error } = schema.validate(response.body);
    expect(error).toBeUndefined();
  });

  test('GET /trello/checklists/:checklistId2/cards should retrieve the card the checklist is on', async () => {
    const checklistId2 = '66a564f91b2a857d1d0a5960';
    const response = await request(app).get(`/trello/checklists/${checklistId2}/cards`);

    expect(response.status).toBe(200);

    const schema = Joi.array().items(Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      closed: Joi.boolean().required(),
      idBoard: Joi.string().required(),
      idList: Joi.string().required()
    }).unknown(true)).required();

    const { error } = schema.validate(response.body);
    expect(error).toBeUndefined();
  });

  test('GET /trello/checklists/:checklistId2/checkItems should retrieve checkItems on the checklist', async () => {
    const checklistId2 = '66a564f91b2a857d1d0a5960';
    const response = await request(app).get(`/trello/checklists/${checklistId2}/checkItems`);

    expect(response.status).toBe(200);

    const schema = Joi.array().items(Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      state: Joi.string().valid('complete', 'incomplete').required(),
      idChecklist: Joi.string().required()
    }).unknown(true)).required();

    const { error } = schema.validate(response.body);
    expect(error).toBeUndefined();
  });
});