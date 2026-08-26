const express = require('express');

const TaxService = require('../services/taxes.service');



const {
  createTaxSchema,
  updateTaxSchema,
  getTaxSchema
} = require('../schemas/taxes.schema');

const router = express.Router();

const service = new TaxService();

/*=========================================
  OBTENER TODOS
=========================================*/

router.get('/', async (req, res, next) => {

  try {

    const taxes = await service.find();

    res.json(taxes);

  } catch (error) {

    next(error);

  }

});

/*=========================================
  OBTENER UNO
=========================================*/

router.get(
  '/:id',


  async (req, res, next) => {

    try {

      const { id } = req.params;

      const tax = await service.findOne(id);

      res.json(tax);

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

 

  async (req, res, next) => {

    try {

      const body = req.body;

      const newTax = await service.create(body);

      res.status(201).json(newTax);

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



  async (req, res, next) => {

    try {

      const { id } = req.params;

      const body = req.body;

      const tax = await service.update(id, body);

      res.json(tax);

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