import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

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

  if (decodedPathname === '/каталог' || decodedPathname === '/каталог/') {
    const destination = request.nextUrl.clone()
    destination.pathname = '/catalog/'
    return NextResponse.rewrite(destination)
  }

  if (decodedPathname.startsWith('/каталог/')) {
    const slug = decodedPathname.slice('/каталог/'.length).replace(/\/$/, '')
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
