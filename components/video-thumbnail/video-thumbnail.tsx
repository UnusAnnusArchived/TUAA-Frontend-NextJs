import Paper from "@mui/material/Paper";
import React from "react";
import { IVideo } from "../../src/types";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import moment from "moment-with-locales-es6";
import { useTranslation } from "react-i18next";
import { cdn } from "../../src/endpoints.json";
import { ThumbnailImage } from "../thumbnail-image/thumbnail-image";

interface IProps {
  video: IVideo;
  showSeason?: boolean;
}

const VideoThumbnail: React.FC<IProps> = ({ video, showSeason }) => {
  const date = new Date(video.date);

  const { t, i18n } = useTranslation();

  return (
    <Paper className="p-2 h-100">
      <div className="ratio ratio-16x9">
        <ThumbnailImage
          video={video}
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
          {t("player:season")} {video.season.toString()} {t("player:episode")} {video.episode.toString()} -{" "}
          {moment(date).locale(i18n.language).format("DD. MMM YYYY")}
        </Typography>
      </div>
    </Paper>
  );
};

export default VideoThumbnail;
