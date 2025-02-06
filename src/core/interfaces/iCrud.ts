import { NextFunction, Request, RequestHandler, Response } from "express";

export interface ICRUD<T, U, V> {
  create(data: U): Promise<T>;
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T>;
  update(id: string, data: V): Promise<T>;
  delete(id: string): Promise<T>;
}

export interface IController extends Record<string, RequestHandler> {
  create: RequestHandler;
  getAll: RequestHandler;
  getById: RequestHandler;
  update: RequestHandler;
  delete: RequestHandler;
}

