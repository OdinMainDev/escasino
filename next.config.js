/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.IMAGE_DOMAIN,
      },
      {
        protocol: 'https',
        hostname: process.env.BASE_DOMAIN,
      },
    ],
  },
}



module.exports = nextConfig
