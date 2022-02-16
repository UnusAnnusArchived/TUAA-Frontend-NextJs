import ***REMOVED*** NextApiRequest, NextApiResponse ***REMOVED*** from "next";
import ***REMOVED*** IVideo ***REMOVED*** from "../../../../src/types";
import config from "../../../../src/config.json";
import fs from "fs";

export default function s01Metadata(req: NextApiRequest, res: NextApiResponse) ***REMOVED***
  let metadata: [IVideo[], IVideo[]] = [[], []];

  const s00 = fs.readdirSync(`$***REMOVED***config.metadataPath***REMOVED***/00`);
  for (let i = 0; i < s00.length; i++) ***REMOVED***
    metadata[0].push(JSON.parse(fs.readFileSync(`$***REMOVED***config.metadataPath***REMOVED***/00/$***REMOVED***s00[i]***REMOVED***`, "utf-8")));
***REMOVED***

  const s01 = fs.readdirSync(`$***REMOVED***config.metadataPath***REMOVED***/01`);
  for (let i = 0; i < s01.length; i++) ***REMOVED***
    metadata[1].push(JSON.parse(fs.readFileSync(`$***REMOVED***config.metadataPath***REMOVED***/01/$***REMOVED***s01[i]***REMOVED***`, "utf-8")));
***REMOVED***

  res.send(metadata);
***REMOVED***
