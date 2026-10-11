const Joi = require('joi');

const id = Joi.number().integer().positive();
const orderId = Joi.number().integer().positive();
const precioContado = Joi.number().precision(2).positive();
const porcentajeIncremento = Joi.number().precision(2).min(0);
const totalCredito = Joi.number().precision(2).positive();
const numeroCuotas = Joi.number().integer().positive().max(4);
const valorCuota = Joi.number().precision(2).positive();
const totalPagado = Joi.number().precision(2).min(0);
const fechaProximoPago = Joi.date();
const estado = Joi.string().valid('Pendiente', 'Pagado', 'Vencido');

const getCreditDetailSchema = Joi.object({
  id: id.required(),
});

const creditDetailSchema = Joi.object({
  id,
  orderId: orderId.required(),
  precioContado: precioContado.required(),
  porcentajeIncremento: porcentajeIncremento.required(),
  totalCredito: totalCredito.required(),
  numeroCuotas: numeroCuotas.required(),
  valorCuota: valorCuota.required(),
  totalPagado: totalPagado.required(),
  fechaProximoPago: fechaProximoPago.required(),
  estado: estado.required(),
});

module.exports = {
  getCreditDetailSchema,
  creditDetailSchema,
};