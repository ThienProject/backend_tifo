import { Request, Response, NextFunction } from 'express'
import messageServices from '../services/message.services';
import { generateToken } from '../middleware/auth/JWT';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import { send } from 'process';
import { IGetGroups } from '../types/message';

const messageController = {
  getChatsByIDGroup: async (req: Request, res: Response, next: NextFunction) => {
    const query: IGetGroups = req.query;
    try {
      const { chats, message } = await messageServices.getChatsByIDGroup(query);
      if (chats) {
        return res.status(httpStatus.OK).send({
          chats: chats,
          message: message
        })
      }
    } catch (error) {
      next(error);
    }
  },
  getGroups: async (req: Request, res: Response, next: NextFunction) => {
    const query: IGetGroups = req.query;
    console.log(query)
    try {
      const { groups, message } = await messageServices.getGroups(query);
      if (groups) {
        return res.status(httpStatus.OK).send({
          groups: groups,
          message: message
        })
      }
    } catch (error) {
      next(error);
    }
  },
}
export default messageController