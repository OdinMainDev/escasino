/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: [
      process.env.BASE_DOMAIN,
      process.env.IMAGE_DOMAIN
    ],
  },
}



module.exports = nextConfig
