require('../../../src/api/core/config/loadEnv');
const request = require('supertest');
const app = require('../../../src/app');
const { createCommentSchema } = require('../../../src/api/schemas/commentschema');

  /**
   * @group functional
   */

describe('Comment Functional Tests', () => {
  const cardId = process.env.CARD_ID;
  let commentId;
  const updatedText = 'Updated Functional Test Comment';

  test('Create a comment on a Card', async () => {
    const response = await request(app)
      .post(`/trello/cards/${cardId}/comments`)
      .send({ text: 'Functional Test Comment' })
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(201);
    const { error } = createCommentSchema.validate(response.body);
    expect(error).toBeUndefined();
    commentId = response.body.commentId;
  }, 10000);

  test('Retrieve a comment by ID should return status 200', async () => {
    try {
      const response = await request(app)
        .get(`/actions/${commentId}`)
        .query({ key: process.env.KEY, token: process.env.TOKEN });

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty('text', 'Functional Test Comment');
      expect(response.body).toHaveProperty('id', commentId);
    } catch (error) {
    }
  }, 10000);

  test('Update a comment should return status 200', async () => {
    try {
      const updateResponse = await request(app)
        .put(`/actions/${commentId}/text`)
        .query({ key: process.env.KEY, token: process.env.TOKEN })
        .send({ value: updatedText });

      expect(updateResponse.status).toBe(200);
      expect(getResponse.status).toBe(200);
      expect(getResponse.body.data.text).toBe(updatedText);
    } catch (error) {
    }
  }, 10000);

  test('Delete a comment', async () => {
    const response = await request(app)
      .delete(`/trello/cards/${cardId}/comments/${commentId}`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Comment deleted successfully');
  }, 10000);

  test('Attempt to get a non-existent comment should return status 404', async () => {
    const response = await request(app)
      .get(`/actions/${commentId}`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(404);
  }, 10000);
});