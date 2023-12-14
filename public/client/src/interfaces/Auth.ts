export interface LoginReq {
  email: string;
  password: string;
}
export interface LogOutReq extends Omit<LoginReq, "password"> {}

export interface RegisterReq {
  username: string;
  email: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  isOnline: boolean;
}

export interface CreateGroupReq {
  groupname: string;
}
export interface GetGroupByIdReq {
  groupId: string;
}
export interface SendMessageReq {
  message: string;
}
