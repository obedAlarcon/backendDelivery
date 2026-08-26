const express = require('express');

const PurchaseDetailTaxService = require('../services/purchase-detail-tax.service');

const validatorHandler = require('../middlewares/validator.handler');

const {
  createPurchaseDetailTaxSchema,
  updatePurchaseDetailTaxSchema,
  getPurchaseDetailTaxSchema
} = require('../schemas/purchase-detail-tax.schema');

const router = express.Router();

const service = new PurchaseDetailTaxService();

/*=========================================
  OBTENER TODOS
=========================================*/

router.get('/', async (req, res, next) => {

  try {

    const purchaseDetailTaxes = await service.find();

    res.json(purchaseDetailTaxes);

  } catch (error) {

    next(error);

  }

});

/*=========================================
  OBTENER UNO
=========================================*/

router.get(
  '/:id',

  validatorHandler(getPurchaseDetailTaxSchema, 'params'),

  async (req, res, next) => {

    try {

      const { id } = req.params;

      const purchaseDetailTax = await service.findOne(id);

      res.json(purchaseDetailTax);

    } catch (error) {

      next(error);

    }

  }

);

/*=========================================
  CREAR
=========================================*/

router.post(
  '/',

  validatorHandler(createPurchaseDetailTaxSchema, 'body'),

  async (req, res, next) => {

    try {

      const body = req.body;

      const newPurchaseDetailTax = await service.create(body);

      res.status(201).json(newPurchaseDetailTax);

    } catch (error) {

      next(error);

    }

  }

);

/*=========================================
  ACTUALIZAR
=========================================*/

router.patch(
  '/:id',

  validatorHandler(getPurchaseDetailTaxSchema, 'params'),

  validatorHandler(updatePurchaseDetailTaxSchema, 'body'),

  async (req, res, next) => {

    try {

      const { id } = req.params;

      const body = req.body;

      const purchaseDetailTax = await service.update(id, body);

      res.json(purchaseDetailTax);

    } catch (error) {

      next(error);

    }

  }

);

/*=========================================
  ELIMINAR
=========================================*/

router.delete(
  '/:id',

  validatorHandler(getPurchaseDetailTaxSchema, 'params'),

  async (req, res, next) => {

    try {

      const { id } = req.params;

      const response = await service.delete(id);

      res.json(response);

    } catch (error) {

      next(error);

    }

  }

);

module.exports = router;