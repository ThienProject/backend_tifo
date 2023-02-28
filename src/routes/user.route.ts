import express from 'express';
import userController from '../controllers/user.controller'
import validate from '../middleware/validate';
import userValidation from '../validations/user.validations';
const router = express.Router();
router.get(
  '/search',
  validate(userValidation.getUsers),
  userController.getUsers
);
export default router;