import express from 'express';
import authController from '../controllers/auth.controller'
import validate from '../middleware/validate';
import authValidation from '../validations/auth.validations';
const router = express.Router();
router.post(
  '/register',
  validate(authValidation.register),
  authController.register
);

router.post(
  '/login',
  validate(authValidation.login),
  authController.login
);

router.post(
  '/getMe',
  validate(authValidation.getMe),
  authController.getMe
);

export default router;