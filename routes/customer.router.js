const express = require('express');

const CustomerService = require('../services/customer.service');

const {
  getCustomerSchema,
  createCustomerSchema,
  updateCustomerSchema
} = require('../schemas/customer.schema');

const router = express.Router();

const service = new CustomerService();

//==============================================
// Obtener todos los clientes
//==============================================

router.get('/', async (req, res, next) => {

  try {

    const customers = await service.find();

    res.json(customers);

  } catch (error) {

    next(error);

  }

});

//==============================================
// Obtener un cliente
//==============================================

router.get('/:id', async (req, res, next) => {

  try {

    const { id } = req.params;

    const customer = await service.findOne(id);

    res.json(customer);

  } catch (error) {

    next(error);

  }

});

//==============================================
// Crear cliente
//==============================================

router.post('/', async (req, res, next) => {

  try {

    const body = req.body;

    const newCustomer = await service.create(body);

    res.status(201).json(newCustomer);

  } catch (error) {

    next(error);

  }

});

//==============================================
// Actualizar cliente
//==============================================

router.patch('/:id', async (req, res, next) => {

  try {

    const { id } = req.params;

    const body = req.body;

    const customer = await service.update(id, body);

    res.json(customer);

  } catch (error) {

    next(error);

  }

});

//==============================================
// Eliminar cliente
//==============================================

router.delete('/:id', async (req, res, next) => {

  try {

    const { id } = req.params;

    await service.delete(id);

    res.status(200).json({ id });

  } catch (error) {

    next(error);

  }

});

module.exports = router;