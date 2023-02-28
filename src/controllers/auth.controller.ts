import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status';
import authService from '../services/auth.services';
const authController = {
  getMe: async function (req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    try {
      const { user, messages } = await authService.getMe(email);
      if (user) {
        res.send({
          user, messages
        });
      }
    } catch (error) {
      next(error);
    }
  },
  register: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, fullname } = req.body;
    try {
      const { user, messages } = await authService.register({ email, password, fullname });
      if (user) {
        res.send({
          user, messages
        })
      }
    } catch (error) {
      next(error);
    }
  },
  login: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
      const { user, messages } = await authService.login({ email, password });
      if (user) {
        res.send({
          user, messages
        })
      }
    } catch (error) {
      next(error);
    }
  }
};
export default authController;