import { Request, Response, NextFunction } from 'express'
import postService from '../services/post.services';
import { generateToken } from '../middleware/auth/JWT';
import httpStatus from 'http-status';
import { IGetPostByID, IGetPosts } from '../types/post';
import ApiError from '../utils/ApiError';
import { send } from 'process';
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
    const {
      id_post,
      loves,
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
        loves,
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
    return res.status(httpStatus.OK).send({

    });
  }
}
export default postController;