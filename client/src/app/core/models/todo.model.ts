import { ITodoType } from '.';

export interface ITodo {
  _id?: number;
  title: string;
  description: string;
  status: ITodoType;
  createdAt?: string;
  updatedAt?: string;
}
