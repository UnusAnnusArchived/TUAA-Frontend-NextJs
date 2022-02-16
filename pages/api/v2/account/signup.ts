import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { IUser } from "../../../../src/types";
import crypto from "crypto";

interface IPostInfo {
  email: string;
  username: string;
  password: string;
  confirmpassword: string;
}

export default function signup(req: NextApiRequest, res: NextApiResponse) {
  const users = fs.readdirSync("db/users");

  let body: IPostInfo = req.body;

  if (body.email && body.username && body.password && body.confirmpassword) {
    if (body.password === body.confirmpassword) {
      let exists = false;

      for (let i = 0; i < users.length; i++) {
        const user: IUser = JSON.parse(fs.readFileSync(`db/users/${users[i]}`, "utf-8"));
        if (user.email.toLowerCase() === body.email.toLowerCase()) {
          exists = true;
          break;
        } else if (user.username.toLowerCase() === body.username.toLowerCase()) {
          exists = true;
          break;
        }
      }

      if (exists) {
        res.send({ success: false, error: { code: 1, message: "Account exists!" } });
      } else {
        const salt = crypto.randomBytes(64).toString("hex");
        const hash = crypto.scryptSync(body.password, salt, 64).toString("hex");
        const id = crypto.randomBytes(16).toString("hex");

        const user: IUser = {
          id,
          email: body.email,
          username: body.username,
          hash,
          salt,
          pfp: {
            originalFilename: "default.jpg",
            filename: "/userdata/profilepics/default.jpg",
            width: 256,
            height: 256,
            format: "image/jpeg",
          },
          loginKeys: [],
        };

        fs.writeFileSync(`db/users/${id}.json`, JSON.stringify(user, null, 2));

        res.send({ success: true, loginURI: "/v2/account/login" });
      }
    } else {
      res.send({ success: false, error: { code: 0, message: "Passwords do not match!" } });
    }
  } else {
    res.send({ success: false, error: { code: 2, message: "Missing info!" } });
  }
}
