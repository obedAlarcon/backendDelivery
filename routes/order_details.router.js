const express= require('express');


const {createOrder_detailsSchema, updateOrder_detailsSchema,getOrder_detailsSchema}=require('../schemas/order_details.schemas');
const Order_detailsService= require('../services/order_details.service');

const router= express.Router();
const service = new Order_detailsService();

router.get('/', async (req, res, next)=>{
    try {
        const order_details= await service.find();
        res.json(order_details);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async(req, res, next)=>{
    try {
        const {id}=req.params;
        const order_details = await service.findOne(id);
        res.json(order_details);
    } catch (error) {
        next(error);
    }
})

 router.post('/',async(req,res,next)=>{
    try {
        const body=req.body;
        const newOrder_details =await service.create(body);
        res.status(201).json(newOrder_details)
    } catch (error) {
         console.log('ERROR REAL:', error.parent);
  next(error);
    }
 });


 router.patch('/:id', async (req,res,next)=>{
    try {
        const {id}=req.params;
        const body=req.body
        const order_details=await service.update(id,body);
        res.json(order_details)
    } catch (error) {
        next(error);
        
    }
 })

 router.delete('/:id', async(req,res,next)=>{
     try {
        const {id}=req.params;
        await service.delete(id);
        res.status(201).json({ id });
     } catch (error) {
        next(error);
     }
 })

 module.exports=router;
