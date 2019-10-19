import express from 'express';
import {ComponentRoutes} from "./components/component.routes";

class Server {
  constructor() {
    this.app = express();

    // Configure routes
    this.routes();
  }

  routes() {
    let componentRoutes = new ComponentRoutes();
    let router = componentRoutes.setupRoutes();

    // Add Routes from Component Routes
    this.app.use(router);

    this.app.use((err, _req, res, next) => {
      console.error(`Error: ${err}`);

      err.status ? res.status(err.status).send(err.msg) : res.status(400).send(err);

      return next();
    });

    this.app.get('/healthCheck', (_req, res) => {
      res.send(`Server is up for ${process.uptime()}s`);
    });
  }
}

const server = new Server();
export const app = server.app;
