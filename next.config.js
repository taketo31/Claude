/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'sp.propertyguru.com.my' },
      { protocol: 'https', hostname: 'img.iproperty.com.my' },
    ],
  },
};

module.exports = nextConfig;
