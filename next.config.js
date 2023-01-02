/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["es"],
    defaultLocale: "es",
  },
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    runtimeCaching,
  },
  images: {
    domains: ["localhost", "itunes.apple.com"],
    formats: ["image/avif", "image/webp"]
  },
})