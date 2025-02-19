import { IGenericRoutes } from "../../../core/interfaces/iGenericRoutes";

export const customPdfRoutes: IGenericRoutes[] = [
  {
    path: "/",
    method: "post",
    middlewares: [],
    controller: "create",
  },
];
