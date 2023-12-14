import { User } from "./Auth";

export interface ApiResponse {
  status: boolean;
  user: User;
  msg: string;
}

export interface APIGroupResponse extends Omit<ApiResponse, "user"> {
  group: Group;
}

export interface Group {
  _id: string;
  groupname: string;
  members: Members[];
  messages: Message[];
}

export interface Members {
  userId: string;
  name: string;
}

export interface Message {
  sender: Sender;
  _id?: string;
}

export interface Sender {
  userId: string;
  name: string;
  content: string;
  timestamp?: string;
}
