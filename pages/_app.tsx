import Head from "next/head";
import React from "react";
import "../styles/globals.scss";
import type ***REMOVED***
  AppProps /*, AppContext , NextWebVitalsMetric */,
***REMOVED*** from "next/app";
import Script from "next/script";
import ***REMOVED*** ThemeProvider ***REMOVED*** from "@mui/material/styles";
import ***REMOVED*** theme ***REMOVED*** from "../components/theme/theme";
import ***REMOVED*** RecoilRoot ***REMOVED*** from "recoil";
import ***REMOVED*** GeistProvider ***REMOVED*** from "@geist-ui/react";

const App = (***REMOVED*** Component, pageProps ***REMOVED***: AppProps) => ***REMOVED***
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
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/favs/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/favs/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />
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
