import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { IUser } from "../../../../src/types";

export default function checkloginkey(req: NextApiRequest, res: NextApiResponse) {
  const { loginKey } = req.body;
  const users = fs.readdirSync("db/users");

  var isValid = false;

  for (var i = 0; i < users.length; i++) {
    if (users[i].endsWith(".json")) {
      const user: IUser = JSON.parse(fs.readFileSync(`db/users/${users[i]}`, "utf-8"));
      if (user.loginKeys.includes(loginKey)) {
        //If the key is valid, send the client updated data in case it changed
        isValid = true;
        res.send({ isValid, user: { id: user.id, email: user.email, username: user.username, pfp: user.pfp } });
        break;
      }
    }
  }

  if (!isValid) {
    res.send({ isValid });
  }
}
