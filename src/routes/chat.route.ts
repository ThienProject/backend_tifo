import express from 'express';
import messageController from '../controllers/message.controller'
import { isAuth } from '../middleware/auth/auth.middleware';
import upload from '../middleware/upload';
const router = express.Router();
router.post(
  '/create',
  isAuth,
  upload("messages").single('image'),
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