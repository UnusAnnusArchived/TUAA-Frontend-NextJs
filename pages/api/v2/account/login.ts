import fs from "fs";
import crypto from "crypto";
import sendEmail from "../../../../src/nodemailerSetup";
import ***REMOVED*** NextApiRequest, NextApiResponse ***REMOVED*** from "next";
import ***REMOVED*** IUser ***REMOVED*** from "../../../../src/types";

export default function getallmetadata(req: NextApiRequest, res: NextApiResponse) ***REMOVED***
  var metadata:IVideo[] = [];

  const s01 = fs.readdirSync(`$***REMOVED***config.metadataPath***REMOVED***/01`);
  for (var i = 0; i < s01.length; i++) ***REMOVED***
    metadata.push(JSON.parse(fs.readFileSync(`$***REMOVED***config.metadataPath***REMOVED***/01/$***REMOVED***s01[i]***REMOVED***`, "utf-8")));
***REMOVED***

  res.send(metadata);
***REMOVED***
