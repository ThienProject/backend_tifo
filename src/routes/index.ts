import express from 'express';
import userRoute from './user.route'
import authRoute from './auth.route'
import postRoute from './post.route'
import commentRoute from './comment.route'
import roomRoute from './room.route'
import chatRoute from './chat.route'
import adminRoute from './admin.route'
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
  {
    path: '/room',
    route: roomRoute,
  },
  {
    path: '/chat',
    route: chatRoute,
  },
  {
    path: '/admin',
    route: adminRoute,
  },
]
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);

})
export default router;