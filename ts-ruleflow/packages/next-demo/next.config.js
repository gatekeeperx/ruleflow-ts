/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Mantenemos Node.js runtime para el API (cjs friendly)
  },
};

module.exports = nextConfig;
