import { Video, Caption as BunnyCaption } from "bunny-stream";
import endpoints from "@/endpoints.json";
import config from "@/config.json";

export interface EpisodeLinks {
  baseUrl: string;
  directPlay: string;
  originalFile: string;
  hls: string;
  thumbnail: string;
  preview: string;
  resolutions: Resolution[];
  captions: Caption[];
}

export interface Resolution {
  height: number;
  src: string;
}

export interface Caption extends BunnyCaption {
  src: string;
}

const heightMap = [720, 480, 360, 240];

const getBunnyEpisodeLinks = (video: Video): EpisodeLinks => {
  return {
    baseUrl: endpoints.bunny,
    directPlay: `https://iframe.mediadelivery.net/play/${config.bunny.libraryId}/${video.guid}`,
    originalFile: `${endpoints.bunny}/${video.guid}/original`,
    hls: `${endpoints.bunny}/${video.guid}/playlist.m3u8`,
    thumbnail: `${endpoints.bunny}/${video.guid}/${video.thumbnailFileName}`,
    preview: `${endpoints.bunny}/${video.guid}/preview.webp`,
    resolutions: heightMap
      .map((height) => {
        if (video.height >= height) {
          return {
            height: height,
            src: `${endpoints.bunny}/${video.guid}/play_${height}p.mp4`,
          };
        } else return undefined;
      })
      .filter((item) => {
        if (item === undefined) {
          return false;
        } else return true;
      }) as Resolution[],
    captions:
      video.captions?.map?.((caption) => {
        return {
          ...caption,
          src: `${endpoints.bunny}/${video.guid}/captions/${caption.srclang}.vtt`,
        };
      }) ?? [],
  };
};

export default getBunnyEpisodeLinks;
