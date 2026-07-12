
const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const upload = require('./../utils/upload');
const ProductService = require('./../services/products.service');
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/products.schema');
const { checkRoles } = require('../midlewares/auth.handler');

const router = express.Router();
const service = new ProductService();

router.get('/', async (req, res, next) => {
  try {
    const product = await service.find();
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/upload',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  upload.single('image'),
  async (req, res, next) => {
    try {
      if (!req.file) {
        throw boom.badRequest('Image file is required');
      }
const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      res.status(201).json({ imageUrl });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      console.log(req.body); // 👈 Agrega esto
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(204).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
