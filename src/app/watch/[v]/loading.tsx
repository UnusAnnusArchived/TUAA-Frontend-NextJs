import { Divider, Paper, Skeleton, Typography } from "@mui/material";
import { NextPage } from "next";
import LoadingList from "./_comments/loadingList";

const WatchLoading: NextPage = () => {
  return (
    <>
      <div style={{ width: "100%" }}>
        <Skeleton
          variant="rectangular"
          sx={{ aspectRatio: 16 / 9, width: "100%", height: "auto", overflow: "hidden" }}
        />
        <Paper sx={{ padding: "1rem", marginTop: "1rem" }}>
          <Skeleton variant="text" sx={{ height: "2rem", width: `${Math.random() * (75 - 20) + 20}%` }} />
          <Skeleton variant="text" sx={{ width: `${Math.random() * (25 - 20) + 20}%` }} />
          <Divider sx={{ margin: ".5rem 0" }} />
          {new Array(3).fill(" ").map((i) => {
            return <Skeleton variant="text" key={i} sx={{ width: `${Math.random() * (100 - 50) + 50}%` }} />;
          })}
        </Paper>
        <Paper sx={{ marginTop: "1rem", padding: "1rem" }}>
          <Skeleton variant="text">
            <Typography variant="h6">Comments</Typography>
          </Skeleton>
          <LoadingList />
        </Paper>
      </div>
    </>
  );
};

export default WatchLoading;
