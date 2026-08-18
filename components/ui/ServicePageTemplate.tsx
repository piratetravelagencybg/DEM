import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, ChevronDown } from 'lucide-react'
import QuoteForm from '@/components/ui/QuoteForm'
import FAQSchema from '@/components/seo/FAQSchema'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import LocalBusinessSchema from '@/components/seo/LocalBusinessSchema'
import ServiceSchema from '@/components/seo/ServiceSchema'
import { getImageCredit, getImageDisclosure } from '@/lib/image-credits'
import type { ReactNode } from 'react'

interface ServiceFAQ {
  question: string
  answer: string
}

interface GalleryItem {
  src: string
  alt: string
}

interface ServicePageProps {
  title: string
  subtitle: string
  heroImage: string
  gallery?: GalleryItem[]
  features: string[]
  faq: ServiceFAQ[]
  slug: string
  schemaDescription?: string
  children?: ReactNode
}

export default function ServicePageTemplate({
  title,
  subtitle,
  heroImage,
  gallery = [],
  features,
  faq,
  slug,
  schemaDescription,
  children,
}: ServicePageProps) {
  const pageUrl = 'https://domexpertmebel.com/услуги/' + slug + '/'
  const heroDisclosure = getImageDisclosure(heroImage)
  const heroCredit = getImageCredit(heroImage)

  return (
    <>
      <LocalBusinessSchema />
      <ServiceSchema
        name={title}
        url={pageUrl}
        city={['Благоевград', 'София', 'Дупница', 'Сандански']}
        description={schemaDescription ?? subtitle}
      />
      <FAQSchema items={faq} />
      <BreadcrumbSchema items={[
        { name: 'Начало', url: 'https://domexpertmebel.com/' },
        { name: 'Услуги', url: 'https://domexpertmebel.com/услуги/' },
        { name: title, url: `https://domexpertmebel.com/услуги/${slug}/` },
      ]} />

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #F5F0E8 0%, #EDE4D6 55%, #E6D8C3 100%)',
          paddingTop: '7rem',
          paddingBottom: '5rem',
        }}
      >
        {/* Decorative ambient glow */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: '-100px', right: '-80px',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'rgba(139,111,71,0.10)', filter: 'blur(70px)',
          pointerEvents: 'none',
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute', bottom: '-60px', left: '-40px',
          width: '340px', height: '340px', borderRadius: '50%',
          background: 'rgba(139,111,71,0.06)', filter: 'blur(55px)',
          pointerEvents: 'none',
        }} />

        <div className="container-main relative">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-body mb-10" style={{ fontSize: '0.78rem', color: '#9B9490' }}>
            <Link href="/" className="hover:text-walnut transition-colors" style={{ color: '#8B6F47' }}>Начало</Link>
            <span>/</span>
            <Link href="/услуги/" className="hover:text-walnut transition-colors" style={{ color: '#8B6F47' }}>Услуги</Link>
            <span>/</span>
            <span style={{ color: '#3C2A18', fontWeight: 500 }}>{title}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* ── Text column ── */}
            <div>
              <span className="eyebrow-pill">Услуга</span>
              <h1
                className="font-display font-bold text-charcoal leading-[1.05] mb-4"
                style={{ fontSize: 'var(--text-h1)' }}
              >
                {title}
              </h1>
              <p className="font-body text-warm-gray leading-relaxed mb-7" style={{ fontSize: '1.05rem' }}>
                {subtitle}
              </p>

              {/* Feature list */}
              <div className="space-y-2 mb-8">
                {features.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-3"
                    style={{
                      padding: '10px 14px',
                      borderRadius: 12,
                      background: 'rgba(255,255,255,0.72)',
                      border: '1px solid rgba(139,111,71,0.13)',
                    }}
                  >
                    <div style={{
                      width: 24, height: 24, borderRadius: 7,
                      background: 'rgba(139,111,71,0.13)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <CheckCircle size={13} style={{ color: '#8B6F47' }} />
                    </div>
                    <span className="font-body text-charcoal" style={{ fontSize: '0.88rem', fontWeight: 500 }}>
                      {f}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a href="#zapitване" className="btn-primary inline-flex">
                  Изпрати запитване →
                </a>
                <Link href="/за-нас/" className="btn-outline inline-flex">
                  За нас
                </Link>
              </div>
            </div>

            {/* ── Image column ── */}
            <div className="relative" style={{ aspectRatio: '4/3' }}>
              <div
                className="rounded-2xl overflow-hidden h-full relative"
                style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.16), 0 8px 24px rgba(0,0,0,0.10)' }}
              >
                <Image
                  src={heroImage}
                  alt={`${title} – ${heroDisclosure?.toLocaleLowerCase('bg-BG') || 'илюстрация'}`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Bottom gradient */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(10,7,4,0.52) 0%, transparent 55%)',
                }} />

                {/* Stars badge */}
                <div style={{
                  position: 'absolute', bottom: 16, left: 16, zIndex: 10,
                  background: 'rgba(255,255,255,0.94)',
                  backdropFilter: 'blur(14px)',
                  borderRadius: 14, padding: '10px 16px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                }}>
                  <div className="flex items-center gap-0.5 mb-0.5">
                    <span className="font-display font-bold" style={{ color: '#8B6F47', fontSize: '1rem' }}>10+</span>
                  </div>
                  <div className="font-body font-semibold" style={{ fontSize: '0.72rem', color: '#3C2A18' }}>
                    години опит
                  </div>
                </div>

                {heroDisclosure && (
                  heroCredit ? (
                    <a
                      href={heroCredit.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute bottom-3 right-3 z-10 rounded-full bg-black/60 px-3 py-1.5 font-body text-[0.62rem] text-white backdrop-blur-md transition-colors hover:bg-black/75"
                    >
                      {heroDisclosure}
                    </a>
                  ) : (
                    <span className="absolute bottom-3 right-3 z-10 rounded-full bg-black/60 px-3 py-1.5 font-body text-[0.62rem] text-white backdrop-blur-md">
                      {heroDisclosure}
                    </span>
                  )
                )}

                {/* Stat badge */}
                <div style={{
                  position: 'absolute', top: 16, right: 16, zIndex: 10,
                  background: '#8B6F47',
                  borderRadius: 16, padding: '14px 18px',
                  textAlign: 'center',
                  boxShadow: '0 8px 28px rgba(139,111,71,0.5)',
                }}>
                  <div className="font-display font-bold text-white" style={{ fontSize: '1.6rem', lineHeight: 1 }}>
                    100+
                  </div>
                  <div className="font-body text-white/75" style={{ fontSize: '0.62rem', marginTop: 3 }}>
                    проекта
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Photo gallery strip ── */}
      {gallery.length > 0 && (
        <section className="section-py" style={{ backgroundColor: 'var(--color-cream)' }}>
          <div className="container-main">
            <div className="text-center mb-8">
              <span className="eyebrow-pill">Вдъхновение</span>
              <h2 className="font-display font-bold heading-gradient" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}>
                Идеи и примерни визуализации
              </h2>
              <p className="mx-auto mt-3 max-w-2xl font-body text-sm leading-relaxed text-warm-gray">
                Изображенията показват възможни посоки за стил и разпределение. Конкретното решение се проектира според вашето помещение.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((item, i) => {
                const disclosure = getImageDisclosure(item.src)
                const credit = getImageCredit(item.src)
                const isFeatured = i === 0 && gallery.length >= 3

                return (
                <figure
                  key={item.src}
                  className={`relative overflow-hidden rounded-2xl ${isFeatured ? 'aspect-video sm:col-span-2' : 'aspect-[4/3]'}`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {disclosure && (
                    credit ? (
                      <a
                        href={credit.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1.5 font-body text-[0.62rem] text-white backdrop-blur-md transition-colors hover:bg-black/75"
                      >
                        {disclosure}
                      </a>
                    ) : (
                      <figcaption className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1.5 font-body text-[0.62rem] text-white backdrop-blur-md">
                        {disclosure}
                      </figcaption>
                    )
                  )}
                </figure>
              )})}
            </div>
          </div>
        </section>
      )}

      {children}

      {/* ── FAQ ── */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-warm-white)' }}>
        <div className="container-main max-w-3xl">
          <div className="text-center mb-10">
            <span className="eyebrow-pill">Въпроси и отговори</span>
            <h2 className="section-title">Често задавани въпроси</h2>
          </div>
          <div className="space-y-3">
            {faq.map((item, i) => (
              <details
                key={i}
                className="group cursor-pointer"
                style={{
                  background: 'white',
                  borderRadius: 16,
                  border: '1px solid #EDE5DA',
                  overflow: 'hidden',
                }}
              >
                <summary
                  className="flex items-center justify-between font-display font-semibold text-charcoal list-none"
                  style={{ fontSize: '1rem', padding: '18px 22px' }}
                >
                  {item.question}
                  <ChevronDown
                    size={18}
                    className="text-walnut group-open:rotate-180 transition-transform flex-shrink-0 ml-3"
                  />
                </summary>
                <div style={{ borderTop: '1px solid #EDE5DA', padding: '16px 22px 20px' }}>
                  <p className="font-body text-warm-gray leading-relaxed" style={{ fontSize: '0.9rem' }}>
                    {item.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote form ── */}
      <section
        id="zapitване"
        className="section-py"
        style={{ background: 'linear-gradient(145deg, #F5F0E8 0%, #EDE4D6 100%)' }}
      >
        <div className="container-main max-w-2xl">
          <div className="text-center mb-10">
            <span className="eyebrow-pill">Безплатен оглед</span>
            <h2 className="section-title">Заявете оглед и консултация</h2>
            <p className="font-body text-warm-gray mt-3">
              Огледът е безплатен. 3D проектът се заплаща, а сумата се приспада при поръчка на мебелите.
            </p>
          </div>
          <div
            className="bg-white rounded-2xl p-8"
            style={{ border: '1px solid #EDE5DA', boxShadow: '0 4px 32px rgba(0,0,0,0.06)' }}
          >
            <QuoteForm defaultService={title} />
          </div>
        </div>
      </section>
    </>
  )
}
