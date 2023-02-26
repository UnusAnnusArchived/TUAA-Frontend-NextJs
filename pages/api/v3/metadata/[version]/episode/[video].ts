import { NextApiRequest, NextApiResponse } from "next";
import config from "../../../../../../src/config.json";
import fs from "fs";
import { handle404 } from "../../../../_handleErrors";
import { IVideo } from "../../../../../../src/types";
import handlers, { detect } from "../../_handler";

export default function videoMetadata(req: NextApiRequest, res: NextApiResponse) {
  const split = req.query.video.toString().toLowerCase().split(".");
  const season = split[0].replace("s", "");
  const episode = split[1].replace("e", "");

  const path = `${config.metadataPath}/${season}/${episode}.json`;
  if (fs.existsSync(path)) {
    const metadata: IVideo = JSON.parse(fs.readFileSync(path, "utf-8"));
    const version = detect(metadata);
    const wantedVersion = parseInt(req.query.version as string) || (req.query.version as string);
    res.send(handlers[version][wantedVersion](metadata));
  } else {
    handle404(req, res);
  }
}
