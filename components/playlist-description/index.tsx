import React from "react";
import MarkdownIt from "markdown-it";
import mdIterator from "markdown-it-for-inline";
import CommentOptions from "../comment-options/comment-options";
import { Paper } from "@mui/material";

const md = MarkdownIt({ html: false, xhtmlOut: false, breaks: true, langPrefix: "", linkify: true }).use(
  mdIterator,
  "url_new_win",
  "link_open",
  (tokens, idx) => {
    const [, href] = tokens[idx].attrs.find((attr) => attr[0] === "href");

    if (href) {
      tokens[idx].attrPush(["target", "_blank"]);
      tokens[idx].attrPush(["rel", "noopener noreferrer"]);
    }
  }
);

interface IProps {
  description: string;
}

const PlaylistDescription: React.FC<IProps> = ({ description }) => {
  return (
    <Paper sx={{ minHeight: 100, padding: 2, margin: "8px 0" }}>
      <div dangerouslySetInnerHTML={{ __html: md.render(description) }} />
    </Paper>
  );
};

export default PlaylistDescription;
