import { Request, Response, NextFunction } from 'express'
import postService from '../services/post.services';
import { generateToken } from '../middleware/auth/JWT';
import httpStatus from 'http-status';
import { IGetPostByID, IGetPosts } from '../types/post';
import ApiError from '../utils/ApiError';
import { send } from 'process';
import { sendMessage } from '../configs/chatGPT_api';
const fs = require('fs');

const postController = {
  getPostByID: async (req: Request, res: Response, next: NextFunction) => {
    const query: IGetPostByID = req.query;
    try {
      const { post, message } = await postService.getPostByID(query);
      if (post) {
        return res.status(httpStatus.OK).send({
          post: post,
          message: message
        })
      }
    } catch (error) {
      next(error);
    }
  },
  getPosts: async (req: Request, res: Response, next: NextFunction) => {
    const query: IGetPosts = req.query;
    try {
      const { posts, message } = await postService.getPosts(query);
      if (posts) {
        return res.status(httpStatus.OK).send({
          type: query.type,
          posts: posts,
          message: message
        })
      }
    } catch (error) {
      next(error);
    }
  },
  getPostsByIDUser: async (req: Request, res: Response, next: NextFunction) => {
    const { id_user, offset, limit } = req.query;
    try {
      const { posts, message } = await postService.getPostsByIDUser({ id_user, offset, limit });
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
  getReelsByIDUser: async (req: Request, res: Response, next: NextFunction) => {
    const { id_user, offset, limit } = req.query;
    try {
      const { posts, message } = await postService.getReelsByIDUser({ id_user, offset, limit });
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
  getSavesByIDUser: async (req: Request, res: Response, next: NextFunction) => {
    const { id_user, offset, limit } = req.query;
    try {
      const { posts, message } = await postService.getSavesByIDUser({ id_user, offset, limit });
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
      const { message, post } = await postService.create({
        id_user,
        target,
        type,
        description,
        medias
      })
      return res.status(httpStatus.CREATED).send({
        message,
        post
      });
    } catch (error) {
      next(error);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    const {
      id_post,
      view,
      banned_reason,
      is_banned,
      id_user,
      target,
      description,
    } = req.body;
    const medias: any = req.files;

    try {
      const { message, post } = await postService.update({
        id_post,
        view,
        banned_reason,
        is_banned,
        id_user,
        target,
        description,
        medias
      })
      return res.status(httpStatus.CREATED).send({
        message, post
      });
    } catch (error) {
      next(error);
    }
  },
  updateLove: async (req: Request, res: Response, next: NextFunction) => {
    const {
      id_post,
      isLove,
      id_user
    } = req.body;

    try {
      const { message, loves } = await postService.updateLove({
        id_post,
        isLove,
        id_user
      })
      return res.status(httpStatus.CREATED).send({
        message, loves
      });
    } catch (error) {
      next(error);
    }
  },
  updateSave: async (req: Request, res: Response, next: NextFunction) => {
    const {
      id_post,
      isSave,
      id_user
    } = req.body;

    try {
      const { message, saves } = await postService.updateSave({
        id_post,
        isSave,
        id_user
      })
      return res.status(httpStatus.CREATED).send({
        message, saves
      });
    } catch (error) {
      next(error);
    }
  },
  replaceMedias: async (req: Request, res: Response, next: NextFunction) => {
    const medias: any = req.files;
    try {
      const bodyMediasOLD = req.body.old_medias;
      const old_medias = typeof bodyMediasOLD === "string" ? JSON.parse(bodyMediasOLD) : bodyMediasOLD;

      const { message } = await postService.replaceMedias({
        old_medias, medias
      })
      return res.status(httpStatus.CREATED).send({
        message
      });
    } catch (error) {
      next(error);
    }

  },
  deleteMedias: async (req: Request, res: Response, next: NextFunction) => {
    const { medias } = req.body;
    // console.log(medias);
    try {
      const { message } = await postService.deleteMedias({
        medias
      })
      return res.status(httpStatus.CREATED).send({
        message
      });
    } catch (error) {
      next(error);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    const { id_post } = req.body;
    try {
      const { message } = await postService.delete({ id_post });
      if (message) {
        return res.status(httpStatus.OK).send({
          id_post,
          message: message
        })
      }
    } catch (error) {
      next(error);
    }
  },
  getDescriptionAuto: async (req: Request, res: Response, next: NextFunction) => {
    const {
      prompt
    } = req.body;
    try {
      const description = await sendMessage(prompt);
      return res.status(httpStatus.CREATED).send({
        description
      });
    } catch (error) {
      next(error);
    }
  },
}
export default postController;