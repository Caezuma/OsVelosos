require('../../../src/api/core/config/loadEnv');
const request = require('supertest');
const app = require('../../../src/app');
const { createCommentSchema } = require('../../../src/api/schemas/commentschema');

describe('Comment Smoke Tests', () => {
  const cardId = process.env.CARD_ID;
  let commentId;

  beforeAll(async () => {
    const response = await request(app)
      .post(`/trello/cards/${cardId}/comments`)
      .send({ text: 'Smoke Test Comment' })
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(201);
    const { error } = createCommentSchema.validate(response.body);
    expect(error).toBeUndefined();
    commentId = response.body.commentId;
  });

  test('Create a new comment to a Card', async () => {
    const response = await request(app)
      .post(`/trello/cards/${cardId}/comments`)
      .send({ text: 'Smoke Test Comment' })
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(201);
    const { error } = createCommentSchema.validate(response.body);
    expect(error).toBeUndefined();
  }, 10000);

  test('Delete a comment on a Card', async () => {
    const response = await request(app)
      .delete(`/trello/cards/${cardId}/comments/${commentId}`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(200);
  }, 10000);

  afterAll(async () => {
    try {
      await request(app)
        .delete(`/trello/cards/${cardId}/comments/${commentId}/comments`)
        .set('Authorization', `Bearer ${process.env.TOKEN}`);
    } catch (error) {
    }
  });
});