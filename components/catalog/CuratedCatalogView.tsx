import Link from 'next/link'
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Layers3,
  PackageSearch,
  SlidersHorizontal,
} from 'lucide-react'
import SafeProductImage from '@/components/product/SafeProductImage'
import { formatPrice } from '@/lib/product-display'
import { buildCatalogLandingPagePath, type CatalogLandingSlug } from '@/lib/catalog-landings'

export type CuratedCatalogSort = 'default' | 'price-asc' | 'price-desc' | 'name'

export type CuratedCatalogCard = {
  key: string
  href: string
  name: string
  imageUrls: readonly string[]
  minPrice: number | null
  maxPrice: number | null
  variantCount: number
  hasInStock: boolean
  hasOnOrder: boolean
  collections: readonly string[]
}

export type CuratedCatalogLink = {
  href: string
  label: string
  active: boolean
}

export type CuratedCollectionLink = CuratedCatalogLink & {
  modelCount: number
}

export type CuratedBreadcrumb = {
  href: string
  label: string
}

type Props = {
  landingSlug: CatalogLandingSlug
  landingPath: string
  h1: string
  intro?: string
  cards: readonly CuratedCatalogCard[]
  totalModels: number
  totalVariants: number
  page: number
  totalPages: number
  sort: CuratedCatalogSort
  navigationLinks: readonly CuratedCatalogLink[]
  collectionLinks: readonly CuratedCollectionLink[]
  breadcrumbs: readonly CuratedBreadcrumb[]
  isCollectionHub: boolean
}

const SORT_OPTIONS: ReadonlyArray<{ id: CuratedCatalogSort; label: string }> = [
  { id: 'default', label: 'По подразбиране' },
  { id: 'price-asc', label: 'Цена: ниска към висока' },
  { id: 'price-desc', label: 'Цена: висока към ниска' },
  { id: 'name', label: 'По име' },
]

function formatModelPrice(card: CuratedCatalogCard) {
  if (card.minPrice === null) return { primary: 'Цена при запитване', secondary: '' }
  if (card.maxPrice === null || card.minPrice === card.maxPrice) {
    return { primary: formatPrice(card.minPrice), secondary: '' }
  }
  return {
    primary: `от ${formatPrice(card.minPrice)}`,
    secondary: `до ${formatPrice(card.maxPrice)}`,
  }
}

function formatAvailability(card: CuratedCatalogCard) {
  if (card.hasInStock && card.hasOnOrder) return 'Налични и по поръчка'
  if (card.hasInStock) return 'Има налични варианти'
  return 'По поръчка'
}

function formatCollection(value: string) {
  return value.charAt(0).toLocaleUpperCase('bg-BG') + value.slice(1)
}

function buildSortedHref(path: string, sort: CuratedCatalogSort) {
  return sort === 'default' ? path : `${path}?sort=${sort}`
}

function buildPaginationItems(page: number, totalPages: number) {
  const values: Array<number | 'ellipsis'> = []
  let previous = 0
  for (let candidate = 1; candidate <= totalPages; candidate += 1) {
    if (candidate !== 1 && candidate !== totalPages && Math.abs(candidate - page) > 1) continue
    if (previous && candidate - previous > 1) values.push('ellipsis')
    values.push(candidate)
    previous = candidate
  }
  return values
}

function ProductCard({ card, priority }: { card: CuratedCatalogCard; priority: boolean }) {
  const price = formatModelPrice(card)
  const collection = card.collections[0]

  return (
    <article className="group min-w-0 overflow-hidden rounded-[20px] border border-[#E8DED2] bg-white shadow-[0_6px_24px_rgba(44,36,29,0.07)] transition duration-300 hover:-translate-y-1 hover:border-[#D1BFA8] hover:shadow-[0_14px_36px_rgba(44,36,29,0.12)]">
      <Link href={card.href} className="flex h-full flex-col" aria-label={`Виж ${card.name}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-[#F6F2EC] p-3 sm:p-4">
          <SafeProductImage
            src={card.imageUrls[0]}
            fallbackSources={card.imageUrls.slice(1)}
            alt={card.name}
            fill
            priority={priority}
            className="object-contain transition-transform duration-500 group-hover:scale-[1.025]"
            sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
          />
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/90 px-2.5 py-1 font-body text-[0.61rem] font-semibold text-[#4C4742] shadow-sm backdrop-blur-sm">
            <CheckCircle2 size={11} className={card.hasInStock ? 'text-success' : 'text-walnut'} />
            {formatAvailability(card)}
          </span>
          <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#2C241D] text-white shadow-lg transition-transform duration-300 group-hover:translate-x-0.5">
            <ArrowRight size={15} aria-hidden="true" />
          </span>
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <div className="mb-2 flex min-h-5 items-center justify-between gap-2">
            {collection ? (
              <span className="truncate font-body text-[0.62rem] font-bold uppercase tracking-[0.12em] text-walnut">
                {formatCollection(collection)}
              </span>
            ) : <span />}
            <span className="flex-shrink-0 rounded-full bg-[#F4EEE6] px-2 py-1 font-body text-[0.61rem] font-semibold text-warm-gray">
              {card.variantCount} {card.variantCount === 1 ? 'вариант' : 'варианта'}
            </span>
          </div>

          <h2 className="font-body text-[0.92rem] font-semibold leading-[1.4] text-charcoal transition-colors group-hover:text-walnut sm:text-[0.98rem]">
            {card.name}
          </h2>

          <div className="mt-auto flex items-end justify-between gap-3 border-t border-[#EEE6DC] pt-4">
            <div className="min-w-0">
              <div className="font-display text-[1.2rem] font-bold leading-none text-charcoal sm:text-[1.3rem]">
                {price.primary}
              </div>
              {price.secondary && (
                <div className="mt-1 font-body text-[0.66rem] text-warm-gray">{price.secondary}</div>
              )}
            </div>
            <span className="flex-shrink-0 font-body text-[0.68rem] font-semibold text-walnut">Детайли</span>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default function CuratedCatalogView({
  landingSlug,
  landingPath,
  h1,
  intro,
  cards,
  totalModels,
  totalVariants,
  page,
  totalPages,
  sort,
  navigationLinks,
  collectionLinks,
  breadcrumbs,
  isCollectionHub,
}: Props) {
  const firstVisible = (page - 1) * 36 + 1
  const lastVisible = Math.min(page * 36, totalModels)
  const paginationItems = buildPaginationItems(page, totalPages)

  const pageHref = (targetPage: number) => buildSortedHref(
    buildCatalogLandingPagePath(landingSlug, targetPage),
    sort,
  )

  return (
    <div className="min-h-screen bg-[#FBF9F6]">
      <section className="relative overflow-hidden border-b border-[#E8DED2] bg-[linear-gradient(145deg,#F8F4EE_0%,#EEE3D5_58%,#E5D4BE_100%)] pb-8 pt-[5.3rem] md:pb-12 md:pt-[7.2rem]">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-walnut/10 blur-[80px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 left-[12%] h-72 w-72 rounded-full bg-white/40 blur-[80px]" />

        <div className="container-main relative">
          <nav aria-label="Навигация" className="mb-5 flex flex-wrap items-center gap-2 font-body text-[0.7rem] text-warm-gray">
            {breadcrumbs.map((item, index) => (
              <span key={item.href} className="flex items-center gap-2">
                {index > 0 && <span aria-hidden="true" className="text-[#B5A898]">/</span>}
                {index === breadcrumbs.length - 1 ? (
                  <span aria-current="page" className="font-semibold text-charcoal">{item.label}</span>
                ) : (
                  <Link href={item.href} className="transition-colors hover:text-walnut">{item.label}</Link>
                )}
              </span>
            ))}
          </nav>

          <div className="max-w-[880px]">
            <span className="eyebrow-pill !mb-3"><PackageSearch size={11} /> Каталог готови мебели</span>
            <h1 className="heading-gradient font-display text-[2rem] font-bold leading-[1.06] sm:text-[2.55rem] md:text-[3.35rem]">
              {h1}
            </h1>
            {intro && (
              <p className="mt-4 max-w-[780px] font-body text-[0.92rem] leading-7 text-warm-gray md:text-[1.02rem]">
                {intro}
              </p>
            )}
            <div className="mt-5 flex flex-wrap gap-2.5 font-body text-[0.72rem] font-semibold text-[#554D46]">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/70 px-3 py-1.5 shadow-sm">
                <Boxes size={13} className="text-walnut" /> {totalModels.toLocaleString('bg-BG')} мебелни модела
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/70 px-3 py-1.5 shadow-sm">
                <Layers3 size={13} className="text-walnut" /> {totalVariants.toLocaleString('bg-BG')} продуктови варианта
              </span>
            </div>
          </div>
        </div>
      </section>

      <nav aria-label="Категории готови мебели" className="border-b border-[#E8DED2] bg-white">
        <div className="container-main no-scrollbar flex gap-2 overflow-x-auto py-3">
          {navigationLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.active ? 'page' : undefined}
              className={`flex-shrink-0 rounded-full border px-3.5 py-2 font-body text-[0.74rem] font-semibold transition-colors ${
                item.active
                  ? 'border-[#2C241D] bg-[#2C241D] text-white'
                  : 'border-[#DED4C8] bg-white text-[#59534E] hover:border-walnut hover:text-walnut'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      <div className="container-main py-7 md:py-10">
        <section aria-labelledby="collection-links-heading" className="mb-7 rounded-[20px] border border-[#E8DED2] bg-white p-4 shadow-[0_5px_20px_rgba(44,36,29,0.045)] md:p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-body text-[0.61rem] font-bold uppercase tracking-[0.13em] text-walnut">Съвместими серии</p>
              <h2 id="collection-links-heading" className="mt-1 font-display text-xl font-bold text-charcoal">Колекции готови мебели</h2>
            </div>
            <Link href="/готови-мебели/колекции/" className="hidden items-center gap-1.5 font-body text-xs font-semibold text-walnut hover:underline sm:inline-flex">
              Всички колекции <ArrowRight size={13} />
            </Link>
          </div>
          <div className={`mt-4 grid gap-2 ${isCollectionHub ? 'sm:grid-cols-2 lg:grid-cols-5' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'}`}>
            {collectionLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={item.active ? 'page' : undefined}
                className={`rounded-xl border px-3 py-2.5 transition-colors ${
                  item.active
                    ? 'border-walnut bg-[#F3ECE3]'
                    : 'border-[#E8DED2] bg-[#FCFAF7] hover:border-[#CDBA9F] hover:bg-[#F7F1E9]'
                }`}
              >
                <span className="block truncate font-body text-[0.76rem] font-semibold text-charcoal">{item.label}</span>
                <span className="mt-0.5 block font-body text-[0.62rem] text-warm-gray">{item.modelCount} модела</span>
              </Link>
            ))}
          </div>
        </section>

        <div className="mb-5 flex flex-col gap-3 rounded-[18px] border border-[#E8DED2] bg-white p-3.5 shadow-[0_4px_18px_rgba(44,36,29,0.045)] md:flex-row md:items-center md:justify-between md:p-4">
          <div className="font-body">
            <div className="text-[0.82rem] font-semibold text-charcoal">
              Показани {firstVisible}–{lastVisible} от {totalModels.toLocaleString('bg-BG')} модела
            </div>
            <div className="mt-0.5 text-[0.66rem] text-warm-gray">36 модела на страница</div>
          </div>
          <div className="no-scrollbar flex items-center gap-2 overflow-x-auto" aria-label="Подреждане">
            <span className="mr-1 inline-flex flex-shrink-0 items-center gap-1.5 font-body text-[0.67rem] font-bold uppercase tracking-[0.08em] text-walnut">
              <SlidersHorizontal size={13} /> Подреди
            </span>
            {SORT_OPTIONS.map((option) => (
              <form key={option.id} action={landingPath} method="get" className="flex-shrink-0">
                <button
                  type="submit"
                  name={option.id === 'default' ? undefined : 'sort'}
                  value={option.id === 'default' ? undefined : option.id}
                  aria-pressed={sort === option.id}
                  className={`whitespace-nowrap rounded-full border px-3 py-1.5 font-body text-[0.7rem] font-semibold transition-colors ${
                    sort === option.id
                      ? 'border-walnut bg-walnut text-white'
                      : 'border-[#DDD4C8] bg-white text-[#5A5450] hover:border-walnut hover:text-walnut'
                  }`}
                >
                  {option.label}
                </button>
              </form>
            ))}
          </div>
        </div>

        <section aria-label="Продуктови модели" className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {cards.map((card, index) => <ProductCard key={card.key} card={card} priority={index < 2} />)}
        </section>

        {totalPages > 1 && (
          <nav aria-label="Страници" className="mt-9 flex flex-wrap items-center justify-center gap-2">
            {page > 1 ? (
              <Link
                href={pageHref(page - 1)}
                className="inline-flex h-10 items-center gap-1 rounded-full border border-[#DDD4C8] bg-white px-4 font-body text-sm font-semibold text-charcoal transition-colors hover:border-walnut hover:text-walnut"
              >
                <ChevronLeft size={15} /> Назад
              </Link>
            ) : <span className="h-10 w-[92px]" aria-hidden="true" />}

            {paginationItems.map((item, index) => item === 'ellipsis' ? (
              <span key={`ellipsis-${index}`} className="flex h-10 w-7 items-center justify-center text-warm-gray">…</span>
            ) : (
              <Link
                key={item}
                href={pageHref(item)}
                aria-current={item === page ? 'page' : undefined}
                className={`flex h-10 min-w-10 items-center justify-center rounded-full border px-3 font-body text-sm font-semibold transition-colors ${
                  item === page
                    ? 'border-[#2C241D] bg-[#2C241D] text-white'
                    : 'border-[#DDD4C8] bg-white text-charcoal hover:border-walnut hover:text-walnut'
                }`}
              >
                {item}
              </Link>
            ))}

            {page < totalPages ? (
              <Link
                href={pageHref(page + 1)}
                className="inline-flex h-10 items-center gap-1 rounded-full border border-[#DDD4C8] bg-white px-4 font-body text-sm font-semibold text-charcoal transition-colors hover:border-walnut hover:text-walnut"
              >
                Напред <ChevronRight size={15} />
              </Link>
            ) : <span className="h-10 w-[92px]" aria-hidden="true" />}
          </nav>
        )}
      </div>
    </div>
  )
}
