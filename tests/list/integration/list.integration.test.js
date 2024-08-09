require('../../../src/api/core/config/loadEnv');
const request = require('supertest');
const { createListSchema, getListSchema } = require('../../../src/api/schemas/listschema');
const app = require('../../../src/app');
const Joi = require('joi');

const apiToken = process.env.TOKEN;
const boardId = process.env.BOARD_ID2;


/**
 * @group integration
 */

describe('List Integration Tests', () => {
    let testListId;
  
    beforeAll(async () => {
      const createListResponse = await request(app)
        .post('/trello/lists')
        .send({ name: 'Integration Test List', idBoard: boardId })
        .set('Authorization', `Bearer ${apiToken}`);
        
      expect(createListResponse.status).toBe(200);
  
      const { error } = createListSchema.validate(createListResponse.body);
      expect(error).toBeUndefined();
  
      testListId = createListResponse.body.id;
    });
  
    afterAll(async () => {
      if (testListId) {
        await request(app)
          .delete(`/trello/lists/${testListId}/lists`)
          .set('Authorization', `Bearer ${apiToken}`);
      }
    });
  
    test('Retrieve the created list', async () => {
      const response = await request(app)
        .get(`/trello/lists/${testListId}?key=${process.env.KEY}&token=${apiToken}`)
        .set('Authorization', `Bearer ${apiToken}`);
  
      expect(response.status).toBe(200);
  
      const { error } = getListSchema.validate(response.body);
      expect(error).toBeUndefined();
  
      expect(response.body).toHaveProperty('id', testListId);
      expect(response.body).toHaveProperty('name', 'Integration Test List');
      expect(response.body).toHaveProperty('idBoard', boardId);
    });
  
    test('Retrieve the list and validate board ID', async () => {
      const response = await request(app)
        .get(`/trello/lists/${testListId}/board?key=${process.env.KEY}&token=${apiToken}`)
        .set('Authorization', `Bearer ${apiToken}`);
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', boardId);
      expect(response.body).toHaveProperty('name');
    });
  
    test('Get cards in the list', async () => {
      const response = await request(app)
        .get(`/trello/lists/${testListId}/cards?key=${process.env.KEY}&token=${apiToken}`)
        .set('Authorization', `Bearer ${apiToken}`);
  
      expect(response.status).toBe(200);
  
      const cardSchema = Joi.array().items(
        Joi.object({
          id: Joi.string().required(),
          name: Joi.string().required()
        }).unknown(true)
      );
  
      const { error } = cardSchema.validate(response.body);
      expect(error).toBeUndefined();
    });
  
    test('Update the list name', async () => {
      const newName = 'Updated Integration Test List';
      const response = await request(app)
        .put(`/trello/lists/${testListId}`)
        .send({ name: newName })
        .set('Authorization', `Bearer ${apiToken}`);
  
      expect(response.status).toBe(200);
  
      const { error } = getListSchema.validate(response.body);
      expect(error).toBeUndefined();
      
      expect(response.body).toHaveProperty('name', newName);
    });
  
    test('Check if the list exists after archiving it', async () => {
      await request(app)
        .delete(`/trello/lists/${testListId}/lists`)
        .set('Authorization', `Bearer ${apiToken}`);
  
      const response = await request(app)
        .get(`/trello/lists/${testListId}?key=${process.env.KEY}&token=${apiToken}`)
        .set('Authorization', `Bearer ${apiToken}`);
  
      expect(response.status).toBe(200); 
    });
  });