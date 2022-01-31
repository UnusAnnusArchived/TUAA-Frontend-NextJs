import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { IUser } from "../../../../src/types";

interface IPostInfo {
  loginKeys: string[]|["*"];
  loginKey: string;
  id: string;
}

export default function logout(req: NextApiRequest, res: NextApiResponse) {
  const users = fs.readdirSync("db/users");

  const postInfo:IPostInfo = req.body;

  let account:IUser;

  for (let i = 0; i < users.length; i++) {
    const user:IUser = JSON.parse(fs.readFileSync(`db/users/${users[i]}`, "utf-8"));

    if (user.id === postInfo.id && user.loginKeys.includes(postInfo.loginKey)) {
      account = user;
    }
  }

  if (account) {

  } else {

  }
}
