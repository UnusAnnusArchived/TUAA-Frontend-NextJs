import Head from "next/head";
import React from "react";
import "../styles/globals.scss";
import type ***REMOVED*** AppProps /*, AppContext*/, NextWebVitalsMetric ***REMOVED*** from "next/app";
import Script from "next/script";
import ***REMOVED*** ThemeProvider ***REMOVED*** from "@mui/material/styles";
import ***REMOVED*** theme ***REMOVED*** from "../components/theme/theme";
import ***REMOVED*** RecoilRoot ***REMOVED*** from "recoil";
import ***REMOVED*** GeistProvider ***REMOVED*** from "@geist-ui/react";
import ***REMOVED*** useRouter ***REMOVED*** from "next/router";
import ***REMOVED*** initTranslations ***REMOVED*** from "../src/i18n/i18n";

export const reportWebVitals = (metric: NextWebVitalsMetric) => ***REMOVED***
  const ***REMOVED*** id, name, label, value ***REMOVED*** = metric;
  // Use `window.gtag` if you initialized Google Analytics as this example:
  // https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_document.js

  // @ts-ignore
  window.gtag("event", name, ***REMOVED***
    event_category:
      label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
    value: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
    event_label: id, // id unique to current page load
    non_interaction: true, // avoids affecting bounce rate.
***REMOVED***);
***REMOVED***;

const App = (***REMOVED*** Component, pageProps ***REMOVED***: AppProps) => ***REMOVED***
  const router = useRouter();
  initTranslations(router.locale);

  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="https://cdn.plyr.io/3.6.9/plyr.css" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favs/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favs/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favs/favicon-16x16.png"
        />
        <link rel="manifest" href="/favs/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favs/safari-pinned-tab.svg"
          color="#121212"
        />
        <link rel="shortcut icon" href="/favs/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/favs/browserconfig.xml" />
        <meta name="theme-color" content="#121212" />
      </Head>
      <RecoilRoot>
        <ThemeProvider theme=***REMOVED***theme***REMOVED***>
          <GeistProvider>
            <Component ***REMOVED***...pageProps***REMOVED*** />
          </GeistProvider>
        </ThemeProvider>
      </RecoilRoot>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-/bQdsTh/da6pkI1MST/rWKFNjaCP5gBSY4sEBT38Q/9RBh9AH40zEOg7Hlq2THRZ"
        crossOrigin="anonymous"
      />
    </>
  );
***REMOVED***;

export default App;
