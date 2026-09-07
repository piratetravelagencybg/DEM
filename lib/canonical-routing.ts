export const CANONICAL_SITE_ORIGIN = 'https://domexpertmebel.com'
export const CANONICAL_HOSTNAME = 'domexpertmebel.com'
export const LEGACY_WWW_HOSTNAME = 'www.domexpertmebel.com'

type CanonicalUrlOptions = {
  clearSearch?: boolean
}

const PUBLIC_FILE_EXTENSION = /\.(?:avif|css|csv|eot|gif|html?|ico|jpe?g|js|json|map|mjs|mp3|mp4|otf|pdf|png|svg|txt|webmanifest|webm|webp|woff2?|xml|xsl|zip)$/i

function isPublicSiteHostname(hostname: string) {
  const normalized = hostname.toLowerCase()
  return normalized === CANONICAL_HOSTNAME || normalized === LEGACY_WWW_HOSTNAME
}

/**
 * Public HTML routes use a trailing slash. Files such as sitemap.xml,
 * robots.txt and verification HTML files keep their filename URL.
 */
export function normalizePublicPathname(pathname: string) {
  if (!pathname || pathname === '/') return '/'

  const withoutTrailingSlash = pathname.replace(/\/+$/, '')
  const lastSegment = withoutTrailingSlash.split('/').filter(Boolean).at(-1) || ''
  if (PUBLIC_FILE_EXTENSION.test(lastSegment)) return withoutTrailingSlash
  return pathname.endsWith('/') ? pathname : pathname + '/'
}

/**
 * Builds a redirect target without forcing local development hosts to the
 * production domain. Production apex/www requests are always normalized to
 * the single HTTPS non-www origin.
 */
export function buildCanonicalPublicUrl(
  requestUrl: string | URL,
  pathname: string,
  options: CanonicalUrlOptions = {},
) {
  const destination = new URL(requestUrl)
  if (isPublicSiteHostname(destination.hostname)) {
    destination.protocol = 'https:'
    destination.hostname = CANONICAL_HOSTNAME
    destination.port = ''
  }
  destination.pathname = normalizePublicPathname(pathname)
  if (options.clearSearch) destination.search = ''
  return destination
}

export function getCanonicalRequestRedirectUrl(
  requestUrl: string | URL,
  pathname: string,
) {
  const current = new URL(requestUrl)
  const normalizedPathname = normalizePublicPathname(pathname)
  const needsPathRedirect = normalizedPathname !== pathname
  const needsHostRedirect = current.hostname.toLowerCase() === LEGACY_WWW_HOSTNAME
  const needsProtocolRedirect = isPublicSiteHostname(current.hostname)
    && current.protocol !== 'https:'

  if (!needsPathRedirect && !needsHostRedirect && !needsProtocolRedirect) return null
  return buildCanonicalPublicUrl(current, normalizedPathname)
}
