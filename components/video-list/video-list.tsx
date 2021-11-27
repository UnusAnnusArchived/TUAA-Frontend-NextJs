import React from "react";
import { IVideo } from "../../src/types";
import VideoThumbnail from "../video-thumbnail/video-thumbnail";
import Link from "next/link";

interface IProps {
  videos: IVideo[];
}

const VideoList: React.FC<IProps> = ({ videos }) => {
  return (
    <div className="row">
      {videos.map((video, index) => {
        return (
          <div key={index} className="col-12 col-md-4 p-2">
            <Link
              href={`/watch/s${video.season.toString().padStart(2, "0")}.e${video.episode.toString().padStart(3, "0")}`}
              passHref
            >
              <div className="pointer h-100">
                <VideoThumbnail video={video} />
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default VideoList;
