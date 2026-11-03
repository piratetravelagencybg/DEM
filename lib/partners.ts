import rawPartners from '@/data/partners.json'

export type PartnerType = 'designer' | 'renovation' | 'supplier'

export type Partner = {
  name: string
  type: PartnerType
  url: string
  /** Optional path under /public, e.g. /images/partners/<slug>.webp */
  logo?: string
  description?: string
}

export const partners = rawPartners as Partner[]

/** The page stays noindex (and out of the sitemap) until it lists at least this many partners. */
export const PARTNERS_INDEX_MIN = 3

export const partnersIndexable = partners.length >= PARTNERS_INDEX_MIN

export const PARTNER_TYPE_LABELS: Record<PartnerType, string> = {
  designer: 'Интериорни дизайнери и архитекти',
  renovation: 'Ремонтни фирми',
  supplier: 'Доставчици',
}
