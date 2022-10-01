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
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface IProps {
  watchCode: string;
}

const CommentList: React.FC<IProps> = ({ watchCode }) => {
  const { t } = useTranslation();
  const [sortType, setSortType] = useState("latest");

  const fetcher = async (sortType) => {
    const comments = (
      await pb.records.getList("comments", 1, 400, {
        filter: `episode="${watchCode}"`,
        $autoCancel: false,
      })
    ).items;

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

    console.log(comments, sortType);

    return comments;
  };

  const { data, mutate, error } = useSWR<Record[]>(sortType, fetcher);

  const [comments, setComment] = useState(null);

  const onAdded = async () => {
    mutate();
  };

  const onSortChange = (evt: SelectChangeEvent) => {
    setSortType(evt.target.value);
    console.log(evt.target.value);
    mutate();
  };

  return (
    <div>
      <Typography variant="h6" component="h2">
        {t("comments:title")}
      </Typography>
      <Select value={sortType} label="Sort By" onChange={onSortChange}>
        <MenuItem value="latest">Latest</MenuItem>
        <MenuItem value="oldest">Oldest</MenuItem>
        {/* <MenuItem value="rating">Rating</MenuItem> */}
      </Select>
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
