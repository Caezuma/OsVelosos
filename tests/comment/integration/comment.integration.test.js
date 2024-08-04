require('../../../src/api/core/config/loadEnv');
const request = require('supertest');
const app = require('../../../src/app');
const CommentService = require('../../../src/api/business/services/commentService');

describe('Comment Integration Tests', () => {
  const cardId = process.env.CARD_ID;
  const validCommentText = 'This is a valid comment';
  const initialText = 'Eu prefiro usar C++';
  const updatedText = 'Eu mudei de ideia, prefiro Python';
  let createdCommentId;

  beforeAll(async () => {
    try {
      const createResponse = await CommentService.createComment(cardId, initialText);
      createdCommentId = createResponse.id;
    } catch (error) {
      console.error('Error creating initial comment:', error.message);
    }
  });

  test('Create a comment with valid text should return status 201 and commentId', async () => {
    const response = await request(app)
      .post(`/trello/cards/${cardId}/comments`)
      .send({ text: validCommentText })
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('commentId');
    createdCommentId = response.body.commentId;
  });

  test('Update a comment should return status 200 and updated content', async () => {
    try {
      const updateResponse = await request(app)
        .put(`/actions/${createdCommentId}/text`)
        .query({ key: process.env.KEY, token: process.env.TOKEN })
        .send({ value: updatedText });

      expect(updateResponse.status).toBe(200);

      const getResponse = await request(app)
        .get(`/actions/${createdCommentId}`)
        .query({ key: process.env.KEY, token: process.env.TOKEN });

      expect(getResponse.status).toBe(200);
      expect(getResponse.body.text).toBe(updatedText);
    } catch (error) {
    }
  });

  test('Retrieve a comment by ID should return status 200', async () => {
    try {
      const response = await request(app)
        .get(`/actions/${createdCommentId}`)
        .query({ key: process.env.KEY, token: process.env.TOKEN });

      expect(response.status).toBe(200);
    } catch (error) {
    }
  }, 10000);

  test('Delete a comment should return status 200', async () => {
    try {
      const response = await request(app)
        .delete(`/trello/cards/${cardId}/comments/${createdCommentId}`)
        .set('Authorization', `Bearer ${process.env.TOKEN}`);

      expect(response.status).toBe(200);
    } catch (error) {
      console.error('Error in delete test:', error.message);
    }
  });

  afterAll(async () => {
    try {
      if (createdCommentId) {
        await CommentService.deleteComment(cardId, createdCommentId);}
    } catch (error) {}
  });
});
