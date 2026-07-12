const Joi=require('joi');

const id =Joi.number();
const userId = Joi.number();
const delivaryAddress= Joi.string();
const deliveryReference=Joi.string();
const total=Joi.number().precision(2);
const status =Joi.string();
const paymentMethod=Joi.string();
const paymentStatus=Joi.string();


createOrdersSchema=Joi.object({
userId:userId.required(),
delivaryAddress:delivaryAddress.required(),
deliveryReference:deliveryReference.required(),
total:total.required(),
status:status.required(),
paymentMethod:paymentMethod.required(),
paymentStatus:paymentStatus.required()
})

updateOrdersSchema=Joi.object({
    userId:userId,
    delivaryAddress:delivaryAddress,
    deliveryReference:deliveryReference,
    total:total,
    status:status,
    paymentMethod:paymentMethod,
    paymentStatus:paymentStatus
})

getOrdersSchema= Joi.object({
    id:id.required()
})

module.exports={
    createOrdersSchema,
    updateOrdersSchema,
    getOrdersSchema
}