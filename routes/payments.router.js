const express = require('express');

const PaymentService= require('./../services/payment.service');

const {createPaymentSchema, updatePaymentSchema,getPaymentSchema}=require('./../schemas/payments.schema');

const router=express.Router();

const service = new PaymentService();

router.get('/',async(req, res, next)=>{

    try {
        const payments = await service.find();
        res.json(payments);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async(req,res,next)=>{
    try {
        const {id}=req.params;
        const product= await service.findOne(id);
        res.json(product);
    } catch (error) {
        next(error);
        
    }
});

router.post('/',async(req,res,next)=>{
    try {
        const body= req.body;
        const newPayment=await service.create(body);
        res.status(201).json(newPayment);
    } catch (error) {
        next(error);
    }
})

 router.patch('/:id', async(req,res,next)=>{
    try {
        const {id}=req.params;
        const body=req.body;
        const payment= await service.update(id,body);
        res.json(payment);
    } catch (error) {
        next(error);
    }

 })

 router.delete('/:id', async(req,res,next)=>{
    try {
        const {id}=req.params;
        await service.delete(id);
        res.status(201).json({id});
    } catch (error) {
        next(error);
        
    }
 })
module.exports=router;