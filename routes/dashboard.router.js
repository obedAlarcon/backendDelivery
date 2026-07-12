const express = require('express');
const passport = require('passport');
const { checkRoles } = require('../midlewares/auth.handler');
const DashboardService = require('../services/dashboard.service');

const router = express.Router();
const service = new DashboardService();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const stats = await service.getStats();
      res.json(stats);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
