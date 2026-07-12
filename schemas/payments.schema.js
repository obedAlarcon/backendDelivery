const Joi= require('joi');
const { TableHints } = require('sequelize');

const id = Joi.number();
const orderId=Joi.number();
const transactionId = Joi.number();
const provider=Joi.string();
const amount= Joi.number().precision(2);
const status = Joi.string();


 createPaymentSchema = Joi.object({
    orderId:orderId.required(),
    transactionId:transactionId.required(),
    provider:provider.required(),
    amount:amount.required(),
    status:status.required(),

 })

 updatePaymentSchema=Joi.object({
    orderId:orderId,
    transactionId:transactionId,
    provider:provider,
    amount:amount,
    status:status
 })

 getPaymentSchema=Joi.object({
    id:id.required(),
 })

 module.exports={
    createPaymentSchema,
    updatePaymentSchema,
    getPaymentSchema
 }