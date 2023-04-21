import express from 'express';
import messageController from '../controllers/message.controller'
import { isAuth } from '../middleware/auth/auth.middleware';
const router = express.Router();
router.post(
  '/create',
  isAuth,
  messageController.createChat
);
router.post(
  '/createFirst',
  isAuth,
  messageController.createFirstChat
);

export default router;