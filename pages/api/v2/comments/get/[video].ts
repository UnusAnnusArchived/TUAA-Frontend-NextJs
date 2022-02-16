import fs from "fs";
import { db, promiseQuery } from "../../../../../src/mysqlSetup";
import { NextApiRequest, NextApiResponse } from "next";
import { IUser, IComment, CommentUser, IStoredComment } from "../../../../../src/types";

export default async function getComments(req: NextApiRequest, res: NextApiResponse) {
  const from = parseInt(<string>req.query.from) || 0;
  const to = parseInt(<string>req.query.to) || 20;

  let comments: IStoredComment[] = [];

  const rows: { json: string }[] = await promiseQuery("SELECT * FROM `comments`");

  for (let i = 0; i < rows.length; i++) {
    try {
      const comment: IStoredComment = JSON.parse(fromb64(rows[i].json));
      if (comment.episode == req.query.video) {
        comments.push(comment);
      }
    } catch (err) {
      console.error("Error converting base64 to JSON!");
    }
  }

  let parsedComments: IComment[] = [];

  for (let i = 0; i < comments.length; i++) {
    if (typeof comments[i] === "object") {
      try {
        const fulluser: IUser = JSON.parse(
          fs.readFileSync(`src/db/users/${comments[i].uid || comments[i].user.id}.json`, "utf-8")
        );
        const user: CommentUser = {
          id: fulluser.id,
          username: fulluser.username,
          pfp: fulluser.pfp,
        };
        comments[i].user = user;
        parsedComments.push(<IComment>comments[i]);
      } catch (err) {
        console.error(err);
        const user: CommentUser = {
          id: comments[i].uid,
          username: "Error Getting User Data!",
          pfp: {
            filename: "userdata/profilepics/default.jpg",
            format: "image/jpeg",
            width: 256,
            height: 256,
            originalFilename: "default.jpg",
          },
        };
        comments[i].user = user;
        parsedComments.push(<IComment>comments[i]);
      }
    }
  }

  let sortType = "latest";

  if (req.query.sort === "oldest") {
    sortType = "oldest";
  } else if ((req.query.sort = "rating")) {
    sortType = "rating";
  }

  if (sortType === "latest" || sortType === "oldest") {
    parsedComments.sort((a, b) => {
      if (a.stats.published > b.stats.published) {
        return -1;
      } else if (a.stats.published < b.stats.published) {
        return 1;
      } else if (a.stats.published == b.stats.published) {
        return 0;
      }
    });
  } else if (sortType === "rating") {
    parsedComments.sort((a, b) => {
      const ratingA = a.stats.likes - a.stats.dislikes;
      const ratingB = b.stats.likes - b.stats.dislikes;
      if (ratingA > ratingB) {
        return -1;
      } else if (ratingA < ratingB) {
        return 1;
      } else if (ratingA === ratingB) {
        if (a.stats.published > b.stats.published) {
          return -1;
        } else if (a.stats.published < b.stats.published) {
          return 1;
        } else if (a.stats.published === b.stats.published) {
          return 0;
        }
      }
    });
  }

  if (sortType === "oldest") {
    parsedComments.reverse();
  }

  let limitedComments: IComment[] = [];

  for (let i = from; i < to; i++) {
    if (parsedComments[i]) {
      limitedComments.push(parsedComments[i]);
    }
  }

  res.send(limitedComments);
}

function fromb64(b64: string) {
  return Buffer.from(b64, "base64").toString("utf-8");
}
