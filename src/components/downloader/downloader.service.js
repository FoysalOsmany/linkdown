import Q from "q";
import {asyncRequest} from "../../utils";

export class DownloaderService {
  constructor() {}

  download(url) {
    console.log('scrap', url);
    return asyncRequest(url)
      .then((d) => {
        console.log('DATA', d);
        return Q.resolve({
          url: url,
          length: d ? d.length : 0
        })
      })
      .catch(e => {
        console.error("DE", e);
        return Q.reject(e)
      });
  }
}
