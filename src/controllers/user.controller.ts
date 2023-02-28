import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status';
import userService from '../services/user.services';
const userController = {
  getUsers: async (req: Request, res: Response, next: NextFunction) => {
    const { q }: { q: string } = req.body;
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
  }
}
export default userController;