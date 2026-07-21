const Joi = require('joi');

const id = Joi.number().integer();

const firstName = Joi.string().min(3).max(100);

const lastName = Joi.string().min(3).max(100);

const phone = Joi.string().min(7).max(20);

const email = Joi.string().email();

const address = Joi.string().min(5).max(255);

const isActive = Joi.boolean();

const createCustomerSchema = Joi.object({

  firstName: firstName.required(),

  lastName: lastName.required(),

  phone: phone.required(),

  email: email.required(),

  address: address.required(),

  isActive: isActive.default(true)

});

const updateCustomerSchema = Joi.object({

  firstName,

  lastName,

  phone,

  email,

  address,

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