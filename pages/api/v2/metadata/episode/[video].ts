import { NextApiRequest, NextApiResponse } from "next";
import config from "../../../../../src/config.json";
import fs from "fs";
import { handle404 } from "../../../_handleErrors";

export default function videoMetadata(req: NextApiRequest, res: NextApiResponse) {
  const split = req.query.video.toString().toLowerCase().split(".");
  const season = split[0].replace("s", "");
  const episode = split[1].replace("e", "");

  const path = `${config.metadataPath}/${season}/${episode}.json`;
  if (fs.existsSync(path)) {
    res.send(JSON.parse(fs.readFileSync(path, "utf-8")));
  } else {
    handle404(req, res);
  }
}
