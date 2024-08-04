const Joi = require('joi');

const checklistSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  idBoard: Joi.string().required(),
  idCard: Joi.string().required(),
  checkItems: Joi.array().items(
    Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      state: Joi.string().valid('complete', 'incomplete').required(),
      idChecklist: Joi.string().required(),
    }).unknown(true)
  ).required(),
}).unknown(true);

const checklistNameSchema = Joi.object({
  name: Joi.string().required(),
}).unknown(true);

const boardSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  closed: Joi.boolean().required(),
  idOrganization: Joi.string().allow(null),
}).unknown(true);

const cardSchema = Joi.array().items(
  Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    closed: Joi.boolean().required(),
    idBoard: Joi.string().required(),
    idList: Joi.string().required(),
  }).unknown(true)
).required();

const checkItemSchema = Joi.array().items(
  Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    state: Joi.string().valid('complete', 'incomplete').required(),
    idChecklist: Joi.string().required(),
  }).unknown(true)
).required();

module.exports = {
  checklistSchema,
  checklistNameSchema,
  boardSchema,
  cardSchema,
  checkItemSchema
};