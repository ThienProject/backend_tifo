export interface INotification {
  id_noti?: string,
  id_user?: string,
  id_actor?: string,
  id_comment?: string,
  id_post?: string,
  id_follow?: string,
  content?: string,
  type?: 'post_love' | 'follow' | 'accept_follow' | 'post_comment' | 'reply'
}