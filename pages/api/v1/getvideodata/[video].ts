import fs from "fs";
import config from "../../../../src/config.json";
import { handle404 } from "../../_handleErrors";
import { NextApiRequest, NextApiResponse } from "next";

export default function getallmetadata(req: NextApiRequest, res: NextApiResponse) {
  const split = (<string>req.query.video).toLowerCase().split(".");
  const season = split[0].replace("s", "");
  const episode = split[1].replace("e", "");

  const path = `${config.metadataPath}/${season}/${episode}.json`;
  if (fs.existsSync(path)) {
    res.setHeader("content-type", "application/json");
    res.send(fs.readFileSync(path, "utf-8"));
  } else {
    return handle404(req, res);
  }
}
