import express from 'express';
import userRoute from './user.route'
import authRoute from './auth.route'
import postRoute from './post.route'
import commentRoute from './comment.route'

const router = express.Router();
const defaultRoutes = [
  {
    path: '/search',
    route: userRoute,
  },
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/post',
    route: postRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/comment',
    route: commentRoute,
  },
]
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);

})
export default router;