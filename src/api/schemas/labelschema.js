const Joi = require('joi');

const labelSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  color: Joi.string().required(),
  idBoard: Joi.string().required(),
  uses: Joi.number().optional(),
  limits: Joi.object().optional()
}).unknown(true);

module.exports = { labelSchema };