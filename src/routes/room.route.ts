import express from 'express';
import messageController from '../controllers/message.controller'
import { isAuth } from '../middleware/auth/auth.middleware';
import validate from '../middleware/validate';
import roomValidation from '../validations/room.validation';
const router = express.Router();
router.get(
  '/getChatsByIDRoom',
  isAuth,
  messageController.getChatsByIDRoom
);
router.get(
  '/gets',
  isAuth,
  messageController.getRooms
);
router.get(
  '/search',
  isAuth,
  validate(roomValidation.searchRoomOrUser),
  messageController.searchRoomOrUser
)
router.post(
  '/create',
  isAuth,
  messageController.createRoom
)
router.delete(
  '/delete',
  isAuth,
  messageController.deleteRoom
);
router.delete(
  '/user/delete',
  isAuth,
  messageController.deleteUser
);
router.post(
  '/addMembers',
  isAuth,
  messageController.addMembers
);
router.get(
  '/getUsersByIDRoom',
  isAuth,
  messageController.getUsersByIDRoom
)
export default router;