"use client";

import { EpisodeLinks } from "@/tools/getBunnyEpisodeLink";
import { IMetadata } from "@/zodTypes";
import { useTheme } from "@mui/material";
import NextImage, { ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import ThumbnailLoading from "./thumbnail-loading";

interface IProps
  extends Partial<Omit<ImageProps, "style" | "src" | "alt" | "ref" | "onMouseEnter" | "onMouseLeave" | "width">> {
  episode: IMetadata;
  episodeLinks: EpisodeLinks;
  ThumbnailProps?: Partial<ImageProps>;
  PreviewProps?: Partial<ImageProps>;
}

const EpisodeThumbnail: React.FC<IProps> = (props) => {
  const [showPreview, setShowPreview] = useState(false);
  const [[thumbnailX, thumbnailY, thumbnailWidth, thumbnailHeight], setThumbnailPosition] = useState([0, 0, 0, 0]);
  const [thumbnailBlob, setThumbnailBlob] = useState<string>();
  const [previewBlob, setPreviewBlob] = useState<string>();
  const theme = useTheme();
  const thumbnailRef = useRef<HTMLImageElement>(null);

  const handleResize = () => {
    if (thumbnailRef.current) {
      const rect = thumbnailRef.current.getBoundingClientRect();
      setThumbnailPosition([rect.x, rect.top, rect.width, rect.height]);
    } else {
      setThumbnailPosition([0, 0, 0, 0]);
    }
  };

  useEffect(() => {
    handleResize();
  }, [thumbnailRef.current, thumbnailBlob]);

  useEffect(() => {
    if (window) {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (window) {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(props.episodeLinks.thumbnail, {
      signal: abortController.signal,
    }).then(async (thumbnail) => {
      setThumbnailBlob(URL.createObjectURL(await thumbnail.blob()));
    });

    return () => {
      abortController.abort("UI reloaded");
    };
  }, [props.episodeLinks.thumbnail]);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(props.episodeLinks.preview, {
      signal: abortController.signal,
    }).then(async (preview) => {
      setPreviewBlob(URL.createObjectURL(await preview.blob()));
    });

    return () => {
      abortController.abort("UI reloaded");
    };
  }, [props.episodeLinks.preview]);

  const handleMouseEnter = () => {
    setShowPreview(true);
  };

  const handleMouseLeave = () => {
    setShowPreview(false);
  };

  if (thumbnailBlob) {
    return (
      <div>
        <NextImage
          src={thumbnailBlob ?? "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="}
          alt={`Thumbnail for ${props.episode.title}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={thumbnailRef}
          width="1280"
          height="720"
          style={{ width: "100%", height: "auto", aspectRatio: 16 / 9, borderRadius: theme.shape.borderRadius }}
          {...props}
          {...props.ThumbnailProps}
        />
        <NextImage
          src={
            showPreview && previewBlob
              ? previewBlob
              : "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
          }
          alt={`Preview for ${props.episode.title}`}
          style={{
            opacity: showPreview && previewBlob ? 1 : 0,
            transition: theme.transitions.create("opacity"),
            position: "absolute",
            left: thumbnailX,
            top: `calc(${thumbnailY}px - 4.5rem)`,
            width: thumbnailWidth,
            height: thumbnailHeight,
            borderRadius: theme.shape.borderRadius,
            pointerEvents: "none",
          }}
          width="320"
          height="180"
          {...props}
          {...props.PreviewProps}
        />
      </div>
    );
  } else {
    return <ThumbnailLoading />;
  }
};

export default EpisodeThumbnail;
