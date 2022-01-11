import fs from "fs";
import config from "../../../src/config.json";
import ***REMOVED*** NextApiRequest, NextApiResponse ***REMOVED*** from "next";
import ***REMOVED*** IVideo ***REMOVED*** from "../../../src/types";

export default function getallmetadata(req: NextApiRequest, res: NextApiResponse) ***REMOVED***
  var metadata:IVideo[][] = [[], []];

  const s00 = fs.readdirSync(`$***REMOVED***config.metadataPath***REMOVED***/00`);
  for (var i = 0; i < s00.length; i++) ***REMOVED***
    metadata[0].push(JSON.parse(fs.readFileSync(`$***REMOVED***config.metadataPath***REMOVED***/00/$***REMOVED***s00[i]***REMOVED***`, "utf-8")));
***REMOVED***

  const s01 = fs.readdirSync(`$***REMOVED***config.metadataPath***REMOVED***/01`);
  for (var i = 0; i < s01.length; i++) ***REMOVED***
    metadata[1].push(JSON.parse(fs.readFileSync(`$***REMOVED***config.metadataPath***REMOVED***/01/$***REMOVED***s01[i]***REMOVED***`, "utf-8")));
***REMOVED***

  res.send(metadata);
***REMOVED***
