const Joi = require('joi');

const id = Joi.number();
const userId = Joi.number();
const deliveryAddress = Joi.string(); // ✅ Corregí el typo "delivary"
const deliveryReference = Joi.string();
const total = Joi.number().precision(2);
const status = Joi.string();
const paymentMethod = Joi.string();
const paymentStatus = Joi.string();

// ✅ 1. Definimos cómo debe ser el objeto del cliente
const customerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  reference: Joi.string().allow(null, '') // Permitimos que vaya vacío
});

// ✅ 2. Definimos cómo debe ser cada producto del array
const itemSchema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
  price: Joi.number().precision(2).required()
});

// ✅ 3. Modificamos TU esquema de creación
const createOrdersSchema = Joi.object({
  customer: customerSchema.required(), // Ahora esperamos el objeto customer
  paymentMethod: paymentMethod.required(),
  items: Joi.array().items(itemSchema).min(1).required() // Esperamos el array de items
});

// ✅ 4. El de actualizar sigue casi igual
const updateOrdersSchema = Joi.object({
  userId: userId,
  deliveryAddress: deliveryAddress, 
  deliveryReference: deliveryReference,
  total: total,
  status: status,
  paymentMethod: paymentMethod,
  paymentStatus: paymentStatus
});

const getOrdersSchema = Joi.object({
  id: id.required()
});

module.exports = {
  createOrdersSchema,
  updateOrdersSchema,
  getOrdersSchema
};