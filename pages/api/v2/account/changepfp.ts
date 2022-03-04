import fs from "fs";
import sharp from "sharp";
import ***REMOVED*** randomBytes ***REMOVED*** from "crypto";
import formidable from "formidable";
import ***REMOVED*** NextApiRequest, NextApiResponse ***REMOVED*** from "next";
import ***REMOVED*** IUser ***REMOVED*** from "../../../../src/types";

export default async function changepfp(req: NextApiRequest, res: NextApiResponse) ***REMOVED***
  const users = fs.readdirSync("db/users");
  const body = await parseBody(req);

  const pfp = <formidable.File>body.files.pfp;

  const loginKey = body.fields.loginKey as string;

  var user: IUser;
  for (var i = 0; i < users.length; i++) ***REMOVED***
    const currentUser: IUser = JSON.parse(fs.readFileSync(`db/users/$***REMOVED***users[i]***REMOVED***`, "utf-8"));
    if (currentUser.loginKeys.includes(loginKey)) ***REMOVED***
      user = currentUser;
      break;
***REMOVED***
***REMOVED***

  if (!user) ***REMOVED***
    return res.send(***REMOVED*** error: "Not logged in!" ***REMOVED***);
***REMOVED***

  const imageMeta = await sharp(pfp.filepath).metadata();

  let pfpid = randomBytes(4).toString("hex");

  var size = 256;

  if (Math.min(imageMeta.width, imageMeta.height) < 256) ***REMOVED***
    size = Math.min(imageMeta.width, imageMeta.height);
***REMOVED***

  if (!fs.existsSync(`db/userdata/profilepics/$***REMOVED***user.id***REMOVED***`)) ***REMOVED***
    fs.mkdirSync(`db/userdata/profilepics/$***REMOVED***user.id***REMOVED***`);
***REMOVED***

  await sharp(pfp.filepath).resize(size, size).toFile(`db/userdata/profilepics/$***REMOVED***user.id***REMOVED***/$***REMOVED***pfpid***REMOVED***.jpg`);

  fs.unlinkSync(pfp.filepath);
  fs.unlinkSync(`db$***REMOVED***user.pfp.filename***REMOVED***`);

  user.pfp.originalFilename = pfp.originalFilename;
  user.pfp.filename = `/userdata/profilepics/$***REMOVED***user.id***REMOVED***/$***REMOVED***pfpid***REMOVED***.jpg`;
  user.pfp.width = size;
  user.pfp.height = size;

  fs.writeFileSync(`db/users/$***REMOVED***user.id***REMOVED***.json`, JSON.stringify(user, null, 2));

  if (req.query.redirect) ***REMOVED***
    res.redirect(req.query.redirect.toString());
***REMOVED*** else ***REMOVED***
    res.send(***REMOVED*** status: "success" ***REMOVED***);
***REMOVED***
***REMOVED***

export const config = ***REMOVED***
  api: ***REMOVED***
    bodyParser: false,
***REMOVED***
***REMOVED***;

function parseBody(req: NextApiRequest): Promise<***REMOVED*** fields: formidable.Fields; files: formidable.Files ***REMOVED***> ***REMOVED***
  return new Promise((resolve, reject) => ***REMOVED***
    formidable(***REMOVED*** multiples: false, uploadDir: "db/userdata/profilepics", keepExtensions: true ***REMOVED***).parse(
      req,
      (err, fields, files) => ***REMOVED***
        if (err) ***REMOVED***
          return reject(err);
    ***REMOVED***
        resolve(***REMOVED*** fields, files ***REMOVED***);
  ***REMOVED***
    );
***REMOVED***);
***REMOVED***
