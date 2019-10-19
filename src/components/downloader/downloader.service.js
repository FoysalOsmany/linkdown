import Q from "q";
import cheerio from "cheerio";
import {asyncBrowse} from "../../utils";

export class DownloaderService {
  constructor() {
    this.version = {};
  }

  download(url) {
    return asyncBrowse(url)
      .then(body => {
        let $ = cheerio.load(body);
        let versionSection;

        const pSections = $('#content #g1-section-1')
          .find('p')
          .each((index, element) => {
            if (element
              && $(element).html()
              && $(element).html().includes('Current version')) {
              versionSection = $(element).html();
            }
          });

        if (versionSection) {
          let versionNumber;

          versionSection.split('<b>').forEach(versionInfo => {
            if (versionInfo.includes('</b>') && versionInfo) {
              console.log(versionInfo);
              const versionMatch = versionInfo.substring(0, versionInfo.indexOf('</b>'));

              console.log(versionMatch);

              if (versionMatch.length < 12) {
                versionNumber = versionMatch;

                console.log('VN', versionNumber);

                if (versionInfo.includes('Office 365')) {
                  this.version['office365'] = versionNumber;
                }
                if (versionInfo.includes('SharePoint 2019') || versionInfo.includes('2019')) {
                  this.version['sharePoint2019'] = versionNumber;
                }
                if (versionInfo.includes('SharePoint 2016') || versionInfo.includes('2016')) {
                  this.version['sharePoint2016'] = versionNumber;
                }
                if (versionInfo.includes('SharePoint 2013') || versionInfo.includes('2013')) {
                  this.version['sharePoint2013'] = versionNumber;
                }
              }
            }
          });

          return Q.resolve(this.version);

        } else {
          return Q.reject('Could not find version info.')
        }
      })
      .catch(e => {
        console.error("DE", e);
        return Q.reject(e)
      });
  }
}
