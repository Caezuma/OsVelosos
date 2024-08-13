require("../../../src/api/core/config/loadEnv");
const request = require("supertest");
const app = require("../../../src/app");
const {
  createCommentSchema,
  deleteCommentSchema,
} = require("../../../src/api/schemas/commentschema");

/**
 * @group e2e
 */

describe("Comment E2E Tests", () => {
  const cardId = process.env.CARD_ID;
  let commentId;

  test("Create a new comment should return status 201 and commentId", async () => {
    const response = await request(app)
      .post(`/trello/cards/${cardId}/comments`)
      .send({ text: "E2E Test Comment" })
      .set("Authorization", `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("commentId");
    const { error } = createCommentSchema.validate(response.body);
    expect(error).toBeUndefined();
    commentId = response.body.commentId;
  });

  test("Delete a comment should return status 200", async () => {
    const response = await request(app)
      .delete(`/trello/cards/${cardId}/comments/${commentId}`)
      .set("Authorization", `Bearer ${process.env.TOKEN}`);

    expect(response.status).toBe(200);
    const { error } = deleteCommentSchema.validate(response.body);
    expect(error).toBeUndefined();
  }, 10000);
});
