import fs from "fs";
import ***REMOVED*** NextApiRequest, NextApiResponse ***REMOVED*** from "next";
import ***REMOVED*** IUser ***REMOVED*** from "../../../../src/types";
import crypto from "crypto";

interface IPostInfo ***REMOVED***
  email: string;
  username: string;
  password: string;
  confirmpassword: string;
***REMOVED***

export default function signup(req: NextApiRequest, res: NextApiResponse) ***REMOVED***
  const users = fs.readdirSync("src/db/users");

  let body: IPostInfo = req.body;

  if (body.email && body.username && body.password && body.confirmpassword) ***REMOVED***
    if (body.password === body.confirmpassword) ***REMOVED***
      let exists = false;

      for (let i = 0; i < users.length; i++) ***REMOVED***
        const user: IUser = JSON.parse(fs.readFileSync(`src/db/users/$***REMOVED***users[i]***REMOVED***`, "utf-8"));
        if (user.email.toLowerCase() === body.email.toLowerCase()) ***REMOVED***
          exists = true;
          break;
    ***REMOVED*** else if (user.username.toLowerCase() === body.username.toLowerCase()) ***REMOVED***
          exists = true;
          break;
    ***REMOVED***
  ***REMOVED***

      if (exists) ***REMOVED***
        res.send(***REMOVED*** success: false, error: ***REMOVED*** code: 1, message: "Account exists!" ***REMOVED*** ***REMOVED***);
  ***REMOVED*** else ***REMOVED***
        const salt = crypto.randomBytes(64).toString("hex");
        const hash = crypto.scryptSync(body.password, salt, 64).toString("hex");
        const id = crypto.randomBytes(16).toString("hex");

        const user: IUser = ***REMOVED***
          id,
          email: body.email,
          username: body.username,
          hash,
          salt,
          pfp: ***REMOVED***
            originalFilename: "default.jpg",
            filename: "/userdata/profilepics/default.jpg",
            width: 256,
            height: 256,
            format: "image/jpeg",
        ***REMOVED***
          loginKeys: [],
    ***REMOVED***;

        fs.writeFileSync(`src/db/users/$***REMOVED***id***REMOVED***.json`, JSON.stringify(user, null, 2));

        res.send(***REMOVED*** success: true, loginURI: "/v2/account/login" ***REMOVED***);
  ***REMOVED***
***REMOVED*** else ***REMOVED***
      res.send(***REMOVED*** success: false, error: ***REMOVED*** code: 0, message: "Passwords do not match!" ***REMOVED*** ***REMOVED***);
***REMOVED***
***REMOVED*** else ***REMOVED***
    res.send(***REMOVED*** success: false, error: ***REMOVED*** code: 2, message: "Missing info!" ***REMOVED*** ***REMOVED***);
***REMOVED***
***REMOVED***
