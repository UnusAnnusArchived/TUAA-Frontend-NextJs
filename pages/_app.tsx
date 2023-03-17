import Head from "next/head";
import React from "react";
import "../styles/globals.scss";
import type { AppProps, NextWebVitalsMetric } from "next/app";
import { theme } from "../components/theme/theme";
import { RecoilRoot } from "recoil";
import { GeistProvider } from "@geist-ui/react";
import { useRouter } from "next/router";
import { initTranslations } from "../src/i18n/i18n";
import NonSsrWrapper from "../components/non-ssr-wrapper";
import ThemeProvider from "../components/theme";
import { Paper, Typography } from "@mui/material";
import moment from "moment-with-locales-es6";

export const reportWebVitals = (metric: NextWebVitalsMetric) => {
  const { id, name, label, value } = metric;
  // Use `window.gtag` if you initialized Google Analytics as this example:
  // https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_document.js

  // @ts-ignore
  window.gtag("event", name, {
    event_category: label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
    value: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
    event_label: id, // id unique to current page load
    non_interaction: true, // avoids affecting bounce rate.
  });
};

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  initTranslations(router.locale);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdn.plyr.io/3.6.9/plyr.css" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favs/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favs/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favs/favicon-16x16.png" />
        <link rel="manifest" href="/favs/site.webmanifest" />
        <link rel="mask-icon" href="/favs/safari-pinned-tab.svg" color="#121212" />
        <link rel="shortcut icon" href="/favs/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/favs/browserconfig.xml" />
        <meta name="theme-color" content="#121212" />
      </Head>
      <RecoilRoot>
        <ThemeProvider>
          <GeistProvider>
            <NonSsrWrapper>
              <Typography sx={{ textAlign: "center" }}>
                The site is going to be offline due to planned maintenance on{" "}
                {moment(1679504400000).format("MMMM Do YYYY [at] LT UTCZ")} (in {moment(1679504400000).fromNow()})
              </Typography>
              <Component {...pageProps} />
            </NonSsrWrapper>
          </GeistProvider>
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
};

export default App;
