"use client";

import { TextField } from "@mui/material";
import pb from "@/pb/client";

const WriteComment: React.FC = () => {
  if (pb.authStore.token) {
    return (
      <>
        TODO
        <TextField variant="standard" label="Add a comment" />
      </>
    );
  }

  return <></>;
};

export default WriteComment;
