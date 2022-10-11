import Paper from "@mui/material/Paper";
import React from "react";
import { IVideo } from "../../src/types";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { ThumbnailImage } from "../thumbnail-image/thumbnail-image";

interface IProps {
  video: IVideo;
}

const VideoThumbnail: React.FC<IProps> = ({ video }) => {
  const date = new Date(video.date ?? video.releasedate);

  const { t, i18n } = useTranslation();

  return (
    <Paper className="p-2 h-100">
      <div className="ratio ratio-16x9">
        <ThumbnailImage video={video} />
      </div>
      <div className="text-center mt-2">
        <Typography variant="body1">{video.title}</Typography>
      </div>
      <div className="text-center mt-2">
        <Typography variant="body2">
          {t("player:episode")} {video.episode.toString()} - {moment(date).locale(i18n.language).format("DD. MMM YYYY")}
        </Typography>
      </div>
    </Paper>
  );
};

export default VideoThumbnail;
