import { Server } from "./src/server.js";
import cors from "cors";
import helmet from "helmet";
import { AppRoutes } from "./src/routes/routes.js";
import { ErrorHandler } from "./src/core/errors/error-handler.core.errors.js";
import { AuthMiddleware } from "./src/middlewares/auth-middleware.middlewares.js";
import cluster from "cluster";
import { availableParallelism } from "os";

if (cluster.isPrimary) {
  console.log(`👑 Master ${process.pid} is running`);
  const cpuCount = availableParallelism();
  console.log(`Available CPUs: ${cpuCount}`);

  for (let i = 0; i < 1; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`🔁 Worker ${worker.process.pid} died with code ${code}, restarting...`);
    cluster.fork();
  });
} else {
  console.log(`👨‍💻 Worker ${process.pid} started`);
  (async () => {
    // Configuración del server
    const router = AppRoutes.routes;
    const server = new Server({
      port: 3100,
      routes: router,
      errorHandler: ErrorHandler.errorHandler,
      middlewares: [
        Server.express.json({ limit: "50mb" }),
        Server.express.urlencoded({ limit: "50mb", extended: true }),
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
}
