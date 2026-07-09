import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, Shield, Users, MapPin, Award } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'

// ─────────────────────────────────────────────
// SEO – metadata
// ─────────────────────────────────────────────
export const metadata: Metadata = {
  title: { absolute: 'За нас | Мебели по поръчка Благоевград — Dom Expert Мебел' },
  description:
    'Семейна работилница с 10+ години опит в мебели по поръчка в Благоевград. 500+ реализирани кухни, гардероби и спални. Безплатна консултация. Тел: 0888 123 456',
  alternates: { canonical: 'https://domexpertmebel.bg/за-нас/' },
  openGraph: {
    title: 'За Нас – Мебели по Поръчка Благоевград | Dom Expert Мебел',
    description:
      'Семейна работилница с 10+ години опит в мебели по поръчка и кухни по поръчка – Благоевград. 500+ реализирани проекта.',
    url: 'https://domexpertmebel.bg/за-нас/',
    type: 'website',
    locale: 'bg_BG',
    siteName: 'Dom Expert Мебел',
    images: [
      {
        url: '/images/hero/hero.png',
        width: 1200,
        height: 630,
        alt: 'Dom Expert Мебел – семейна работилница за мебели по поръчка Благоевград',
      },
    ],
  },
}

// ─────────────────────────────────────────────
// JSON-LD structured data
// ─────────────────────────────────────────────
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'FurnitureStore'],
  '@id': 'https://domexpertmebel.bg/#business',
  name: 'Dom Expert Мебел',
  description:
    'Семейна фирма за мебели по поръчка в Благоевград. Кухни, гардероби, спални и офис мебели с 10+ години опит.',
  url: 'https://domexpertmebel.bg',
  telephone: '+359888123456',
  email: 'office@domexpertmebel.bg',
  foundingDate: '2014',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Благоевград',
    postalCode: '2700',
    addressRegion: 'Благоевград',
    addressCountry: 'BG',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 42.0135, longitude: 23.0944 },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  priceRange: '$$',
  areaServed: ['Благоевград', 'София', 'Дупница', 'Сандански', 'Банско', 'Разлог'],
  image: 'https://domexpertmebel.bg/images/hero/hero.png',
  // TODO: Replace with actual social profile URLs
  sameAs: ['https://www.facebook.com/domexpertmebel', 'https://www.instagram.com/domexpertmebel'],
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://domexpertmebel.bg/#organization',
  name: 'Dom Expert Мебел',
  url: 'https://domexpertmebel.bg',
  logo: 'https://domexpertmebel.bg/images/logo-icon.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+359888123456',
    contactType: 'customer service',
    areaServed: 'BG',
    availableLanguage: 'Bulgarian',
  },
}

// ─────────────────────────────────────────────
// Page data
// ─────────────────────────────────────────────
const stats = [
  { n: '500+', l: 'изработени кухни' },
  { n: '10+', l: 'години опит' },
  { n: '2', l: 'шоурума' },
  { n: '100%', l: 'доволни клиенти' },
]

const whyUs = [
  {
    Icon: Shield,
    title: 'Качество без компромис',
    desc: 'Работим с материали Egger, Blum и Hafele — водещи европейски марки. 2-годишна гаранция на всички изделия.',
  },
  {
    Icon: Users,
    title: 'Индивидуален подход',
    desc: 'Всеки проект е уникален. Слушаме внимателно и предлагаме решения, съобразени с пространството и бюджета.',
  },
  {
    Icon: MapPin,
    title: 'Местен и достъпен',
    desc: 'Семейна фирма от Благоевград. Собственикът участва лично в повечето проекти. Реален контакт, без посредници.',
  },
  {
    Icon: Award,
    title: 'Гарантиран резултат',
    desc: 'Над 500 реализирани кухни говорят сами. Стоим зад всяко изделие с гаранция и следпродажбено обслужване.',
  },
]

const process = [
  {
    num: '01',
    color: '#C4914A',
    bg: 'rgba(196,145,74,0.12)',
    title: 'Безплатна консултация',
    desc: 'Разговаряме за вашите нужди, пространство и вкус. Без задължения, без скрити такси.',
  },
  {
    num: '02',
    color: '#5EA87C',
    bg: 'rgba(94,168,124,0.12)',
    title: '3D дизайн проект',
    desc: 'Изготвяме детайлен 3D проект — виждате резултата преди да е наредена и една дъска.',
  },
  {
    num: '03',
    color: '#5A9BBF',
    bg: 'rgba(90,155,191,0.12)',
    title: 'Производство',
    desc: 'Изработваме мебелите в нашата работилница с прецизно CNC рязане и ръчна обработка.',
  },
  {
    num: '04',
    color: '#4AAD82',
    bg: 'rgba(74,173,130,0.12)',
    title: 'Монтаж и предаване',
    desc: 'Нашият екип монтира прецизно, почиства след себе си и предава готовия проект.',
  },
]

const facts = [
  'Работим с материали Egger, Blum, Hafele – водещи европейски марки',
  '2-годишна гаранция на всички изработени мебели',
  'Безплатен 3D проект при сключен договор',
  'Собствена транспортна и монтажна бригада',
]

// ─────────────────────────────────────────────
// Page component
// ─────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <BreadcrumbSchema items={[
        { name: 'Начало', url: 'https://domexpertmebel.bg/' },
        { name: 'За нас', url: 'https://domexpertmebel.bg/за-нас/' },
      ]} />

      <article>

        {/* ──────────────── 1. HERO ──────────────── */}
        <section
          className="section-py"
          style={{ backgroundColor: 'var(--color-cream)', paddingTop: '7rem' }}
          aria-label="Представяне на фирмата"
        >
          <div className="container-main">

            {/* Breadcrumb */}
            <nav aria-label="Навигационна следа" className="mb-8">
              <ol className="flex items-center gap-2 font-body" style={{ fontSize: '0.85rem', color: '#9B9490' }}>
                <li>
                  <Link href="/" style={{ color: '#8B6F47' }} className="hover:underline underline-offset-2">
                    Начало
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" style={{ color: '#5A5450' }}>За нас</li>
              </ol>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* Left – text */}
              <div>
                <span className="eyebrow-pill">За нас</span>
                <h1
                  className="font-display font-bold heading-gradient leading-[1.08]"
                  style={{ fontSize: 'clamp(2.1rem, 5.5vw, 3.2rem)', marginBottom: '1.25rem' }}
                >
                  Мебели по поръчка<br />с душа и точност
                </h1>
                <p
                  className="font-body leading-relaxed mb-4"
                  style={{ fontSize: '1.05rem', color: '#5A5450', maxWidth: '46ch' }}
                >
                  Dom Expert Мебел е семейна работилница от Благоевград с над 10 години опит.
                  Правим кухни, гардероби и спални точно по вашите желания —
                  от първата скица до финалния монтаж.
                </p>
                <p
                  className="font-body leading-relaxed"
                  style={{ fontSize: '0.97rem', color: '#6B6560', maxWidth: '46ch' }}
                >
                  Работим с висококачествени материали от Egger, Blum и Hafele и стоим зад
                  всяко изделие с 2-годишна гаранция.
                </p>

                {/* Stats row */}
                <div
                  className="flex items-center gap-6 mt-8 pt-8"
                  style={{ borderTop: '1px solid rgba(139,111,71,0.15)' }}
                >
                  {[
                    { n: '500+', l: 'Изработени кухни' },
                    { n: '10+', l: 'Години опит' },
                    { n: '2', l: 'Шоурума' },
                  ].map((s, i) => (
                    <div key={s.l} className="flex items-center gap-6">
                      <div>
                        <div
                          className="font-display font-bold"
                          style={{ fontSize: '2.2rem', color: '#8B6F47', lineHeight: 1 }}
                        >
                          {s.n}
                        </div>
                        <div
                          className="font-body mt-1"
                          style={{ fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9B9490' }}
                        >
                          {s.l}
                        </div>
                      </div>
                      {i < 2 && (
                        <div style={{ width: 1, height: 44, background: 'rgba(139,111,71,0.2)', flexShrink: 0 }} />
                      )}
                    </div>
                  ))}
                </div>

                {/* CTA buttons */}
                <div className="flex flex-wrap gap-3 mt-7">
                  <Link
                    href="/контакти/"
                    className="inline-flex items-center gap-2 font-body font-semibold text-white rounded-full transition-all duration-200 hover:-translate-y-0.5"
                    style={{ background: '#8B6F47', fontSize: '0.88rem', padding: '12px 24px', boxShadow: '0 6px 24px rgba(139,111,71,0.45)' }}
                  >
                    Безплатна консултация →
                  </Link>
                  <Link
                    href="/проекти/"
                    className="inline-flex items-center gap-2 font-body font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5"
                    style={{ border: '1.5px solid rgba(139,111,71,0.35)', color: '#8B6F47', fontSize: '0.88rem', padding: '12px 24px', background: 'white' }}
                  >
                    Виж нашите проекти
                  </Link>
                </div>
              </div>

              {/* Right – image */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: '4/3' }}>
                <Image
                  src="/images/services/kuhnya.png"
                  alt="Кухня по поръчка изработена от Dom Expert Мебел в Благоевград"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {/* Floating badge */}
                <div
                  style={{
                    position: 'absolute', bottom: 20, left: 20,
                    background: 'rgba(255,255,255,0.96)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: 16,
                    padding: '12px 18px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                  }}
                >
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map(i => (
                      <span key={i} style={{ color: '#C4A882', fontSize: '0.9rem' }}>★</span>
                    ))}
                  </div>
                  <div className="font-body font-semibold text-charcoal mt-0.5" style={{ fontSize: '0.8rem' }}>
                    500+ доволни клиенти
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ──────────────── 2. STORY ──────────────── */}
        <section
          className="section-py"
          style={{ backgroundColor: 'var(--color-warm-white)' }}
          aria-labelledby="story-heading"
        >
          <div className="container-main">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="eyebrow-pill">Нашата история</span>
              <h2
                id="story-heading"
                className="font-display font-bold heading-gradient leading-[1.1]"
                style={{ fontSize: 'clamp(1.75rem, 4.5vw, 2.5rem)' }}
              >
                Семеен бизнес с над 10 години традиция
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-10">

              {/* Story text */}
              <div className="md:col-span-2 space-y-5">
                <p className="font-body leading-relaxed" style={{ fontSize: '1rem', color: '#5A5450' }}>
                  Всичко започна с едно просто желание — да правим мебели, каквито сами бихме
                  искали у дома. Преди над 10 години основахме Dom Expert Мебел в Благоевград
                  като малка семейна работилница, с ясна цел:{' '}
                  <strong style={{ color: '#3C2A18', fontWeight: 600 }}>
                    качество, честност и внимание към всеки детайл.
                  </strong>
                </p>
                <p className="font-body leading-relaxed" style={{ fontSize: '1rem', color: '#5A5450' }}>
                  С годините израснахме — разширихме екипа, оборудвахме работилницата с модерни
                  машини и отворихме втори шоурум в София. Но ценностите ни останаха същите.
                  Собственикът лично участва в по-голямата част от проектите и е постоянна
                  контактна точка за клиентите.
                </p>
                <p className="font-body leading-relaxed" style={{ fontSize: '1rem', color: '#5A5450' }}>
                  Специализирали сме се основно в{' '}
                  <strong style={{ color: '#3C2A18', fontWeight: 600 }}>кухни по поръчка</strong>,
                  но правим и гардероби, спални, бани и офис мебели. Всеки проект минава
                  през 3D визуализация — клиентът вижда резултата преди финалното решение.
                </p>

                {/* Facts */}
                <ul className="space-y-3 pt-2">
                  {facts.map((fact) => (
                    <li
                      key={fact}
                      className="flex items-start gap-3 font-body"
                      style={{ fontSize: '0.93rem', color: '#5A5450' }}
                    >
                      <CheckCircle2
                        size={17}
                        style={{ color: '#8B6F47', flexShrink: 0, marginTop: 2 }}
                        aria-hidden="true"
                      />
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact card */}
              <aside
                style={{
                  background: 'linear-gradient(145deg, #2C2318 0%, #1A1208 100%)',
                  borderRadius: 20,
                  padding: '28px 24px',
                  alignSelf: 'start',
                }}
                aria-label="Контактна информация"
              >
                <span className="eyebrow-pill-dark" style={{ marginBottom: 16 }}>Свържете се</span>
                <h3
                  className="font-display font-semibold"
                  style={{ fontSize: '1.3rem', color: 'white', lineHeight: 1.2, marginBottom: 20 }}
                >
                  Готови за вашия проект?
                </h3>

                <address className="not-italic space-y-3" style={{ fontSize: '0.88rem' }}>
                  <a
                    href="tel:+359888123456"
                    className="flex items-center gap-3 font-body transition-colors"
                    style={{ color: 'rgba(255,255,255,0.7)' }}
                    aria-label="Телефон 0888 123 456"
                  >
                    <span
                      style={{
                        background: 'rgba(139,111,71,0.2)', borderRadius: 8,
                        padding: 8, display: 'flex', flexShrink: 0,
                      }}
                    >
                      <svg width="14" height="14" fill="none" stroke="#C4A882" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </span>
                    0888 123 456
                  </a>

                  <a
                    href="mailto:office@domexpertmebel.bg"
                    className="flex items-center gap-3 font-body transition-colors break-all"
                    style={{ color: 'rgba(255,255,255,0.7)' }}
                    aria-label="Имейл office@domexpertmebel.bg"
                  >
                    <span
                      style={{
                        background: 'rgba(139,111,71,0.2)', borderRadius: 8,
                        padding: 8, display: 'flex', flexShrink: 0,
                      }}
                    >
                      <svg width="14" height="14" fill="none" stroke="#C4A882" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </span>
                    office@domexpertmebel.bg
                  </a>

                  <div className="flex items-start gap-3 font-body" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    <span
                      style={{
                        background: 'rgba(139,111,71,0.2)', borderRadius: 8,
                        padding: 8, display: 'flex', flexShrink: 0, marginTop: 1,
                      }}
                    >
                      <svg width="14" height="14" fill="none" stroke="#C4A882" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </span>
                    Благоевград, България
                  </div>
                </address>

                <Link
                  href="/контакти/"
                  className="block text-center font-body font-semibold mt-6 rounded-full py-3 transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: '#8B6F47', color: 'white', fontSize: '0.85rem', boxShadow: '0 4px 16px rgba(139,111,71,0.4)' }}
                >
                  Поискай безплатна оферта →
                </Link>
              </aside>
            </div>
          </div>
        </section>

        {/* ──────────────── 3. STATS BAR ──────────────── */}
        <section
          style={{ backgroundColor: '#1A1208' }}
          aria-label="Статистики"
        >
          <div className="container-main py-14">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((s, i) => (
                <div key={s.l} className="text-center relative">
                  <div
                    className="font-display font-bold"
                    style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#C4A882', lineHeight: 1 }}
                  >
                    {s.n}
                  </div>
                  <div
                    className="font-body mt-2"
                    style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}
                  >
                    {s.l}
                  </div>
                  {i < 3 && (
                    <div
                      className="hidden md:block absolute top-0 bottom-0 right-0"
                      style={{ width: 1, background: 'rgba(255,255,255,0.07)' }}
                      aria-hidden="true"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────────── 4. WHY US ──────────────── */}
        <section
          className="section-py"
          style={{ backgroundColor: 'var(--color-cream)' }}
          aria-labelledby="why-heading"
        >
          <div className="container-main">
            <div className="text-center mb-12">
              <span className="eyebrow-pill">Защо да изберете нас</span>
              <h2
                id="why-heading"
                className="font-display font-bold heading-gradient leading-[1.1]"
                style={{ fontSize: 'clamp(1.75rem, 4.5vw, 2.5rem)' }}
              >
                Производство на мебели с грижа за детайла
              </h2>
              <p
                className="font-body leading-relaxed mt-4 mx-auto"
                style={{ fontSize: '0.97rem', color: '#5A5450', maxWidth: '52ch' }}
              >
                Изграждаме всеки проект като да е за собствения ни дом — без съкращения, без компромиси.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {whyUs.map(({ Icon, title, desc }) => (
                <div
                  key={title}
                  style={{
                    background: 'white',
                    borderRadius: 18,
                    padding: '28px 22px',
                    border: '1px solid #EDE5DA',
                    boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
                  }}
                >
                  <div
                    style={{
                      width: 52, height: 52, borderRadius: 14,
                      background: 'rgba(139,111,71,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: 18,
                    }}
                    aria-hidden="true"
                  >
                    <Icon size={22} style={{ color: '#8B6F47' }} />
                  </div>
                  <h3
                    className="font-display font-semibold text-charcoal mb-3"
                    style={{ fontSize: '1.18rem', lineHeight: 1.2 }}
                  >
                    {title}
                  </h3>
                  <p className="font-body leading-relaxed" style={{ fontSize: '0.88rem', color: '#5A5450' }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────────── 5. PROCESS ──────────────── */}
        <section
          className="section-py"
          style={{ backgroundColor: 'var(--color-warm-white)' }}
          aria-labelledby="process-heading"
        >
          <div className="container-main">
            <div className="text-center mb-12">
              <span className="eyebrow-pill">Как работим</span>
              <h2
                id="process-heading"
                className="font-display font-bold heading-gradient leading-[1.1]"
                style={{ fontSize: 'clamp(1.75rem, 4.5vw, 2.5rem)' }}
              >
                Кухни по поръчка – от идея до монтаж
              </h2>
              <p
                className="font-body leading-relaxed mt-4 mx-auto"
                style={{ fontSize: '0.97rem', color: '#5A5450', maxWidth: '50ch' }}
              >
                Процесът е ясен и прозрачен — знаете какво се случва на всяка стъпка.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {process.map((step) => (
                <div
                  key={step.num}
                  style={{
                    background: 'white',
                    borderRadius: 18,
                    padding: '28px 22px',
                    border: '1px solid #EDE5DA',
                    borderTop: `3px solid ${step.color}`,
                    boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
                  }}
                >
                  <div
                    style={{
                      width: 46, height: 46, borderRadius: 12,
                      background: step.bg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: 16,
                    }}
                    aria-hidden="true"
                  >
                    <span
                      className="font-display font-bold"
                      style={{ color: step.color, fontSize: '1.1rem' }}
                    >
                      {step.num}
                    </span>
                  </div>
                  <h3
                    className="font-display font-semibold text-charcoal mb-2"
                    style={{ fontSize: '1.12rem', lineHeight: 1.25 }}
                  >
                    {step.title}
                  </h3>
                  <p className="font-body leading-relaxed" style={{ fontSize: '0.87rem', color: '#5A5450' }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────────── 6. CTA ──────────────── */}
        <section
          className="section-py"
          style={{ backgroundColor: '#1A1208' }}
          aria-label="Покана за действие"
        >
          <div className="container-main text-center">
            <span className="eyebrow-pill-dark" style={{ marginBottom: 20 }}>Следваща стъпка</span>
            <h2
              className="font-display font-bold"
              style={{
                fontSize: 'clamp(1.8rem, 5vw, 3rem)',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #E8D5BA 50%, #C4A882 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1.1,
                marginBottom: '1.25rem',
              }}
            >
              Готови да направим<br />вашата мечтана кухня?
            </h2>
            <p
              className="font-body leading-relaxed mb-8 mx-auto"
              style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.62)', maxWidth: '48ch' }}
            >
              Свържете се с нас за безплатна консултация и 3D проект. Без задължения —
              просто разговор за вашите идеи.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/контакти/"
                className="inline-flex items-center gap-2 font-body font-semibold text-white rounded-full transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: '#8B6F47', fontSize: '0.92rem', padding: '14px 32px', boxShadow: '0 8px 32px rgba(139,111,71,0.5)' }}
              >
                Поискай безплатна консултация →
              </Link>
              <a
                href="tel:+359888123456"
                className="inline-flex items-center gap-2 font-body font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  border: '1.5px solid rgba(255,255,255,0.25)',
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '0.92rem',
                  padding: '14px 32px',
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(8px)',
                }}
                aria-label="Обадете ни се на 0888 123 456"
              >
                📞 0888 123 456
              </a>
            </div>

            {/* Internal link back to home */}
            <p className="font-body mt-10" style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.3)' }}>
              Научете повече за{' '}
              <Link href="/" style={{ color: 'rgba(196,168,130,0.7)' }} className="hover:underline underline-offset-2">
                нашите услуги на началната страница
              </Link>
              {' '}или разгледайте{' '}
              <Link href="/проекти/" style={{ color: 'rgba(196,168,130,0.7)' }} className="hover:underline underline-offset-2">
                завършените ни проекти
              </Link>.
            </p>
          </div>
        </section>

      </article>
    </>
  )
}
