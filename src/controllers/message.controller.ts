import { Request, Response, NextFunction } from 'express'
import messageServices from '../services/message.services';
import { generateToken } from '../middleware/auth/JWT';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import { send } from 'process';
import { IGetChatsByIDGroup, IGetGroups } from '../types/message';
import { io } from '..';

const messageController = {
  getChatsByIDGroup: async (req: Request, res: Response, next: NextFunction) => {
    const query: IGetChatsByIDGroup = req.query;
    const id_group = query.id_group;
    try {
      const { chats, message } = await messageServices.getChatsByIDGroup(query);
      if (chats) {
        return res.status(httpStatus.OK).send({
          chats: chats,
          id_group,
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
  createChat: async (req: Request, res: Response, next: NextFunction) => {
    const {
      id_user,
      id_group,
      message
    } = req.body;
    try {
      const { chat, date } = await messageServices.createChat({
        id_user,
        id_group,
        message
      })
      const newChat = {
        chat,
        id_user,
        date,
        id_group,
      }
      io.emit("new-chat", newChat);
      return res.status(httpStatus.CREATED).send(newChat);
    } catch (error) {
      next(error);
    }
  },
}
export default messageController