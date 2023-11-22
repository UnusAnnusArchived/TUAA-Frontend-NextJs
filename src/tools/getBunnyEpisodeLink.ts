import { Video } from "bunny-stream";
import config from "@/config.json";

export interface EpisodeLinks {
  baseUrl: string;
  hls: string;
  directPlay: string;
  thumbnail: string;
  preview: string;
}

const getBunnyEpisodeLinks = (video: Video) => {
  const baseUrl = `https://${config.bunny.pullZone}.b-cdn.net`;

  return {
    baseUrl,
    hls: `${baseUrl}/${video.guid}/playlist.m3u8`,
    directPlay: `https://iframe.mediadelivery.net/play/${config.bunny.libraryId}/${video.guid}`,
    thumbnail: `${baseUrl}/${video.guid}/${video.thumbnailFileName}`,
    preview: `${baseUrl}/${video.guid}/preview.webp`,
  };
};

export default getBunnyEpisodeLinks;
