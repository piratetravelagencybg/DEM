import type { Metadata } from 'next'
import ReadyFurnitureLandingPage, {
  generateMetadata as generateReadyFurnitureMetadata,
  revalidate,
} from './[...segments]/page'

export { revalidate }

export function generateMetadata(): Metadata {
  return generateReadyFurnitureMetadata({
    params: { segments: [] },
    searchParams: undefined,
  })
}

export default function ReadyFurnitureHubPage() {
  return (
    <ReadyFurnitureLandingPage
      params={{ segments: [] }}
      searchParams={undefined}
    />
  )
}
