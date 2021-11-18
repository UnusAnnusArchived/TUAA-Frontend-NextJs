import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "../../src/atoms";
import { endpoint } from "../../src/endpoints";
import { PostCommentResponse } from "../../src/types";
import LoadingButton from "@mui/lab/LoadingButton";

interface IProps {
  watchCode: string;
  onComment: () => Promise<void>;
}

const AddComment: React.FC<IProps> = ({ watchCode, onComment: onC }) => {
  const [comment, setComment] = useState("");
  const [loggedInUser,] = useRecoilState(userAtom);
  const [isSendingComment, setIsSendingComment] = useState(false);

  const onComment = async () => {
    const commentText = comment.trim();

    if (commentText.length === 0) {
      return;
    }

    setIsSendingComment(true);
    try {
      const res = await axios.post<PostCommentResponse>(
        `${endpoint}/api/v2/comments/post/${watchCode}`,
        { loginKey: loggedInUser.loginKey, comment: commentText }
      );

      if (res.data.status === "success") {
        setComment("");
        await onC();
      }
    } catch (e) {
      console.error(e);
    }

    setIsSendingComment(false);
  };

  if (!loggedInUser) {
    return (
      <div className="my-2">
        <Typography>You need to login to comment on this video</Typography>
        <Divider className="my-2 mt-4" sx={{ backgroundColor: "#fff" }} />
      </div>
    );
  }

  return (
    <div className="mt-1">
      <div className="d-flex flex-row flex-md-row flex-column">
        <div className="flex-grow">
          <TextField
            variant="standard"
            fullWidth
            label="Add a public comment"
            id="comment-text"
            name="comment-text"
            autoComplete="off"
            placeholder=""
            className="mx-1"
            value={comment}
            onChange={(e) => setComment(e.currentTarget.value)}
          />
        </div>
        <div className="mx-4 text-center mt-3 mt-md-0">
          <LoadingButton
            variant="contained"
            loading={isSendingComment}
            disabled={comment.trim().length < 1 || isSendingComment}
            onClick={onComment}
          >
            Comment
          </LoadingButton>
        </div>
      </div>
      <Divider className="my-2 mt-4" sx={{ backgroundColor: "#fff" }} />
    </div>
  );
};

export default AddComment;
