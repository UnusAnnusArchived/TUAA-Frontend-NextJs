import { Avatar, Paper, Typography } from "@mui/material";
import WriteComment from "./writeComment";
import { Suspense } from "react";
import CommentList from "./list";
import LoadingList from "./loadingList";
import { IMetadata } from "@/zodTypes";
import { getTranslate } from "@/tolgee/server";
import TC from "@/components/T/tClient";

interface IProps {
  video: IMetadata;
}

const Comments: React.FC<IProps> = async ({ video }) => {
  return (
    <Paper sx={{ marginTop: "1rem", padding: "1rem" }}>
      <Typography variant="h6" component="h3">
        <TC keyName="video.comments" />
      </Typography>
      <WriteComment />
      <Suspense fallback={<LoadingList />}>
        <CommentList video={video} />
      </Suspense>
    </Paper>
  );
};

export default Comments;
