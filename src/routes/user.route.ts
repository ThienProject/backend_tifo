import express from 'express';
import userController from '../controllers/user.controller'
// import validate from '../middlewares/validate';
// import authValidation from '../validations/auth.validation';
const router = express.Router();
router.get(
  '/search',
  // validate(authValidation.register),
  userController.getUsers
);
export default router;