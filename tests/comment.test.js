require('../src/api/core/config/loadEnv');
const request = require('supertest');
const app = require('../src/app');
const Joi = require('joi');

describe('Comment API Tests', () => {
  let cardId = '668ff2188875fb773450e4e0';
  let commentId;
  let newCommentId;

  beforeAll(async () => {
    const response = await request(app)
      .post(`/trello/cards/${cardId}/comments`)
      .send({ text: 'This is a test comment' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('commentId'); 
    commentId = response.body.commentId;
    expect(typeof commentId).toBe('string');
  });

  test('Create a new comment to a Card', async () => {
    const response = await request(app)
      .post(`/trello/cards/${cardId}/comments`)
      .send({ text: 'Eu prefiro usar C++' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('commentId');
    newCommentId = response.body.commentId;
    expect(typeof newCommentId).toBe('string');
  }, 10000);

  test('Delete a comment on a Card', async () => {
    const response = await request(app)
      .delete(`/trello/cards/${cardId}/comments/${newCommentId}`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Comment deleted successfully');
  }, 10000);

  test('DELETE /trello/cards/:cardId/comments/:commentId should delete a comment and return status 200', async () => {
    const response = await request(app)
      .delete(`/trello/cards/${cardId}/comments/${commentId}`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message'); 
    expect(response.body.message).toBe('Comment deleted successfully');
    expect(typeof response.body.message).toBe('string');
  }, 10000);

  test('DELETE /trello/cards/:cardId/comments/:commentId with invalid commentId should return status 500', async () => {
    const invalidCommentId = 'invalidCommentId';
    const response = await request(app)
      .delete(`/trello/cards/${cardId}/comments/${invalidCommentId}`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error');
    expect(typeof response.body.error).toBe('string');
  }, 10000);

  test('Attempt to create a comment with empty text should return status 500', async () => {
    const response = await request(app)
      .post(`/trello/cards/${cardId}/comments`)
      .send({ text: '' });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error');
    expect(typeof response.body.error).toBe('string');
  }, 10000);

  test('Update a non-existent comment should return status 500', async () => {
    const nonExistentCommentId = 'nonExistentCommentId';
    const response = await request(app)
      .put(`/trello/cards/${cardId}/comments/${nonExistentCommentId}`)
      .send({ text: 'Trying to update non-existent comment' });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error');
    expect(typeof response.body.error).toBe('string');
  }, 10000);

  afterAll(async () => {
    try {
      await request(app)
        .delete(`/trello/cards/${cardId}/comments/${commentId}`)
        .set('Authorization', `Bearer ${process.env.TOKEN}`);
    } catch (error) {
      console.error('Error deleting comment:', error.message);
    }
  });
});