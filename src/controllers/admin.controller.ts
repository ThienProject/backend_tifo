import { Request, Response, NextFunction } from 'express'
import adminService from '../services/admin.services';
import { generateToken } from '../middleware/auth/JWT'
import httpStatus from 'http-status';
import { IGetPostByID } from '../types/post';
import authService from '../services/auth.services';
const authController = {
  getUsers: async (req: Request, res: Response, next: NextFunction) => {
    const { offset, limit, id_role, filters } = req.body;
    try {
      const { users, messages, total } = await adminService.getUsers({ offset, limit, id_role, filters });
      if (users) {
        res.send({
          users, total, messages
        });
      }
    } catch (error) {
      next(error);
    }
  },
  getPosts: async (req: Request, res: Response, next: NextFunction) => {
    const { offset, limit, id_user, filters } = req.body;
    try {
      const { posts, total, message } = await adminService.getPosts({ offset, limit, id_user, filters });
      if (posts) {
        res.send({
          posts, total, message
        });
      }
    } catch (error) {
      next(error);
    }
  },
  getPost: async (req: Request, res: Response, next: NextFunction) => {
    const query: IGetPostByID = req.body;
    try {
      const { post, message } = await adminService.getPost(query);
      if (post) {
        return res.status(httpStatus.OK).send({
          post: post,
          message: message
        })
      }
    } catch (error) {
      next(error);
    }
  },
  getUserByID: async function (req: Request, res: Response, next: NextFunction) {
    const { id_user } = req.body;
    try {
      const { user, message } = await adminService.getUserByID({ id_user });
      if (user) {
        res.send({
          user
        });
      }
    } catch (error) {
      next(error);
    }
  },
  lockUser: async (req: Request, res: Response, next: NextFunction) => {
    const {
      id_user,
      reason,
    } = req.body;

    try {
      const { message } = await adminService.lockUser({
        id_user,
        reason
      })
      return res.status(httpStatus.CREATED).send({
        message,
      });
    } catch (error) {
      next(error);
    }
  },
  unlockUser: async (req: Request, res: Response, next: NextFunction) => {
    const {
      id_user
    } = req.body;

    try {
      const { message } = await adminService.unlockUser({
        id_user
      })
      return res.status(httpStatus.CREATED).send({
        message,
      });
    } catch (error) {
      next(error);
    }
  },
  changeRoleUser: async (req: Request, res: Response, next: NextFunction) => {
    const {
      id_user,
      id_role,
    } = req.body;

    try {
      const { message } = await adminService.changeRoleUser({
        id_user,
        id_role
      })
      return res.status(httpStatus.CREATED).send({
        message,
      });
    } catch (error) {
      next(error);
    }
  },
  unLockPost: async (req: Request, res: Response, next: NextFunction) => {
    const {
      id_post
    } = req.body;

    try {
      const { message } = await adminService.unlockPost({
        id_post
      })
      if (message) {
        // await authService.sendNotification({ id_post, id_user, type: 'banned_post' })
        // res.send({
        //   message,
        // });
      }
      return res.status(httpStatus.OK).send({
        message,
      });
    } catch (error) {
      next(error);
    }
  },
  lockPost: async (req: Request, res: Response, next: NextFunction) => {
    const {
      id_post,
      id_user,
      reason,
    } = req.body;

    try {
      const { message } = await adminService.lockPost({
        id_post,
        reason
      })
      if (message) {
        await authService.sendNotification({ id_post, id_user, type: 'banned_post' })
        res.send({
          message,
        });
      }
      return res.status(httpStatus.CREATED).send({
        message,
      });
    } catch (error) {
      next(error);
    }
  },
  userStatistics: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { total, increaseMonth } = await adminService.userStatistics();
      if (total) {
        res.send({
          total,
          increaseMonth
        });
      }
    } catch (error) {
      next(error);
    }
  },
  userStatisticsAge: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { statistics } = await adminService.userStatisticsAge();
      if (statistics) {
        res.send({
          statistics
        });
      }
    } catch (error) {
      next(error);
    }
  },
  followStatistics: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { users } = await adminService.followStatistics();
      if (users) {
        res.send({
          users
        });
      }
    } catch (error) {
      next(error);
    }
  },
  postStatistics: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { statistics } = await adminService.postStatistics();
      if (statistics) {
        res.send({
          statistics
        });
      }
    } catch (error) {
      next(error);
    }
  },
};
export default authController;