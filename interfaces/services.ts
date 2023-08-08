// import { ISettings } from "../interfaces";
import { HttpStatusCode } from "axios";
import { IUser, LoginType, UserType } from ".";

export interface IResponseLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

export interface IResponseMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: [
    {
      url: string | null;
      label: string | null;
      active: boolean | null;
    }
  ];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface ResponseBody<T> {
  status: HttpStatusCode;
  message: string;
  data: T;
}

export interface LoginRequest {
  matno: string;
  password: string;
}

export interface LoginResponse {
  status: 200;
  login_type: LoginType;
  token: string;
  user: IUser;
  user_type: UserType;
  token_type: "bearer";
  expires_in: number;
}
