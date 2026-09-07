import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  buildCatalogHref,
  normalizeCatalogCategory,
  normalizeCatalogSort,
  normalizeCatalogType,
} from '@/lib/catalog-routing'
import {
  buildCatalogLandingInternalPath,
  parseCatalogLandingInternalSegments,
  parseCatalogLandingSegments,
  resolveLegacyCatalogPathRedirect,
} from '@/lib/catalog-landings'
import {
  buildCanonicalPublicUrl,
  getCanonicalRequestRedirectUrl,
} from '@/lib/canonical-routing'

const LEGACY_PRODUCT_SLUGS = new Set([
  'trapezen-stol-natural',
  'holna-masa-oak',
  'divan-komfort',
  'tv-shkaf-modern',
  'aglov-divan-lux',
  'trapezna-masa-rio',
  'ofis-stol-ergo',
  'tv-sekcia-premium',
])

const CATALOG_ROUTE_PREFIXES = new Set(['стая', 'вид', 'подреждане', 'страница'])
const READY_FURNITURE_PREFIX = '/готови-мебели'
const READY_INTERNAL_PREFIX = '/ready'
const READY_SORT_INTERNAL_PREFIX = '/ready-sort'
const LEGACY_CATALOG_QUERY_KEYS = ['category', 'type', 'sort', 'page'] as const

type PublicRedirectOptions = {
  clearSearch?: boolean
  omitSearchParams?: readonly string[]
}

function getPathSegments(pathname: string, prefix: string): string[] | null {
  const suffix = pathname.slice(prefix.length).replace(/^\/+|\/+$/g, '')
  if (!suffix) return []
  const segments = suffix.split('/')
  return segments.some((segment) => !segment) ? null : segments
}

function getPublicReadyRoute(pathname: string) {
  const segments = getPathSegments(pathname, READY_FURNITURE_PREFIX)
  return segments ? parseCatalogLandingSegments(segments) : null
}

function getInternalReadyRoute(pathname: string, prefix: string) {
  const segments = getPathSegments(pathname, prefix)
  return segments ? parseCatalogLandingInternalSegments(segments) : null
}

function getLegacyCatalogRedirectPath(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const hasLegacyFilters = ['category', 'type', 'sort', 'page'].some((key) => params.has(key))
  if (!hasLegacyFilters) return null

  const category = normalizeCatalogCategory(params.get('category') || undefined)
  const type = normalizeCatalogType(params.get('type') || undefined)
  const sort = normalizeCatalogSort(params.get('sort') || undefined)
  const requestedPage = Number(params.get('page') || '1')
  const page = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1
  const legacyPath = buildCatalogHref({ category, type, sort, page })
  return sort === 'default'
    ? resolveLegacyCatalogPathRedirect(legacyPath) ?? legacyPath
    : legacyPath
}

function redirectToPublicPath(
  request: NextRequest,
  pathname: string,
  options: PublicRedirectOptions = {},
) {
  const destination = buildCanonicalPublicUrl(
    request.url,
    pathname,
    { clearSearch: options.clearSearch },
  )
  for (const key of options.omitSearchParams ?? []) {
    destination.searchParams.delete(key)
  }
  return NextResponse.redirect(
    destination,
    308,
  )
}

function redirectCanonicalRequest(request: NextRequest, pathname: string) {
  const destination = getCanonicalRequestRedirectUrl(request.url, pathname)
  return destination ? NextResponse.redirect(destination, 308) : null
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  let decodedPathname = pathname

  try {
    decodedPathname = decodeURIComponent(pathname)
  } catch {
    return NextResponse.next()
  }

  if (
    decodedPathname === READY_SORT_INTERNAL_PREFIX
    || decodedPathname.startsWith(READY_SORT_INTERNAL_PREFIX + '/')
  ) {
    const parsed = getInternalReadyRoute(decodedPathname, READY_SORT_INTERNAL_PREFIX)
    return redirectToPublicPath(
      request,
      parsed?.pagePath ?? READY_FURNITURE_PREFIX + '/',
    )
  }

  if (
    decodedPathname === READY_INTERNAL_PREFIX
    || decodedPathname.startsWith(READY_INTERNAL_PREFIX + '/')
  ) {
    const parsed = getInternalReadyRoute(decodedPathname, READY_INTERNAL_PREFIX)
    return redirectToPublicPath(
      request,
      parsed?.pagePath ?? READY_FURNITURE_PREFIX + '/',
    )
  }

  if (
    request.nextUrl.search
    && (
      decodedPathname === READY_FURNITURE_PREFIX
      || decodedPathname.startsWith(READY_FURNITURE_PREFIX + '/')
    )
  ) {
    const parsed = getPublicReadyRoute(decodedPathname)
    if (!parsed) return NextResponse.next()
    const canonicalRedirect = redirectCanonicalRequest(request, decodedPathname)
    if (canonicalRedirect) return canonicalRedirect
    const destination = request.nextUrl.clone()
    destination.pathname = buildCatalogLandingInternalPath(
      READY_SORT_INTERNAL_PREFIX,
      parsed.landing,
      parsed.page,
    )
    const response = NextResponse.rewrite(destination)
    response.headers.set('X-Robots-Tag', 'noindex, follow')
    return response
  }

  if (
    decodedPathname === READY_FURNITURE_PREFIX
    || decodedPathname.startsWith(READY_FURNITURE_PREFIX + '/')
  ) {
    const parsed = getPublicReadyRoute(decodedPathname)
    if (!parsed) return NextResponse.next()
    const canonicalRedirect = redirectCanonicalRequest(request, decodedPathname)
    if (canonicalRedirect) return canonicalRedirect
    const destination = request.nextUrl.clone()
    destination.pathname = buildCatalogLandingInternalPath(
      READY_INTERNAL_PREFIX,
      parsed.landing,
      parsed.page,
    )
    return NextResponse.rewrite(destination)
  }

  if (decodedPathname === '/catalog-test' || decodedPathname === '/catalog-test/') {
    return redirectToPublicPath(request, READY_FURNITURE_PREFIX + '/')
  }

  if (!request.nextUrl.search) {
    const resolverPathname = decodedPathname === '/catalog' || decodedPathname === '/catalog/'
      ? '/каталог/'
      : pathname
    const curatedPathname = resolveLegacyCatalogPathRedirect(resolverPathname)
    if (curatedPathname) {
      return redirectToPublicPath(request, curatedPathname)
    }
  }

  if (decodedPathname === '/catalog' || decodedPathname === '/catalog/' || decodedPathname.startsWith('/catalog/')) {
    const isCatalogRoot = decodedPathname === '/catalog' || decodedPathname === '/catalog/'
    const isCatalogBrowseRoot = (
      decodedPathname === '/catalog/browse'
      || decodedPathname === '/catalog/browse/'
    )
    if (isCatalogRoot || isCatalogBrowseRoot) {
      const legacyRedirectPath = getLegacyCatalogRedirectPath(request)
      if (legacyRedirectPath) {
        return redirectToPublicPath(request, legacyRedirectPath, {
          omitSearchParams: LEGACY_CATALOG_QUERY_KEYS,
        })
      }
      if (isCatalogBrowseRoot) {
        return redirectToPublicPath(request, READY_FURNITURE_PREFIX + '/', {
          omitSearchParams: LEGACY_CATALOG_QUERY_KEYS,
        })
      }
    }
    if (decodedPathname.startsWith('/catalog/') && !decodedPathname.startsWith('/catalog/browse/')) {
      const legacyProductSlug = decodedPathname.slice('/catalog/'.length).replace(/\/$/, '')
      if (LEGACY_PRODUCT_SLUGS.has(legacyProductSlug)) {
        return redirectToPublicPath(request, READY_FURNITURE_PREFIX + '/')
      }
    }
    let canonicalSuffix = decodedPathname.slice('/catalog'.length)
    if (decodedPathname.startsWith('/catalog/browse/')) {
      const publicKey: Record<string, string> = {
        room: 'стая',
        type: 'вид',
        sort: 'подреждане',
        page: 'страница',
      }
      const internalSegments = decodedPathname.slice('/catalog/browse/'.length).replace(/\/$/, '').split('/')
      canonicalSuffix = '/' + internalSegments.map((segment, index) => (
        index % 2 === 0 ? publicKey[segment] || segment : segment
      )).join('/') + '/'
    }
    const legacyPath = '/каталог' + (canonicalSuffix || '/')
    const curatedPath = resolveLegacyCatalogPathRedirect(legacyPath)
    return redirectToPublicPath(
      request,
      curatedPath ?? legacyPath,
      { omitSearchParams: LEGACY_CATALOG_QUERY_KEYS },
    )
  }

  if (decodedPathname === '/product' || decodedPathname === '/product/') {
    return redirectToPublicPath(request, READY_FURNITURE_PREFIX + '/')
  }

  if (decodedPathname.startsWith('/product/')) {
    const legacyProductSlug = decodedPathname.slice('/product/'.length).replace(/\/$/, '')
    if (LEGACY_PRODUCT_SLUGS.has(legacyProductSlug)) {
      return redirectToPublicPath(request, READY_FURNITURE_PREFIX + '/')
    }
    return redirectToPublicPath(
      request,
      '/каталог' + decodedPathname.slice('/product'.length),
    )
  }

  if (decodedPathname === '/каталог' || decodedPathname === '/каталог/') {
    const legacyRedirectPath = getLegacyCatalogRedirectPath(request)
    if (legacyRedirectPath) {
      return redirectToPublicPath(request, legacyRedirectPath, {
        omitSearchParams: LEGACY_CATALOG_QUERY_KEYS,
      })
    }
    return redirectToPublicPath(request, READY_FURNITURE_PREFIX + '/')
  }

  if (decodedPathname.startsWith('/каталог/')) {
    const slug = decodedPathname.slice('/каталог/'.length).replace(/\/$/, '')
    const firstSegment = slug.split('/')[0]
    if (CATALOG_ROUTE_PREFIXES.has(firstSegment)) {
      const canonicalRedirect = redirectCanonicalRequest(request, decodedPathname)
      if (canonicalRedirect) return canonicalRedirect
      const destination = request.nextUrl.clone()
      const internalKey: Record<string, string> = {
        'стая': 'room',
        'вид': 'type',
        'подреждане': 'sort',
        'страница': 'page',
      }
      const internalSegments = slug.split('/').map((segment, index) => (
        index % 2 === 0 ? internalKey[segment] || segment : segment
      ))
      destination.pathname = '/catalog/browse/' + internalSegments.join('/') + '/'
      return NextResponse.rewrite(destination)
    }

    if (LEGACY_PRODUCT_SLUGS.has(slug)) {
      return redirectToPublicPath(request, READY_FURNITURE_PREFIX + '/')
    }

    const canonicalRedirect = redirectCanonicalRequest(request, decodedPathname)
    if (canonicalRedirect) return canonicalRedirect
    const destination = request.nextUrl.clone()
    destination.pathname = `/product${decodedPathname.slice('/каталог'.length)}`
    return NextResponse.rewrite(destination)
  }

  if (decodedPathname === '/produkt' || decodedPathname === '/produkt/') {
    return redirectToPublicPath(request, READY_FURNITURE_PREFIX + '/')
  }

  if (decodedPathname.startsWith('/produkt/')) {
    const legacyProductSlug = decodedPathname.slice('/produkt/'.length).replace(/\/$/, '')
    if (LEGACY_PRODUCT_SLUGS.has(legacyProductSlug)) {
      return redirectToPublicPath(request, READY_FURNITURE_PREFIX + '/')
    }
    return redirectToPublicPath(
      request,
      `/каталог${decodedPathname.slice('/produkt'.length)}`,
    )
  }

  const canonicalRedirect = redirectCanonicalRequest(request, decodedPathname)
  if (canonicalRedirect) return canonicalRedirect
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api(?:/|$)|_next(?:/|$)|images(?:/|$)).*)',
  ],
}
