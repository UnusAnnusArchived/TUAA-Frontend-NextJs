import Head from "next/head";
import React from "react";

interface IProps ***REMOVED***
  title: string;
  description?: string;
  image?: string;
  width?: string;
  height?: string;
***REMOVED***

const MetaHead: React.FC<IProps> = (***REMOVED***
  title,
  description = "The Unus Anus Archive",
  image = "thumbnail.png",
  width = "1920",
  height = "1080",
***REMOVED***) => ***REMOVED***
  // TODO: Change in production
  const baseDomain = "https://unusann.us/";

  if (!image.startsWith("http")) ***REMOVED***
    image = baseDomain + image;
***REMOVED***

  return (
    <Head>
      <title>***REMOVED***title***REMOVED***</title>
      <meta name="description" content=***REMOVED***description***REMOVED*** />
      <meta name="image" content=***REMOVED***image***REMOVED*** />
      ***REMOVED***/* <!-- Schema.org for Google --> */***REMOVED***
      <meta itemProp="name" content=***REMOVED***title***REMOVED*** />
      <meta itemProp="description" content=***REMOVED***description***REMOVED*** />
      <meta itemProp="image" content=***REMOVED***image***REMOVED*** />
      ***REMOVED***/* <!-- Open Graph general (Facebook, Pinterest & Google+) --> */***REMOVED***
      <meta property="og:title" content=***REMOVED***title***REMOVED*** />
      <meta property="og:description" content=***REMOVED***description***REMOVED*** />
      <meta property="og:image" content=***REMOVED***image***REMOVED*** />
      <meta property="og:url" content="https://unusann.us/" />
      <meta property="og:site_name" content="The Unus Anus Archive" />
      <meta property="og:locale" content="en_UK" />
      <meta property="og:type" content="website" />
      <meta property="og:image:width" content=***REMOVED***width***REMOVED*** />
      <meta property="og:image:height" content=***REMOVED***height***REMOVED*** />
      ***REMOVED***/* <!-- Twitter --> */***REMOVED***
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content=***REMOVED***title***REMOVED*** />
      <meta property="twitter:description" content=***REMOVED***description***REMOVED*** />
      <meta property="twitter:image:src" content=***REMOVED***image***REMOVED*** />
    </Head>
  );
***REMOVED***;

export default MetaHead;
