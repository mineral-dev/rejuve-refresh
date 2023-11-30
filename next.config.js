/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost',
      'api-refresh.rejuve.co.id'
    ]
  }
};

module.exports = nextConfig;
