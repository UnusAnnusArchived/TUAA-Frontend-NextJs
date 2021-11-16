import React from "react";
import ***REMOVED*** IVideo ***REMOVED*** from "../../src/types";
import VideoThumbnail from "../video-thumbnail/video-thumbnail";
import Link from "next/link";
import ***REMOVED*** numberToNPlaces ***REMOVED*** from "../../src/utils";

interface IProps ***REMOVED***
  videos: IVideo[];
***REMOVED***

const VideoList: React.FC<IProps> = (***REMOVED*** videos ***REMOVED***) => ***REMOVED***
  return (
    <div className="row">
      ***REMOVED***videos.map((video, index) => ***REMOVED***
        return (
          <div key=***REMOVED***index***REMOVED*** className="col-12 col-md-4 p-2">
            <Link
              href=***REMOVED***`/watch/s$***REMOVED***numberToNPlaces(
                video.season,
                2
              )***REMOVED***.e$***REMOVED***numberToNPlaces(video.episode, 3)***REMOVED***`***REMOVED***
              passHref
            >
              <div className="pointer">
                <VideoThumbnail video=***REMOVED***video***REMOVED*** />
              </div>
            </Link>
          </div>
        );
  ***REMOVED***)***REMOVED***
    </div>
  );
***REMOVED***;

export default VideoList;
