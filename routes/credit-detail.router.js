const express = require('express');

const CreditDetailService = require('../services/credit-detail.service');

const validatorHandler = require('../midlewares/validator.handler');

const {
  getCreditDetailSchema,
} = require('../schemas/credit-detail.schema');

const router = express.Router();
const service = new CreditDetailService();

router.get(
  '/:id',
  validatorHandler(getCreditDetailSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const credit = await service.find(id);
      res.json(credit);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;