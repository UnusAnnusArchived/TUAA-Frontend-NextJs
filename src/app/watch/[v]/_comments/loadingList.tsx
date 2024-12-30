import { CircularProgress, Skeleton } from "@mui/material";

const LoadingList: React.FC = () => {
  return (
    <>
      {new Array(4).fill("").map((_, i) => {
        return <Skeleton variant="rounded" key={i} sx={{ margin: "1rem 0", padding: 0, height: "75px" }}></Skeleton>;
      })}
    </>
  );
};

export default LoadingList;
