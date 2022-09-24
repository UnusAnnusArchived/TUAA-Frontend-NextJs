import Image from "next/image";
import { useEffect, useState } from "react";
import { cdn } from "../../src/endpoints";
import type { ImageProps } from "next/image";
import type { IVideo } from "../../src/types";

type OmittedProps = "src" | "onError" | "loading";

interface IProps extends Omit<ImageProps, OmittedProps> {
  video: IVideo;
}

const ThumbnailImage: React.FC<IProps> = (props) => {
  const video = props.video;

  const [src, setSrc] = useState(`${cdn}${video.thumbnail ?? video.posters[0].src}`);

  useEffect(() => {
    if (video.thumbnail) {
      setSrc(`${cdn}${video.thumbnail}`);
    } else {
      if (video.posters[0].size) {
        // If the metadata is updated to have poster filesize
        video.posters.sort((a, b) => {
          if (a.size > b.size) {
            return 1;
          } else if (a.size < b.size) {
            return -1;
          } else if (a.size == b.size) {
            return 0;
          }
        });
      } else {
        // If not, then sort by what format will most likely have the smallest filesize
        let newArr = new Array(3);
        for (let i = 0; i < video.posters.length; i++) {
          const poster = video.posters[i];

          switch (poster.type) {
            case "image/avif": {
              newArr[0] = poster;
              break;
            }
            case "image/webp": {
              newArr[1] = poster;
              break;
            }
            case "image/jpeg": {
              newArr[3] = poster;
              break;
            }
          }
        }
      }

      // Use first/smallest size for first load before we can check for compatibility
      setSrc(`${cdn}${video.posters[0].src}`);
    }
  });

  useEffect(() => {
    if (!video.thumbnail) {
      // Once we load into the page, check for compatibility starting with smallest format going up until a supported format is found.
      for (let i = 0; i < video.posters.length; i++) {
        const poster = video.posters[i];

        if (poster) {
          if (checkImageType(poster.type)) {
            setSrc(`${cdn}${poster.src}`);
            break;
          } else {
            if (video.posters.length - 1 === i) {
              setSrc(`${cdn}${poster.src}`);
            }
          }
        }
      }
    }
  }, []);

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image onError={() => setTimeout(() => setSrc(src), 1000)} src={src} {...props} />
    </>
  );
};

const checkImageType = (type: string) => {
  let canvas = document.createElement("canvas");

  if (!!(canvas.getContext && canvas.getContext("2d"))) {
    return canvas.toDataURL(type).indexOf(`data:${type}`) == 0;
  } else {
    return false;
  }
};

export { ThumbnailImage };
