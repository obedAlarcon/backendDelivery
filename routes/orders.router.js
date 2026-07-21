const express = require('express');
const OrdersService = require('../services/orders.service');
const {getOrdersSchema, createOrdersSchema, updateOrdersSchema}=require('../schemas/orders.schema');
const { Orders } = require('../db/models/orders.model');


const router=express.Router();
const service = new OrdersService();

router.get('/', async(req, res, next)=>{
     try {
        const orders = await service.find();
        res.json(orders);
     } catch (error) {
        next(error);
     }
})

router.get('/:id', async(req,res, next)=>{
    try {
        const {id}=req.params;
        const oreders =await service.findOne(id);
        res.json(oreders);
    } catch (error) {
        next(error);
    }
})

router.post('/', async(req,res,next)=>{
    try {
        const body=req.body;
        const newOreders= await service.create(body);
       res.status(201).json(newOreders);
    } catch (error) {
        console.log(error.errors || error);  
        next(error);
    }
})

router.patch('/:id', async(req,res,next)=>{
    try {
        const {id}=req.params;
        const body = req.body;
        const orders = await service.update(id, body);
        res.json(orders);
    } catch (error) {
        next(error);
        
    }
})

router.delete('/:id', async (req, res, next) => {

  const { id } = req.params;

  const result = await service.delete(id);

  res.json(result);

});
 module.exports=router;