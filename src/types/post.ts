export interface IPost {
  id_user?: string,
  id_post?: string,
  id_target?: string,
  id_type?: string,
  date_time?: string | Date,
  description?: string,
  is_banned?: boolean,
  banned_reason?: string,
  medias?: [],
}