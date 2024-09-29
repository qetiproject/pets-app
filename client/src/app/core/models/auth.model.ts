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
  accessToken: string;
  email: string;
  role: IRole;
  status: string;
  username: string;
}

export interface IRegister {
  username: string;
  role: IRole;
  email: string;
  password: string;
}

export interface IRegisterResponse {
  username: string;
  role: IRole;
  status: string;
}