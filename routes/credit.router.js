const express = require('express');

const CreditService = require('./../services/credit.service');

const validatorHandler = require('./../midlewares/validator.handler');

const {
  createCreditSchema,
  updateCreditSchema,
  getCreditSchema
} = require('./../schemas/credit.schema');

const router = express.Router();

const service = new CreditService();


// ==========================
// Obtener todos los créditos
// ==========================

router.get('/', async (req, res, next) => {

  try {

    const credits = await service.find();

    res.json(credits);

  } catch (error) {

    next(error);

  }

});


// ==========================
// Obtener un crédito
// ==========================

router.get(
  '/:id',
  validatorHandler(getCreditSchema, 'params'),
  async (req, res, next) => {

    try {

      const { id } = req.params;

      const credit = await service.findOne(id);

      res.json(credit);

    } catch (error) {

      next(error);

    }

  }
);


// ==========================
// Crear crédito
// ==========================

router.post(
  '/',
  validatorHandler(createCreditSchema, 'body'),
  async (req, res, next) => {

    try {

      const body = req.body;

      const newCredit = await service.create(body);

      res.status(201).json(newCredit);

    } catch (error) {

      next(error);

    }

  }
);


// ==========================
// Actualizar crédito
// ==========================

router.patch(
  '/:id',
  validatorHandler(getCreditSchema, 'params'),
  validatorHandler(updateCreditSchema, 'body'),
  async (req, res, next) => {

    try {

      const { id } = req.params;

      const body = req.body;

      const credit = await service.update(id, body);

      res.json(credit);

    } catch (error) {

      next(error);

    }

  }
);


// ==========================
// Eliminar crédito
// ==========================

router.delete(
  '/:id',
  validatorHandler(getCreditSchema, 'params'),
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