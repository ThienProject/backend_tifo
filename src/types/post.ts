export interface IPost {
  id_user?: string,
  id_post?: string,
  target?: string,
  type?: string,
  date_time?: string | Date,
  description?: string,
  is_banned?: boolean,
  banned_reason?: string,
  loves?: number | string,
  view?: number | string,
  medias?: [],
}
export interface IGetPosts {
  id_user?: string,
  offset?: number,
  limit?: number,
  type?: string,
}
export interface IGetPostByID {
  id_user?: string,
  id_post?: string,
}