import Head from "next/head";
import React from "react";

interface IProps {
  title: string;
  video?: string;
  embed?: string;
  date?: number
  description?: string;
  image?: string;
  width?: string;
  height?: string;
}

const MetaHead: React.FC<IProps> = ({
  title,
  video,
  embed,
  date,
  description = "The Unus Annus Archive",
  image = "thumbnail.png",
  width = "1920",
  height = "1080",
}) => {
  // TODO: Change in production
  const baseDomain = "https://unusann.us/";

  if (!image.startsWith("http")) {
    image = baseDomain + image;
  }

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      {/* <!-- Schema.org for Google --> */}
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={image} />
      {/* <!-- Open Graph general (Facebook, Pinterest & Google+) --> */}
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:image" content={image} />
      <meta name="og:url" content="https://unusann.us/" />
      <meta name="og:site_name" content="The Unus Annus Archive" />
      <meta name="og:locale" content="en_UK" />
      <meta name="og:type" content={video ? "player" : "website"} />
      <meta name="og:image:width" content={width} />
      <meta name="og:image:height" content={height} />
      {/* <!-- Twitter --> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image:src" content={image} />
      <meta name="twitter:site" content="@UA_Archive" />

      {video && <React.Fragment>
        <meta name="twitter:player" content={embed} />
        <meta name="twitter:player:stream" content={video} />
        <meta name="og:video" content={video} />
        <meta name="twitter:card" content="player" />
        <meta name="twitter:player:stream:content_type" content="video/mp4" />
        <meta name="video:type" content="video/mp4" />
        <meta name="video:release_date" content={date.toString()} />
      </React.Fragment>
      }
    </Head>
  );
};

export default MetaHead;
