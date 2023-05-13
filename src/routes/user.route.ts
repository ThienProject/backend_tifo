import express from 'express';
import userController from '../controllers/user.controller'

import validate from '../middleware/validate';
import postValidation from '../validations/post.validation';
import userValidation from '../validations/user.validations';
import { isAuth } from '../middleware/auth/auth.middleware';
const router = express.Router();
router.get(
  '/gets',
  validate(userValidation.getUsers),
  userController.getUsers
);
router.get(
  '/suggests/gets',
  userController.getUserSuggests
);
router.post(
  '/get',
  validate(userValidation.getUser),
  userController.getUser
);

router.post(
  '/follow/request',
  isAuth,
  validate(userValidation.follow),
  userController.requestFollow
);
router.post(
  '/follow/accept',
  isAuth,
  validate(userValidation.follow),
  userController.acceptFollow
);
router.post(
  '/follow/reject',
  isAuth,
  validate(userValidation.follow),
  userController.rejectFollow
);
router.post(
  '/unfollow',
  isAuth,
  validate(userValidation.follow),
  userController.unfollow
);
router.get(
  '/getUsersNotInRoom',
  isAuth,
  userController.getUsersNotInRoom
);
router.get(
  '/get/followings',
  userController.getFollowings
);
router.get(
  '/get/followers',
  userController.getFollowers
);
export default router;