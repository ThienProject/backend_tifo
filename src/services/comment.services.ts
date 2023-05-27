import uniqid from 'uniqid';
import queryDb from '../configs/connectDB';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import { IComment, IGetComments } from '../types/comment';
import { RowDataPacket } from 'mysql2';
import { throws } from 'assert';

var _ = require('lodash');
const commentServices = {
  create: async (body: IComment) => {
    const {
      id_user,
      id_post,
      id_reply = 0,
      id_parent = 0,
      comment
    } = body

    const sql = `insert into comment (id_post, id_user, id_parent, id_reply, comment) value ('${id_post}', '${id_user}', '${id_parent}', '${id_reply}', '${comment}')`
    const row: any = await queryDb(sql);
    if (row.insertId >= 0) {
      const lastRow = await queryDb('SELECT comment.*, user.id_user, user.avatar, user.fullname, user.username FROM comment, user WHERE user.id_user = comment.id_user ORDER BY id_comment DESC LIMIT 1');
      const commentRow: any = lastRow && lastRow[0];
      const id_reply = commentRow?.id_reply;
      if (id_reply != 0) {
        const replyRow = await queryDb(`SELECT  comment.*, user.id_user, user.avatar, user.fullname, user.username FROM comment, user WHERE id_comment =  '${id_reply}' and user.id_user = comment.id_user`);
        commentRow.reply = replyRow && replyRow[0];
      }
      return {
        newComment: commentRow,
      }
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'create comments failed, please try again later!');
    }
  },

  getComments: async (query: IGetComments) => {
    const { id_post } = query;
    const comments: any = await queryDb(`select comment.*, user.id_user,user.avatar, user.fullname, user.username from comment, user where id_post = '${id_post}' and user.id_user = comment.id_user `);
    const roofCmt = [...comments];
    const solveComment = (comments: any[]) => {
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].id_parent == 0) {
          for (let j = 0; j < comments.length; j++) {
            if (comments[i]) {

              if (comments[i].id_comment === comments[j].id_parent) {
                if (!Array.isArray(comments[i].children)) {
                  comments[i].children = [];
                }
                if (comments[j].id_reply != 0) {
                  const index = roofCmt.findIndex((item) => comments[j].id_reply === item.id_comment);
                  if (index != -1) {
                    const { children, ...userReply } = roofCmt[index];
                    comments[j].reply = userReply;
                  }
                }
                comments[i].children?.push(comments[j]);
                comments.splice(j, 1);

                if (j > 0) {
                  j--;
                }
                if (i > 0) {
                  i--;
                }
              }
            }
          }
        }

      }
    };
    solveComment(comments);

    return {
      comments,
    }
  },
  deleteComment: async (body: { id_comment: string }) => {
    const { id_comment } = body;
    const result: any = await queryDb(`delete FROM comment where id_comment = '${id_comment}' or id_parent = '${id_comment}'`);
    if (result.insertId >= 0) {
      return {
        message: 'delete comment success !',
      }
    }
    else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'delete comment fail');
    }
  },
  updateComment: async (body: IComment) => {
    const {
      id_comment,
      comment
    } = body

    const sql = `update comment set comment = '${comment}' where id_comment = '${id_comment}'`
    const row: any = await queryDb(sql);
    if (row.insertId >= 0) {
      return {
        message: 'update comment success!',
      }
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'create comments failed, please try again later!');
    }
  },

}

export default commentServices;