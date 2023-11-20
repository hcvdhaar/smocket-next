/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // TODO: Security issue, let the images come from own cdn
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
