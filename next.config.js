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
    domains: ["r2.unusann.us", "rust-lore.dpaste.org"],
  },
  productionBrowserSourceMaps: true,
  output: "standalone",
});
