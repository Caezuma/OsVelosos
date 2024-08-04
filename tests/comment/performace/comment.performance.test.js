require('../../../src/api/core/config/loadEnv');
const request = require('supertest');
const app = require('../../../src/app');

describe('Comment Performance Tests', () => {
  const cardId = process.env.CARD_ID;
  const longText = 'A'.repeat(100); 
  let createdComments = [];

  beforeAll(async () => {
    const response = await request(app)
      .post(`/trello/cards/${cardId}/comments`)
      .send({ text: 'Initial setup comment' })
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(201);
    createdComments.push(response.body.commentId);
  });

  afterAll(async () => {
    for (const id of createdComments) {
      await request(app)
        .delete(`/trello/cards/${cardId}/comments/${id}/comments`)
        .set('Authorization', `Bearer ${process.env.TOKEN}`);
    }
  });

  test('Attempt to create a comment with only space in text should return status 201', async () => {
    const response = await request(app)
      .post(`/trello/cards/${cardId}/comments`)
      .send({ text: ' ' })
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(201); 
    expect(typeof response.body.error).toBe('undefined');
  }, 10000);

  test('Create a comment with extremely long text should return status 201', async () => {
    const response = await request(app)
      .post(`/trello/cards/${cardId}/comments`)
      .send({ text: longText })
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('commentId');
    createdComments.push(response.body.commentId);
  }, 20000);

  test('Bulk create comments and measure performance', async () => {
    const numberOfComments = 25;
    const commentsToCreate = Array.from({ length: numberOfComments }, (_, index) => ({
      text: `Performance Test Comment ${index + 1}`,
    }));

    const createCommentsPromises = commentsToCreate.map(comment =>
      request(app)
        .post(`/trello/cards/${cardId}/comments`)
        .send(comment)
        .set('Authorization', `Bearer ${process.env.TOKEN}`)
    );

    const responses = await Promise.all(createCommentsPromises);

    responses.forEach(response => {
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('commentId');
      createdComments.push(response.body.commentId);
    });
  }, 60000);

  test('Measure response time for creating a single comment with long text', async () => {
    const start = Date.now();
    const response = await request(app)
      .post(`/trello/cards/${cardId}/comments`)
      .send({ text: longText })
      .set('Authorization', `Bearer ${process.env.TOKEN}`);
    const duration = Date.now() - start;

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('commentId');
    expect(duration).toBeLessThan(5000);
    createdComments.push(response.body.commentId);
  }, 20000);
});