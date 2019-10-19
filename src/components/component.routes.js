import express from "express";
import {DownloaderRoutes} from "./downloader/downloader.routes";

export class ComponentRoutes {
  constructor() {
    this.router = express.Router();
    this.downloaderRoutes = new DownloaderRoutes();
  }

  setupRoutes() {
    this.router.get('/download', this.downloaderRoutes.download.bind(this.downloaderRoutes));

    return this.router;
  }
}
