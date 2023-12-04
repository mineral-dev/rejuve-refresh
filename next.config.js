/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "refresh.rejuve.co.id", "api-refresh.rejuve.co.id"],
  },
};

module.exports = nextConfig;
