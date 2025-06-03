/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force build to ignore all TypeScript and ESLint errors
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'ext.same-assets.com',
      },
      {
        protocol: 'https',
        hostname: 'ugc.same-assets.com',
      },
    ],
  },

  serverExternalPackages: ['stripe'],
};

module.exports = nextConfig;
