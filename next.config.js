/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
