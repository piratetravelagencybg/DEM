/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  async headers() {
    return [{
      source: '/images/:path*',
      headers: [{
        key: 'Cache-Control',
        value: 'public, max-age=604800, stale-while-revalidate=2592000',
      }],
    }]
  },
  async redirects() {
    return [{
      source: '/:path*',
      has: [{ type: 'host', value: 'www.domexpertmebel.com' }],
      destination: 'https://domexpertmebel.com/:path*',
      permanent: true,
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
