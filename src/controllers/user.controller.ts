import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status';
import userService from '../services/user.services';
import { userSockets } from '..';
import authService from '../services/auth.services';
import { io } from '..';
const userController = {
  getUser: async function (req: Request, res: Response, next: NextFunction) {
    const { id_user, id_me } = req.body;
    try {
      const { user, message } = await userService.getUser({ id_me, id_user });
      if (user) {
        res.send({
          user
        });
      }
    } catch (error) {
      next(error);
    }
  },
  requestFollow: async function (req: Request, res: Response, next: NextFunction) {
    const { id_follower, id_user } = req.body;
    try {
      const { message, id_follow } = await userService.requestFollow({ id_follower, id_user });
      if (message) {
        await authService.sendNotification({ id_follow, id_actor: id_follower, id_user, type: 'follow' })
        res.send({
          message,
        });
      }
    } catch (error) {
      next(error);
    }
  }
  ,
  acceptFollow: async function (req: Request, res: Response, next: NextFunction) {
    const { id_follower, id_user, id_noti } = req.body;
    try {
      const { message, followers } = await userService.acceptFollow({ id_follower, id_user });
      if (message) {
        if (id_noti) {
          await authService.removeNotification({ id_noti })
        }
        res.send({
          message,
          followers
        });
      }
    } catch (error) {
      next(error);
    }
  },
  unfollow: async function (req: Request, res: Response, next: NextFunction) {
    const { id_follower, id_user } = req.body;
    try {
      const { message, followers } = await userService.unfollow({ id_follower, id_user });
      if (message) {
        const userActive = userSockets[id_user!];
        if (userActive) {
          io.to(userActive.id).emit('delete-notification', { id_actor: id_follower, id_user });
        }
        res.send({
          message,
          followers
        });
      }
    } catch (error) {
      next(error);
    }
  }
  ,
  rejectFollow: async function (req: Request, res: Response, next: NextFunction) {
    const { id_follower, id_user, id_noti } = req.body;
    try {
      const { message, followers } = await userService.rejectFollow({ id_follower, id_user });
      if (message) {
        if (id_noti) {
          await authService.removeNotification({ id_noti })
        }
        res.send({
          message,
          followers
        });
      }
    } catch (error) {
      next(error);
    }
  },

  getUsers: async (req: Request, res: Response, next: NextFunction) => {
    const { q, offset, limit, id_user } = req.query;
    try {
      const { users, messages } = await userService.getUsers({ q, offset, limit, id_user });
      if (users) {
        res.send({
          users, messages
        });
      }
    } catch (error) {
      next(error);
    }
  },
  getPosts: async (req: Request, res: Response, next: NextFunction) => {
    const { id_user, offset, limit } = req.query;
    try {
      const { posts, message } = await userService.getPosts({ id_user, offset, limit });
      if (posts) {
        return res.status(httpStatus.OK).send({
          posts: posts,
          message: message
        })
      }
    } catch (error) {
      next(error);
    }
  },
  getReels: async (req: Request, res: Response, next: NextFunction) => {
    const { id_user, offset, limit } = req.query;
    try {
      const { posts, message } = await userService.getReels({ id_user, offset, limit });
      if (posts) {
        return res.status(httpStatus.OK).send({
          posts: posts,
          message: message
        })
      }
    } catch (error) {
      next(error);
    }
  },
  getSaves: async (req: Request, res: Response, next: NextFunction) => {
    const { id_user, offset, limit } = req.query;
    try {
      const { posts, message } = await userService.getSaves({ id_user, offset, limit });
      if (posts) {
        return res.status(httpStatus.OK).send({
          posts: posts,
          message: message
        })
      }
    } catch (error) {
      next(error);
    }
  },

}
export default userController;