/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["svgrepo.com", "images.foody.vn"],
  },
};

module.exports = nextConfig;
