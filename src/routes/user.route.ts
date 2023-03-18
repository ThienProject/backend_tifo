import express from 'express';
import userController from '../controllers/user.controller'
import validate from '../middleware/validate';
import postValidation from '../validations/post.validation';
import userValidation from '../validations/user.validations';
const router = express.Router();
router.get(
  '/search',
  validate(userValidation.getUsers),
  userController.getUsers
);
router.post(
  '/get',
  validate(userValidation.getUser),
  userController.getUser
);
router.get(
  '/getPosts',
  validate(postValidation.getPosts),
  userController.getPosts
);


router.get(
  '/getReels',
  validate(postValidation.getPosts),
  userController.getReels
);
router.get(
  '/getSaves',
  validate(postValidation.getPosts),
  userController.getSaves
);
export default router;