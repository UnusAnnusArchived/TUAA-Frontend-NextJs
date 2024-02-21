import { Skeleton, Typography } from "@mui/material";

const EpisodeLinkLoading: React.FC = () => {
  return (
    <Skeleton variant="rounded" sx={{ padding: "1rem", maxWidth: "none", width: "100%" }}>
      <div style={{ width: "100%", aspectRatio: 16 / 9, height: "auto" }} />
      <div style={{ height: "6.48px" }} />
      <Typography variant="h6" component="h2">
        Unus Annus
      </Typography>
      <Typography variant="body2">Episode 1 - 15th. Nov. 2019</Typography>
    </Skeleton>
  );
};

export default EpisodeLinkLoading;
