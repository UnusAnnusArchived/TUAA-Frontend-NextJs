import { NextApiRequest, NextApiResponse } from "next";
import { IVideo } from "../../../../../../src/types";
import config from "../../../../../../src/config.json";
import fs from "fs";
import handlers, { detect } from "../../_handler";

export default function s01Metadata(req: NextApiRequest, res: NextApiResponse) {
  let metadata: IVideo[] = [];

  const season = fs.readdirSync(`${config.metadataPath}/${(req.query.season as string).replace("s", "")}`);
  for (let i = 0; i < season.length; i++) {
    const currentMetadata: IVideo = JSON.parse(
      fs.readFileSync(`${config.metadataPath}/${(req.query.season as string).replace("s", "")}/${season[i]}`, "utf-8")
    );
    const version = detect(currentMetadata);
    const wantedVersion = parseInt(req.query.version as string) || (req.query.version as string);
    metadata.push(handlers[version][wantedVersion](currentMetadata));
  }

  res.send(metadata);
}
