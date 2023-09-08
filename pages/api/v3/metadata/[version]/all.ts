import { NextApiRequest, NextApiResponse } from "next";
import handlers, { detect } from "../_handler";
import { IVideo } from "../../../../../src/types";
import config from "../../../../../src/config.json";
import fs from "fs";

export default function all(req: NextApiRequest, res: NextApiResponse) {
  let metadata: [IVideo[], IVideo[]] = [[], []];

  const parse = (seasonPath: string, seasonIndex: number, episodePath: string) => {
    const currentMetadata: IVideo = JSON.parse(
      fs.readFileSync(`${config.metadataPath}/${seasonPath}/${episodePath}`, "utf-8")
    );
    const version = detect(currentMetadata);
    const wantedVersion = parseInt(req.query.version as string) || (req.query.version as string);
    metadata[seasonIndex].push(handlers[version][wantedVersion](currentMetadata));
  };

  const s00 = fs.readdirSync(`${config.metadataPath}/00`);
  for (let i = 0; i < s00.length; i++) {
    parse("00", 0, s00[i]);
  }

  const s01 = fs.readdirSync(`${config.metadataPath}/01`);
  for (let i = 0; i < s01.length; i++) {
    parse("01", 1, s01[i]);
  }

  res.send(metadata);
}
