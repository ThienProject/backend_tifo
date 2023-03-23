import express from 'express';
import authController from '../controllers/auth.controller'
import { isAuth } from '../middleware/auth/auth.middleware';
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
  validate(authValidation.getMe), isAuth,
  authController.getMe
);

router.post(
  '/getNotifications',
  authController.getNotifications
)

export default router;