import fs from "fs";
import ***REMOVED*** db, promiseQuery ***REMOVED*** from "../../../../../src/mysqlSetup";
import ***REMOVED*** NextApiRequest, NextApiResponse ***REMOVED*** from "next";
import ***REMOVED*** IUser, IComment, CommentUser, IStoredComment ***REMOVED*** from "../../../../../src/types";

export default async function getComments(req: NextApiRequest, res: NextApiResponse) ***REMOVED***
  const from = parseInt(<string>req.query.from) || 0;
  const to = parseInt(<string>req.query.to) || 20;

  let comments: IStoredComment[] = [];

  const rows: ***REMOVED*** json: string ***REMOVED***[] = await promiseQuery("SELECT * FROM `comments`");

  for (let i = 0; i < rows.length; i++) ***REMOVED***
    try ***REMOVED***
      const comment: IStoredComment = JSON.parse(fromb64(rows[i].json));
      if (comment.episode == req.query.video) ***REMOVED***
        comments.push(comment);
  ***REMOVED***
***REMOVED*** catch (err) ***REMOVED***
      console.error("Error converting base64 to JSON!");
***REMOVED***
***REMOVED***

  let parsedComments: IComment[] = [];

  for (let i = 0; i < comments.length; i++) ***REMOVED***
    if (typeof comments[i] === "object") ***REMOVED***
      try ***REMOVED***
        const fulluser: IUser = JSON.parse(
          fs.readFileSync(`db/users/$***REMOVED***comments[i].uid || comments[i].user.id***REMOVED***.json`, "utf-8")
        );
        const user: CommentUser = ***REMOVED***
          id: fulluser.id,
          username: fulluser.username,
          pfp: fulluser.pfp,
    ***REMOVED***;
        comments[i].user = user;
        parsedComments.push(<IComment>comments[i]);
  ***REMOVED*** catch (err) ***REMOVED***
        console.error(err);
        const user: CommentUser = ***REMOVED***
          id: comments[i].uid,
          username: "Error Getting User Data!",
          pfp: ***REMOVED***
            filename: "userdata/profilepics/default.jpg",
            format: "image/jpeg",
            width: 256,
            height: 256,
            originalFilename: "default.jpg",
        ***REMOVED***
    ***REMOVED***;
        comments[i].user = user;
        parsedComments.push(<IComment>comments[i]);
  ***REMOVED***
***REMOVED***
***REMOVED***

  let sortType = "latest";

  if (req.query.sort === "oldest") ***REMOVED***
    sortType = "oldest";
***REMOVED*** else if ((req.query.sort = "rating")) ***REMOVED***
    sortType = "rating";
***REMOVED***

  if (sortType === "latest" || sortType === "oldest") ***REMOVED***
    parsedComments.sort((a, b) => ***REMOVED***
      if (a.stats.published > b.stats.published) ***REMOVED***
        return -1;
  ***REMOVED*** else if (a.stats.published < b.stats.published) ***REMOVED***
        return 1;
  ***REMOVED*** else if (a.stats.published == b.stats.published) ***REMOVED***
        return 0;
  ***REMOVED***
***REMOVED***);
***REMOVED*** else if (sortType === "rating") ***REMOVED***
    parsedComments.sort((a, b) => ***REMOVED***
      const ratingA = a.stats.likes - a.stats.dislikes;
      const ratingB = b.stats.likes - b.stats.dislikes;
      if (ratingA > ratingB) ***REMOVED***
        return -1;
  ***REMOVED*** else if (ratingA < ratingB) ***REMOVED***
        return 1;
  ***REMOVED*** else if (ratingA === ratingB) ***REMOVED***
        if (a.stats.published > b.stats.published) ***REMOVED***
          return -1;
    ***REMOVED*** else if (a.stats.published < b.stats.published) ***REMOVED***
          return 1;
    ***REMOVED*** else if (a.stats.published === b.stats.published) ***REMOVED***
          return 0;
    ***REMOVED***
  ***REMOVED***
***REMOVED***);
***REMOVED***

  if (sortType === "oldest") ***REMOVED***
    parsedComments.reverse();
***REMOVED***

  let limitedComments: IComment[] = [];

  for (let i = from; i < to; i++) ***REMOVED***
    if (parsedComments[i]) ***REMOVED***
      limitedComments.push(parsedComments[i]);
***REMOVED***
***REMOVED***

  res.send(limitedComments);
***REMOVED***

function fromb64(b64: string) ***REMOVED***
  return Buffer.from(b64, "base64").toString("utf-8");
***REMOVED***
