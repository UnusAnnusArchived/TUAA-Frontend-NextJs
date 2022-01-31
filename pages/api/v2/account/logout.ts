import fs from "fs";
import ***REMOVED*** NextApiRequest, NextApiResponse ***REMOVED*** from "next";
import ***REMOVED*** IUser ***REMOVED*** from "../../../../src/types";

interface IPostInfo ***REMOVED***
  loginKeys: string[]|["*"];
  loginKey: string;
  id: string;
***REMOVED***

export default function logout(req: NextApiRequest, res: NextApiResponse) ***REMOVED***
  const users = fs.readdirSync("db/users");

  const postInfo:IPostInfo = req.body;

  let account:IUser;

  for (let i = 0; i < users.length; i++) ***REMOVED***
    const user:IUser = JSON.parse(fs.readFileSync(`db/users/$***REMOVED***users[i]***REMOVED***`, "utf-8"));

    if (user.id === postInfo.id && user.loginKeys.includes(postInfo.loginKey)) ***REMOVED***
      account = user;
***REMOVED***
***REMOVED***

  if (account) ***REMOVED***

***REMOVED*** else ***REMOVED***

***REMOVED***
***REMOVED***
