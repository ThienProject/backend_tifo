export interface IPost {
  id_user?: string,
  id_post?: string,
  target?: string,
  type?: string,
  date_time?: string | Date,
  description?: string,
  is_banned?: boolean,
  banned_reason?: string,
  medias?: [],
}
export interface IGetPosts {
  id_user?: string,
  offset?: number,
  limit?: number,
}