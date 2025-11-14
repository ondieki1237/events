import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://events.codewithseth.co.ke',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'accordmedical.co.ke',
        pathname: '/web/uploads/shop/**',
      },
      {
        protocol: 'https',
        hostname: 'events.codewithseth.co.ke',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
