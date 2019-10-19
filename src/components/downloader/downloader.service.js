import Q from "q";

export class DownloaderService {
  constructor() {}

  download(url) {
    return Q.resolve(`DONE Scraping ${url}`);
  }
}
