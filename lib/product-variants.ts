export type LinkableProductVariant = {
  slug: string
}

/**
 * Selects a compact set of crawlable variant links for a product page.
 *
 * Power-of-two jumps let crawlers reach every item in a large group in
 * logarithmic depth, while keeping the page useful and light for visitors.
 */
export function selectCrawlableVariants<T extends LinkableProductVariant>(
  variants: readonly T[],
  current: T,
  limit = 12,
) {
  const safeLimit = Math.max(1, Math.floor(limit))
  const ordered = [current, ...variants.filter((variant) => variant.slug !== current.slug)]
  if (ordered.length <= safeLimit) return ordered

  const currentIndex = Math.max(0, variants.findIndex((variant) => variant.slug === current.slug))
  const selected: T[] = [current]
  const seen = new Set([current.slug])

  const addOffset = (offset: number) => {
    const candidate = variants[(currentIndex + offset + variants.length) % variants.length]
    if (!candidate || seen.has(candidate.slug) || selected.length >= safeLimit) return
    seen.add(candidate.slug)
    selected.push(candidate)
  }

  for (let offset = 1; offset < variants.length && selected.length < safeLimit; offset *= 2) {
    addOffset(offset)
  }
  for (let offset = 1; selected.length < safeLimit && offset < variants.length; offset += 1) {
    addOffset(-offset)
  }

  return selected
}
