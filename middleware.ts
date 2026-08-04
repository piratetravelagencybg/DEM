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

function getLegacyCatalogRedirect(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const hasLegacyFilters = ['category', 'type', 'sort', 'page'].some((key) => params.has(key))
  if (!hasLegacyFilters) return null

  const category = normalizeCatalogCategory(params.get('category') || undefined)
  const type = normalizeCatalogType(params.get('type') || undefined)
  const sort = normalizeCatalogSort(params.get('sort') || undefined)
  const requestedPage = Number(params.get('page') || '1')
  const page = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1
  const destination = request.nextUrl.clone()
  destination.pathname = buildCatalogHref({ category, type, sort, page })
  destination.search = ''
  return destination
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
    const destination = request.nextUrl.clone()
    destination.pathname = parsed?.pagePath ?? READY_FURNITURE_PREFIX + '/'
    return NextResponse.redirect(destination, 308)
  }

  if (
    decodedPathname === READY_INTERNAL_PREFIX
    || decodedPathname.startsWith(READY_INTERNAL_PREFIX + '/')
  ) {
    const parsed = getInternalReadyRoute(decodedPathname, READY_INTERNAL_PREFIX)
    const destination = request.nextUrl.clone()
    destination.pathname = parsed?.pagePath ?? READY_FURNITURE_PREFIX + '/'
    return NextResponse.redirect(destination, 308)
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
    const destination = request.nextUrl.clone()
    destination.pathname = buildCatalogLandingInternalPath(
      READY_INTERNAL_PREFIX,
      parsed.landing,
      parsed.page,
    )
    return NextResponse.rewrite(destination)
  }

  if (decodedPathname === '/catalog-test' || decodedPathname === '/catalog-test/') {
    return NextResponse.redirect(new URL('/каталог/', request.url), 308)
  }

  if (!request.nextUrl.search) {
    const resolverPathname = decodedPathname === '/catalog' || decodedPathname === '/catalog/'
      ? '/каталог/'
      : pathname
    const curatedPathname = resolveLegacyCatalogPathRedirect(resolverPathname)
    if (curatedPathname) {
      const destination = new URL(curatedPathname, request.url)
      return NextResponse.redirect(destination, 308)
    }
  }

  if (decodedPathname === '/catalog' || decodedPathname === '/catalog/' || decodedPathname.startsWith('/catalog/')) {
    const destination = request.nextUrl.clone()
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
    destination.pathname = '/каталог' + (canonicalSuffix || '/')
    destination.search = ''
    return NextResponse.redirect(destination, 308)
  }

  if (decodedPathname === '/product' || decodedPathname === '/product/') {
    return NextResponse.redirect(new URL('/каталог/', request.url), 308)
  }

  if (decodedPathname.startsWith('/product/')) {
    const destination = request.nextUrl.clone()
    destination.pathname = '/каталог' + decodedPathname.slice('/product'.length)
    destination.search = ''
    return NextResponse.redirect(destination, 308)
  }

  if (decodedPathname === '/каталог' || decodedPathname === '/каталог/') {
    const legacyRedirect = getLegacyCatalogRedirect(request)
    if (legacyRedirect) return NextResponse.redirect(legacyRedirect, 308)
    const destination = request.nextUrl.clone()
    destination.pathname = '/catalog/'
    return NextResponse.rewrite(destination)
  }

  if (decodedPathname.startsWith('/каталог/')) {
    const slug = decodedPathname.slice('/каталог/'.length).replace(/\/$/, '')
    const firstSegment = slug.split('/')[0]
    if (CATALOG_ROUTE_PREFIXES.has(firstSegment)) {
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
      return NextResponse.redirect(new URL('/каталог/', request.url), 308)
    }

    const destination = request.nextUrl.clone()
    destination.pathname = `/product${decodedPathname.slice('/каталог'.length)}`
    return NextResponse.rewrite(destination)
  }

  if (decodedPathname === '/produkt' || decodedPathname === '/produkt/') {
    return NextResponse.redirect(new URL('/каталог/', request.url), 308)
  }

  if (decodedPathname.startsWith('/produkt/')) {
    return NextResponse.redirect(new URL(`/каталог${decodedPathname.slice('/produkt'.length)}`, request.url), 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/catalog/:path*',
    '/catalog-test',
    '/product/:path*',
    '/produkt/:path*',
    '/ready/:path*',
    '/ready-sort/:path*',
    '/каталог/:path*',
    '/готови-мебели/:path*',
  ],
}
