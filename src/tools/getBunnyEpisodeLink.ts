import { Video } from "bunny-stream";
import endpoints from "@/endpoints.json";

export interface EpisodeLinks {
  cdn: string;
  hls: string;
  original: string;
  thumbnail: string;
  seek: string;
  preview: string;
}

const getEpisodeLinks = (uaId: string): EpisodeLinks => {
  const cdn = endpoints.cdn;

  return {
    cdn,
    hls: `${cdn}/${uaId}/index.m3u8`,
    original: `${cdn}/${uaId}/original.mp4`,
    thumbnail: `${cdn}/${uaId}/thumb.webp`,
    seek: `${cdn}/${uaId}/seek/seek.vtt`,
    preview: `${cdn}/${uaId}/preview.webp`,
  };
};

export default getEpisodeLinks;
