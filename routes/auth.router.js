const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const { config } = require('./../config/config');

const validatorHandler = require('./../midlewares/validator.handler');

const {
  loginSchema,
  recoverySchema,
  changePasswordSchema
} = require('./../schemas/auth.schema');

const AuthService = require('./../services/auth.service');

const service = new AuthService();

const router = express.Router();


// RECUPERAR CONTRASEÑA

router.post(
  '/recovery',
  validatorHandler(recoverySchema, 'body'),
  async (req, res, next) => {

    try {

      const { email } = req.body;

      const result = await service.sendRecovery(email);

      res.json(result);

    } catch (error) {

      next(error);

    }

  }
);


// CAMBIAR CONTRASEÑA

router.post(
  '/change-password',
  validatorHandler(changePasswordSchema, 'body'),
  async (req, res, next) => {

    try {

      const { token, newPassword } = req.body;

      const result = await service.changePassword(
        token,
        newPassword
      );

      res.json(result);

    } catch (error) {

      next(error);

    }

  }
);


// LOGIN

router.post(
  '/login',
  validatorHandler(loginSchema, 'body'),
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {

    try {

      const user = req.user;

      const payload = {
        sub: user.id,
        role: user.role,
      };

      const token = jwt.sign(
        payload,
        config.jwtSecret
      );

      res.json({
        user,
        token,
      });

    } catch (error) {

      next(error);

    }

  }
);


module.exports = router;