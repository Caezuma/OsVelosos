const Joi = require('joi');

const createCommentSchema = Joi.object({
  commentId: Joi.string().required(),
}).unknown(true);

const deleteCommentSchema = Joi.object({
  message: Joi.string().valid('Comment deleted successfully').required(),
}).unknown(true);

const errorSchema = Joi.object({
  error: Joi.string().required(),
}).unknown(true);

const getCommentSchema = Joi.object({
  id: Joi.string().required(),
  text: Joi.string().required(),
  idCard: Joi.string().required(),
  idMemberCreator: Joi.string().required(),
  date: Joi.string().isoDate().required(), 
}).unknown(true);

const getCommentsListSchema = Joi.array().items(
  Joi.object({
    id: Joi.string().required(),
    text: Joi.string().required(),
    idCard: Joi.string().required(),
    idMemberCreator: Joi.string().required(),
    date: Joi.string().isoDate().required(),
  }).unknown(true)
).required();

module.exports = {
  createCommentSchema,
  deleteCommentSchema,
  errorSchema,
  getCommentSchema,
  getCommentsListSchema,
};