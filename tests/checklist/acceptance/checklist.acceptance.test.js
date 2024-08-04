require('../../../src/api/core/config/loadEnv');
const request = require('supertest');
const app = require('../../../src/app');
const { checklistSchema } = require('../../../src/api/schemas/checklistschema');

describe('Checklist Acceptance Tests', () => {
  let checklistId = null;
  const cardId = process.env.CARD_ID2;
  const newChecklistName = 'ChecklistTest';
  const updatedChecklistName = 'ChecklistTestUpdated';

  test('Create a new checklist', async () => {
    const response = await request(app)
      .post(`/trello/checklists`)
      .send({ name: newChecklistName, idCard: cardId })
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(201);

    const { error } = checklistSchema.validate(response.body);
    expect(error).toBeUndefined();

    checklistId = response.body.id;
    expect(response.body.name).toBe(newChecklistName);
  });

  test('Update the checklist name', async () => {
    expect(checklistId).not.toBeNull();

    const response = await request(app)
      .put(`/trello/checklists/${checklistId}`)
      .send({ name: updatedChecklistName })
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(200);

  });

  test('Delete the checklist', async () => {
    expect(checklistId).not.toBeNull();

    const response = await request(app)
      .delete(`/trello/checklists/${checklistId}`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(200);
  });
});
