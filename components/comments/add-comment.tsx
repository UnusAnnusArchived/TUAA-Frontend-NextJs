import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "../../src/atoms";
import LoadingButton from "@mui/lab/LoadingButton";
import { useTranslation } from "react-i18next";
import pb from "../../src/pocketbase";
import { Collection } from "../../src/types";

interface IProps {
  watchCode: string;
  onComment: () => Promise<void>;
}

const AddComment: React.FC<IProps> = ({ watchCode, onComment: onC }) => {
  const { t } = useTranslation();

  const [comment, setComment] = useState("");
  const [loggedInUser] = useRecoilState(userAtom);
  const [isSendingComment, setIsSendingComment] = useState(false);

  const onComment = async () => {
    const commentText = comment.trim();

    if (commentText.length === 0) {
      return;
    }

    setIsSendingComment(true);
    try {
      await pb.collection(Collection.Comments).create({
        episode: watchCode,
        markdown: commentText,
        user: loggedInUser?.id,
      });

      setComment("");
      await onC();
    } catch (e) {
      console.error(e);
    }

    setIsSendingComment(false);
  };

  if (!loggedInUser) {
    return (
      <div className="my-2">
        <Typography>{t("comments:add_comment:logged_out")}</Typography>
        <Divider className="my-2 mt-4" sx={{ backgroundColor: "#fff" }} />
      </div>
    );
  }

  return (
    <div className="mt-1">
      <div className="d-flex flex-row flex-md-row flex-column">
        <div className="flex-grow">
          <TextField
            multiline
            variant="standard"
            fullWidth
            label={t("comments:add_comment:placeholder")}
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
            {t("comments:add_comment:action")}
          </LoadingButton>
        </div>
      </div>
      <Divider className="my-2 mt-4" sx={{ backgroundColor: "#fff" }} />
    </div>
  );
};

export default AddComment;
