/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  // Middleware combines host, legacy-path and slash normalization into one
  // permanent redirect. Disable Next's automatic slash hop to avoid chains.
  skipTrailingSlashRedirect: true,
  async headers() {
    return [{
      source: '/images/:path*',
      headers: [{
        key: 'Cache-Control',
        value: 'public, max-age=604800, stale-while-revalidate=2592000',
      }],
    }]
  },
  images: {
    // Vercel's managed optimizer currently rejects uncached requests with
    // OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED. The source files are already
    // WebP and MBX serves responsive WebP endpoints, so serving them directly
    // is both reliable and substantially cheaper.
    unoptimized: true,
    formats: ['image/webp'],
    minimumCacheTTL: 86400,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'www.mbx.bg' }
    ]
  }
}

export default nextConfig
