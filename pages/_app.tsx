import Head from "next/head";
import React, { useEffect, useState } from "react";
import "../styles/globals.scss";
import type { AppProps, NextWebVitalsMetric } from "next/app";
import { theme } from "../components/theme/theme";
import { RecoilRoot, useRecoilState } from "recoil";
import { GeistProvider } from "@geist-ui/react";
import { useRouter } from "next/router";
import { initTranslations } from "../src/i18n/i18n";
import NonSsrWrapper from "../components/non-ssr-wrapper";
import ThemeProvider from "../components/theme";
import { Dialog, DialogContent, DialogTitle, Paper, Typography, colors } from "@mui/material";
import moment from "moment-with-locales-es6";
import { changedColorSchemeAtom, colorSchemeAtom } from "../src/atoms";

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
              <ColorSwitcher />
              <Component {...pageProps} />
            </NonSsrWrapper>
          </GeistProvider>
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
};

const ColorSwitcher: React.FC = () => {
  const [changedColorScheme, setChangedColorScheme] = useRecoilState(changedColorSchemeAtom);
  const [colorScheme, setColorScheme] = useRecoilState(colorSchemeAtom);

  useEffect(() => {
    if (!changedColorScheme) {
      if (colorScheme === "dark") {
        setColorScheme("light");
      } else if (colorScheme === "light") {
        setColorScheme("dark");
      }
      setChangedColorScheme(true);
    }
  }, [changedColorScheme, colorScheme]);

  return <></>;
};

export default App;
