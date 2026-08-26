const express = require('express');

const SupplierService = require('../services/suppliers.service');

const {
  createSupplierSchema,
  updateSupplierSchema,
  getSupplierSchema
} = require('../schemas/suppliers.schema');

const router = express.Router();
const service = new SupplierService();

router.get('/', async (req, res, next) => {

  try {

    const suppliers = await service.find();

    res.json(suppliers);

  } catch (error) {

    next(error);

  }

});

router.get(
  '/:id',

 

  async (req, res, next) => {

    try {

      const { id } = req.params;

      const supplier = await service.findOne(id);

      res.json(supplier);

    } catch (error) {

      next(error);

    }

  }

);

router.post(
  '/',


  async (req, res, next) => {

    try {

      const body = req.body;

      const supplier = await service.create(body);

      res.status(201).json(supplier);

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

      const supplier = await service.update(id, body);

      res.json(supplier);

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

      res.json({
        id
      });

    } catch (error) {

      next(error);

    }

  }

);

module.exports = router;