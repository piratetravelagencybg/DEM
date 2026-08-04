import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  buildCatalogHref,
  normalizeCatalogCategory,
  normalizeCatalogSort,
  normalizeCatalogType,
} from '@/lib/catalog-routing'

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

  if (decodedPathname === '/catalog-test' || decodedPathname === '/catalog-test/') {
    return NextResponse.redirect(new URL('/каталог/', request.url), 308)
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
