const Joi = require('joi');

const listSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  idBoard: Joi.string().required(),
}).unknown(true);

const createListSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  idBoard: Joi.string().required()
}).unknown(true);

const getListSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  idBoard: Joi.string().required()
}).unknown(true);

const updateListSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
}).unknown(true);

const listWithCardsSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  idBoard: Joi.string().required(),
  cards: Joi.array().items(
    Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required()
    }).unknown(true)
  ).optional()
}).unknown(true);

const listWithBoardSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  idBoard: Joi.string().required(),
  board: Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required()
  }).required()
}).unknown(true);

module.exports = {
  createListSchema,
  getListSchema,
  updateListSchema,
  listWithCardsSchema,
  listWithBoardSchema
};