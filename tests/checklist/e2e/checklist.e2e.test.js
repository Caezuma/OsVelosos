require('../../../src/api/core/config/loadEnv');
const request = require('supertest');
const app = require('../../../src/app');
const { checklistSchema } = require('../../../src/api/schemas/checklistschema');

/**
 * @group e2e
 */

describe('Checklist E2E Tests', () => {
  let checklistId = null;
  const cardId = process.env.CARD_ID2;
  const newChecklistName = 'ChecklistE2ETest';
  const updatedChecklistName = 'ChecklistE2ETestUpdated';

  test('E2E: Create and Verify a New Checklist', async () => {
    const createResponse = await request(app)
      .post(`/trello/checklists`)
      .send({ name: newChecklistName, idCard: cardId })
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(createResponse.status).toBe(201);

    const { error: createError } = checklistSchema.validate(createResponse.body);
    expect(createError).toBeUndefined();
    checklistId = createResponse.body.id;
    expect(createResponse.body.name).toBe(newChecklistName);

    const getResponse = await request(app)
      .get(`/trello/checklists/${checklistId}`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(getResponse.status).toBe(200);
    const { error: getError } = checklistSchema.validate(getResponse.body);
    expect(getError).toBeUndefined();
    expect(getResponse.body.name).toBe(newChecklistName);
  });

  test('E2E: Update and Verify a Checklist', async () => {
    expect(checklistId).not.toBeNull();

    const updateResponse = await request(app)
      .put(`/trello/checklists/${checklistId}`)
      .send({ name: updatedChecklistName })
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(updateResponse.status).toBe(200);

    const getUpdatedResponse = await request(app)
      .get(`/trello/checklists/${checklistId}`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(getUpdatedResponse.status).toBe(200);
    const { error: updatedError } = checklistSchema.validate(getUpdatedResponse.body);
    expect(updatedError).toBeUndefined();
    expect(getUpdatedResponse.body.name).toBe(updatedChecklistName);
  });
});