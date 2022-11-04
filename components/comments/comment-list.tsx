import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import useSWR from "swr";
import { AddComment, CommentItem } from ".";
import { useTranslation } from "react-i18next";
import { Record } from "pocketbase";
import pb from "../../src/pocketbase";
import moment from "moment";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface IProps {
  watchCode: string;
}

const CommentList: React.FC<IProps> = ({ watchCode }) => {
  const { t } = useTranslation();
  const [sortType, setSortType] = useState("latest");

  const fetcher = async (sortType: string) => {
    const comments = (await pb.collection("comments").getList(1, 400, { filter: `episode="${watchCode}"` })).items;

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

  const { data, mutate, error } = useSWR<Record[]>(sortType, fetcher);

  const onAdded = async () => {
    mutate();
  };

  const onSortChange = (evt: SelectChangeEvent) => {
    setSortType(evt.target.value);
    mutate();
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-end" }}>
        <Typography variant="h6" component="h2">
          {t("comments:header")}
        </Typography>
        <div style={{ width: 10 }} />
        <FormControl>
          <InputLabel>{t("comments:sort:label")}</InputLabel>
          <Select size="small" value={sortType} label="Sort By" onChange={onSortChange}>
            <MenuItem value="latest">{t("comments:sort:newest")}</MenuItem>
            <MenuItem value="oldest">{t("comments:sort:oldest")}</MenuItem>
            {/* <MenuItem value="rating">{t("comments:sort:rating")}</MenuItem> */}
          </Select>
        </FormControl>
      </div>
      <AddComment watchCode={watchCode} onComment={onAdded} />
      {error && (
        <Typography variant="h6" component="h3" sx={{ textAlign: "center" }}>
          {t("comments:errors:generic")}
        </Typography>
      )}
      {data && data.length < 1 && (
        <Typography variant="h6" component="h3" sx={{ textAlign: "center" }}>
          {t("comments:errors:no_comments")}
        </Typography>
      )}
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
