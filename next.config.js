/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["img.clerk.com", "svgrepo.com", "images.foody.vn"],
  },
};

module.exports = nextConfig;
