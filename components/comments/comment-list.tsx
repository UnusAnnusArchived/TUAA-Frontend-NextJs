import Typography from "@mui/material/Typography";
import React from "react";
import useSWR from "swr";
import { IComment } from "../../src/types";
import { endpoint } from "../../src/endpoints";
import { AddComment, CommentItem } from ".";

interface IProps {
  watchCode: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const CommentList: React.FC<IProps> = ({ watchCode }) => {
  const { data, mutate, isValidating, error } = useSWR<IComment[], any>(
    `${endpoint}/api/v2/comments/get/${watchCode}`,
    fetcher
  );

  const onAdded = async () => {
    mutate();
  };

  return (
    <div>
      <Typography variant="h6" component="h2">
        Comments
      </Typography>
      <AddComment watchCode={watchCode} onComment={onAdded} />
      {error && <Typography>Comments failed to load</Typography>}
      {data && data.length < 1 && (
        <Typography>There are no comments</Typography>
      )}
      {data &&
        data.length > 0 &&
        data.map((comment, i) => (
          <div key={i}>
            <CommentItem comment={comment} />
          </div>
        ))}
    </div>
  );
};

export default CommentList;
