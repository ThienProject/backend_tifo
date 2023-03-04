import { Request, Response, NextFunction } from 'express'
import postService from '../services/post.services';
import { generateToken } from '../middleware/auth/JWT';
const fs = require('fs');

const postController = {
  getPostById: async (req: Request, res: Response, next: NextFunction) => {

  },
  getPosts: async (req: Request, res: Response, next: NextFunction) => {

  },
  create: async (req: Request, res: Response, next: NextFunction) => {

    const {
      id_user,
      id_target,
      id_type,
      description,

    } = req.body;
    const medias: any = req.files;

    try {
      const { message } = await postService.create({
        id_user,
        id_target,
        id_type,
        description,
        medias
      })
      return res.send({
        message
      });
    } catch (error) {
      next(error);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {

  },
  delete: async (req: Request, res: Response, next: NextFunction) => {

  }
}
export default postController;