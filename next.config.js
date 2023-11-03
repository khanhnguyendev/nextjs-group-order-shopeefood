/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      "encrypted-tbn0.gstatic.com",
      "neo-brutalism-ui-library.vercel.app",
      "images.foody.vn",
    ],
  },
};

module.exports = nextConfig;
