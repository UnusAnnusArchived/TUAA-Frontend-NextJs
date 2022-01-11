import fs from "fs";
import config from "../../../../src/config.json";
import { NextApiRequest, NextApiResponse } from "next";
import { ISwiftMetadata } from "../../../../src/types";

export default function getallmetadata(req: NextApiRequest, res: NextApiResponse) {
  var metadata:ISwiftMetadata = {
    specials: [],
    season1: []
  };

  const s00 = fs.readdirSync(`${config.metadataPath}/00`);
  for (var i = 0; i < s00.length; i++) {
    metadata.specials.push(JSON.parse(fs.readFileSync(`${config.metadataPath}/00/${s00[i]}`, "utf-8")));
  }

  const s01 = fs.readdirSync(`${config.metadataPath}/01`);
  for (var i = 0; i < s01.length; i++) {
    metadata.season1.push(JSON.parse(fs.readFileSync(`${config.metadataPath}/01/${s01[i]}`, "utf-8")));
  }

  res.send(metadata);
}
