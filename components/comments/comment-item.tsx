import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { Record } from "pocketbase";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { endpoint } from "../../src/endpoints";
import { IComment } from "../../src/types";
import pb from "../../src/pocketbase";
import getUserPfpPath from "../../src/utils/getUserPfp";
import MarkdownIt from "markdown-it";
import mdIterator from "markdown-it-for-inline";

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
}

const CommentItem: React.FC<IProps> = ({ comment }) => {
  const { i18n } = useTranslation();
  const [commentProfile, setCommentProfile] = useState<Record>(null);

  useEffect(() => {
    (async () => {
      const profile = await pb.records.getList("profiles", 1, 1, {
        filter: `userId="${comment.user}"`,
      });

      setCommentProfile(profile.items[0]);
    })();
  }, []);

  return commentProfile ? (
    <div>
      <div className="row my-2">
        <div className="col-2 col-md-1 mb-md-0 my-1 d-flex flex-column align-items-center justify-content-center">
          <Avatar
            alt={commentProfile.name}
            src={`${getUserPfpPath(commentProfile.id, commentProfile.avatar, 168, 168)}`}
            sx={{ width: 56, height: 56 }}
          />
        </div>
        <div className="col-10 col-md-11 mb-md-0 my-1 d-flex flex-column justify-content-center">
          <div className="d-flex align-items-baseline">
            <Typography variant="body1" className="font-weight-bold">
              <strong>{commentProfile.name}</strong>
            </Typography>
            &nbsp;
            <Typography variant="body2" sx={{ color: "#a3a3a3" }}>
              <span title={moment.utc(comment.created).locale(i18n.language).format("MMMM Do YYYY, h:mm A")}>
                {moment.utc(comment.created).locale(i18n.language).fromNow()}
              </span>
            </Typography>
          </div>
          <Typography dangerouslySetInnerHTML={{ __html: markdownToHTML(comment.markdown, comment.episode) }} />
        </div>
      </div>
      <Divider sx={{ backgroundColor: "#fff" }} />
    </div>
  ) : null;
};

export default CommentItem;
