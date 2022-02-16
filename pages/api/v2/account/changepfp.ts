import fs from "fs";
import sharp from "sharp";
import { randomBytes } from "crypto";
import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import { IUser } from "../../../../src/types";

export default async function changepfp(req: NextApiRequest, res: NextApiResponse) {
  const users = fs.readdirSync("db/users");
  const body = await parseBody(req);

  const pfp = <formidable.File>body.files.pfp;

  const { loginKey } = req.body;

  var user: IUser;
  for (var i = 0; i < users.length; i++) {
    const currentUser: IUser = JSON.parse(fs.readFileSync(`db/users/${users[i]}`, "utf-8"));
    if (currentUser.loginKeys.includes(loginKey)) {
      user = currentUser;
      break;
    }
  }

  if (!user) {
    return res.send({ error: "Not logged in!" });
  }

  const imageMeta = await sharp(pfp.filepath).metadata();

  let pfpid = randomBytes(4).toString("hex");

  var size = 256;

  if (Math.min(imageMeta.width, imageMeta.height) < 256) {
    size = Math.min(imageMeta.width, imageMeta.height);
  }

  if (!fs.existsSync(`db/userdata/profilepics/${user.id}`)) {
    fs.mkdirSync(`db/userdata/profilepics/${user.id}`);
  }

  await sharp(pfp.filepath).resize(size, size).toFile(`db/userdata/profilepics/${user.id}/${pfpid}.jpg`);

  fs.unlinkSync(pfp.filepath);
  fs.unlinkSync(`db${user.pfp.filename}`);

  user.pfp.originalFilename = pfp.originalFilename;
  user.pfp.filename = `/userdata/profilepics/${user.id}/${pfpid}.jpg`;
  user.pfp.width = size;
  user.pfp.height = size;

  fs.writeFileSync(`db/users/${user.id}.json`, JSON.stringify(user, null, 2));

  if (req.query.redirect) {
    res.redirect(req.query.redirect.toString());
  } else {
    res.send({ status: "success" });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

function parseBody(req: NextApiRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  return new Promise((resolve, reject) => {
    formidable({ multiples: false, uploadDir: "db/userdata/profilepics" }).parse(req, (err, fields, files) => {
      if (err) {
        return reject(err);
      }
      resolve({ fields, files });
    });
  });
}
