import {DownloaderService} from "./downloader.service";

export class DownloaderRoutes {
  constructor() {
    this.downloaderService = new DownloaderService();
  }

  download(req, res) {
    console.log(req.query['url']);
    return this.downloaderService.download(req.query['url'])
      .then(data => res.send(data))
      .catch(e => res.status(400).send(e))
  }
}
