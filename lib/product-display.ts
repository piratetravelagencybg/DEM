const DEFAULT_CATEGORY = 'other'

export const PRODUCT_TYPES = [
  { id: 'all', label: 'Всички видове' },
  { id: 'wardrobes', label: 'Гардероби' },
  { id: 'beds', label: 'Легла' },
  { id: 'bedroom-sets', label: 'Спални комплекти' },
  { id: 'nightstands', label: 'Нощни шкафчета' },
  { id: 'dressers', label: 'Скринове и ракли' },
  { id: 'cabinets', label: 'Шкафове и витрини' },
  { id: 'shelving', label: 'Етажерки и полици' },
  { id: 'tv-units', label: 'ТВ модули и секции' },
  { id: 'desks', label: 'Бюра и тоалетки' },
  { id: 'tables', label: 'Маси' },
  { id: 'hallway-furniture', label: 'Портманта и шкафове за обувки' },
  { id: 'mirrors', label: 'Огледала' },
  { id: 'accessories', label: 'Аксесоари и допълнения' },
  { id: 'other', label: 'Други мебели' },
] as const

export type ProductTypeId = (typeof PRODUCT_TYPES)[number]['id']

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
  const category = [categoryText, ...categoryHierarchy].join(' ').toLowerCase()

  if (category.includes('детска')) return 'children'
  if (category.includes('спалня') || category.includes('спални')) return 'bedroom'
  if (category.includes('дневна') || category.includes('секции egger')) return 'living'
  if (category.includes('офис')) return 'office'
  if (category.includes('антре') || category.includes('портманта')) return 'hallway'
  if (category.includes('баня')) return 'bathroom'
  if (category.includes('колекц')) return 'collections'
  return 'other'
}

export function getCatalogProductTypeId(
  productName: string,
  _categoryHierarchy: string[],
  _categoryText: string,
): ProductTypeId {
  const value = productName.toLowerCase()

  if (/спален\s+комплект|комплект\s+за\s+спалня/.test(value)) return 'bedroom-sets'
  if (/нощн[оияе]*\s+шкаф/.test(value)) return 'nightstands'
  if (/шкаф\s+за\s+обув|портмант|закачалк/.test(value)) return 'hallway-furniture'
  if (/(^|[\s>,-])(тв|tv)([\s>,-]|$)|тв\s*модул|секци[яи]/.test(value)) return 'tv-units'
  if (/гардероб/.test(value)) return 'wardrobes'
  if (/тапициран[оияе]*\s+легло|детск[оияе]*\s+легло|бебешк[оияе]*\s+легло|легло|креват/.test(value)) return 'beds'
  if (/матрак|подматрач|табла|чекмедже\s+за\s+легло|контейнер\s+за\s+легло/.test(value)) return 'accessories'
  if (/скрин|ракла|комод/.test(value)) return 'dressers'
  if (/бюро|тоалетк/.test(value)) return 'desks'
  if (/етажерк|рафт|полица|стелаж|библиотек/.test(value)) return 'shelving'
  if (/холн[а-я]*\s+маса|трапезн[а-я]*\s+маса|масичк|маса/.test(value)) return 'tables'
  if (/огледало|огледaло/.test(value)) return 'mirrors'
  if (/колона\s+за\s+баня|комплект\s+за\s+баня/.test(value)) return 'cabinets'
  if (/шкаф|витрин/.test(value)) return 'cabinets'
  if (/аксесоар|контейнер|чекмедже|механизъм|рамка|осветление|пано|врата|паспарту|плот|органайзер|кутия\s+за\s+играчки/.test(value)) return 'accessories'
  return 'other'
}

export function getProductTypeLabel(typeId: string) {
  return PRODUCT_TYPES.find((type) => type.id === typeId)?.label || 'Мебели'
}

export function getRoomLabel(categoryId: string) {
  const labels: Record<string, string> = {
    bedroom: 'спалнята',
    children: 'детската стая',
    living: 'дневната',
    office: 'офиса',
    hallway: 'антрето',
    collections: 'дома',
    bathroom: 'банята',
    other: 'дома',
  }
  return labels[categoryId] || 'дома'
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
    ['скрин', 'Скринове'],
    ['шкаф', 'Шкафове'],
    ['матрак', 'Матраци'],
    ['бюро', 'Бюра'],
    ['етажерк', 'Етажерки'],
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
  if (
    value === null
    || value === undefined
    || !Number.isFinite(value)
    || value <= 0
  ) return 'Цена по запитване'
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
