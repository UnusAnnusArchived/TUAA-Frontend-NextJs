"use client";

import { EpisodeLinks } from "@/tools/getEpisodeLinks";
import { IMetadata } from "@/zodTypes";
import { useTheme } from "@mui/material";
import NextImage, { ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import ThumbnailLoading from "./thumbnail-loading";
import styles from "./styles.module.scss";
import { useInViewport } from "react-in-viewport";

interface IProps
  extends Partial<Omit<ImageProps, "style" | "src" | "alt" | "ref" | "onMouseEnter" | "onMouseLeave" | "width">> {
  episode: IMetadata;
  episodeLinks?: EpisodeLinks;
  ThumbnailProps?: Partial<ImageProps>;
  PreviewProps?: Partial<ImageProps>;
}

const EpisodeThumbnail: React.FC<IProps> = (props) => {
  const [showPreview, setShowPreview] = useState(false);
  const [thumbnailBlob, setThumbnailBlob] = useState<string>();
  const [previewBlob, setPreviewBlob] = useState<string>();
  const divRef = useRef<HTMLDivElement>(null);
  const { inViewport } = useInViewport(divRef);
  const theme = useTheme();
  const thumbnailRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    console.log(props.episodeLinks, inViewport);
    if (props.episodeLinks) {
      if (inViewport) {
        const abortController = new AbortController();

        fetch(props.episodeLinks.thumbnail, {
          signal: abortController.signal,
        }).then(async (thumbnail) => {
          setThumbnailBlob(URL.createObjectURL(await thumbnail.blob()));
        });

        return () => {
          abortController.abort("UI reloaded");
          if (thumbnailBlob) {
            URL.revokeObjectURL(thumbnailBlob);
          }
        };
      } else {
        if (thumbnailBlob) {
          URL.revokeObjectURL(thumbnailBlob);
          setThumbnailBlob(undefined);
        }
      }
    }
  }, [inViewport, props.episodeLinks, props.episodeLinks?.thumbnail]);

  useEffect(() => {
    if (props.episodeLinks) {
      if (inViewport) {
        const abortController = new AbortController();

        fetch(props.episodeLinks.preview, {
          signal: abortController.signal,
        }).then(async (preview) => {
          setPreviewBlob(URL.createObjectURL(await preview.blob()));
        });

        return () => {
          abortController.abort("UI reloaded");
          if (previewBlob) {
            URL.revokeObjectURL(previewBlob);
          }
        };
      } else {
        if (previewBlob) {
          URL.revokeObjectURL(previewBlob);
          setPreviewBlob(undefined);
        }
      }
    }
  }, [inViewport, props.episodeLinks, props.episodeLinks?.preview]);

  return (
    <div ref={divRef} style={{ position: "relative" }}>
      {thumbnailBlob ? (
        <NextImage
          src={thumbnailBlob ?? "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="}
          alt={`Thumbnail for ${props.episode.title}`}
          ref={thumbnailRef}
          width="1280"
          height="720"
          style={{ width: "100%", height: "auto", aspectRatio: 16 / 9, borderRadius: theme.shape.borderRadius }}
          {...props}
          {...props.ThumbnailProps}
        />
      ) : (
        <ThumbnailLoading />
      )}
      <NextImage
        src={previewBlob ?? "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="}
        alt={`Preview for ${props.episode.title}`}
        style={{
          opacity: 0,
          transition: theme.transitions.create("opacity"),
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "auto",
          aspectRatio: 16 / 9,
          borderRadius: theme.shape.borderRadius,
          pointerEvents: "none",
        }}
        className={styles.animation}
        width="320"
        height="180"
        {...props}
        {...props.PreviewProps}
      />
    </div>
  );
};

export default EpisodeThumbnail;
