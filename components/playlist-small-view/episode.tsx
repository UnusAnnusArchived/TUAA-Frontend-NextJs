import Image from "next/image";
import { IVideo } from "../../src/types";
import { Divider, Skeleton, Typography } from "@mui/material";
import endpoints from "../../src/endpoints.json";
import styles from "./episode.module.scss";
import { useRouter } from "next/router";
import classNames from "classnames";
import { useRecoilState } from "recoil";
import { colorSchemeAtom } from "../../src/atoms";

interface IProps {
  episode: IVideo;
  currentEpisodeId: string;
  playlistId: string;
}

// export const Skeleton =

const PlaylistSmallEpisode: React.FC<IProps> = ({ episode, currentEpisodeId, playlistId }) => {
  const router = useRouter();
  const [colorScheme] = useRecoilState(colorSchemeAtom);

  const episodeId = `s${episode.season.toString().padStart(2, "0")}.e${episode.episode.toString().padStart(3, "0")}`;

  const colorClass = colorScheme === "dark" ? styles.darkMode : styles.lightMode;

  const handleClick = () => {
    router.push(`/watch/${episodeId}?playlist=${playlistId}`);
  };

  return (
    <>
      <div
        className={classNames(
          styles.container,
          episodeId === currentEpisodeId ? styles.selected : undefined,
          colorClass
        )}
        style={{ userSelect: "none", display: "flex", flexDirection: "row", padding: "8px 16px", maxWidth: "100%" }}
        onClick={handleClick}
      >
        {/* <Skeleton variant="rectangular" width={100} height={56} animation="wave" /> */}
        <img width={100} height={56} src={`${endpoints.cdn}${episode.posters[0].src}`} style={{ flexShrink: 0 }} />
        <div style={{ marginLeft: 8, display: "flex", flexDirection: "column", maxWidth: "calc(100% - 116px)" }}>
          {/* <Skeleton variant="text" width="35%" animation="wave" /> */}
          <Typography sx={{ fontSize: "1rem", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
            {episode.title}
          </Typography>
          {/* <Skeleton variant="text" animation="wave" /> */}
          <Typography
            className={classNames(styles.description, colorClass)}
            sx={{ fontSize: ".75rem", lineHeight: "1rem", height: "2rem", overflow: "hidden" }}
          >
            {/* description without html characters */}
            {episode.description.replaceAll(/<[^>]*>/g, " ")}
          </Typography>
        </div>
      </div>
      <Divider />
    </>
  );
};

export default PlaylistSmallEpisode;
