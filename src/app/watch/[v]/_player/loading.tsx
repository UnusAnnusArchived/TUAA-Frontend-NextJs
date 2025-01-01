import { Skeleton } from "@mui/material";

const LoadingPlayer: React.FC = () => {
  return (
    <Skeleton variant="rectangular" sx={{ aspectRatio: 16 / 9, width: "100%", height: "auto", overflow: "hidden" }} />
  );
};

export default LoadingPlayer;
