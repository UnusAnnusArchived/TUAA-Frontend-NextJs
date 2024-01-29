import { Video } from "bunny-stream";
import config from "../config.json";

const getBunnyEpisodeLinks = (video: Video) => {
  const baseUrl = `https://${config.bunny.pullZone}.b-cdn.net`;

  return {
    baseUrl,
    hls: `${baseUrl}/${video.guid}/playlist.m3u8`,
    directPlay: `https://iframe.mediadelivery.net/embed/${config.bunny.libraryId}/${video.guid}?autoplay=true`,
    thumbnail: `${baseUrl}/${video.guid}/${video.thumbnailFileName}`,
    preview: `${baseUrl}/${video.guid}/preview.webp`,
  };
};

export default getBunnyEpisodeLinks;
