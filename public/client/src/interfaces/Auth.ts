export interface LoginReq {
  email: string;
  password: string;
}

export interface RegisterReq {
  email: string;
  loginPassword: string;
}

export interface UserRoot {
  status: boolean;
  user: User;
  msg: string;
}

export interface User {
  _id: string;
  email: string;
  username: string;
  isAvatarImageSet: boolean;
  avatarImage: string;
  __v: number;
}

export interface Id {
  $oid: string;
}
