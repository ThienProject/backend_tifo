import express from 'express';
import adminController from '../controllers/admin.controller'
import { isAuth } from '../middleware/auth/auth.middleware';
import validate from '../middleware/validate';
import authValidation from '../validations/auth.validations';
import upload from '../middleware/upload';
const router = express.Router();
// router.post(
//   '/register',
//   validate(authValidation.register),
//   authController.register
// );

router.post(
  '/user/gets',
  adminController.getUsers
);
router.post(
  '/user/get',
  adminController.getUserByID
);
router.post(
  '/post/gets',
  adminController.getPosts
);
router.post(
  '/post/get',
  adminController.getPost
);
router.post(
  '/post/lock',
  adminController.lockPost
);
router.post(
  '/user/lock',
  adminController.lockUser
);
router.post(
  '/user/statistics',
  adminController.userStatistics
)
router.post(
  '/user/statistics/age',
  adminController.userStatisticsAge
),
  router.post(
    '/follow/statistics',
    adminController.followStatistics
  ),
  router.post(
    '/post/statistics',
    adminController.postStatistics
  )

export default router;