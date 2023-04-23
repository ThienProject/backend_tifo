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
router.post(
  '/deletes',
  isAuth,
  messageController.deleteChats
);


export default router;