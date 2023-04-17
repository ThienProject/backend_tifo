import { Request, Response, NextFunction } from 'express'
import messageServices from '../services/message.services';

import httpStatus from 'http-status';

import { IGetChatsByIDRoom, IGetRooms } from '../types/message';
import { io } from '..';
import { IPayloadSearchRoom } from '../types/message';

const messageController = {
  getChatsByIDRoom: async (req: Request, res: Response, next: NextFunction) => {
    const query: IGetChatsByIDRoom = req.query;
    const id_room = query.id_room;
    try {
      const { chats, message } = await messageServices.getChatsByIDRoom(query);
      if (chats) {
        return res.status(httpStatus.OK).send({
          chats: chats,
          id_room,
          message: message
        })
      }
    } catch (error) {
      next(error);
    }
  },
  getRooms: async (req: Request, res: Response, next: NextFunction) => {
    const query: IGetRooms = req.query;
    console.log(query)
    try {
      const { rooms, message } = await messageServices.getRooms(query);
      if (rooms) {
        return res.status(httpStatus.OK).send({
          rooms: rooms,
          message: message
        })
      }
    } catch (error) {
      next(error);
    }
  },
  searchRoomOrUser: async (req: Request, res: Response, next: NextFunction) => {
    const query: IPayloadSearchRoom = req.query;
    console.log(query);
    try {
      const { users, message } = await messageServices.searchRoomOrUser(query);
      if (users) {
        return res.status(httpStatus.OK).send({
          users,
          message
        })
      }
    } catch (error) {
      next(error);
    }
  }
  ,
  createChat: async (req: Request, res: Response, next: NextFunction) => {
    const {
      id_user,
      id_room,
      id_friend,
      message
    } = req.body;
    try {
      const { chat, date } = await messageServices.createChat({
        id_user,
        id_room,
        message,
        id_friend
      })
      const newChat = {
        chat,
        id_user,
        date,
        id_room
      }
      io.emit("new-chat", newChat);
      return res.status(httpStatus.CREATED).send({ chat });
    } catch (error) {
      next(error);
    }
  },
  createFirstChat: async (req: Request, res: Response, next: NextFunction) => {
    const {
      id_user,
      id_friend,
      message
    } = req.body;
    try {
      const result = await messageServices.createFirstChat({
        id_user,
        message,
        id_friend
      })
      const newChat = {
        ...result
      }
      console.log(newChat);
      io.emit("first-chat", newChat);
      return res.status(httpStatus.CREATED).send({ message: 'ok', id_room: result.id_room });
    } catch (error) {
      next(error);
    }
  },
  createChatGPT: async (req: Request, res: Response, next: NextFunction) => {
    const {
      id_user,
      id_room,
      message
    } = req.body;
    try {
      const { chat, date } = await messageServices.createChatGPT({
        id_user,
        id_room,
        message
      })
      const newChat = {
        chat,
        id_user,
        date,
        id_room,
      }
      return res.status(httpStatus.CREATED).send(newChat);
    } catch (error) {
      next(error);
    }
  },
}
export default messageController