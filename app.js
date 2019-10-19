import express from 'express';

class Server {
  constructor() {
    this.app = express();

    // Configure routes
    this.routes();
  }

  routes() {
    this.app.use((err, _req, res, next) => {

      err.status ? res.status(err.status).send(err.msg) : res.status(400).send(err);

      return next();
    });

    this.app.get('/healthCheck', cors(), (_req, res) => {
      res.send(`Server is up for ${process.uptime()}s`);
    });
  }
}

const server = new Server();
export const app = server.app;
