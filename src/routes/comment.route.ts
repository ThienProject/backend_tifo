import express from 'express';
import validate from '../middleware/validate';
import { isAuth } from '../middleware/auth/auth.middleware';
import commentController from '../controllers/comment.controller'
// import commentValidation from '../validations/comment.validation';
import upload from '../middleware/upload'
const router = express.Router();


router.post(
  '/create',
  isAuth,
  commentController.create
);


router.delete(
  '/delete',
  isAuth,
  commentController.delete
);

router.post(
  '/update',
  isAuth,
  commentController.update
);
router.get(
  '/get',
  commentController.getComments
);


export default router;