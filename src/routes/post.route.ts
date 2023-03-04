import express from 'express';
import validate from '../middleware/validate';
import { isAuth } from '../middleware/auth/auth.middleware';
import postController from '../controllers/post.controller'
import postValidation from '../validations/post.validation';
import upload from '../middleware/upload'
const router = express.Router();

router.post(
  '/create',
  // validate(postValidation.create),
  isAuth,
  upload("medias").array('medias[]', 12),
  postController.create
);

router.post(
  '/update',
  validate(postValidation.update),
  postController.update
);

router.delete(
  '/delete',
  validate(postValidation.delete), isAuth,
  postController.delete
);
router.get(
  '/getPosts',
  validate(postValidation.getPosts), isAuth,
  postController.getPosts
);
router.get(
  '/getPostById',
  validate(postValidation.getPostById), isAuth,
  postController.getPostById
);

export default router;