require('../src/api/core/config/loadEnv');
const request = require('supertest');
const app = require('../src/app');
const Joi = require('joi');

const labelSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  color: Joi.string().required()
}).unknown(true);

let testLabelId;
let testLabelId2;

beforeAll(async () => {
  const response = await request(app)
    .post('/trello/labels')
    .send({
      name: 'Test Label',
      color: 'green',
      idBoard: '668fc3d8649e248a2c596f92'
    })
    .set('Authorization', `Bearer ${process.env.TOKEN}`);

  testLabelId = response.body.id;
  testLabelId2 = '66a4fed7286948d3febe56ed'; // Assuming this label exists for the test
});

afterAll(async () => {
  await request(app)
    .delete(`/trello/labels/${testLabelId}`)
    .set('Authorization', `Bearer ${process.env.TOKEN}`);
});

describe('Authentication Tests', () => {
  test('GET /trello/labels/:labelId should not require authentication', async () => {
    const labelId = '669023fd97509e27a8869661';
    const response = await request(app).get(`/trello/labels/${labelId}`);

    expect(response.status).not.toBe(401);
  });
});

describe('Label Tests', () => {
  test('GET /trello/labels/:labelId should retrieve a label and return status 200', async () => {
    const labelId = '669023fd97509e27a8869661';
    const response = await request(app)
      .get(`/trello/labels/${labelId}`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(200);
    const { error } = labelSchema.validate(response.body);
    expect(error).toBeUndefined();
  });

  test('POST /trello/labels should create a label and return status 201', async () => {
    const response = await request(app)
      .post('/trello/labels')
      .send({
        name: 'Testando cor OS VELOSOS',
        color: 'pink',
        idBoard: '668fc3d8649e248a2c596f92'
      })
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(201);
    const { error } = labelSchema.validate(response.body);
    expect(error).toBeUndefined();

    await request(app)
      .delete(`/trello/labels/${response.body.id}`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);
  });

  test('PUT /trello/labels/:labelId should update a label and return status 200', async () => {
    const response = await request(app)
      .put(`/trello/labels/${testLabelId}`)
      .send({
        name: 'Updated Test Label',
        color: 'red'
      })
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(200);
    const { error } = labelSchema.validate(response.body);
    expect(error).toBeUndefined();
  });

  test('DELETE /trello/labels/:labelId should delete a label and return status 200', async () => {
    const createResponse = await request(app)
      .post('/trello/labels')
      .send({
        name: 'Label to be deleted',
        color: 'yellow',
        idBoard: '668fc3d8649e248a2c596f92'
      })
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    const deleteResponse = await request(app)
      .delete(`/trello/labels/${createResponse.body.id}`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(deleteResponse.status).toBe(200);
  });

  test('PATCH /trello/labels/:labelId/:field should update a field on a label and return status 200', async () => {
    const response = await request(app)
      .patch(`/trello/labels/${testLabelId2}/name`)
      .send({
        value: 'PurpleOsVelosos'
      })
      .set('Authorization', `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(200);
    const { error } = labelSchema.validate(response.body);
    expect(error).toBeUndefined();
  });
});