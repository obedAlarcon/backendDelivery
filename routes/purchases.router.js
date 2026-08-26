const express = require('express');

const PurchaseService = require('../services/purchases.service');
const validatorHandler = require('../midlewares/validator.handler');

const {
  createPurchaseSchema,
  updatePurchaseSchema,
  getPurchaseSchema
} = require('../schemas/purchases.schemas');

const router = express.Router();
const service = new PurchaseService();

router.get('/', async (req, res, next) => {

  try {

    const purchases = await service.find();

    res.json(purchases);

  } catch (error) {

    next(error);

  }

});

router.get(
  '/:id',

 

  async (req, res, next) => {

    try {

      const { id } = req.params;

      const purchase = await service.findOne(id);

      res.json(purchase);

    } catch (error) {

      next(error);

    }

  }

);

router.post(
  '/',

    validatorHandler(createPurchaseSchema, 'body'),

  async (req, res, next) => {

    try {

      console.log('=== ENTRÓ AL POST DE COMPRAS ===');
      const body = {
  ...req.body,
 
};
      const purchase = await service.create(body);

      res.status(201).json(purchase);

    } catch (error) {

      next(error);

    }

  }

);

router.patch(
  '/:id',

  async (req, res, next) => {

    try {

      const { id } = req.params;

      const body = req.body;

      const purchase = await service.update(id, body);

      res.json(purchase);

    } catch (error) {

      next(error);

    }

  }

);

router.delete(
  '/:id',



  async (req, res, next) => {

    try {

      const { id } = req.params;

      await service.delete(id);

      res.json({ id });

    } catch (error) {

      next(error);

    }

  }

);

module.exports = router;