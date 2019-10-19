import Q from "q";
import {asyncBrowse, asyncRequest} from "../../utils";

export class DownloaderService {
  constructor() {
  }

  download(url) {
    console.log('scrap', url);
    return Q.all([
      asyncRequest(url),
      asyncBrowse(url)
    ]).spread((httpData, browsedData) => {
        return Q.resolve({
          httpData,
          browsedData
        })
      })
      .catch(e => {
        console.error("DE", e);
        return Q.reject(e)
      });
  }
}
