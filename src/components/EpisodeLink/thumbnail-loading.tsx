import { Skeleton } from "@mui/material";

const ThumbnailLoading: React.FC = () => {
  return (
    <>
      <Skeleton variant="rounded" style={{ width: "100%", aspectRatio: 16 / 9, height: "auto" }} />
      <div style={{ height: 6.48 }} />
    </>
  );
};

export default ThumbnailLoading;
