import type { Metadata } from 'next'
import ReadyFurnitureLandingPage, {
  generateMetadata as generateReadyFurnitureMetadata,
} from '../../ready/[...segments]/page'

type SearchParams = Record<string, string | string[] | undefined>

type Props = {
  params: { segments?: string[] }
  searchParams?: SearchParams
}

export const dynamic = 'force-dynamic'

function markAsInternalQuery(searchParams: SearchParams | undefined): SearchParams {
  return { ...searchParams, __ready_sort: '1' }
}

export function generateMetadata({ params, searchParams }: Props): Metadata {
  return generateReadyFurnitureMetadata({
    params,
    searchParams: markAsInternalQuery(searchParams),
  })
}

export default function ReadyFurnitureSortPage({ params, searchParams }: Props) {
  return (
    <ReadyFurnitureLandingPage
      params={params}
      searchParams={markAsInternalQuery(searchParams)}
    />
  )
}
