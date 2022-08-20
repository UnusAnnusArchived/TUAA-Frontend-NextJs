import Image from "next/image";
import ***REMOVED*** useEffect, useState ***REMOVED*** from "react";
import ***REMOVED*** cdn ***REMOVED*** from "../../src/endpoints";
import type ***REMOVED*** ImageProps ***REMOVED*** from "next/image";
import type ***REMOVED*** IVideo ***REMOVED*** from "../../src/types";

type OmittedProps = "src" | "onError" | "loading";

interface IProps extends Omit<ImageProps, OmittedProps> ***REMOVED***
  video: IVideo;
***REMOVED***

const ThumbnailImage: React.FC<IProps> = (props) => ***REMOVED***
  const video = props.video;

  const [src, setSrc] = useState(`$***REMOVED***cdn***REMOVED***$***REMOVED***video.thumbnail ?? video.posters[0].src***REMOVED***`);

  useEffect(() => ***REMOVED***
    if (video.thumbnail) ***REMOVED***
      setSrc(`$***REMOVED***cdn***REMOVED***$***REMOVED***video.thumbnail***REMOVED***`);
***REMOVED*** else ***REMOVED***
      if (video.posters[0].size) ***REMOVED***
        // If the metadata is updated to have poster filesize
        video.posters.sort((a, b) => ***REMOVED***
          if (a.size > b.size) ***REMOVED***
            return 1;
      ***REMOVED*** else if (a.size < b.size) ***REMOVED***
            return -1;
      ***REMOVED*** else if (a.size == b.size) ***REMOVED***
            return 0;
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED*** else ***REMOVED***
        // If not, then sort by what format will most likely have the smallest filesize
        let newArr = new Array(3);
        for (let i = 0; i < video.posters.length; i++) ***REMOVED***
          const poster = video.posters[i];

          switch (poster.type) ***REMOVED***
            case "image/avif": ***REMOVED***
              newArr[0] = poster;
              break;
        ***REMOVED***
            case "image/webp": ***REMOVED***
              newArr[1] = poster;
              break;
        ***REMOVED***
            case "image/jpeg": ***REMOVED***
              newArr[3] = poster;
              break;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***

      // Use first/smallest size for first load before we can check for compatibility
      setSrc(`$***REMOVED***cdn***REMOVED***$***REMOVED***video.posters[0].src***REMOVED***`);
***REMOVED***
***REMOVED***);

  useEffect(() => ***REMOVED***
    if (!video.thumbnail) ***REMOVED***
      // Once we load into the page, check for compatibility starting with smallest format going up until a supported format is found.
      for (let i = 0; i < video.posters.length; i++) ***REMOVED***
        const poster = video.posters[i];

        if (poster) ***REMOVED***
          if (checkImageType(poster.type)) ***REMOVED***
            setSrc(`$***REMOVED***cdn***REMOVED***$***REMOVED***poster.src***REMOVED***`);
            break;
      ***REMOVED*** else ***REMOVED***
            if (video.posters.length - 1 === i) ***REMOVED***
              setSrc(`$***REMOVED***cdn***REMOVED***$***REMOVED***poster.src***REMOVED***`);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***
***REMOVED*** []);

  return (
    <>
      ***REMOVED***/* eslint-disable-next-line jsx-a11y/alt-text */***REMOVED***
      <Image onError=***REMOVED***() => setTimeout(() => setSrc(src), 1000)***REMOVED*** src=***REMOVED***src***REMOVED*** ***REMOVED***...props***REMOVED*** />
    </>
  );
***REMOVED***;

const checkImageType = (type: string) => ***REMOVED***
  let canvas = document.createElement("canvas");

  if (!!(canvas.getContext && canvas.getContext("2d"))) ***REMOVED***
    return canvas.toDataURL(type).indexOf(`data:$***REMOVED***type***REMOVED***`) == 0;
***REMOVED*** else ***REMOVED***
    return false;
***REMOVED***
***REMOVED***;

export ***REMOVED*** ThumbnailImage ***REMOVED***;
