import {DetectorService} from "./detector.service";

export class DetectorRoutes {
  constructor() {
    this.detectorService = new DetectorService();
  }

  findBroken(req, res) {
    console.log(req.query['url']);
    return this.detectorService.brokenLinks(req.query['url'])
      .then(data => res.send(data))
      .catch(e => res.status(400).send(e))
  }
}
