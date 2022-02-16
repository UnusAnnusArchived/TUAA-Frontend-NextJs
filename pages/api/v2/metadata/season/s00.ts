import ***REMOVED*** NextApiRequest, NextApiResponse ***REMOVED*** from "next";
import ***REMOVED*** IVideo ***REMOVED*** from "../../../../../src/types";
import config from "../../../../../src/config.json";
import fs from "fs";

export default function s00Metadata(req: NextApiRequest, res: NextApiResponse) ***REMOVED***
  let metadata: IVideo[] = [];

  const s00 = fs.readdirSync(`$***REMOVED***config.metadataPath***REMOVED***/00`);
  for (let i = 0; i < s00.length; i++) ***REMOVED***
    metadata.push(JSON.parse(fs.readFileSync(`$***REMOVED***config.metadataPath***REMOVED***/00/$***REMOVED***s00[i]***REMOVED***`, "utf-8")));
***REMOVED***

  res.send(metadata);
***REMOVED***
