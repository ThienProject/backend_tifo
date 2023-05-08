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
        rooms.forEach((room: any) => {
          room.users.forEach((user: { id_user: string, isOwner?: boolean }) => {
            const userSocket = userSockets[user.id_user]
            if (userSocket) {
              userSocket.join(room.id_room);
            }
          })
        })

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
  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    const {
      id_room, id_user, id_owner
    } = req.body;
    try {
      const { message, chat, avatar, date } = await messageServices.deleteUser({
        id_room, id_user, id_owner
      })
      if (id_owner) {
        io.to(id_room).emit('delete_member', { id_user, id_room, message, chat, avatar, date })
      }
      const userSocket = userSockets[id_user];
      if (userSocket) {
        userSocket.leave(id_room);
      }
      return res.status(httpStatus.CREATED).send({ message, id_room, id_owner });
    } catch (error) {
      next(error);
    }
  },
  addMembers: async (req: Request, res: Response, next: NextFunction) => {
    const {
      users, id_room, id_user
    } = req.body;
    try {
      if (users) {
        const { message, chats, limit, room, newUsers } = await messageServices.addMembers({
          users, id_room, id_user
        })
        users.forEach((user: { id_user: string, isOwner?: boolean }) => {
          const userSocket = userSockets[user.id_user]
          if (userSocket) {
            userSocket.join(id_room);
          }
        })
        io.to(id_room).emit('add_members', { users: newUsers, id_room, message, chats, limit, room })
        return res.status(httpStatus.CREATED).send({ id_room, message, chats, limit, users });
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
      result.users.forEach(async (user: { id_user: string, isOwner?: boolean }) => {
        const userSocket = userSockets[user.id_user]
        if (userSocket) {
          userSocket.join(result.id_room);
        }
      })
      io.to(result.id_room).emit("first-chat", newChat);
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

        users.forEach(async (user: { id_user: string, isOwner?: boolean }) => {
          const userSocket = userSockets[user.id_user]
          if (userSocket) {
            userSocket.join(id_room);
          }
        })
        const newUsers = users.map((item: any) => { if (item.isOwner) item.role = 1; return item })
        io.to(id_room).emit('create-room', { name, id_room, chat, avatar, date, users: newUsers, type: 'group' })
        return res.status(httpStatus.CREATED).send({ chat });
      }
    } catch (error) {
      next(error);
    }
  },

}
export default messageController