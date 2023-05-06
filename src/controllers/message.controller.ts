import { Request, Response, NextFunction } from 'express'
import messageServices from '../services/message.services';

import httpStatus from 'http-status';

import { IGetChatsByIDRoom, IGetRooms } from '../types/message';
import { io, userSockets } from '..';
import { IPayloadSearchRoom } from '../types/message';
import { object } from 'joi';

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
  getUsersByIDRoom: async (req: Request, res: Response, next: NextFunction) => {
    const query: { id_room?: string } = req.query;
    try {
      const { users, message } = await messageServices.getUsersByIDRoom(query);
      if (users) {
        return res.status(httpStatus.OK).send({
          users,
          message
        })
      }
    } catch (error) {
      next(error);
    }
  },
  deleteRoom: async (req: Request, res: Response, next: NextFunction) => {
    const {
      id_room
    } = req.body;
    try {
      const { message } = await messageServices.deleteRoom({
        id_room
      })
      return res.status(httpStatus.CREATED).send(message);
    } catch (error) {
      next(error);
    }
  },
  addMembers: async (req: Request, res: Response, next: NextFunction) => {
    const {
      users, id_room
    } = req.body;
    try {
      if (users) {
        const { id_room } = await messageServices.addMembers({
          users,
          id_room,
        })
        users.forEach((user: { id_user: string, isOwner?: boolean }) => {
          const userSocket = userSockets[user.id_user]
          if (userSocket) {
            userSocket.join(id_room);
            const newUsers = users.map((item: any) => { if (item.isOwner) item.role = 1; return item })
            userSocket.emit('create-room', { name, id_room, chat, avatar, date, users: newUsers, type: 'group' })
          }
        })
        // io.to(id_room).emit('create-room', { name, id_room, chat })
        return res.status(httpStatus.CREATED).send({ chat });
      }

    } catch (error) {
      next(error);
    }
  },
  searchRoomOrUser: async (req: Request, res: Response, next: NextFunction) => {
    const query: IPayloadSearchRoom = req.query;

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
      isChatbot,
      message
    } = req.body;
    try {
      if (!isChatbot) {
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
      }
      else {
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
          isChatbot
        }
        return res.status(httpStatus.CREATED).send(newChat);
      }

    } catch (error) {
      next(error);
    }
  },
  deleteChats: async (req: Request, res: Response, next: NextFunction) => {
    const {
      id_user,
      id_room
    } = req.body;
    try {
      const { message } = await messageServices.deleteChats({
        id_user,
        id_room
      })
      return res.status(httpStatus.CREATED).send(message);
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
      io.emit("first-chat", newChat);
      return res.status(httpStatus.CREATED).send({ message: 'ok', id_room: result.id_room });
    } catch (error) {
      next(error);
    }
  },
  createRoom: async (req: Request, res: Response, next: NextFunction) => {
    const {
      users, name, type
    } = req.body;
    try {
      if (users) {
        const { id_room, chat, avatar, date } = await messageServices.createRoom({
          users,
          name,
          type: 'group'
        })
        users.forEach((user: { id_user: string, isOwner?: boolean }) => {
          const userSocket = userSockets[user.id_user]
          if (userSocket) {
            userSocket.join(id_room);
            const newUsers = users.map((item: any) => { if (item.isOwner) item.role = 1; return item })
            userSocket.emit('create-room', { name, id_room, chat, avatar, date, users: newUsers, type: 'group' })
          }
        })
        // io.to(id_room).emit('create-room', { name, id_room, chat })
        return res.status(httpStatus.CREATED).send({ chat });
      }

    } catch (error) {
      next(error);
    }
  },

}
export default messageController