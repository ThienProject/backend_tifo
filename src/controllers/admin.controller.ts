import { Request, Response, NextFunction } from 'express'
import adminService from '../services/admin.services';
import { generateToken } from '../middleware/auth/JWT'
import httpStatus from 'http-status';
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
};
export default authController;