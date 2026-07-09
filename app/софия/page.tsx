import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Phone, ChevronDown } from 'lucide-react'
import QuoteForm from '@/components/ui/QuoteForm'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import FAQSchema from '@/components/seo/FAQSchema'

export const metadata: Metadata = {
  title: { absolute: 'Мебели по поръчка София | Dom Expert Мебел' },
  description: 'Мебели по поръчка в София. Кухни, гардероби, спални от семейна фирма с 10+ г. опит. Безплатна консултация и 3D проект. Тел: 0888 123 456',
  alternates: { canonical: 'https://domexpertmebel.bg/софия/' },
}

const localSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'FurnitureStore'],
  name: 'Dom Expert Мебел — София',
  url: 'https://domexpertmebel.bg/софия/',
  telephone: '+359888123456',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'София',
    addressCountry: 'BG',
  },
  areaServed: { '@type': 'City', name: 'София' },
  openingHoursSpecification: [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  }],
}

const faqItems = [
  {
    question: 'Правите ли кухни по поръчка в София?',
    answer: 'Да, обслужваме клиенти в цяла София и Софийска област. Идваме на оглед, изготвяме безплатен 3D проект и организираме монтажа в удобно за вас време.',
  },
  {
    question: 'Колко струват мебелите по поръчка в София?',
    answer: 'Цените при нас са конкурентни, защото работим директно — без посредници. Стандартна кухня по поръчка започва от около 2500 лв. Свържете се за безплатна оферта.',
  },
  {
    question: 'Колко отнема изработката на мебели за София?',
    answer: 'Производственият срок е 4–6 седмици след одобряване на проекта. Доставката и монтажа в София организираме в рамките на договорения срок.',
  },
  {
    question: 'Правите ли и офис обзавеждане в София?',
    answer: 'Да, изработваме цялостно офис обзавеждане по поръчка — бюра, шкафове, конферентни маси и рецепции. Имаме опит с корпоративни проекти в София.',
  },
]

const features = [
  'Безплатна консултация в София',
  'Безплатен 3D проект при договор',
  'Монтаж в цяла София и Софийска обл.',
  '2 години гаранция',
  'Материали Egger, Blum, Hafele',
  'Собствена транспортна бригада',
]

const quickLinks = [
  { label: 'Кухни', href: '/услуги/кухни-по-поръчка/' },
  { label: 'Гардероби', href: '/услуги/гардероби-по-поръчка/' },
  { label: 'Спални', href: '/услуги/спални-по-поръчка/' },
  { label: 'За нас', href: '/за-нас/' },
]

export default function SofiaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }} />
      <FAQSchema items={faqItems} />
      <BreadcrumbSchema items={[
        { name: 'Начало', url: 'https://domexpertmebel.bg/' },
        { name: 'Мебели София', url: 'https://domexpertmebel.bg/софия/' },
      ]} />

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #F5F0E8 0%, #EDE4D6 55%, #E6D8C3 100%)',
          paddingTop: '7rem',
          paddingBottom: 'var(--section-py)',
        }}
      >
        <div aria-hidden="true" style={{
          position: 'absolute', top: '-80px', right: '-60px',
          width: '450px', height: '450px', borderRadius: '50%',
          background: 'rgba(139,111,71,0.10)', filter: 'blur(65px)', pointerEvents: 'none',
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute', bottom: '-50px', left: '-30px',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'rgba(139,111,71,0.06)', filter: 'blur(50px)', pointerEvents: 'none',
        }} />

        <div className="container-main relative">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-body mb-8" style={{ fontSize: '0.78rem', color: '#9B9490' }}>
            <Link href="/" style={{ color: '#8B6F47' }} className="hover:underline underline-offset-2">Начало</Link>
            <span>/</span>
            <span style={{ color: '#3C2A18', fontWeight: 500 }}>Мебели София</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <span className="eyebrow-pill">София</span>
              <h1 className="font-display font-bold text-charcoal leading-[1.05]" style={{ fontSize: 'var(--text-h1)' }}>
                Мебели по поръчка в София — индивидуален проект и монтаж
              </h1>
              <p className="font-body text-warm-gray leading-relaxed" style={{ fontSize: '1.05rem' }}>
                Обслужваме клиенти в цяла София и Софийска област. Dom Expert Мебел изработва кухни, гардероби, спални и офис мебели по поръчка с безплатен 3D проект и гаранция 2 години. Идваме на оглед и организираме монтажа от А до Я.
              </p>

              {/* GEO key facts */}
              <ul className="font-body text-sm text-warm-gray space-y-1">
                <li>• Обслужваме цяла София и Софийска област</li>
                <li>• Безплатен оглед и консултация</li>
                <li>• Производствен срок: 4–6 седмици</li>
                <li>• Гаранция: 2 години на всички изделия</li>
              </ul>

              <div className="space-y-2">
                {features.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-3"
                    style={{
                      padding: '10px 14px', borderRadius: 12,
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
                    <span className="font-body text-charcoal" style={{ fontSize: '0.88rem', fontWeight: 500 }}>{f}</span>
                  </div>
                ))}
              </div>

              <a href="tel:+359888123456" className="btn-primary inline-flex items-center gap-2">
                <Phone size={16} /> 0888 123 456
              </a>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                {quickLinks.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="text-center font-body font-medium transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      padding: '10px 8px', borderRadius: 12, fontSize: '0.82rem',
                      background: 'rgba(255,255,255,0.72)',
                      border: '1px solid rgba(139,111,71,0.15)',
                      color: '#8B6F47',
                    }}
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div
                className="bg-white rounded-2xl p-8"
                style={{ border: '1px solid #EDE5DA', boxShadow: '0 4px 32px rgba(0,0,0,0.06)' }}
              >
                <h2 className="font-display font-semibold text-charcoal text-xl mb-6">Безплатна оферта за София</h2>
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container-main max-w-3xl">
          <div className="text-center mb-10">
            <span className="eyebrow-pill">Въпроси и отговори</span>
            <h2 className="font-display font-bold heading-gradient" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}>
              Честo задавани въпроси за София
            </h2>
          </div>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <details
                key={i}
                className="group cursor-pointer"
                style={{ background: 'white', borderRadius: 16, border: '1px solid #EDE5DA', overflow: 'hidden' }}
              >
                <summary
                  className="flex items-center justify-between font-display font-semibold text-charcoal list-none"
                  style={{ fontSize: '1rem', padding: '18px 22px' }}
                >
                  {item.question}
                  <ChevronDown size={18} className="text-walnut group-open:rotate-180 transition-transform flex-shrink-0 ml-3" />
                </summary>
                <div style={{ borderTop: '1px solid #EDE5DA', padding: '16px 22px 20px' }}>
                  <p className="font-body text-warm-gray leading-relaxed" style={{ fontSize: '0.9rem' }}>{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Other locations ── */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-warm-white)' }}>
        <div className="container-main">
          <h2 className="font-display font-semibold text-charcoal text-center mb-8" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)' }}>
            Обслужваме и други градове
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'Мебели Благоевград', href: '/благоевград/' },
              { label: 'Мебели Дупница', href: '/дупница/' },
              { label: 'Мебели Сандански', href: '/сандански/' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-body font-medium transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  padding: '10px 20px', borderRadius: 100, fontSize: '0.88rem',
                  border: '1px solid rgba(139,111,71,0.25)',
                  color: '#8B6F47',
                  background: 'rgba(139,111,71,0.05)',
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
