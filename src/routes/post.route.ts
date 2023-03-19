import express from 'express';
import validate from '../middleware/validate';
import { isAuth } from '../middleware/auth/auth.middleware';
import postController from '../controllers/post.controller'
import postValidation from '../validations/post.validation';
import upload from '../middleware/upload'
const router = express.Router();

router.post(
  '/create',
  isAuth,
  upload("medias").array('medias[]', 12),
  validate(postValidation.create),
  postController.create
);

router.post(
  '/update',
  isAuth,
  upload("medias").array('medias[]', 12),
  validate(postValidation.update),
  postController.update
);

router.delete(
  '/delete',
  isAuth,
  validate(postValidation.delete), isAuth,
  postController.delete
);
router.get(
  '/getPosts',
  validate(postValidation.getPosts),
  postController.getPosts
);

router.get(
  '/getPostByID',
  validate(postValidation.getPostByID),
  postController.getPostByID
);
router.post(
  '/update',
  isAuth,
  validate(postValidation.getPostByID),
  postController.update
);
router.post(
  '/replaceMedias',
  isAuth,
  upload("medias").array('medias', 12),
  postController.replaceMedias
);
router.post(
  '/deleteMedias',
  isAuth,
  postController.deleteMedias
);

export default router;