/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: false,
    domains: [],
  },
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
}

module.exports = nextConfig
