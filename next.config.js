/** @type {import('next').NextConfig} */
const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  runtimeCaching,
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  buildExcludes: [/middleware-manifest.json$/],
});

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ["r2.unusann.us"],
  },
  productionBrowserSourceMaps: true,
  i18n: {
    locales: [
      "en",
      "es",
      "fr",
      "de",
      "fil",
      "sv",
      "nl",
      "pl",
      "no",
      "cy",
      "ga",
      "sco",
      "kw",
      "zh",
      "ru",
      "tr",
      "it",
      "szl",
      "csb",
      "be",
      "uk",
      "se",
      "fa",
      "cs",
    ],
    defaultLocale: "en",
  },
});
