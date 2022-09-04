import fs from "fs";
import { IUser } from "../../../../../src/types";
import { NextApiRequest, NextApiResponse } from "next";
import { handle401 } from "../../../_handleErrors";

export default function setVideoProgress(req:NextApiRequest, res:NextApiResponse) {
  const { uid, loginKey, uaid, progress } = req.body;
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
    if (uaid && progress) {
      const videoProgress = {
        uaid,
        progress
      };
      if (!fs.existsSync(`db/uservideoprogress/${uid}`)) {
        fs.mkdirSync(`db/uservideoprogress/${uid}`);
      }
      fs.writeFileSync(`db/uservideoprogress/${uid}/${uaid}.json`, JSON.stringify(videoProgress));
      res.send(videoProgress);
    } else {
      res.status(400).send({error:{code:400,message:"Missing fields!"}});
    }
  } else {
    handle401(req, res);
  }
}
