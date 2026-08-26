const Joi = require('joi');

const id = Joi.number();

const name = Joi.string().min(2).max(100);

const code = Joi.string().min(2).max(20);

const percentage = Joi.number().precision(2).min(0);

const description = Joi.string().allow(null, '');

const isActive = Joi.boolean();

const createTaxSchema = Joi.object({

  name: name.required(),

  code: code.required(),

  percentage: percentage.required(),

  description: description.optional()

});

const updateTaxSchema = Joi.object({

  name,

  code,

  percentage,

  description,

  isActive

});

const getTaxSchema = Joi.object({

  id: id.required()

});

module.exports = {

  createTaxSchema,

  updateTaxSchema,

  getTaxSchema

};