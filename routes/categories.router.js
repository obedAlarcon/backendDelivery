const express = require('express');

const CategoriesService = require('./../services/categories.service');
const passport = require('passport');

const router = express.Router();
const service = new CategoriesService();


router.get('/', async(req,res, next)=>{

    try {
        const categories = await service.find();
        res.json(categories);
    } catch (error) {
        next(error);
    }
})

router.get('/:id', async(req, res, next)=>{
    try {
        const {id}= req.params;
        const categories =await service.findOne(id);
        res.json(categories);
    } catch (error) {
        next(error);
        
    }
})

router.post('/',
    
    passport.authenticate('jwt',{session:false}),
    
    
    
    async (req,res,next)=>{
  try {
    const body=req.body;
    const newCategories = await service.create(body);
    res.status(201).json(newCategories);
  } catch (error) {
    next(error);
    
  }
})

router.patch('/:id',
    passport.authenticate('jwt',{session:false}),
    async(req,res,next)=>{
    try {
        const {id}=req.params;
        const body= req.body;
        const categories = await service.update(id, body);
        res.json(categories);
    } catch (error) {
        next(error);
        
    }
})

router.delete('/:id',
    passport.authenticate('jwt',{session:false}),
    async(req, res,next)=>{
    try {
        const {id}=req.params;
        await service.delete(id);
        res.status(201).json({ id });
    } catch (error) {
        next(error)
    }
})


module.exports=router;