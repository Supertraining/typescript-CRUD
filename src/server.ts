import express, { Router } from "express";
import { populateDB } from "../playground.js";

interface Options {
  port?: number;
  routes: Router;
  middlewares: express.RequestHandler[];
  errorHandler: express.ErrorRequestHandler;
  notFoundHandler: express.RequestHandler;
}

export class Server {
  public static express = express;
  public readonly app: express.Application;
  private readonly port: number;
  private readonly routes: Router;
  private readonly middlewares: express.RequestHandler[];
  private readonly errorHandler: express.ErrorRequestHandler;
  private readonly notFoundHandler: express.RequestHandler;

  constructor(options: Options) {
    const { port = 3100, routes, middlewares, errorHandler, notFoundHandler } = options;
    this.app = express();
    this.port = port;
    this.routes = routes;
    this.middlewares = middlewares;
    this.errorHandler = errorHandler;
    this.notFoundHandler = notFoundHandler;
  }
  async start() {
    this.app.use([...this.middlewares]);
    this.app.use(this.routes);
    this.app.use(this.errorHandler);
    this.app.use(this.notFoundHandler);
    this.app.listen(this.port);
    console.log(`Server running on port ${this.port} process ${process.pid}`);
    // populateDB();
  }
}
