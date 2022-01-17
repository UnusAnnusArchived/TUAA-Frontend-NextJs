import fs from "fs";
import ***REMOVED*** handle401 ***REMOVED*** from "../../../_handleErrors";
import ***REMOVED*** IUser ***REMOVED*** from "../../../../../src/types";
import ***REMOVED*** NextApiRequest, NextApiResponse ***REMOVED*** from "next";

export default function getVideoProgress(req:NextApiRequest, res:NextApiResponse) ***REMOVED***
  const ***REMOVED*** uid, loginKey, uaid ***REMOVED*** = req.body;
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
    if (uaid) ***REMOVED***
      try ***REMOVED***
        const videoProgress = JSON.parse(fs.readFileSync(`db/uservideoprogress/$***REMOVED***uid***REMOVED***/$***REMOVED***uaid***REMOVED***.json`, "utf-8"));
        res.send(videoProgress);
  ***REMOVED*** catch ***REMOVED***
        res.send(***REMOVED***uaid,progress:0***REMOVED***);
  ***REMOVED***
***REMOVED*** else ***REMOVED***
      res.status(400).send(***REMOVED***error:***REMOVED***code:400,message:"Missing Fields!"***REMOVED******REMOVED***);
***REMOVED***
***REMOVED*** else ***REMOVED***
    handle401(req, res);
***REMOVED***
***REMOVED***
