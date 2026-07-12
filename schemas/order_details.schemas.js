

const Joi = require('joi');

const id = Joi.number();
const orderId= Joi.number();
const productId=Joi.number();
const quantity = Joi.number();
const price = Joi.number();
const subtotal=Joi.number();


createOrder_detailsSchema=Joi.object({
    orderId:orderId.required(),
    productId:productId.required(),
    quantity:quantity.required(),
    price:price.required(),
    subtotal:subtotal.required(),

})
   updateOrder_detailsSchema=Joi.object({
    orderId:orderId,
    productId:productId,
    quantity:quantity,
    price:price,
    subtotal:subtotal,
   })

   getOrder_detailsSchema=Joi.object({
    id:id.required(),
   })
module.exports={
    createOrder_detailsSchema,
    updateOrder_detailsSchema,
    getOrder_detailsSchema
}
