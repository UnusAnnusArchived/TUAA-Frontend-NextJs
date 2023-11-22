import { Skeleton, Typography } from "@mui/material";

const EpisodeLinkLoading: React.FC = () => {
  return (
    <Skeleton variant="rounded" sx={{ padding: "1rem", maxWidth: "none", width: "100%" }}>
      <div style={{ width: "100%", aspectRatio: 16 / 9, height: "auto" }} />
      <div style={{ height: "6.48px" }} />
      <Typography>Unus Annus</Typography>
    </Skeleton>
  );
};

export default EpisodeLinkLoading;
