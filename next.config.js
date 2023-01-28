/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: [
      'images.pexels.com',
      'img.freepik.com',
      'img-s-msn-com.akamaized.net',
      'res.cloudinary.com',
    ],

  },
};

module.exports = nextConfig;
