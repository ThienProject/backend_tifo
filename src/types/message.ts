export interface IChat {
  id_user?: string;
  id_group?: string;
  message?: string;
}
export interface IGetGroups {
  id_user?: string,
  offset?: number,
  limit?: number,
}
export interface IGetChatsByIDGroup {
  id_user?: string,
  id_group?: string,
  limit?: number,
  offset?: number,
}