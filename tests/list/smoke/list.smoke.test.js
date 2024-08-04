require('../../../src/api/core/config/loadEnv');
const request = require('supertest');
const app = require('../../../src/app');
const { createListSchema } = require('../../../src/api/schemas/listSchema');

const apiToken = process.env.TOKEN;
const boardId = process.env.BOARD_ID2;

describe('List Smoke Tests', () => {
    let testListId;

    test('Create a new List', async () => {
        const response = await request(app)
            .post('/trello/lists')
            .send({ name: 'Smoke Test List', idBoard: boardId })
            .set('Authorization', `Bearer ${apiToken}`);

        expect(response.status).toBe(200);

        const { error } = createListSchema.validate(response.body);
        expect(error).toBeUndefined();
        testListId = response.body.id;
    });

    test('Retrieve a List by ID', async () => {
        if (!testListId) {
            console.error('Skipping "Retrieve a List by ID" test: no listId available');
            return;
        }

        const response = await request(app)
            .get(`/trello/lists/${testListId}`)
            .set('Authorization', `Bearer ${apiToken}`);

        expect(response.status).toBe(200);

        const { error } = createListSchema.validate(response.body);
        expect(error).toBeUndefined();
    });

    test('Update an Existing List', async () => {
        if (!testListId) {
            console.error('Skipping "Update an Existing List" test: no listId available');
            return;
        }

        const response = await request(app)
            .put(`/trello/lists/${testListId}`)
            .send({ name: 'Updated Smoke Test List' })
            .set('Authorization', `Bearer ${apiToken}`);

        expect(response.status).toBe(200);

        const { error } = createListSchema.validate(response.body);
        expect(error).toBeUndefined();
    });

    test('Create another new List', async () => {
        const response = await request(app)
            .post('/trello/lists')
            .send({ name: 'Another Smoke Test List', idBoard: boardId })
            .set('Authorization', `Bearer ${apiToken}`);

        expect(response.status).toBe(200);

        const { error } = createListSchema.validate(response.body);
        expect(error).toBeUndefined();
    });
});