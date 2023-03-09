import { IUser } from "./user";

export interface IComment extends IUser {
  id_comment?: string;
  id_post?: string;
  id_parent?: number;
  date_time?: Date;
  comment?: string;
  loves?: string;
  children?: IComment[];
  user_reply?: IUser[];
  id_reply?: string;
}
export interface IGetComments {
  id_post?: string,
}
