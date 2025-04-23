import type { RequestHandler } from "express";


export interface IBaseCrud<T, U, V> {
  create(data: U): Promise<T>;
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T>;
  update(id: string, data: V): Promise<T>;
  delete(id: string): Promise<T>;
}

export interface ICustomGet {
  eqKey: string;
  eqValue: string;
  single?: boolean;
}

export interface IBaseCrudExtended<T, U, V> extends IBaseCrud<T, U, V> {
  customGet(params: ICustomGet): Promise<T[] | T>;
}


export interface IBaseController extends Record<string, RequestHandler> {
  getAll: RequestHandler;
  getById: RequestHandler;
  update: RequestHandler;
  delete: RequestHandler;
}

