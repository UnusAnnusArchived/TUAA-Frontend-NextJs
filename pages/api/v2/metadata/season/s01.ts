import { NextApiRequest, NextApiResponse } from "next";
import { IVideo } from "../../../../../src/types";
import config from "../../../../../src/config.json";
import fs from "fs";

export default function s01Metadata(req: NextApiRequest, res: NextApiResponse) {
  let metadata: IVideo[] = [];

  const s01 = fs.readdirSync(`${config.metadataPath}/01`);
  for (let i = 0; i < s01.length; i++) {
    metadata.push(JSON.parse(fs.readFileSync(`${config.metadataPath}/01/${s01[i]}`, "utf-8")));
  }

  res.send(metadata);
}
