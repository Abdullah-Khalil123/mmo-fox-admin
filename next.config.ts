import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'cjpxknfjunyyynwyniuj.supabase.co',
      'example.com',
      'gratisography.com',
      '*',
    ], // add this domain
  },
};

export default nextConfig;
