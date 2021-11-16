import Paper from "@mui/material/Paper";
import React from "react";
import { IVideo } from "../../src/types";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import { numberToNPlaces } from "../../src/utils";
import useMediaQuery from "@mui/material/useMediaQuery";
import { theme } from "../theme/theme";

interface IProps {
  video: IVideo;
}

const VideoThumbnail: React.FC<IProps> = ({ video }) => {
  const posterUrl =
    video.posters?.length > 0 ? video.posters[0].src : video.thumbnail;
  const img = `https:${posterUrl}`;

  return (
    <Paper className="p-2">
      <div className="ratio ratio-16x9">
        <Image
          src={img}
          alt=""
          objectFit="cover"
          objectPosition="center center"
          quality={100}
          layout="fill"
        />
      </div>
      <div className="text-center mt-2">
        <Typography variant="body1">{video.title}</Typography>
      </div>
      <div className="text-center mt-2">
        <Typography variant="body2">
          S{numberToNPlaces(video.season, 2)}E{numberToNPlaces(video.episode)}
        </Typography>
      </div>
    </Paper>
  );
};

export default VideoThumbnail;
