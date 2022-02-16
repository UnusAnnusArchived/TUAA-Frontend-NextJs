import fs from "fs";
import ***REMOVED*** NextApiRequest, NextApiResponse ***REMOVED*** from "next";
import ***REMOVED*** IUser ***REMOVED*** from "../../../../src/types";
import ***REMOVED*** handle401 ***REMOVED*** from "../../_handleErrors";

interface IPostInfo ***REMOVED***
  loginKeys: string[];
  loginKey: string;
  id: string;
***REMOVED***

export default function logout(req: NextApiRequest, res: NextApiResponse) ***REMOVED***
  const users = fs.readdirSync("db/users");

  const postInfo: IPostInfo = req.body;

  let account: IUser;

  for (let i = 0; i < users.length; i++) ***REMOVED***
    const user: IUser = JSON.parse(fs.readFileSync(`db/users/$***REMOVED***users[i]***REMOVED***`, "utf-8"));

    if (user.id === postInfo.id && user.loginKeys.includes(postInfo.loginKey)) ***REMOVED***
      account = user;
      break;
***REMOVED***
***REMOVED***

  if (account) ***REMOVED***
    if (postInfo.loginKeys.includes("*")) ***REMOVED***
      account.loginKeys = [];
      fs.writeFileSync(`db/users/$***REMOVED***account.id***REMOVED***.json`, JSON.stringify(account));
      res.send(***REMOVED*** status: "success" ***REMOVED***);
***REMOVED*** else ***REMOVED***
      for (let i = 0; i < postInfo.loginKeys.length; i++) ***REMOVED***
        const index = account.loginKeys.indexOf(postInfo.loginKeys[i]);
        account.loginKeys.splice(index, 1);
  ***REMOVED***
      fs.writeFileSync(`db/users/$***REMOVED***account.id***REMOVED***.json`, JSON.stringify(account, null, 2));
      res.send(***REMOVED*** status: "success" ***REMOVED***);
***REMOVED***
***REMOVED*** else ***REMOVED***
    handle401(req, res);
***REMOVED***
***REMOVED***
