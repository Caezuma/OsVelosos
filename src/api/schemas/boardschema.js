const Joi = require('joi');

const boardSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string(),
  desc: Joi.string()
}).unknown(true);

module.exports = boardSchema;