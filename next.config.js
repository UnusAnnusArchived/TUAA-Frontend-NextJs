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
    domains: ["cdn.unusann.us", "usc1.contabostorage.com"],
  },
  i18n: {
    locales: ["cs", "de", "en", "es", "fa"],
    defaultLocale: "en",
  },
});
