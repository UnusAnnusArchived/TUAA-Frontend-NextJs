import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import MarkdownIt from "markdown-it";
import mdIterator from "markdown-it-for-inline";
import { IStoredComment, IUser } from "../../../../../src/types";
import { promiseQuery } from "../../../../../src/mysqlSetup";

const md = MarkdownIt({ html: false, xhtmlOut: false, breaks: true, langPrefix: "", linkify: true })
  .disable(["image", "link"])
  .use(mdIterator, "url_new_win", "link_open", (tokens, idx) => {
    const [attrName, href] = tokens[idx].attrs.find((attr) => attr[0] === "href");

    if (href) {
      tokens[idx].attrPush(["target", "_blank"]);
      tokens[idx].attrPush(["rel", "noopener noreferrer"]);
    }
  });

export default function post(req: NextApiRequest, res: NextApiResponse) {
  const users = fs.readdirSync("src/db/users");

  const comment: string = req.body.comment;
  const loginKey: string = req.body.loginKey;

  if (comment.length > 500) {
    return res.send({ error: { code: 3, message: "Invalid message length!" } });
  }

  let user: IUser;

  for (let i = 0; i < users.length; i++) {
    const currentUser: IUser = JSON.parse(fs.readFileSync(`src/db/users/${users[i]}`, "utf-8"));
    if (currentUser.loginKeys.includes(loginKey)) {
      user = currentUser;
      break;
    }
  }

  if (!user) {
    return res.status(401).send({ error: { code: 401, message: "Unauthorized!" } });
  }

  const JSONComment: IStoredComment = {
    episode: <string>req.query.video,
    uid: user.id,
    comment: {
      plaintext: comment,
      html: plainTextToHTML(comment, <string>req.query.video),
    },
    stats: {
      published: Date.now(),
      likes: 0,
      dislikes: 0,
    },
  };

  const b64Comment = tob64(JSON.stringify(JSONComment));

  promiseQuery(`INSERT INTO comments (json) values ('${b64Comment}')`);

  res.send({ status: "success", comment: JSONComment });
}

function tob64(string: string) {
  return Buffer.from(string, "utf-8").toString("base64");
}

function plainTextToHTML(plaintext: string, episode: string) {
  const timeReg = /(?:([0-5]?[0-9]):)?([0-5]?[0-9]):([0-5][0-9])/g;

  let html = md.render(plaintext);

  const matches = plaintext.match(timeReg);

  for (let i = 0; i < matches.length; i++) {
    const split = matches[i].split(":");
    let seconds = parseInt(split[split.length - 1]);
    seconds += parseInt(split[split.length - 2]) * 60;
    if (split.length === 3) {
      seconds += parseInt(split[0]) * 60 * 60;
    }

    html = html.replace(
      matches[i],
      `<a href="/watch/${episode}?t=${seconds}">${matches[i].replace(/:/g, "&colon;")}</a>`
    );
  }

  return html;
}
