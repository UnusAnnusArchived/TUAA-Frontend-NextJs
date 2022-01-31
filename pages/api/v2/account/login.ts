import fs from "fs";
import crypto from "crypto";
import sendEmail from "../../../../src/nodemailerSetup";
import ***REMOVED*** NextApiRequest, NextApiResponse ***REMOVED*** from "next";
import ***REMOVED*** IUser ***REMOVED*** from "../../../../src/types";

export default function getallmetadata(req: NextApiRequest, res: NextApiResponse) ***REMOVED***
  const users = fs.readdirSync("db/users");

  const postInfo = ***REMOVED***
    username: (<string>req.body.username).toLowerCase(),
    password: <string>req.body.password,
    sendEmail: (<string>req.body.sendEmail)?.toLowerCase() || "true"
***REMOVED***;

  let isEmail = postInfo.username.includes("@");

  let validUser: false|IUser = false;
  let loginKey: string;

  for (let i = 0; i < users.length; i++) ***REMOVED***
    const user:IUser = JSON.parse(fs.readFileSync(`db/users/$***REMOVED***users[i]***REMOVED***`, "utf-8"));

    if (postInfo.username === user[isEmail ? "email" : "username"].toLowerCase()) ***REMOVED***
      const hash = crypto.scryptSync(postInfo.password, user.salt, 64).toString("hex");
      if (user.hash === hash) ***REMOVED***
        loginKey = crypto.randomBytes(8).toString("hex");
        user.loginKeys.push(loginKey);
        fs.writeFileSync(`db/users/$***REMOVED***user.id***REMOVED***.json`, JSON.stringify(user, null, 2));
        validUser = user;
  ***REMOVED***
      break;
***REMOVED***
***REMOVED***

  if (validUser) ***REMOVED***
    res.send(***REMOVED***
      isValid: true,
      loginKey,
      user: ***REMOVED***
        id: validUser.id,
        email: validUser.email,
        username: validUser.username,
        pfp: validUser.pfp
  ***REMOVED***
***REMOVED***);
    if (postInfo.sendEmail === "true") ***REMOVED***
      sendEmail("newLogin", validUser.email, (string, isHTML = false) => ***REMOVED***
        validUser = <IUser>validUser; // ts is being weird
        let str = string.replace(/***REMOVED******REMOVED*** user.email ***REMOVED******REMOVED***/g, validUser.email).replace(/***REMOVED******REMOVED*** user.pfp.filename ***REMOVED******REMOVED***/g, validUser.pfp.filename);
        if (isHTML) ***REMOVED***
          str = str.replace(/***REMOVED******REMOVED*** user.username ***REMOVED******REMOVED***/g, validUser.username.replace(/ /g, "&nbsp;"));
    ***REMOVED*** else ***REMOVED***
          str = str.replace(/***REMOVED******REMOVED*** user.username ***REMOVED******REMOVED***/g, validUser.username);
    ***REMOVED***
        return str;
  ***REMOVED***);
***REMOVED***
***REMOVED***
***REMOVED***
