import { User } from "./Auth";

export interface ApiResponse {
  status: boolean;
  user: User;
  msg: string;
}
