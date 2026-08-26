const express = require('express');
const passport = require('passport');
const validatorHandler = require('../midlewares/validator.handler');
const { checkRoles } = require('../midlewares/auth.handler')
const UserService=require('../services/user.service');

const {getUserSchema,createUserSchema, updateUserSchema}=require('./../schemas/user.schema');

const router= express.Router();
const service = new UserService();

router.get('/', 
    
      passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
  try {
    const user = await service.find();
    res.json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/:id',
      validatorHandler(getUserSchema, 'params'),
     passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
    async(req,res,next)=>{
    try {
        const {id}=req.params;
    

        const users = await service.findOne(id);
        res.json(users);
    } catch (error) {
        next(error);

    }
})
router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      console.log(req.body);

      const body = req.body;
      const newUser = await service.create(body);

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const user = await service.update(id, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);
router.delete('/:id', async(req,res,next)=>{
    try {
        const {id}=req.params;
        await service.delete(id);
        res.status(201).json({id});
    } catch (error) {
        next (error);
    }
})

module.exports = router;