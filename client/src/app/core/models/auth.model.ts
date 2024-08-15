import { IRole } from "./enums";

export interface IUser {
  id: number;
  name: string;
  email: string;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface ILoginResponse {
  message: string;
  token: string;
  user: IUser;
}

export interface IRegister {
  username: string;
  role: IRole;
  email: string;
  password: string;
}

export interface IRegisterResponse {
  email: string;
  role: IRole;
  username: string;
  status: string;
}