import Q from "q";
import cheerio from "cheerio";
import {asyncBrowse, asyncRequest, pingCheck} from "../../utils";

export class DetectorService {
  constructor() {
    this.version = {};
  }

  brokenLinks(url) {
    return asyncBrowse(url)
      .then(body => {
        let promises = [];
        let linkUrls = [];

        let $ = cheerio.load(body);
        const links = $('a');

        $(links).each(function(i, link) {
          if (link && $(link).attr('href')) {
            let hyperlink = $(link).attr('href').startsWith('https://')
            || $(link).attr('href').startsWith('http://')
              ? $(link).attr('href')
              : 'https://demos.shortpoint.com' + $(link).attr('href');

            linkUrls.push(hyperlink);
            promises.push(asyncRequest(hyperlink));
          }
        });

        return Q.all(promises)
          .then(result => {
            return Q.resolve(linkUrls.map((pageLink, i) => {
              return {
                link: pageLink,
                status: result[i] && (result[i] === 200 || result[i] === 401 || result[i] === 443) ? 'UP' : 'DOWN'
              }
            }))
          })
          .catch(e => Q.resolve)
      });
  }
}
