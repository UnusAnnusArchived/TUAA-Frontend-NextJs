import ***REMOVED*** NextApiRequest, NextApiResponse ***REMOVED*** from "next";
import fs from "fs";
import MarkdownIt from "markdown-it";
import mdIterator from "markdown-it-for-inline";
import ***REMOVED*** IStoredComment, IUser ***REMOVED*** from "../../../../../src/types";
import ***REMOVED*** promiseQuery ***REMOVED*** from "../../../../../src/mysqlSetup";

const md = MarkdownIt(***REMOVED*** html: false, xhtmlOut: false, breaks: true, langPrefix: "", linkify: true ***REMOVED***)
  .disable(["image", "link"])
  .use(mdIterator, "url_new_win", "link_open", (tokens, idx) => ***REMOVED***
    const [attrName, href] = tokens[idx].attrs.find((attr) => attr[0] === "href");

    if (href) ***REMOVED***
      tokens[idx].attrPush(["target", "_blank"]);
      tokens[idx].attrPush(["rel", "noopener noreferrer"]);
***REMOVED***
***REMOVED***);

export default function post(req: NextApiRequest, res: NextApiResponse) ***REMOVED***
  const users = fs.readdirSync("db/users");

  const comment: string = req.body.comment;
  const loginKey: string = req.body.loginKey;

  if (comment.length > 500) ***REMOVED***
    return res.send(***REMOVED*** error: ***REMOVED*** code: 3, message: "Invalid message length!" ***REMOVED*** ***REMOVED***);
***REMOVED***

  let user: IUser;

  for (let i = 0; i < users.length; i++) ***REMOVED***
    const currentUser: IUser = JSON.parse(fs.readFileSync(`db/users/$***REMOVED***users[i]***REMOVED***`, "utf-8"));
    if (currentUser.loginKeys.includes(loginKey)) ***REMOVED***
      user = currentUser;
      break;
***REMOVED***
***REMOVED***

  if (!user) ***REMOVED***
    return res.status(401).send(***REMOVED*** error: ***REMOVED*** code: 401, message: "Unauthorized!" ***REMOVED*** ***REMOVED***);
***REMOVED***

  const JSONComment: IStoredComment = ***REMOVED***
    episode: <string>req.query.video,
    uid: user.id,
    comment: ***REMOVED***
      plaintext: comment,
      html: plainTextToHTML(comment, <string>req.query.video),
  ***REMOVED***
    stats: ***REMOVED***
      published: Date.now(),
      likes: 0,
      dislikes: 0,
  ***REMOVED***
***REMOVED***;

  const b64Comment = tob64(JSON.stringify(JSONComment));

  promiseQuery(`INSERT INTO comments (json) values ('$***REMOVED***b64Comment***REMOVED***')`);

  res.send(***REMOVED*** status: "success", comment: JSONComment ***REMOVED***);
***REMOVED***

function tob64(string: string) ***REMOVED***
  return Buffer.from(string, "utf-8").toString("base64");
***REMOVED***

function plainTextToHTML(plaintext: string, episode: string) ***REMOVED***
  const timeReg = /(?:([0-5]?[0-9]):)?([0-5]?[0-9]):([0-5][0-9])/g;

  let html = md.render(plaintext);

  const matches = plaintext.match(timeReg);

  for (let i = 0; i < matches?.length ?? 0; i++) ***REMOVED***
    const split = matches[i].split(":");
    let seconds = parseInt(split[split.length - 1]);
    seconds += parseInt(split[split.length - 2]) * 60;
    if (split.length === 3) ***REMOVED***
      seconds += parseInt(split[0]) * 60 * 60;
***REMOVED***

    html = html.replace(
      matches[i],
      `<a href="/watch/$***REMOVED***episode***REMOVED***?t=$***REMOVED***seconds***REMOVED***">$***REMOVED***matches[i].replace(/:/g, "&colon;")***REMOVED***</a>`
    );
***REMOVED***

  return html;
***REMOVED***
