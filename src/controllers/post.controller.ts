import { Request, Response, NextFunction } from 'express'
import postService from '../services/post.services';
import { generateToken } from '../middleware/auth/JWT';
import httpStatus from 'http-status';
import { IGetPosts } from '../types/post';
import ApiError from '../utils/ApiError';
import { send } from 'process';
const fs = require('fs');

const postController = {
  getPostById: async (req: Request, res: Response, next: NextFunction) => {

  },
  getPosts: async (req: Request, res: Response, next: NextFunction) => {
    const query: IGetPosts = req.query;
    try {
      const { posts, message } = await postService.getPosts(query);
      if (posts) {
        return res.status(httpStatus.OK).send({
          posts: posts,
          message: message
        })
      }
    } catch (error) {
      next(error);
    }
  },
  create: async (req: Request, res: Response, next: NextFunction) => {
    const {
      id_user,
      target,
      type,
      description,

    } = req.body;
    const medias: any = req.files;

    try {
      const { message } = await postService.create({
        id_user,
        target,
        type,
        description,
        medias
      })
      return res.status(httpStatus.CREATED).send({
        message
      });
    } catch (error) {
      next(error);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    return res.status(httpStatus.OK).send({

    });
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    return res.status(httpStatus.OK).send({

    });
  }
}
export default postController;