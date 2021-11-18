const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['cdn.unusannusarchive.tk', 'cdn.unusann.us'],
  },
  i18n: {
    locales: ['en', 'de', 'cs'],
    defaultLocale: 'en',
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
    buildExcludes: [/middleware-manifest.json$/]
  },
});
