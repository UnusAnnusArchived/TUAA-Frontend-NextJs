import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  baseTitle?: string;
  video?: string;
  embed?: string;
  date?: number;
  description?: string;
  image?: string;
  width?: string;
  height?: string;
}

const MetaHead: React.FC<IProps> = ({ baseTitle, video, embed, date, description, image }) => {
  const { t } = useTranslation();
  const baseDomain = "https://unusann.us/";

  var useSmallImage = false;

  if (!image) {
    image = "https://unusann.us/ua.png";
    useSmallImage = true;
  }

  if (!image?.startsWith("http")) {
    image = baseDomain + image;
  }

  return (
    <Head>
      <title>{baseTitle ? `${baseTitle} | ${t("pages:site")}` : t("pages:site")}</title>
      {/* <!-- Schema.org for Google --> */}
      <meta itemProp="name" content={baseTitle} />
      {/* <!-- Open Graph general (Facebook, Pinterest & Google+) --> */}
      <meta name="og:title" content={baseTitle} />

      <meta name="og:image" content={image} />
      <meta name="og:url" content="https://unusann.us/" />
      <meta name="og:site_name" content={t("pages:site")} />
      <meta name="og:locale" content={t("language:code")} />
      <meta name="og:type" content={video ? "video.other" : "website"} />
      {/* <!-- Twitter --> */}
      <meta name="twitter:card" content={video ? "player" : useSmallImage ? "summary" : "summary_large_image"} />
      <meta name="twitter:title" content={baseTitle} />
      <meta name="twitter:image:src" content={image} />
      <meta name="twitter:site" content="@UA_Archive" />

      {video && (
        <React.Fragment>
          <meta name="twitter:player" content={embed} />
          <meta name="twitter:player:stream" content={video} />
          <meta name="og:video" content={video} />
          <meta name="twitter:card" content="player" />
          <meta name="twitter:player:stream:content_type" content="video/mp4" />
          <meta name="video:type" content="video/mp4" />
          <meta name="video:release_date" content={date.toString()} />
        </React.Fragment>
      )}

      {description && (
        <React.Fragment>
          <meta name="description" content={description} />
          <meta itemProp="description" content={description} />
          <meta name="og:description" content={description} />
          <meta name="twitter:description" content={description} />
        </React.Fragment>
      )}

      {image && (
        <React.Fragment>
          <meta name="image" content={image} />
          <meta itemProp="image" content={image} />
        </React.Fragment>
      )}
    </Head>
  );
};

export default MetaHead;
