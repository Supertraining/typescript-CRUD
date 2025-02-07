import { Router } from "express";
import { IAuthController } from "../interfaces/iAuth";

export class AuthRoutes {
  constructor(private readonly controller: IAuthController, private readonly router: Router) {}

  routes(): Router {
    this.router.post("/login", this.controller.login);
    this.router.post("/register", this.controller.register);

    return this.router;
  }
}
