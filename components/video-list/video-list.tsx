import React from "react";
import ***REMOVED*** IVideo ***REMOVED*** from "../../src/types";
import VideoThumbnail from "../video-thumbnail/video-thumbnail";
import Link from "next/link";

interface IProps ***REMOVED***
  videos: IVideo[];
  onDownloadPage?: boolean;
***REMOVED***

const VideoList: React.FC<IProps> = (***REMOVED*** videos, onDownloadPage ***REMOVED***) => ***REMOVED***
  return (
    <div className="row">
      ***REMOVED***videos.map((video, index) => ***REMOVED***
        let videoId = `s$***REMOVED***video.season.toString().padStart(2, "0")***REMOVED***.e$***REMOVED***video.episode.toString().padStart(3, "0")***REMOVED***`;

        return (
          <div key=***REMOVED***index***REMOVED*** className="col-12 col-md-4 p-2">
            <Link href=***REMOVED***onDownloadPage ? `/downloads/specific-episode/$***REMOVED***videoId***REMOVED***` : `/watch/$***REMOVED***videoId***REMOVED***`***REMOVED*** passHref>
              <div className="pointer h-100">
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
