import { Router } from "express";
import { IController } from "../interfaces/iCrud";
import { AuthMiddleware } from "../../middlewares/authMiddleware";

export class GenericRoutesImpl {
  constructor(private readonly controller: IController, private readonly router: Router) {}

  routes(middleware?: { get?: any; getById?: any; post?: any; put?: any; delete?: any }): Router {
    const getMiddleware = middleware?.get;
    const getByIdMiddleware = middleware?.getById;
    const postMiddleware = middleware?.post;
    const putMiddleware = middleware?.put;
    const deleteMiddleware = middleware?.delete;

    this.router.get("/", getMiddleware ? [middleware?.get] : [], this.controller.getAll);
    this.router.get("/:id", getByIdMiddleware ? [middleware?.getById] : [], this.controller.getById);
    this.router.post("/", postMiddleware ? [middleware?.post] : [], this.controller.create);
    this.router.put("/:id", putMiddleware ? [middleware?.put] : [], this.controller.update);
    this.router.delete("/:id", deleteMiddleware ? [middleware?.delete] : [], this.controller.delete);

    return this.router;
  }
}
