const DEFAULT_CATEGORY = 'other'

function normalizeCategory(value: string) {
  return value
    .toLowerCase()
    .replace(/[^а-яa-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function getPrimaryCategory(categoryHierarchy: string[], categoryText: string) {
  return categoryHierarchy[0] || categoryText.split('>')[0]?.trim() || DEFAULT_CATEGORY
}

export function getCatalogCategoryId(categoryHierarchy: string[], categoryText: string) {
  const category = getPrimaryCategory(categoryHierarchy, categoryText).toLowerCase()

  if (category.includes('спалня')) return 'bedroom'
  if (category.includes('детска')) return 'children'
  if (category.includes('дневна')) return 'living'
  if (category.includes('офис')) return 'office'
  if (category.includes('антре')) return 'hallway'
  if (category.includes('колекц')) return 'collections'
  if (category.includes('баня')) return 'bathroom'
  return 'other'
}

export function getCategorySlug(category: string) {
  return normalizeCategory(category)
}

export function getCategoryLabel(category: string) {
  const normalized = normalizeCategory(category)
  const labels: Array<[string, string]> = [
    ['спалня', 'Спални'],
    ['легло', 'Легла'],
    ['гардероб', 'Гардероби'],
    ['нощн', 'Нощни шкафчета'],
    ['детск', 'Детски мебели'],
    ['дневна', 'Дневни'],
    ['тв', 'ТВ шкафове'],
    ['холн', 'Холни маси'],
    ['офис', 'Офис мебели'],
    ['антре', 'Антре'],
    ['колекц', 'Колекции'],
    ['кухн', 'Кухни'],
    ['баня', 'Мебели за баня'],
  ]
  return labels.find(([key]) => normalized.includes(key))?.[1] || category || 'Продукти'
}

export function formatPrice(value: number | null) {
  if (value === null || value === undefined || Number.isNaN(value)) return '—'
  return `${value.toFixed(2).replace('.', ',')} €`
}

export function formatPriceBgn(value: number | null) {
  return formatPrice(value)
}

export function getAvailabilityLabel(availability: string) {
  return availability === 'on_order' ? 'По поръчка' : 'В наличност'
}

export function getAvailabilitySchema(availability: string) {
  return availability === 'on_order' ? 'https://schema.org/PreOrder' : 'https://schema.org/InStock'
}
