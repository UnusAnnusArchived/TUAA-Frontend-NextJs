import Typography from "@mui/material/Typography";
import React from "react";
import useSWR from "swr";
import { IComment } from "../../src/types";
import { endpoint } from "../../src/endpoints";
import { AddComment, CommentItem } from ".";
import { useTranslation } from "react-i18next";

interface IProps {
  watchCode: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const CommentList: React.FC<IProps> = ({ watchCode }) => {
  const { t } = useTranslation();

  const { data, mutate, isValidating, error } = useSWR<IComment[], any>(
    `${endpoint}/v2/comments/get/${watchCode}`,
    fetcher
  );

  const onAdded = async () => {
    mutate();
  };

  return (
    <div>
      <Typography variant="h6" component="h2">
        {t("comments:title")}
      </Typography>
      <AddComment watchCode={watchCode} onComment={onAdded} />
      {error && <Typography>{t("comments:loadFail")}</Typography>}
      {data && data.length < 1 && (
        <Typography>{t("comments:noComments")}</Typography>
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
