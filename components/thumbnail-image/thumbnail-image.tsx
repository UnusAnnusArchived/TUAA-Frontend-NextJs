import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";
import { cdn } from "../../src/endpoints.json";
import type { IVideo } from "../../src/types";
import axios from "axios";
import getBunnyEpisodeLinks from "../../src/utils/getBunnyLinks";

type OmittedProps = "src" | "onError" | "loading";

interface IProps extends Omit<ImageProps, OmittedProps> {
  video: IVideo;
}

const ThumbnailImage: React.FC<IProps> = (props) => {
  const { video } = props;

  const [src, setSrc] = useState(null);

  useEffect(() => {
    (async () => {
      const bunny = (
        await axios(
          `/api/bunny-api-temporary/get-episode/${video.sources.find((source) => source.type === "bunny")!.bunnyId}`
        )
      ).data;

      setSrc(getBunnyEpisodeLinks(bunny).thumbnail);
    })();
  }, []);

  return (
    <>
      <Image
        onError={() => setTimeout(() => setSrc(src), 1000)}
        src={
          src ??
          "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA="
        }
        {...props}
      />
    </>
  );
};

export { ThumbnailImage };
