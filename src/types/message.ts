export interface IChat {
  id_user?: string;
  id_room?: string;
  id_friend?: string;
  message?: string;
}
export interface IGetRooms {
  id_user?: string,
  offset?: number,
  limit?: number,
}
export interface IGetChatsByIDRoom {
  id_user?: string,
  id_room?: string,
  limit?: number,
  offset?: number,
}
export interface IPayloadSearchRoom {
  id_user?: string;
  q?: string;
  limit?: number;
  offset?: number;
}