import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import useSWR from "swr";
import { IComment } from "../../src/types";
import { endpoint } from "../../src/endpoints";
import { AddComment, CommentItem } from ".";
import { useTranslation } from "react-i18next";
import { Collection, Record } from "pocketbase";
import pb from "../../src/pocketbase";
import moment from "moment";

interface IProps {
  watchCode: string;
}

const fetcher = async (watchCode: string) => {
  const records = await pb.records.getList("comments", 1, 400, {
    filter: `episode="${watchCode}"`,
  });

  return records.items;
};

const CommentList: React.FC<IProps> = ({ watchCode }) => {
  const { t } = useTranslation();
  const [sortType, setSortType] = useState("latest");

  const sorter = async (watchCode: string) => {
    const comments = await fetcher(watchCode);

    if (sortType === "latest" || sortType === "oldest") {
      comments.sort((aDate, bDate) => {
        const a = moment.utc(aDate.created).unix();
        const b = moment.utc(bDate.created).unix();

        if (a > b) {
          return -1;
        } else if (a < b) {
          return 1;
        } else if (a === b) {
          return 0;
        }
      });
    } else if (sortType === "rating") {
      comments.sort((a, b) => {
        const ratingA = a.likes - a.dislikes;
        const ratingB = b.likes - b.dislikes;

        if (ratingA > ratingB) {
          return -1;
        } else if (ratingA < ratingB) {
          return 1;
        } else if (ratingA === ratingB) {
          const timeA = moment.utc(a.created).unix();
          const timeB = moment.utc(b.created).unix();

          if (timeA > timeB) {
            return -1;
          } else if (timeA < timeB) {
            return 1;
          } else if (timeA === timeB) {
            return 0;
          }
        }
      });
    }

    if (sortType === "oldest") {
      comments.reverse();
    }

    return comments;
  };

  const { data, mutate, error } = useSWR<Record[]>(watchCode, sorter);

  const [comments, setComment] = useState(null);

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
      {data && data.length < 1 && <Typography>{t("comments:noComments")}</Typography>}
      {data &&
        data.length > 0 &&
        data.map((comment, i) => {
          return (
            <div key={comment.id}>
              <CommentItem comment={comment} mutate={mutate} />
            </div>
          );
        })}
    </div>
  );
};

export default CommentList;
