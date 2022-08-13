import Paper from "@mui/material/Paper";
import React from "react";
import ***REMOVED*** IVideo ***REMOVED*** from "../../src/types";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import moment from "moment-with-locales-es6";
import ***REMOVED*** useTranslation ***REMOVED*** from "react-i18next";
import ***REMOVED*** cdn ***REMOVED*** from "../../src/endpoints";

interface IProps ***REMOVED***
  video: IVideo;
***REMOVED***

const VideoThumbnail: React.FC<IProps> = (***REMOVED*** video ***REMOVED***) => ***REMOVED***
  const posterUrl = video.posters?.length > 0 ? video.posters[0].src : video.thumbnail;
  const img = `$***REMOVED***cdn***REMOVED***$***REMOVED***posterUrl***REMOVED***`;

  const date = new Date(video.date ?? video.releasedate);

  const ***REMOVED*** t, i18n ***REMOVED*** = useTranslation();

  return (
    <Paper className="p-2 h-100">
      <div className="ratio ratio-16x9">
        <Image src=***REMOVED***img***REMOVED*** alt="" objectFit="cover" objectPosition="center center" quality=***REMOVED***100***REMOVED*** layout="fill" />
      </div>
      <div className="text-center mt-2">
        <Typography variant="body1">***REMOVED***video.title***REMOVED***</Typography>
      </div>
      <div className="text-center mt-2">
        <Typography variant="body2">
          ***REMOVED***t("player:episode")***REMOVED*** ***REMOVED***video.episode.toString()***REMOVED*** - ***REMOVED***moment(date).locale(i18n.language).format("DD. MMM YYYY")***REMOVED***
        </Typography>
      </div>
    </Paper>
  );
***REMOVED***;

export default VideoThumbnail;
