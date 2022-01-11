import fs from "fs";
import config from "../../../../src/config.json";
import ***REMOVED*** handle404 ***REMOVED*** from "../../_handleErrors";
import ***REMOVED*** NextApiRequest, NextApiResponse ***REMOVED*** from "next";

export default function getallmetadata(req: NextApiRequest, res: NextApiResponse) ***REMOVED***
  const split = (<string>req.query.video).toLowerCase().split(".");
  const season = split[0].replace("s", "");
  const episode = split[1].replace("e", "");

  const path = `$***REMOVED***config.metadataPath***REMOVED***/$***REMOVED***season***REMOVED***/$***REMOVED***episode***REMOVED***.json`;
  if (fs.existsSync(path)) ***REMOVED***
    res.setHeader("content-type", "application/json");
    res.send(fs.readFileSync(path, "utf-8"));
***REMOVED*** else ***REMOVED***
    return handle404(req, res);
***REMOVED***
***REMOVED***
