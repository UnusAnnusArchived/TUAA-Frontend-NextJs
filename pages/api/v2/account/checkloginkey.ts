import fs from "fs";
import ***REMOVED*** NextApiRequest, NextApiResponse ***REMOVED*** from "next";
import ***REMOVED*** IUser ***REMOVED*** from "../../../../src/types";

export default function checkloginkey(req: NextApiRequest, res: NextApiResponse) ***REMOVED***
  const ***REMOVED*** loginKey ***REMOVED*** = req.body;
  const users = fs.readdirSync("db/users");

  var isValid = false;

  for (var i = 0; i < users.length; i++) ***REMOVED***
    const user: IUser = JSON.parse(fs.readFileSync(`db/users/$***REMOVED***users[i]***REMOVED***`, "utf-8"));
    if (user.loginKeys.includes(loginKey)) ***REMOVED***
      //If the key is valid, send the client updated data in case it changed
      isValid = true;
      res.send(***REMOVED*** isValid, user: ***REMOVED*** id: user.id, email: user.email, username: user.username, pfp: user.pfp ***REMOVED*** ***REMOVED***);
      break;
***REMOVED***
***REMOVED***

  if (!isValid) ***REMOVED***
    res.send(***REMOVED*** isValid ***REMOVED***);
***REMOVED***
***REMOVED***
