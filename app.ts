import { Server } from "./src/server";
import cors from "cors";
import helmet from "helmet";
import { AppRoutes } from "./src/routes/routes";
import { ErrorHandler } from "./src/core/errors/errorHandler";
import { AuthMiddleware } from "./src/middlewares/authMiddleware";

(async () => {
  const router = AppRoutes.routes;
  const server = new Server({
    port: 3100,
    routes: router,
    errorHandler: ErrorHandler.errorHandler,
    middlewares: [
      Server.express.json({
        limit: "50mb",
      }),
      Server.express.urlencoded({
        limit: "50mb",
        extended: true,
      }),
      AuthMiddleware.validateApiKey,
      cors(),
      helmet(),
    ],
    notFoundHandler: (req, res) => {
      res.status(404).json({ error: "Not Found" });
    },
  });

  await server.start();
})();
