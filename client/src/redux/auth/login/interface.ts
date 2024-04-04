import { UserData } from "../../../interfaces";
import { ApiResponse } from "../../../interfaces";

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginUserResponse extends ApiResponse {
  user: UserData;
  accessToken: string;
}
