import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  // GitHub Pages will serve from /repo-name/
  basePath: '/sarahs-snacks-delight',
  assetPrefix: '/sarahs-snacks-delight/',
};

export default nextConfig;
