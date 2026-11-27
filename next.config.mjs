/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  // Middleware combines host, legacy-path and slash normalization into one
  // permanent redirect. Disable Next's automatic slash hop to avoid chains.
  skipTrailingSlashRedirect: true,
  // /3d-калкулатор/ е страница (app/3d-калкулатор), която вгражда public/konfigurator; старият адрес пренасочва.
  async redirects() {
    const old = ['3d-конфигуратор', encodeURIComponent('3d-конфигуратор')]
    return old.flatMap((slug) => [
      { source: `/${slug}/`, destination: '/3d-калкулатор/', permanent: true },
      { source: `/${slug}`, destination: '/3d-калкулатор/', permanent: true },
    ])
  },
  async headers() {
    return [{
      source: '/konfigurator/assets/:path*',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=604800' }],
    }, {
      source: '/images/:path*',
      headers: [{
        key: 'Cache-Control',
        value: 'public, max-age=604800, stale-while-revalidate=2592000',
      }],
    }]
  },
  images: {
    // Vercel's managed optimizer currently rejects uncached requests with
    // OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED. Instead of a runtime optimizer,
    // the custom loader serves pre-generated 640w/1024w WebP variants
    // (npm run images:responsive) and the original file for desktop widths.
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
    deviceSizes: [640, 1024, 1920],
    imageSizes: [320],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'www.mbx.bg' }
    ]
  }
}

export default nextConfig
