const Joi = require('joi');

const id = Joi.number();
const orderId = Joi.number();
const precioContado = Joi.number().precision(2);
const porcentajeIncremento = Joi.number().precision(2);
const numeroCuotas = Joi.number().integer().positive();
const fechaProximoPago = Joi.date();
const estado = Joi.string();
const totalCredito = Joi.number().precision(2);
const valorCuota = Joi.number().precision(2);
const totalPagado = Joi.number().precision(2);


const createCreditSchema = Joi.object({

  orderId: orderId.required(),
  precioContado: precioContado.required(),
  porcentajeIncremento: porcentajeIncremento.required(),
  totalCredito: totalCredito.required(),
  numeroCuotas: numeroCuotas.required(),
  valorCuota: valorCuota.required(),
  fechaProximoPago: fechaProximoPago.required(),
 totalPagado: totalPagado,
  estado: estado.required(),

});

const updateCreditSchema = Joi.object({

   orderId: orderId,
  precioContado: precioContado,
  porcentajeIncremento: porcentajeIncremento,
  totalCredito: totalCredito,
  numeroCuotas: numeroCuotas,
  valorCuota: valorCuota,
  fechaProximoPago: fechaProximoPago,
totalPagado: totalPagado,
  estado: estado,
});

const getCreditSchema = Joi.object({

  id: id.required(),

});

module.exports = {

  createCreditSchema,

  updateCreditSchema,

  getCreditSchema

};