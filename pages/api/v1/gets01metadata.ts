import fs from "fs";
import config from "../../../src/config.json";
import { NextApiRequest, NextApiResponse } from "next";
import { IVideo } from "../../../src/types";

export default function getallmetadata(req: NextApiRequest, res: NextApiResponse) {
  var metadata:IVideo[] = [];

  const s01 = fs.readdirSync(`${config.metadataPath}/01`);
  for (var i = 0; i < s01.length; i++) {
    metadata.push(JSON.parse(fs.readFileSync(`${config.metadataPath}/01/${s01[i]}`, "utf-8")));
  }

  res.send(metadata);
}
