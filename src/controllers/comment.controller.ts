import { Request, Response, NextFunction } from 'express'
import commentServices from '../services/comment.services';
import { generateToken } from '../middleware/auth/JWT';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import { send } from 'process';
import { IGetComments } from '../types/comment';
import { compile } from 'joi';
import { io } from '..';

const fs = require('fs');

const commentController = {
  getComments: async (req: Request, res: Response, next: NextFunction) => {
    const query: IGetComments = req.query;
    try {
      const { comments } = await commentServices.getComments(query);
      if (comments) {
        return res.status(httpStatus.OK).send({
          comments: comments,
        })
      }
    } catch (error) {
      next(error);
    }
  },
  create: async (req: Request, res: Response, next: NextFunction) => {
    const {
      id_user,
      id_post,
      id_reply,
      id_parent,
      comment,
    } = req.body;

    try {
      const { newComment } = await commentServices.create({
        id_user,
        id_post,
        id_reply,
        id_parent,
        comment
      })
      io.emit("new-comment", { newComment });
      return res.status(httpStatus.CREATED).send({
        newComment
      });
    } catch (error) {
      next(error);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    const {
      id_parent,
      id_comment,
      id_user,
      comment
    } = req.body
    try {
      const { message } = await commentServices.updateComment({
        id_comment,
        comment,
        id_parent,
        id_user
      })
      io.emit("edit-comment", {
        editComment: {
          id_comment,
          comment,
          id_parent,
          id_user
        }
      });
      return res.status(httpStatus.OK).send({
        message
      });
    } catch (error) {
      next(error)
    }

  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    const {
      id_comment,
      id_parent,
      id_user,
    } = req.body;
    try {
      const { message } = await commentServices.deleteComment({ id_comment });
      io.emit("delete-comment", {
        deleteComment: {
          id_comment,
          id_parent,
          id_user
        }
      });
      return res.status(httpStatus.OK).send({
        message
      });
    } catch (error) {
      next(error);
    }

  }
}
export default commentController;