import { NextApiRequest, NextApiResponse } from "next";
import { IVideo } from "../../../../../src/types";
import config from "../../../../../src/config.json";
import fs from "fs";

export default function s00Metadata(req: NextApiRequest, res: NextApiResponse) {
  let metadata: IVideo[] = [];

  const s00 = fs.readdirSync(`${config.metadataPath}/00`);
  for (let i = 0; i < s00.length; i++) {
    metadata.push(JSON.parse(fs.readFileSync(`${config.metadataPath}/00/${s00[i]}`, "utf-8")));
  }

  res.send(metadata);
}
