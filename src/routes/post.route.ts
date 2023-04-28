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
  validate(postValidation.delete),
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
  '/updateLove',
  isAuth,
  validate(postValidation.updateLove),
  postController.updateLove
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
router.get(
  '/getPostsByIDUser',
  validate(postValidation.getPosts),
  postController.getPostsByIDUser
);


router.get(
  '/getReelsByIDUser',
  validate(postValidation.getPosts),
  postController.getReelsByIDUser
);
router.get(
  '/getSavesByIDUser',
  validate(postValidation.getPosts),
  postController.getSavesByIDUser
);
export default router;