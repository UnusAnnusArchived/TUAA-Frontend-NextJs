import fs from "fs";
import { handle401 } from "../../../_handleErrors";
import { IUser } from "../../../../../src/types";
import { NextApiRequest, NextApiResponse } from "next";

export default function getVideoProgress(req:NextApiRequest, res:NextApiResponse) {
  const { uid, loginKey, uaid } = req.body;
  const users = fs.readdirSync("db/users");

  let loginIsValid = false;

  for (let i = 0; i < users.length; i++) {
    const user:IUser = JSON.parse(fs.readFileSync(`db/users/${users[i]}`, "utf-8"));
    if (user.id === uid && user.loginKeys.includes(loginKey)) {
      loginIsValid = true;
      break;
    }
  }

  if (loginIsValid) {
    if (uaid) {
      try {
        const videoProgress = JSON.parse(fs.readFileSync(`db/uservideoprogress/${uid}/${uaid}.json`, "utf-8"));
        res.send(videoProgress);
      } catch {
        res.send({uaid,progress:0});
      }
    } else {
      res.status(400).send({error:{code:400,message:"Missing Fields!"}});
    }
  } else {
    handle401(req, res);
  }
}
