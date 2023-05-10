import express from 'express';
import authController from '../controllers/auth.controller'
import { isAuth } from '../middleware/auth/auth.middleware';
import validate from '../middleware/validate';
import authValidation from '../validations/auth.validations';
import upload from '../middleware/upload';
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
router.put(
  '/update',
  isAuth,
  authController.updateInfo
)
router.put(
  '/updatePassword',
  isAuth,
  authController.updatePassword
)
router.post(
  '/getNotifications',
  authController.getNotifications
)
router.post(
  '/updateInvisible', isAuth,
  authController.updateInvisible
)
router.post(
  '/updateImage',
  isAuth,
  upload("users").single('image_user'),
  authController.updateImage
)

export default router;