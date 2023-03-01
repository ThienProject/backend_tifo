import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status';
import authService from '../services/auth.services';
import tokenService from '../services/token.services'
const authController = {
  getMe: async function (req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    try {
      const { user, message } = await authService.getMe(email);
      if (user) {
        res.send({
          user, message
        });
      }
    } catch (error) {
      next(error);
    }
  },
  register: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, fullname, username } = req.body;
    try {
      const { user, message } = await authService.register({ email, password, fullname, username });
      if (user) {
        res.send({
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
        const { accessToken, refreshToken } = tokenService.generateToken(user);
        res.send({
          user, message,
          accessToken,
          refreshToken
        })
      }
    } catch (error) {
      next(error);
    }
  }
};
export default authController;