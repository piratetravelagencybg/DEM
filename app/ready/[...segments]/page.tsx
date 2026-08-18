import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import CuratedCatalogView, {
  type CuratedBreadcrumb,
  type CuratedCatalogCard,
  type CuratedCatalogSort,
} from '@/components/catalog/CuratedCatalogView'
import { getAllMbxCatalogProducts } from '@/lib/mbx-catalog'
import { getMbxImageCandidates, getMbxProductByItemId } from '@/lib/mbx'
import {
  buildCatalogModelIndex,
  compareCatalogProductIdentity,
  getCatalogModelsForLanding,
  getCatalogVariantsForLanding,
  type CatalogModel,
  type CatalogTagPredicate,
} from '@/lib/catalog-models'
import {
  CATALOG_LANDINGS,
  CATALOG_SITE_ORIGIN,
  buildCatalogLandingInternalSegments,
  buildCatalogLandingPagePath,
  parseCatalogLandingInternalSegments,
  parseCatalogLandingSegments,
  resolveCatalogLandingParent,
  type CatalogFilterDescriptor,
  type CatalogLanding,
} from '@/lib/catalog-landings'
import { prepareSeoDescription, shortenSeoTitle } from '@/lib/seo'

type SearchParams = Record<string, string | string[] | undefined>

type Props = {
  params: { segments?: string[] }
  searchParams?: SearchParams
}

type LandingDataset = {
  models: readonly CatalogModel[]
  matchingVariantCount: number
}

const PAGE_SIZE = 36
const CATALOG_IMAGE = '/images/og/home.webp'
const SORT_VALUES: readonly CuratedCatalogSort[] = ['default', 'price-asc', 'price-desc', 'name']

const APPROVED_COLLECTION_LANDINGS = CATALOG_LANDINGS.filter(
  (landing) => landing.kind === 'collection' && landing.filter.kind === 'collection',
)
const APPROVED_COLLECTION_TAGS = APPROVED_COLLECTION_LANDINGS.map(
  (landing) => landing.filter.kind === 'collection' ? landing.filter.collection : '',
).filter(Boolean)

function descriptorToPredicate(filter: CatalogFilterDescriptor): CatalogTagPredicate {
  switch (filter.kind) {
    case 'all':
      return {}
    case 'room':
      return { rooms: filter.room }
    case 'type':
      return { types: filter.productType }
    case 'room-type':
      return { rooms: filter.room, types: filter.productType }
    case 'tag':
      return {
        rooms: filter.room,
        types: filter.productType,
        subtypes: filter.subtype,
      }
    case 'collections':
      return { collections: APPROVED_COLLECTION_TAGS }
    case 'collection':
      return { collections: filter.collection }
  }
}

// This is deliberately built once from the complete active feed. Individual
// landing predicates run only after global grouping, so representatives never
// change based on the landing being viewed.
const CATALOG_MODEL_INDEX = buildCatalogModelIndex(getAllMbxCatalogProducts())
const LANDING_DATASETS = new Map<string, LandingDataset>()

for (const landing of CATALOG_LANDINGS) {
  const predicate = descriptorToPredicate(landing.filter)
  LANDING_DATASETS.set(landing.slug, {
    models: getCatalogModelsForLanding(CATALOG_MODEL_INDEX, predicate),
    matchingVariantCount: getCatalogVariantsForLanding(CATALOG_MODEL_INDEX, predicate).length,
  })
}

function getLandingDataset(landing: CatalogLanding) {
  return LANDING_DATASETS.get(landing.slug)
}

function parseReadyFurnitureSegments(segments: readonly string[] = []) {
  return parseCatalogLandingInternalSegments(segments)
    ?? parseCatalogLandingSegments(segments)
}

function getQueryState(searchParams: SearchParams | undefined) {
  const hasAnyQuery = Boolean(searchParams && Object.keys(searchParams).length > 0)
  const rawSort = searchParams?.sort
  const sort = typeof rawSort === 'string' && (SORT_VALUES as readonly string[]).includes(rawSort)
    ? rawSort as CuratedCatalogSort
    : 'default'
  return { hasAnyQuery, sort }
}

function sortModels(models: readonly CatalogModel[], sort: CuratedCatalogSort) {
  if (sort === 'default') return models

  return [...models].sort((first, second) => {
    if (sort === 'name') {
      return first.representative.productName.localeCompare(
        second.representative.productName,
        'bg',
        { numeric: true, sensitivity: 'base' },
      ) || compareCatalogProductIdentity(first.representative, second.representative)
    }

    const firstPrice = first.minPrice
    const secondPrice = second.minPrice
    if (firstPrice === null && secondPrice !== null) return 1
    if (firstPrice !== null && secondPrice === null) return -1
    if (firstPrice !== null && secondPrice !== null && firstPrice !== secondPrice) {
      return sort === 'price-asc' ? firstPrice - secondPrice : secondPrice - firstPrice
    }

    return compareCatalogProductIdentity(first.representative, second.representative)
  })
}

function addPageToTitle(title: string, page: number) {
  if (page === 1) return title
  const separator = ' | '
  const separatorIndex = title.lastIndexOf(separator)
  if (separatorIndex < 0) return `${title} – страница ${page}`
  return `${title.slice(0, separatorIndex)} – страница ${page}${title.slice(separatorIndex)}`
}

function addPageToDescription(description: string, page: number, totalPages: number) {
  if (page === 1) return description
  const suffix = ` Страница ${page} от ${totalPages}.`
  const availableLength = Math.max(40, 155 - suffix.length)
  if (description.length <= availableLength) return description.replace(/[.\s]+$/, '') + '.' + suffix
  const candidate = description.slice(0, availableLength)
  const lastSpace = candidate.lastIndexOf(' ')
  const shortened = (lastSpace > availableLength * 0.72 ? candidate.slice(0, lastSpace) : candidate)
    .replace(/[.,;:\s–—-]+$/, '')
  return shortened + '…' + suffix
}

function getRequestCanonical(landing: CatalogLanding, cleanCanonical: string, hasAnyQuery: boolean) {
  return hasAnyQuery ? CATALOG_SITE_ORIGIN + landing.path : cleanCanonical
}

function getPageHeading(landing: CatalogLanding, page: number) {
  return page === 1 ? landing.h1 : `${landing.h1} – страница ${page}`
}

function getCollectionLabel(landing: CatalogLanding) {
  if (landing.filter.kind !== 'collection') return landing.h1
  const name = landing.filter.collection
  return name.charAt(0).toLocaleUpperCase('bg-BG') + name.slice(1)
}

function createCard(model: CatalogModel): CuratedCatalogCard {
  const representative = model.representative
  const fullProduct = getMbxProductByItemId(representative.itemId)
  const imageUrls = fullProduct
    ? getMbxImageCandidates(fullProduct)
    : Array.from(new Set([representative.imageUrl, ...model.images].filter(Boolean)))

  return {
    key: model.key,
    href: `/каталог/${representative.slug}/`,
    name: representative.productName,
    imageUrls,
    minPrice: model.minPrice,
    maxPrice: model.maxPrice,
    variantCount: model.variantCount,
    hasInStock: model.availability.hasInStock,
    hasOnOrder: model.availability.hasOnOrder,
    collections: model.tags.collections.slice(0, 2),
  }
}

function createBreadcrumbs(landing: CatalogLanding, page: number): CuratedBreadcrumb[] {
  const breadcrumbs: CuratedBreadcrumb[] = [{ href: '/', label: 'Начало' }]
  const hub = CATALOG_LANDINGS[0]

  if (landing.slug !== '') breadcrumbs.push({ href: hub.path, label: hub.h1 })

  const parent = resolveCatalogLandingParent(landing)
  if (parent && parent.slug !== '' && parent.slug !== landing.slug) {
    breadcrumbs.push({ href: parent.path, label: parent.h1 })
  }

  breadcrumbs.push({
    href: buildCatalogLandingPagePath(landing, page),
    label: getPageHeading(landing, page),
  })

  return breadcrumbs.filter((item, index, items) => (
    items.findIndex((candidate) => candidate.href === item.href) === index
  ))
}

export const dynamicParams = true
export const revalidate = 86400

export function generateStaticParams(): Array<{ segments: string[] }> {
  return CATALOG_LANDINGS
    .filter((landing) => landing.slug !== '')
    .map((landing) => ({ segments: buildCatalogLandingInternalSegments(landing) }))
}

export function generateMetadata({ params, searchParams }: Props): Metadata {
  const parsed = parseReadyFurnitureSegments(params.segments)
  if (!parsed) return { robots: { index: false, follow: false } }

  const dataset = getLandingDataset(parsed.landing)
  if (!dataset || dataset.models.length === 0) return { robots: { index: false, follow: false } }

  const totalPages = Math.ceil(dataset.models.length / PAGE_SIZE)
  if (parsed.page > totalPages) return { robots: { index: false, follow: false } }

  const query = getQueryState(searchParams)
  const title = shortenSeoTitle(addPageToTitle(parsed.landing.title, parsed.page), 55)
  const landingDescription = prepareSeoDescription(
    parsed.landing.metaDescription,
    'Сравнете размери, предназначение, цени и наличности, за да изберете подходящия модел.',
  )
  const description = addPageToDescription(landingDescription, parsed.page, totalPages)
  const canonical = getRequestCanonical(parsed.landing, parsed.canonicalUrl, query.hasAnyQuery)

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    robots: query.hasAnyQuery
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      type: 'website',
      locale: 'bg_BG',
      siteName: 'Dom Expert Мебел',
      title,
      description,
      url: canonical,
      images: [{
        url: CATALOG_IMAGE,
        width: 1200,
        height: 630,
        type: 'image/webp',
        alt: parsed.landing.h1,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [CATALOG_IMAGE],
    },
  }
}

export default function ReadyFurnitureLandingPage({ params, searchParams }: Props) {
  const parsed = parseReadyFurnitureSegments(params.segments)
  if (!parsed) notFound()

  const dataset = getLandingDataset(parsed.landing)
  if (!dataset || dataset.models.length === 0) notFound()

  const totalPages = Math.ceil(dataset.models.length / PAGE_SIZE)
  if (parsed.page > totalPages) notFound()

  const query = getQueryState(searchParams)
  const sortedModels = sortModels(dataset.models, query.sort)
  const firstModelIndex = (parsed.page - 1) * PAGE_SIZE
  const pageModels = sortedModels.slice(firstModelIndex, firstModelIndex + PAGE_SIZE)
  if (pageModels.length === 0) notFound()

  const cards = pageModels.map(createCard)
  const breadcrumbs = createBreadcrumbs(parsed.landing, parsed.page)
  const requestCanonical = getRequestCanonical(
    parsed.landing,
    parsed.canonicalUrl,
    query.hasAnyQuery,
  )
  const schemaBreadcrumbs = breadcrumbs.map((item, index) => ({
    name: item.label,
    url: index === breadcrumbs.length - 1
      ? requestCanonical
      : CATALOG_SITE_ORIGIN + item.href,
  }))

  const navigationLinks = CATALOG_LANDINGS
    .filter((landing) => landing.kind !== 'collection')
    .map((landing) => ({
      href: landing.path,
      label: landing.slug === '' ? 'Всички мебели' : landing.h1.replace(/^Готови\s+/i, ''),
      active: landing.slug === parsed.landing.slug,
    }))

  const collectionLinks = APPROVED_COLLECTION_LANDINGS.map((landing) => ({
    href: landing.path,
    label: getCollectionLabel(landing),
    active: landing.slug === parsed.landing.slug,
    modelCount: getLandingDataset(landing)?.models.length ?? 0,
  }))

  return (
    <>
      <BreadcrumbSchema items={schemaBreadcrumbs} />
      <CuratedCatalogView
        landingSlug={parsed.landing.slug}
        landingPath={parsed.landing.path}
        h1={getPageHeading(parsed.landing, parsed.page)}
        intro={parsed.page === 1 ? parsed.landing.intro : undefined}
        cards={cards}
        totalModels={dataset.models.length}
        totalVariants={dataset.matchingVariantCount}
        page={parsed.page}
        totalPages={totalPages}
        sort={query.sort}
        navigationLinks={navigationLinks}
        collectionLinks={collectionLinks}
        breadcrumbs={breadcrumbs}
        isCollectionHub={parsed.landing.kind === 'collection-hub'}
      />
    </>
  )
}
