import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import moment from "moment-with-locales-es6";
import { Record } from "pocketbase";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import pb from "../../src/pocketbase";
import getPbImagePath from "../../src/utils/getPbImagePath";
import MarkdownIt from "markdown-it";
import mdIterator from "markdown-it-for-inline";
import CommentOptions from "../comment-options/comment-options";
import styles from "./comment-item.module.scss";
import { useRecoilState } from "recoil";
import { userAtom } from "../../src/atoms";
import { KeyedMutator } from "swr";

const md = MarkdownIt({ html: false, xhtmlOut: false, breaks: true, langPrefix: "", linkify: true })
  .disable(["image", "link"])
  .use(mdIterator, "url_new_win", "link_open", (tokens, idx) => {
    const [, href] = tokens[idx].attrs.find((attr) => attr[0] === "href");

    if (href) {
      tokens[idx].attrPush(["target", "_blank"]);
      tokens[idx].attrPush(["rel", "noopener noreferrer"]);
    }
  });

const markdownToHTML = (markdown: string, episode: string) => {
  const timeReg = /(?:([0-5]?[0-9]):)?([0-5]?[0-9]):([0-5][0-9])/g;

  let html = md.render(markdown);

  const matches = markdown.match(timeReg);

  for (let i = 0; i < matches?.length ?? 0; i++) {
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
};

interface IProps {
  comment: Record;
  mutate: KeyedMutator<Record[]>;
}

const CommentItem: React.FC<IProps> = ({ comment, mutate }) => {
  const { t, i18n } = useTranslation();
  const [commentUser, setCommentUser] = useState<Record>(null);
  const [loggedInUser] = useRecoilState(userAtom);

  console.log(comment);

  useEffect(() => {
    (async () => {
      try {
        const user = await pb.collection("users").getOne(comment.user);
        setCommentUser(user);
      } catch (err) {
        console.error(err, `id="${comment.user}"`);
      }
    })();
  }, []);

  return commentUser ? (
    <div>
      <div className={styles.comment}>
        <div className={`row my-2 ${styles.commentBody}`}>
          <div className="col-2 col-md-1 mb-md-0 my-1 d-flex flex-column align-items-center justify-content-flex-start">
            <Avatar
              alt={commentUser.name}
              src={`${getPbImagePath("systemprofiles0", commentUser.id, commentUser.avatar, 168, 168)}`}
              sx={{ width: 56, height: 56 }}
            />
          </div>
          <div className="col-10 col-md-11 mb-md-0 my-1 d-flex flex-column justify-content-center">
            <div className="d-flex align-items-baseline">
              <Typography variant="body1" className="font-weight-bold">
                <strong>{commentUser.name}</strong>
              </Typography>
              &nbsp;
              <Typography variant="body2" sx={{ color: "#a3a3a3" }}>
                <span title={moment.utc(comment.created).locale(i18n.language).format("MMMM Do YYYY, h:mm A")}>
                  {moment.utc(comment.created).locale(i18n.language).fromNow()}

                  {comment.isEdited ? <>&nbsp;{t("comments:comment:edited")}</> : null}
                </span>
              </Typography>
            </div>
            <Typography dangerouslySetInnerHTML={{ __html: markdownToHTML(comment.markdown, comment.episode) }} />
          </div>
        </div>
        {comment.user === loggedInUser?.id ? (
          <CommentOptions comment={comment} commentUser={commentUser} mutate={mutate} />
        ) : loggedInUser?.isAdmin === true ? (
          <CommentOptions comment={comment} commentUser={commentUser} mutate={mutate} />
        ) : null}
      </div>
      <Divider sx={{ backgroundColor: "#fff" }} />
    </div>
  ) : null;
};

export default CommentItem;
