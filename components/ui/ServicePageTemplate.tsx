import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, ChevronDown } from 'lucide-react'
import QuoteForm from '@/components/ui/QuoteForm'
import FAQSchema from '@/components/seo/FAQSchema'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'

interface ServiceFAQ {
  question: string
  answer: string
}

interface ServicePageProps {
  title: string
  subtitle: string
  heroImage: string
  features: string[]
  faq: ServiceFAQ[]
  slug: string
}

export default function ServicePageTemplate({ title, subtitle, heroImage, features, faq, slug }: ServicePageProps) {
  return (
    <>
      <FAQSchema items={faq} />
      <BreadcrumbSchema items={[
        { name: 'Начало', url: 'https://domexpertmebel.bg/' },
        { name: 'Услуги', url: 'https://domexpertmebel.bg/услуги/' },
        { name: title, url: `https://domexpertmebel.bg/услуги/${slug}/` },
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
                  alt={title}
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
                    {[1,2,3,4,5].map((i) => (
                      <span key={i} style={{ color: '#C4A882', fontSize: '0.85rem' }}>★</span>
                    ))}
                  </div>
                  <div className="font-body font-semibold" style={{ fontSize: '0.72rem', color: '#3C2A18' }}>
                    Dom Expert Мебел
                  </div>
                </div>

                {/* Stat badge */}
                <div style={{
                  position: 'absolute', top: 16, right: 16, zIndex: 10,
                  background: '#8B6F47',
                  borderRadius: 16, padding: '14px 18px',
                  textAlign: 'center',
                  boxShadow: '0 8px 28px rgba(139,111,71,0.5)',
                }}>
                  <div className="font-display font-bold text-white" style={{ fontSize: '1.6rem', lineHeight: 1 }}>
                    500+
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
            <span className="eyebrow-pill">Безплатна консултация</span>
            <h2 className="section-title">Заявете безплатна консултация</h2>
            <p className="font-body text-warm-gray mt-3">Отговаряме до 24 часа. Без задължения.</p>
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
