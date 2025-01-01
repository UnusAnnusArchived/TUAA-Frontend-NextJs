"use client";

import { Comment, User, WithExpand } from "@/types";
import { IMetadata } from "@/zodTypes";
import { Avatar, Paper, Tooltip, Typography } from "@mui/material";
import MarkdownIt from "markdown-it";
import mdIterator from "markdown-it-for-inline";
import styles from "./commentItem.module.scss";
import pb from "@/pb/client";
import MomentClientLocale, { useLanguage } from "@/components/momentClientLocale";
import TC from "@/components/T/tClient";
import { useTolgee } from "@tolgee/react";
import moment from "moment-with-locales-es6";
import { useColorScheme } from "@/hooks/localStorageHooks";

const md = MarkdownIt({ html: false, xhtmlOut: false, breaks: true, langPrefix: "", linkify: true })
  .disable(["image", "link"])
  .use(mdIterator, "url_new_win", "link_open", (tokens: any, idx: any) => {
    const [, href] = tokens[idx].attrs.find((attr: any) => attr[0] === "href");

    if (href) {
      tokens[idx].attrPush(["target", "_blank"]);
      tokens[idx].attrPush(["rel", "noopener noreferrer"]);
    }
  });

const markdownToHTML = (markdown: string, episode: string) => {
  const timeReg = /(?:([0-5]?[0-9]):)?([0-5]?[0-9]):([0-5][0-9])/g;

  let html = md.render(markdown);

  const matches = markdown.match(timeReg);

  if (matches) {
    for (let i = 0; i < (matches?.length ?? 0); i++) {
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
  }

  return html;
};

interface IProps {
  comment: WithExpand<Comment, { user: User }>;
  video: IMetadata;
}

const CommentItem: React.FC<IProps> = ({ comment, video }) => {
  const [colorScheme] = useColorScheme();
  const tolgee = useTolgee(["language"]);
  const language = tolgee.getLanguage();

  return (
    <Paper sx={{ margin: "1rem 0", padding: "1rem", display: "flex", gap: ".5rem" }} elevation={2}>
      <Avatar src={pb.files.getUrl(comment.expand.user, comment.expand.user.avatar)}>
        {comment.expand.user.name
          .split(" ")
          .map((username) => username[0])
          .splice(0, 2)
          .join("")}
      </Avatar>
      <div>
        <span>
          <Typography sx={{ display: "inline" }} fontWeight="bold">
            {comment.expand.user.name}
          </Typography>
          <Tooltip
            title={<MomentClientLocale date={comment.created} type="format" format="dddd, MMMM Do YYYY, h:mm:ss a" />}
            placement="top"
            arrow
          >
            <Typography sx={{ display: "inline" }}>
              {" "}
              <MomentClientLocale date={comment.created} type="fromNow" />
            </Typography>
          </Tooltip>
          {comment.isEdited && (
            <Tooltip
              title={<MomentClientLocale date={comment.updated} type="format" format="dddd, MMMM Do YYYY, h:mm:ss a" />}
              placement="top"
              arrow
            >
              <Typography sx={{ display: "inline" }}>
                {" "}
                (
                <TC
                  keyName="video.comments.edited"
                  params={{
                    value: moment(comment.updated)
                      .locale(language ?? "en")
                      .fromNow(),
                  }}
                />
                )
              </Typography>
            </Tooltip>
          )}
        </span>
        <div
          className={styles.commentText}
          style={
            colorScheme === "dark"
              ? // @ts-ignore
                { "--color": "#ffffff", "--decoration-color": "rgba(255, 255, 255, 0.4)" }
              : { "--color": "#000000", "--decoration-color": "rgba(0, 0, 0, 0.4)" }
          }
          dangerouslySetInnerHTML={{ __html: markdownToHTML(comment.markdown, video.uaid) }}
        />
      </div>
    </Paper>
  );
};

export default CommentItem;
