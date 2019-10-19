import express from "express";
import {DownloaderRoutes} from "./downloader/downloader.routes";
import {DetectorRoutes} from "./detector/detector.routes";

export class ComponentRoutes {
  constructor() {
    this.router = express.Router();
    this.downloaderRoutes = new DownloaderRoutes();
    this.detectorRoutes = new DetectorRoutes();
  }

  setupRoutes() {
    this.router.get('/download', this.downloaderRoutes.download.bind(this.downloaderRoutes));
    this.router.get('/detect-broken', this.detectorRoutes.findBroken.bind(this.detectorRoutes));

    return this.router;
  }
}
