import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Ensure the private pack files are bundled with the download API route on Vercel.
  outputFileTracingIncludes: {
    '/api/download': ['./content/packs/**/*'],
  },
};

export default nextConfig;
