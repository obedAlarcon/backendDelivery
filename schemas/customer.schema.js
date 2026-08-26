const Joi = require('joi');

const id = Joi.number().integer();

const name = Joi.string().min(3).max(100);

const phone = Joi.string().min(7).max(20);

const email = Joi.string().email();

const address = Joi.string().min(5).max(255);

const reference = Joi.string().allow('').max(255);

const isActive = Joi.boolean();

const createCustomerSchema = Joi.object({

  name: name.required(),

  phone: phone.required(),

  email: email.required(),

  address: address.required(),

  reference,

  isActive: isActive.default(true)

});

const updateCustomerSchema = Joi.object({

  name,

  phone,

  email,

  address,

  reference,

  isActive

});

const getCustomerSchema = Joi.object({

  id: id.required()

});

module.exports = {

  createCustomerSchema,

  updateCustomerSchema,

  getCustomerSchema

};