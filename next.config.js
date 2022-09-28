/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: ['www.gutenberg.org'],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
