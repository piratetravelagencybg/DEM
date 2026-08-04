import { PRODUCT_TYPES } from '@/lib/product-display'

export const CATEGORIES = [
  { id: 'all', label: 'Всички стаи' },
  { id: 'bedroom', label: 'Спалня' },
  { id: 'children', label: 'Детска стая' },
  { id: 'living', label: 'Дневна' },
  { id: 'office', label: 'Офис' },
  { id: 'hallway', label: 'Антре' },
  { id: 'collections', label: 'Цялостно обзавеждане' },
  { id: 'bathroom', label: 'Баня' },
  { id: 'other', label: 'Други' },
] as const

export const SORT_OPTIONS = [
  { id: 'default', label: 'По подразбиране' },
  { id: 'price-asc', label: 'Цена: ниска към висока' },
  { id: 'price-desc', label: 'Цена: висока към ниска' },
  { id: 'name', label: 'По азбучен ред' },
] as const

export type CatalogRouteState = {
  category: string
  type: string
  sort: string
  page: number
}

export function normalizeCatalogCategory(value?: string) {
  const normalized = value?.toLowerCase() || 'all'
  return CATEGORIES.some((item) => item.id === normalized) ? normalized : 'all'
}

export function normalizeCatalogType(value?: string) {
  const normalized = value?.toLowerCase() || 'all'
  return PRODUCT_TYPES.some((item) => item.id === normalized) ? normalized : 'all'
}

export function normalizeCatalogSort(value?: string) {
  const normalized = value?.toLowerCase() || 'default'
  return SORT_OPTIONS.some((item) => item.id === normalized) ? normalized : 'default'
}

export function buildCatalogHref({
  category = 'all',
  type = 'all',
  sort = 'default',
  page = 1,
}: Partial<CatalogRouteState>) {
  const segments: string[] = []
  if (category !== 'all') segments.push('стая', category)
  if (type !== 'all') segments.push('вид', type)
  if (sort !== 'default') segments.push('подреждане', sort)
  if (page > 1) segments.push('страница', String(page))
  return segments.length ? '/каталог/' + segments.join('/') + '/' : '/каталог/'
}

export function parseCatalogSegments(segments: string[] = []): CatalogRouteState | null {
  const values: CatalogRouteState = { category: 'all', type: 'all', sort: 'default', page: 1 }
  const seen = new Set<string>()

  for (let index = 0; index < segments.length; index += 2) {
    const key = segments[index]
    const value = segments[index + 1]
    if (!value) return null

    if (key === 'стая' || key === 'room') {
      if (seen.has('category')) return null
      seen.add('category')
      const normalized = normalizeCatalogCategory(value)
      if (normalized === 'all') return null
      values.category = normalized
    } else if (key === 'вид' || key === 'type') {
      if (seen.has('type')) return null
      seen.add('type')
      const normalized = normalizeCatalogType(value)
      if (normalized === 'all') return null
      values.type = normalized
    } else if (key === 'подреждане' || key === 'sort') {
      if (seen.has('sort')) return null
      seen.add('sort')
      const normalized = normalizeCatalogSort(value)
      if (normalized === 'default') return null
      values.sort = normalized
    } else if (key === 'страница' || key === 'page') {
      if (seen.has('page')) return null
      seen.add('page')
      const page = Number(value)
      if (!Number.isInteger(page) || page < 2) return null
      values.page = page
    } else {
      return null
    }
  }

  return values
}
