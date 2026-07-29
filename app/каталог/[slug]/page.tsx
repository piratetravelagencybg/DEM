import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getAllMbxProducts, getMbxProductBySlug } from '@/lib/mbx'

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return getAllMbxProducts().map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getMbxProductBySlug(params.slug)
  if (!product) return {}

  return {
    title: { absolute: `${product.productName} | Dom Expert Мебел` },
    description: `${product.productName} — реални варианти, цена ${product.priceVat?.toFixed(2).replace('.', ',')} € и наличност. Поръчайте от Dom Expert Мебел.`,
    alternates: { canonical: `https://domexpertmebel.com/каталог/${product.slug}/` },
  }
}

export default function ProductPage({ params }: Props) {
  const product = getMbxProductBySlug(params.slug)

  if (!product) notFound()

  redirect(`/produkt/${product.slug}/`)
}
