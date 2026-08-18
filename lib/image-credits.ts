export type ImageCredit = {
  label: string
  sourceUrl: string
}

const STOCK_IMAGE_CREDITS: Record<string, ImageCredit> = {
  '/images/stock/measuring-wall-pexels.webp': {
    label: 'Thirdman / Pexels',
    sourceUrl: 'https://www.pexels.com/photo/a-person-checking-the-wall-using-tape-measure-8470781/',
  },
  '/images/stock/carpenter-measuring-pexels.webp': {
    label: 'Ono Kosuki / Pexels',
    sourceUrl: 'https://www.pexels.com/photo/man-working-with-wood-and-ruler-in-carpentry-studio-5973907/',
  },
  '/images/stock/material-samples-pexels.webp': {
    label: 'Kaboompics / Pexels',
    sourceUrl: 'https://www.pexels.com/photo/paper-paint-samples-and-material-samples-4968698/',
  },
  '/images/stock/assembly-tools-pexels.webp': {
    label: 'Athena Sandrini / Pexels',
    sourceUrl: 'https://www.pexels.com/photo/tools-and-paper-instruction-for-furniture-assembly-5805491/',
  },
  '/images/stock/floor-plan-unsplash.webp': {
    label: 'SOHAM BANERJEE / Unsplash',
    sourceUrl: 'https://unsplash.com/photos/a-person-is-drawing-a-floor-plan-on-a-piece-of-paper-4ZuD2HzSGi0',
  },
  '/images/stock/wood-router-unsplash.webp': {
    label: 'Minh Đức / Unsplash',
    sourceUrl: 'https://unsplash.com/photos/carpenter-using-a-router-on-wood-in-workshop-fw8aQUf14XU',
  },
}

export function getImageCredit(src: string) {
  return STOCK_IMAGE_CREDITS[src]
}

export function getImageDisclosure(src: string) {
  const credit = getImageCredit(src)
  if (credit) return `Илюстративна снимка: ${credit.label}`

  if (
    src.startsWith('/images/visualizations/')
    || src.startsWith('/images/real/')
    || src.startsWith('/images/hero/')
    || src.startsWith('/images/services/')
    || src.startsWith('/images/projects/')
  ) {
    return 'Примерна визуализация'
  }

  return undefined
}
