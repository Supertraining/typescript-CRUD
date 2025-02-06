import { RequestHandler, Router } from "express";
import { CustomError } from "../errors/customError";

export class GenericRoutesImpl<T extends Record<string, RequestHandler>> {
  constructor(private readonly controller: T, private readonly router: Router) {}

  routes(
    arg: {
      method: Method;
      path: string;
      middlewares: RequestHandler[];
      controller: keyof T;
    }[]
  ): Router {
    const methods: Record<Method, any> = {
      get: this.router.get.bind(this.router),
      post: this.router.post.bind(this.router),
      put: this.router.put.bind(this.router),
      delete: this.router.delete.bind(this.router),
    };

    arg.forEach(({ method, path, middlewares, controller }) => {
      const handler = this.controller[controller]; 
      
      if (typeof handler !== "function") {
        throw CustomError.internalError(`El controlador '${String(controller)}' no es una función.`);
      }

      methods[method](path, middlewares || [], handler.bind(this.controller));
    });

    return this.router;
  }
}
