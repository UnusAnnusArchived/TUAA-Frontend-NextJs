import Head from "next/head";
import React from "react";

interface IProps {
  baseTitle?: string;
  video?: string;
  embed?: string;
  date?: number
  description?: string;
  image?: string;
  width?: string;
  height?: string;
}

const MetaHead: React.FC<IProps> = ({
  baseTitle,
  video,
  embed,
  date,
  description,
  image,
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
      <title>{baseTitle ? baseTitle + " | The Unus Annus Archive" : "The Unus Annus Archive"}</title>
      {/* <!-- Schema.org for Google --> */}
      <meta itemProp="name" content={baseTitle} />
      {/* <!-- Open Graph general (Facebook, Pinterest & Google+) --> */}
      <meta name="og:title" content={baseTitle} />
      
      <meta name="og:image" content={image} />
      <meta name="og:url" content="https://unusann.us/" />
      <meta name="og:site_name" content="The Unus Annus Archive" />
      <meta name="og:locale" content="en_UK" />
      <meta name="og:type" content={video ? "video.other" : "website"} />
      <meta name="og:image:width" content={width} />
      <meta name="og:image:height" content={height} />
      {/* <!-- Twitter --> */}
      <meta name="twitter:card" content={video ? "player" : "summary"} />
      <meta name="twitter:title" content={baseTitle} />
      <meta name="twitter:image:src" content={image} />
      <meta name="twitter:site" content="@UA_Archive" />

      { video && <React.Fragment>
        <meta name="twitter:player" content={embed} />
        <meta name="twitter:player:stream" content={video} />
        <meta name="og:video" content={video} />
        <meta name="twitter:card" content="player" />
        <meta name="twitter:player:stream:content_type" content="video/mp4" />
        <meta name="video:type" content="video/mp4" />
        <meta name="video:release_date" content={date.toString()} />
      </React.Fragment> }

      { description && <React.Fragment>
        <meta name="description" content={description} />
        <meta itemProp="description" content={description} />
        <meta name="og:description" content={description} />
        <meta name="twitter:description" content={description} />
      </React.Fragment> }

      { image && <React.Fragment>
        <meta name="image" content={image} />
        <meta itemProp="image" content={image} />
      </React.Fragment> }
    </Head>
  );
};

export default MetaHead;
