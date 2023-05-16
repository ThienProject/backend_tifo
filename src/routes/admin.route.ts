import express from 'express';
import adminController from '../controllers/admin.controller'
import { isAuth } from '../middleware/auth/auth.middleware';
import validate from '../middleware/validate';
import authValidation from '../validations/auth.validations';
import upload from '../middleware/upload';
const router = express.Router();
// router.post(
//   '/register',
//   validate(authValidation.register),
//   authController.register
// );

router.post(
  '/user/gets',
  adminController.getUsers
);
router.post(
  '/user/get',
  adminController.getUserByID
);

export default router;