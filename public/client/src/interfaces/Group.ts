export interface CreateGroupReq {
  groupname: string;
}

export interface GroupRoot {
  status: boolean;
  groups: Group[];
  msg: string;
}

export interface Group {
  _id: string;
  groupname: string;
  users: User[];
  __v: number;
}

export interface User {
  userId: string;
  username: string;
  isOnline: boolean;
  _id: string;
}
