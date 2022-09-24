import fs from "fs";
import crypto from "crypto";
import sendEmail from "../../../../src/nodemailerSetup";
import { NextApiRequest, NextApiResponse } from "next";
import { IUser } from "../../../../src/types";

export default function getallmetadata(req: NextApiRequest, res: NextApiResponse) {
  const users = fs.readdirSync("db/users");

  const postInfo = {
    username: (<string>req.body.username).toLowerCase(),
    password: <string>req.body.password,
    sendEmail: (<string>req.body.sendEmail)?.toLowerCase() || "true",
  };

  let isEmail = postInfo.username.includes("@");

  let validUser: false | IUser = false;
  let loginKey: string;

  for (let i = 0; i < users.length; i++) {
    if (users[i].endsWith(".json")) {
      const user: IUser = JSON.parse(fs.readFileSync(`db/users/${users[i]}`, "utf-8"));

      if (postInfo.username === user[isEmail ? "email" : "username"].toLowerCase()) {
        const hash = crypto.scryptSync(postInfo.password, user.salt, 64).toString("hex");
        if (user.hash === hash) {
          loginKey = crypto.randomBytes(8).toString("hex");
          user.loginKeys.push(loginKey);
          fs.writeFileSync(`db/users/${user.id}.json`, JSON.stringify(user, null, 2));
          validUser = user;
        }
        break;
      }
    }
  }

  if (validUser) {
    res.send({
      isValid: true,
      loginKey,
      user: {
        id: validUser.id,
        email: validUser.email,
        username: validUser.username,
        pfp: validUser.pfp,
      },
    });
    if (postInfo.sendEmail === "true") {
      sendEmail("newLogin", validUser.email, (string, isHTML = false) => {
        validUser = <IUser>validUser; // ts is being weird
        let str = string
          .replace(/{{ user.email }}/g, validUser.email)
          .replace(/{{ user.pfp.filename }}/g, validUser.pfp.filename);
        if (isHTML) {
          str = str.replace(/{{ user.username }}/g, validUser.username.replace(/ /g, "&nbsp;"));
        } else {
          str = str.replace(/{{ user.username }}/g, validUser.username);
        }
        return str;
      });
    }
  }
}
