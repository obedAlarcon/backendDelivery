const Joi = require('joi');

const id = Joi.number();

const name = Joi.string().min(3).max(120);

const company = Joi.string().min(3).max(150);

const nit = Joi.string().max(30);

const email = Joi.string().email();

const phone = Joi.string().max(30);

const address = Joi.string().max(255);

const contactPerson = Joi.string().allow(null, '');

const observations = Joi.string().allow(null, '');

const isActive = Joi.boolean();

const createSupplierSchema = Joi.object({

  name: name.required(),

  company: company.required(),

  nit: nit.required(),

  email: email.required(),

  phone: phone.required(),

  address: address.required(),

  contactPerson: contactPerson.optional(),

  observations: observations.optional()

});

const updateSupplierSchema = Joi.object({

  name,

  company,

  nit,

  email,

  phone,

  address,

  contactPerson,

  observations,

  isActive

});

const getSupplierSchema = Joi.object({

  id: id.required()

});

module.exports = {

  createSupplierSchema,

  updateSupplierSchema,

  getSupplierSchema

};