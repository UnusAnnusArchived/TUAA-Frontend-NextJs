import EpisodeLinkLoading from "@/components/EpisodeLink/loading";
import { Skeleton, Tab, Tabs, Typography } from "@mui/material";
import { NextPage } from "next";

const HomeLoading: NextPage = () => {
  return (
    <>
      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ flexGrow: 1 }} />
        <div style={{ flexGrow: 1 }}>
          <Tabs value={1} centered>
            <Tab
              key={0}
              label={
                <Skeleton variant="text">
                  <Typography>Specials</Typography>
                </Skeleton>
              }
              value={0}
            />
            <Tab
              key={1}
              label={
                <Skeleton variant="text">
                  <Typography>Season 1</Typography>
                </Skeleton>
              }
              value={1}
            />
          </Tabs>
        </div>
        <div style={{ flexGrow: 1 }} />
      </div>
      <div style={{ margin: "1rem 0 1rem 1rem", display: "flex", gap: "1rem", flexWrap: "wrap", maxWidth: "1000px" }}>
        {new Array(12).fill("").map((_, i) => {
          return (
            <div style={{ width: "calc((100%/3) - 1rem)" }} key={i}>
              <EpisodeLinkLoading />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HomeLoading;
