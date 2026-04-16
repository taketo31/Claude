/** @type {import('next').NextConfig} */
// `NEXT_PUBLIC_BASE_PATH` is set by the GitHub Pages workflow to the repo
// name (e.g. `/claude`). Left empty for local dev.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    // The Image Optimizer requires a server, so disable it for static export.
    unoptimized: true,
  },
};

module.exports = nextConfig;
