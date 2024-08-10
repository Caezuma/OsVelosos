require('../../../src/api/core/config/loadEnv');
const request = require('supertest');
const app = require('../../../src/app');
const { createCommentSchema, deleteCommentSchema, getCommentSchema } = require('../../../src/api/schemas/commentschema');


  /**
   * @group acceptance
   */

describe('Comment Acceptance Tests', () => {
  const cardId = process.env.CARD_ID;
  const initialText = 'Acceptance Test Comment';
  let commentId;

  beforeAll(async () => {
    const createResponse = await request(app)
      .post(`/trello/cards/${cardId}/comments`)
      .send({ text: initialText })
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(createResponse.status).toBe(201);
    const { error } = createCommentSchema.validate(createResponse.body);
    expect(error).toBeUndefined();
    commentId = createResponse.body.commentId;
  });

  test('Create a new comment should return status 201 and commentId', async () => {
    const response = await request(app)
      .post(`/trello/cards/${cardId}/comments`)
      .send({ text: 'Another Acceptance Test Comment' })
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('commentId');
  });

  test('Delete a comment should return status 200', async () => {
    const response = await request(app)
      .delete(`/trello/cards/${cardId}/comments/${commentId}`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(200);
    const { error } = deleteCommentSchema.validate(response.body);
    expect(error).toBeUndefined();
  }, 10000);
});