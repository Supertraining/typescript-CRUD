import { NextFunction, Request, RequestHandler, Response } from "express";

export interface ICustomGet {
  eqKey: string;
  eqValue: string;
  single?: boolean;
}
export interface ICRUD<T, U, V> {
  create(data: U): Promise<T>;
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T>;
  update(id: string, data: V): Promise<T>;
  delete(id: string): Promise<T>;
  customGet({ eqKey, eqValue, single }: ICustomGet): Promise<T[] | T>;
}

export interface IController extends Record<string, RequestHandler> {
  getAll: RequestHandler;
  getById: RequestHandler;
  update: RequestHandler;
  delete: RequestHandler;
}
