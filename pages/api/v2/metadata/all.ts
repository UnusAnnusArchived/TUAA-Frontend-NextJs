import { NextApiRequest, NextApiResponse } from "next";
import { IVideo } from "../../../../src/types";
import config from "../../../../src/config.json";
import fs from "fs";

export default function s01Metadata(req: NextApiRequest, res: NextApiResponse) {
  let metadata: [IVideo[], IVideo[]] = [[], []];

  const s00 = fs.readdirSync(`${config.metadataPath}/00`);
  for (let i = 0; i < s00.length; i++) {
    metadata[0].push(JSON.parse(fs.readFileSync(`${config.metadataPath}/00/${s00[i]}`, "utf-8")));
  }

  const s01 = fs.readdirSync(`${config.metadataPath}/01`);
  for (let i = 0; i < s01.length; i++) {
    metadata[1].push(JSON.parse(fs.readFileSync(`${config.metadataPath}/01/${s01[i]}`, "utf-8")));
  }

  res.send(metadata);
}
