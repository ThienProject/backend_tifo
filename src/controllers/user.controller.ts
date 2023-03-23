import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status';
import userService from '../services/user.services';
const userController = {
  getUser: async function (req: Request, res: Response, next: NextFunction) {
    const { id_user } = req.body;
    try {
      const { user, message } = await userService.getUser(id_user);
      if (user) {
        res.send({
          user
        });
      }
    } catch (error) {
      next(error);
    }
  },
  getUsers: async (req: Request, res: Response, next: NextFunction) => {
    const { q } = req.query;
    try {
      const { users, messages } = await userService.getUsers({ q });
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