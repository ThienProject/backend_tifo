import express from 'express';
import messageController from '../controllers/message.controller'
import { isAuth } from '../middleware/auth/auth.middleware';
import validate from '../middleware/validate';
import authValidation from '../validations/auth.validations';
const router = express.Router();
router.post(
  '/create',
  messageController.createChat
);


export default router;