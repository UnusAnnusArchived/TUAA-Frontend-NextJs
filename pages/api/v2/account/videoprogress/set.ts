import fs from "fs";
import ***REMOVED*** IUser ***REMOVED*** from "../../../../../src/types";
import ***REMOVED*** NextApiRequest, NextApiResponse ***REMOVED*** from "next";
import ***REMOVED*** handle401 ***REMOVED*** from "../../../_handleErrors";

export default function setVideoProgress(req:NextApiRequest, res:NextApiResponse) ***REMOVED***
  const ***REMOVED*** uid, loginKey, uaid, progress ***REMOVED*** = req.body;
  const users = fs.readdirSync("db/users");

  let loginIsValid = false;

  for (let i = 0; i < users.length; i++) ***REMOVED***
    const user:IUser = JSON.parse(fs.readFileSync(`db/users/$***REMOVED***users[i]***REMOVED***`, "utf-8"));
    if (user.id === uid && user.loginKeys.includes(loginKey)) ***REMOVED***
      loginIsValid = true;
      break;
***REMOVED***
***REMOVED***

  if (loginIsValid) ***REMOVED***
    if (uaid && progress) ***REMOVED***
      const videoProgress = ***REMOVED***
        uaid,
        progress
  ***REMOVED***;
      if (!fs.existsSync(`db/uservideoprogress/$***REMOVED***uid***REMOVED***`)) ***REMOVED***
        fs.mkdirSync(`db/uservideoprogress/$***REMOVED***uid***REMOVED***`);
  ***REMOVED***
      fs.writeFileSync(`db/uservideoprogress/$***REMOVED***uid***REMOVED***/$***REMOVED***uaid***REMOVED***.json`, JSON.stringify(videoProgress));
      res.send(videoProgress);
***REMOVED*** else ***REMOVED***
      res.status(400).send(***REMOVED***error:***REMOVED***code:400,message:"Missing fields!"***REMOVED******REMOVED***);
***REMOVED***
***REMOVED*** else ***REMOVED***
    handle401(req, res);
***REMOVED***
***REMOVED***
