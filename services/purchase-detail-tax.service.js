const Joi = require('joi');

const id = Joi.number();

const purchaseDetailId = Joi.number();

const taxId = Joi.number();

const percentage = Joi.number().precision(2).min(0);

const amount = Joi.number().precision(2).min(0);

const createPurchaseDetailTaxSchema = Joi.object({

  purchaseDetailId: purchaseDetailId.required(),

  taxId: taxId.required(),

  percentage: percentage.required(),

  amount: amount.required()

});

const updatePurchaseDetailTaxSchema = Joi.object({

  purchaseDetailId,

  taxId,

  percentage,

  amount

});

const getPurchaseDetailTaxSchema = Joi.object({

  id: id.required()

});

module.exports = {

  createPurchaseDetailTaxSchema,

  updatePurchaseDetailTaxSchema,

  getPurchaseDetailTaxSchema

};