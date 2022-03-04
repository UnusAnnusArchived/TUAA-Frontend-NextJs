// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, ***REMOVED*** Html, Head, Main, NextScript ***REMOVED*** from "next/document";

export default class MyDocument extends Document ***REMOVED***
  render() ***REMOVED***
    return (
      <Html>
        <Head>
          ***REMOVED***/* Global Site Tag (gtag.js) - Google Analytics */***REMOVED***
          <script async src=***REMOVED***`https://www.googletagmanager.com/gtag/js?id=G-31L94KSXL0`***REMOVED*** />
          <script
            dangerouslySetInnerHTML=***REMOVED******REMOVED***
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag()***REMOVED***dataLayer.push(arguments);***REMOVED***
            gtag('js', new Date());
            gtag('config', 'G-31L94KSXL0', ***REMOVED***
              page_path: window.location.pathname,
        ***REMOVED***);
          `,
        ***REMOVED******REMOVED***
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
***REMOVED***
***REMOVED***
