const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA(***REMOVED***
  reactStrictMode: true,
  images: ***REMOVED***
    domains: ['cdn.unusannusarchive.tk'],
***REMOVED***
  i18n: ***REMOVED***
    locales: ['en'],
    defaultLocale: 'en',
***REMOVED***
  pwa: ***REMOVED***
    dest: 'public',
    runtimeCaching,
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
    buildExcludes: [/middleware-manifest.json$/]
***REMOVED***
***REMOVED***);
