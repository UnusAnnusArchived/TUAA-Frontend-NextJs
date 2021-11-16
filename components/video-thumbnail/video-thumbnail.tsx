import Paper from "@mui/material/Paper";
import React from "react";
import ***REMOVED*** IVideo ***REMOVED*** from "../../src/types";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import ***REMOVED*** numberToNPlaces ***REMOVED*** from "../../src/utils";
import useMediaQuery from "@mui/material/useMediaQuery";
import ***REMOVED*** theme ***REMOVED*** from "../theme/theme";

interface IProps ***REMOVED***
  video: IVideo;
***REMOVED***

const VideoThumbnail: React.FC<IProps> = (***REMOVED*** video ***REMOVED***) => ***REMOVED***
  const posterUrl =
    video.posters?.length > 0 ? video.posters[0].src : video.thumbnail;
  const img = `https:$***REMOVED***posterUrl***REMOVED***`;

  return (
    <Paper className="p-2">
      <div className="ratio ratio-16x9">
        <Image
          src=***REMOVED***img***REMOVED***
          alt=""
          objectFit="cover"
          objectPosition="center center"
          quality=***REMOVED***100***REMOVED***
          layout="fill"
        />
      </div>
      <div className="text-center mt-2">
        <Typography variant="body1">***REMOVED***video.title***REMOVED***</Typography>
      </div>
      <div className="text-center mt-2">
        <Typography variant="body2">
          S***REMOVED***numberToNPlaces(video.season, 2)***REMOVED***E***REMOVED***numberToNPlaces(video.episode)***REMOVED***
        </Typography>
      </div>
    </Paper>
  );
***REMOVED***;

export default VideoThumbnail;
