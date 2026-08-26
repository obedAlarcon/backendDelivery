const Joi = require('joi');


const id = Joi.number();

const supplierId = Joi.number();

const userId = Joi.number();

const paymentMethod = Joi.string();

const invoiceNumber = Joi.string();

const notes = Joi.string()
  .allow(null, '');

const total = Joi.number()
  .precision(2);

const status = Joi.string();



/*==========================================
  DETALLE DE LA COMPRA
==========================================*/

const itemSchema = Joi.object({

  productId: Joi.number()
    .required(),


  quantity: Joi.number()
    .integer()
    .min(1)
    .required(),


  cost: Joi.number()
    .precision(2)
    .positive()
    .required(),


  subtotal: Joi.number()
    .precision(2)
    .min(0)
    .required(),


  discount: Joi.number()
    .precision(2)
    .min(0)
    .optional()
    .default(0),


  discountAmount: Joi.number()
    .precision(2)
    .min(0)
    .optional()
    .default(0),


  taxId: Joi.number()
    .optional()
    .allow(null),


  taxRate: Joi.number()
    .precision(2)
    .min(0)
    .optional()
    .default(0),


  taxAmount: Joi.number()
    .precision(2)
    .min(0)
    .optional()
    .default(0),


  total: Joi.number()
    .precision(2)
    .min(0)
    .required()


});



/*==========================================
  CREAR COMPRA
==========================================*/

const createPurchaseSchema = Joi.object({


  supplierId: supplierId
    .required(),


  userId: userId
    .optional(),


  paymentMethod: paymentMethod
    .required(),


  invoiceNumber: invoiceNumber.optional(),


  notes: notes
    .optional(),


  total: total
    .optional(),


  status: status
    .optional(),


  details: Joi.array()
    .items(itemSchema)
    .min(1)
    .required()


});



/*==========================================
  ACTUALIZAR COMPRA
==========================================*/

const updatePurchaseSchema = Joi.object({


  supplierId,


  userId,


  paymentMethod,


  invoiceNumber,


  notes,


  total,


  status


});



/*==========================================
  OBTENER COMPRA
==========================================*/

const getPurchaseSchema = Joi.object({

  id: id.required()

});



module.exports = {

  createPurchaseSchema,

  updatePurchaseSchema,

  getPurchaseSchema

};