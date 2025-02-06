import { Request } from "express";

export interface IrequestWithUser extends Request {
  user: {
    fullname: string;
    email: string;
    password: string;
    roles: string[];
    id: string;
    img?: string;
  };
}
