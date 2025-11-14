/**
 * Next.js configuration
 * Allows loading remote images from accordmedical.co.ke used across the site.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // legacy domains whitelist (works with next/image)
    domains: ['accordmedical.co.ke', 'events.codewithseth.co.ke'],
    // remotePatterns are more flexible and recommended for Next.js 13+
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'accordmedical.co.ke',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
