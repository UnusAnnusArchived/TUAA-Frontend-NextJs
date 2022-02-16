import ***REMOVED*** NextApiRequest, NextApiResponse ***REMOVED*** from "next";
import config from "../../../../../src/config.json";
import fs from "fs";
import ***REMOVED*** handle404 ***REMOVED*** from "../../../_handleErrors";

export default function videoMetadata(req: NextApiRequest, res: NextApiResponse) ***REMOVED***
  const split = req.query.video.toString().toLowerCase().split(".");
  const season = split[0].replace("s", "");
  const episode = split[1].replace("e", "");

  const path = `$***REMOVED***config.metadataPath***REMOVED***/$***REMOVED***season***REMOVED***/$***REMOVED***episode***REMOVED***.json`;
  if (fs.existsSync(path)) ***REMOVED***
    res.send(JSON.parse(fs.readFileSync(path, "utf-8")));
***REMOVED*** else ***REMOVED***
    handle404(req, res);
***REMOVED***
***REMOVED***
