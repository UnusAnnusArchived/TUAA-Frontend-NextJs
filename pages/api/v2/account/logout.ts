import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { IUser } from "../../../../src/types";
import { handle401 } from "../../_handleErrors";

interface IPostInfo {
  loginKeys: string[];
  loginKey: string;
  id: string;
}

export default function logout(req: NextApiRequest, res: NextApiResponse) {
  const users = fs.readdirSync("db/users");

  const postInfo: IPostInfo = req.body;

  let account: IUser;

  for (let i = 0; i < users.length; i++) {
    const user: IUser = JSON.parse(fs.readFileSync(`db/users/${users[i]}`, "utf-8"));

    if (user.id === postInfo.id && user.loginKeys.includes(postInfo.loginKey)) {
      account = user;
      break;
    }
  }

  if (account) {
    if (postInfo.loginKey && !postInfo.loginKeys) {
      postInfo.loginKeys = [postInfo.loginKey];
    }

    if (postInfo.loginKeys.includes("*")) {
      account.loginKeys = [];
      fs.writeFileSync(`db/users/${account.id}.json`, JSON.stringify(account));
      res.send({ status: "success" });
    } else {
      for (let i = 0; i < postInfo.loginKeys.length; i++) {
        const index = account.loginKeys.indexOf(postInfo.loginKeys[i]);
        account.loginKeys.splice(index, 1);
      }
      fs.writeFileSync(`db/users/${account.id}.json`, JSON.stringify(account, null, 2));
      res.send({ status: "success" });
    }
  } else {
    handle401(req, res);
  }
}
