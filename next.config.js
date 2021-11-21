const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA(***REMOVED***
  reactStrictMode: true,
  images: ***REMOVED***
    domains: ['cdn.unusann.us'],
***REMOVED***
  i18n: ***REMOVED***
    locales: ['cs', 'de', 'en', 'es', 'fa'],
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
