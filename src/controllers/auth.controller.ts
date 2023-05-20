import { Request, Response, NextFunction } from 'express'
import authService from '../services/auth.services';
import { generateToken } from '../middleware/auth/JWT'
import httpStatus from 'http-status';
const authController = {
  getMe: async function (req: Request, res: Response, next: NextFunction) {
    const { id_user } = req.body;
    try {
      const { user, message } = await authService.getMe(id_user);
      if (user) {
        res.send({
          user, message
        });
      }
    } catch (error) {
      next(error);
    }
  },
  getNotifications: async (req: Request, res: Response, next: NextFunction) => {
    const { id_user, limit, offset, time, category, sort } = req.body;
    try {
      const { notifications, message } = await authService.getNotifications({ sort, id_user, limit, offset, time, category });
      if (notifications) {
        res.send({
          notifications, message
        });
      }
    } catch (error) {
      next(error);
    }
  },
  sendNotification: async (req: Request, res: Response, next: NextFunction) => {
    const { id_user, id_actor, content, type } = req.body;
    try {
      const { message } = await authService.sendNotification({ id_user, id_actor, content, type });
      if (message) {
        res.send({
          message
        });
      }
    } catch (error) {
      next(error);
    }
  }
  ,
  register: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, fullname, username, birthday } = req.body;
    try {
      const { user, message } = await authService.register({ email, password, fullname, username, birthday });
      if (user) {
        res.status(httpStatus.CREATED).send({
          user, message
        })
      }
    } catch (error) {
      next(error);
    }
  },
  login: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
      const { user, message } = await authService.login({ email, password });

      if (user) {
        const { accessToken, refreshToken } = generateToken(user);
        res.status(httpStatus.OK).send({
          user, message,
          accessToken,
          refreshToken
        })
      }
    } catch (error) {
      next(error);
    }
  },
  updateInfo: async (req: Request, res: Response, next: NextFunction) => {
    const { id_user, email, phone, fullname, username, description, birthday, gender } = req.body;
    try {
      const { user, message, rules } = await authService.updateInfo({ id_user, email, phone, fullname, username, description, birthday, gender });
      if (user) {
        const { accessToken, refreshToken } = generateToken(user);
        res.status(httpStatus.OK).send({
          user, message, accessToken, refreshToken
        })
      }
      if (rules) {
        res.status(httpStatus.OK).send({
          message, rules
        })
      }
    } catch (error) {
      next(error);
    }
  },
  updatePassword: async (req: Request, res: Response, next: NextFunction) => {
    const { id_user, password, currentPassword } = req.body;
    try {
      const { message } = await authService.updatePassword({ id_user, password, currentPassword });
      if (message) {
        res.status(httpStatus.OK).send({
          message
        })
      }
    } catch (error) {
      next(error);
    }
  },
  updateImage: async (req: Request, res: Response, next: NextFunction) => {
    const { type, id_user } = req.body;
    const image = req.file;
    try {
      const { message, user } = await authService.updateImage({ image, type, id_user });
      if (message) {
        if (user) {
          const { accessToken, refreshToken } = generateToken(user);
          res.status(httpStatus.OK).send({
            user, message, accessToken, refreshToken, user_image: image?.filename, type
          })
        }
      }
    } catch (error) {
      next(error);
    }
  },
  updateInvisible: async (req: Request, res: Response, next: NextFunction) => {
    const { id_user, invisible } = req.body;
    try {
      const { message } = await authService.updateInvisible({ id_user, invisible });
      if (message) {
        res.status(httpStatus.OK).send({
          message, invisible
        })
      }
    } catch (error) {
      next(error);
    }
  }
};
export default authController;