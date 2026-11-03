import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import { completePageMetadata } from '@/lib/seo'
import { PARTNER_TYPE_LABELS, partners, partnersIndexable, type PartnerType } from '@/lib/partners'

const PAGE_URL = 'https://domexpertmebel.com/партньори/'
const TITLE = 'Партньори – дизайнери и ремонтни фирми | Dom Expert'
const DESCRIPTION = 'Интериорни дизайнери, архитекти, ремонтни фирми и доставчици, с които Dom Expert Мебел работи по проекти за мебели по поръчка.'

export const metadata: Metadata = completePageMetadata({
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  robots: { index: partnersIndexable, follow: true },
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    siteName: 'Dom Expert Мебел',
    url: PAGE_URL,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/images/og/home.webp', width: 1200, height: 630, alt: 'Партньори на Dom Expert Мебел' }],
  },
})

const GROUP_ORDER: PartnerType[] = ['designer', 'renovation', 'supplier']

export default function PartnersPage() {
  const groups = GROUP_ORDER
    .map((type) => ({ type, items: partners.filter((partner) => partner.type === type) }))
    .filter((group) => group.items.length > 0)

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Начало', url: 'https://domexpertmebel.com/' },
        { name: 'Партньори', url: PAGE_URL },
      ]} />

      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #F5F0E8 0%, #EDE4D6 55%, #E6D8C3 100%)',
          paddingTop: '7rem',
          paddingBottom: 'var(--section-py)',
        }}
      >
        <div className="container-main relative max-w-4xl">
          <nav className="flex flex-wrap items-center gap-2 font-body mb-8" style={{ fontSize: '0.78rem', color: '#9B9490' }}>
            <Link href="/" style={{ color: '#8B6F47' }} className="hover:underline underline-offset-2">Начало</Link>
            <span>/</span>
            <span style={{ color: '#3C2A18', fontWeight: 500 }}>Партньори</span>
          </nav>
          <span className="eyebrow-pill">Партньори</span>
          <h1 className="font-display font-bold text-charcoal leading-[1.05] mt-2" style={{ fontSize: 'var(--text-h1)' }}>
            Партньори
          </h1>
          <p className="font-body text-warm-gray leading-relaxed mt-5" style={{ fontSize: '1.05rem', maxWidth: '44rem' }}>
            Интериорни дизайнери, архитекти, ремонтни фирми и доставчици, с които работим по общи проекти. Дизайнерът проектира, ремонтната фирма подготвя обекта, а ние изработваме и монтираме мебелите.
          </p>
        </div>
      </section>

      <section className="section-py" style={{ backgroundColor: 'var(--color-warm-white)' }}>
        <div className="container-main max-w-4xl space-y-12">
          {groups.length === 0 && (
            <p className="font-body text-warm-gray leading-relaxed" style={{ fontSize: '1rem' }}>
              Списъкът с партньори се попълва.
            </p>
          )}

          {groups.map((group) => (
            <div key={group.type}>
              <h2 className="section-title text-left">{PARTNER_TYPE_LABELS[group.type]}</h2>
              <ul className="grid sm:grid-cols-2 gap-4 mt-6">
                {group.items.map((partner) => (
                  <li key={partner.url} className="rounded-2xl bg-white p-5" style={{ border: '1px solid #EDE5DA' }}>
                    {partner.logo && (
                      <Image src={partner.logo} alt={partner.name} width={160} height={60} className="mb-3 h-[60px] w-auto object-contain" />
                    )}
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-2 font-display font-semibold text-charcoal hover:text-walnut"
                      style={{ fontSize: '1.15rem' }}
                    >
                      {partner.name} <ExternalLink size={15} aria-hidden="true" />
                    </a>
                    {partner.description && (
                      <p className="font-body text-warm-gray leading-relaxed mt-2" style={{ fontSize: '0.9rem' }}>{partner.description}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="rounded-2xl bg-white p-6 md:p-8" style={{ border: '1px solid #EDE5DA' }}>
            <h2 className="font-display font-semibold text-charcoal" style={{ fontSize: '1.4rem' }}>
              Искате да работим заедно?
            </h2>
            <p className="font-body text-warm-gray leading-relaxed mt-3" style={{ fontSize: '0.95rem' }}>
              Ако сте дизайнер или архитект и търсите изпълнител за мебелите по вашите проекти, вижте как работим.
            </p>
            <Link href="/за-дизайнери/" className="btn-primary inline-flex items-center gap-2 mt-5">
              За дизайнери <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
