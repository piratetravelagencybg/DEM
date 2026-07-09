import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, Shield, Users, MapPin, Award } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'

export const metadata: Metadata = {
  title: { absolute: 'За нас | Мебели по поръчка Благоевград — Dom Expert Мебел' },
  description:
    'Семейна работилница с 10+ години опит в мебели по поръчка в Благоевград. 500+ реализирани кухни, гардероби и спални. Безплатна консултация. Тел: 0876 081 199',
  alternates: { canonical: 'https://domexpertmebel.com/за-нас/' },
  openGraph: {
    title: 'За Нас – Мебели по Поръчка Благоевград | Dom Expert Мебел',
    description:
      'Семейна работилница с 10+ години опит в мебели по поръчка и кухни по поръчка – Благоевград. 500+ реализирани проекта.',
    url: 'https://domexpertmebel.com/за-нас/',
    type: 'website',
    locale: 'bg_BG',
    siteName: 'Dom Expert Мебел',
    images: [{ url: '/images/real/kuhnya-04.png', width: 1200, height: 630, alt: 'Dom Expert Мебел' }],
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'FurnitureStore'],
  '@id': 'https://domexpertmebel.com/#business',
  name: 'Dom Expert Мебел',
  description: 'Семейна фирма за мебели по поръчка в Благоевград. Кухни, гардероби, спални и офис мебели с 10+ години опит.',
  url: 'https://domexpertmebel.com',
  telephone: '+359876081199',
  email: 'office@domexpertmebel.com',
  foundingDate: '2014',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ул. Стамболийски 52',
    addressLocality: 'Благоевград',
    postalCode: '2700',
    addressRegion: 'Благоевград',
    addressCountry: 'BG',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 42.0135, longitude: 23.0944 },
  openingHoursSpecification: [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  }],
  priceRange: '$$',
  areaServed: ['Благоевград', 'София', 'Дупница', 'Сандански', 'Банско', 'Разлог'],
  image: 'https://domexpertmebel.com/images/real/kuhnya-04.png',
  sameAs: ['https://www.facebook.com/domexpertmebel', 'https://www.instagram.com/domexpertmebel'],
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://domexpertmebel.com/#organization',
  name: 'Dom Expert Мебел',
  url: 'https://domexpertmebel.com',
  logo: 'https://domexpertmebel.com/images/logo-icon.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+359876081199',
    contactType: 'customer service',
    areaServed: 'BG',
    availableLanguage: 'Bulgarian',
  },
}

const stats = [
  { n: '500+', l: 'Реализирани проекта' },
  { n: '10+',  l: 'Години опит' },
  { n: '100%', l: 'Доволни клиенти' },
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
    desc: 'Над 500 реализирани проекта говорят сами. Стоим зад всяко изделие с гаранция и следпродажбено обслужване.',
  },
]

const process = [
  { num: '01', title: 'Безплатна консултация', desc: 'Разговаряме за вашите нужди, пространство и вкус. Без задължения, без скрити такси.' },
  { num: '02', title: '3D дизайн проект', desc: 'Изготвяме детайлен 3D проект — виждате резултата преди да е наредена и една дъска.' },
  { num: '03', title: 'Производство', desc: 'Изработваме мебелите в нашата работилница с прецизно CNC рязане и ръчна обработка.' },
  { num: '04', title: 'Монтаж и предаване', desc: 'Нашият екип монтира прецизно, почиства след себе си и предава готовия проект.' },
]

const facts = [
  'Работим с материали Egger, Blum, Hafele — водещи европейски марки',
  '2-годишна гаранция на всички изработени мебели',
  'Безплатен 3D проект при сключен договор',
  'Собствена транспортна и монтажна бригада',
]

const galleryStrip = [
  { src: '/images/real/kuhnya-01.png', alt: 'Кухня по поръчка — Dom Expert Мебел' },
  { src: '/images/real/spalna-05.png', alt: 'Спалня по поръчка — Dom Expert Мебел' },
  { src: '/images/real/dnevna-03.png', alt: 'Дневна по поръчка — Dom Expert Мебел' },
  { src: '/images/real/garderob-03.png', alt: 'Гардероб по поръчка — Dom Expert Мебел' },
  { src: '/images/real/office-corner.png', alt: 'Офис мебели по поръчка — Dom Expert Мебел' },
]

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <BreadcrumbSchema items={[
        { name: 'Начало', url: 'https://domexpertmebel.com/' },
        { name: 'За нас', url: 'https://domexpertmebel.com/за-нас/' },
      ]} />

      <article>

        {/* ── 1. HERO ── */}
        <section
          className="section-py"
          style={{ backgroundColor: 'var(--color-cream)', paddingTop: '7rem' }}
          aria-label="Представяне на фирмата"
        >
          <div className="container-main">

            {/* Breadcrumb */}
            <nav aria-label="Навигационна следа" className="mb-8">
              <ol className="flex items-center gap-2 font-body" style={{ fontSize: '0.8rem', color: '#9B9490' }}>
                <li><Link href="/" style={{ color: '#8B6F47' }} className="hover:underline underline-offset-2">Начало</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" style={{ color: '#5A5450' }}>За нас</li>
              </ol>
            </nav>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">

              {/* Left — text */}
              <div className="flex flex-col justify-center">
                <span className="eyebrow-pill">За нас</span>
                <h1
                  className="font-display font-bold heading-gradient leading-[1.07] mt-2 mb-5"
                  style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
                >
                  Мебели по поръчка<br />с душа и точност
                </h1>
                <p className="font-body leading-relaxed mb-3" style={{ fontSize: '1.02rem', color: '#5A5450', maxWidth: '44ch' }}>
                  Dom Expert Мебел е семейна работилница от Благоевград с над 10 години опит.
                  Правим кухни, гардероби и спални точно по вашите желания — от първата скица до финалния монтаж.
                </p>
                <p className="font-body leading-relaxed" style={{ fontSize: '0.93rem', color: '#7A7470', maxWidth: '44ch' }}>
                  Работим с висококачествени материали от Egger, Blum и Hafele и стоим зад всяко изделие с 2-годишна гаранция.
                </p>

                {/* Stats */}
                <div
                  className="grid grid-cols-3 gap-2 mt-8 pt-8"
                  style={{ borderTop: '1px solid rgba(139,111,71,0.15)' }}
                >
                  {stats.map((s) => (
                    <div key={s.l} className="text-center">
                      <div
                        className="font-display font-bold"
                        style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', color: '#8B6F47', lineHeight: 1 }}
                      >
                        {s.n}
                      </div>
                      <div
                        className="font-body mt-1"
                        style={{ fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9B9490' }}
                      >
                        {s.l}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 mt-7">
                  <Link
                    href="/контакти/"
                    className="inline-flex items-center gap-2 font-body font-semibold text-white rounded-full transition-all hover:-translate-y-0.5"
                    style={{ background: '#8B6F47', fontSize: '0.88rem', padding: '12px 24px', boxShadow: '0 6px 24px rgba(139,111,71,0.4)' }}
                  >
                    Безплатна консултация →
                  </Link>
                  <Link
                    href="/проекти/"
                    className="inline-flex items-center font-body font-semibold rounded-full transition-all hover:-translate-y-0.5"
                    style={{ border: '1.5px solid rgba(139,111,71,0.3)', color: '#8B6F47', fontSize: '0.88rem', padding: '12px 24px', background: 'white' }}
                  >
                    Нашите проекти
                  </Link>
                </div>
              </div>

              {/* Right — photo mosaic */}
              <div
                className="grid gap-3"
                style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: '240px 200px' }}
              >
                {/* Large left — spans 2 rows */}
                <div
                  className="relative overflow-hidden rounded-2xl"
                  style={{ gridRow: 'span 2' }}
                >
                  <Image
                    src="/images/real/kuhnya-04.png"
                    alt="Кухня по поръчка — Dom Expert Мебел Благоевград"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    priority
                  />
                </div>
                {/* Top right */}
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="/images/real/garderob-01.png"
                    alt="Гардероб по поръчка — Dom Expert Мебел"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                {/* Bottom right */}
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="/images/real/spalna-07.png"
                    alt="Спалня по поръчка — Dom Expert Мебел"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Badge */}
                  <div
                    style={{
                      position: 'absolute', bottom: 14, left: 14,
                      background: 'rgba(255,255,255,0.95)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 12,
                      padding: '8px 14px',
                    }}
                  >
                    <div style={{ color: '#C4A882', fontSize: '0.7rem', letterSpacing: 2 }}>★★★★★</div>
                    <div className="font-body font-semibold" style={{ fontSize: '0.72rem', color: '#2C2520', marginTop: 2 }}>
                      500+ доволни клиенти
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── 2. PHOTO STRIP ── */}
        <section aria-label="Галерия от реализирани проекти" style={{ background: '#1A1208' }}>
          <div
            className="flex gap-1 overflow-x-auto"
            style={{ scrollbarWidth: 'none', height: 220 }}
          >
            {galleryStrip.map((photo) => (
              <div
                key={photo.src}
                className="relative flex-shrink-0 overflow-hidden"
                style={{ width: '22%', minWidth: 180 }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="220px"
                  style={{ transition: 'transform 0.6s ease' }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. STORY ── */}
        <section
          className="section-py"
          style={{ backgroundColor: 'var(--color-warm-white)' }}
          aria-labelledby="story-heading"
        >
          <div className="container-main">
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">

              {/* Text */}
              <div>
                <span className="eyebrow-pill">Нашата история</span>
                <h2
                  id="story-heading"
                  className="font-display font-bold heading-gradient leading-[1.1] mt-2 mb-6"
                  style={{ fontSize: 'clamp(1.6rem, 4vw, 2.3rem)' }}
                >
                  Семеен бизнес с над 10 години традиция
                </h2>

                <div className="space-y-4">
                  <p className="font-body leading-relaxed" style={{ fontSize: '0.97rem', color: '#5A5450' }}>
                    Всичко започна с едно просто желание — да правим мебели, каквито сами бихме
                    искали у дома. Преди над 10 години основахме Dom Expert Мебел в Благоевград
                    като малка семейна работилница, с ясна цел:{' '}
                    <strong style={{ color: '#3C2A18', fontWeight: 600 }}>
                      качество, честност и внимание към всеки детайл.
                    </strong>
                  </p>
                  <p className="font-body leading-relaxed" style={{ fontSize: '0.97rem', color: '#5A5450' }}>
                    С годините израснахме — разширихме екипа, оборудвахме работилницата с модерни
                    машини. Но ценностите ни останаха същите. Собственикът лично участва
                    в по-голямата част от проектите и е постоянна контактна точка за клиентите.
                  </p>
                  <p className="font-body leading-relaxed" style={{ fontSize: '0.97rem', color: '#5A5450' }}>
                    Специализирали сме се основно в{' '}
                    <strong style={{ color: '#3C2A18', fontWeight: 600 }}>кухни по поръчка</strong>,
                    но правим и гардероби, спални и офис мебели. Всеки проект минава
                    през 3D визуализация — клиентът вижда резултата преди финалното решение.
                  </p>
                </div>

                <ul className="space-y-2.5 mt-6">
                  {facts.map((fact) => (
                    <li key={fact} className="flex items-start gap-3 font-body" style={{ fontSize: '0.9rem', color: '#5A5450' }}>
                      <CheckCircle2 size={16} style={{ color: '#8B6F47', flexShrink: 0, marginTop: 3 }} aria-hidden="true" />
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Photo */}
              <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '3/4' }}>
                <Image
                  src="/images/real/spalna-01.png"
                  alt="Спалня по поръчка — реализация на Dom Expert Мебел Благоевград"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
                {/* Dark bottom overlay with text */}
                <div
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(12,8,4,0.75) 0%, rgba(12,8,4,0.0) 55%)',
                  }}
                />
                <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
                  <p className="font-body font-semibold text-white" style={{ fontSize: '0.88rem' }}>
                    ул. Стамболийски 52, Благоевград
                  </p>
                  <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>
                    Пон–Пет 09:00–18:00 · 0876 081 199
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── 4. STATS BAR ── */}
        <section style={{ backgroundColor: '#1A1208' }} aria-label="Статистики">
          <div className="container-main py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { n: '500+', l: 'изработени кухни' },
                { n: '10+', l: 'години опит' },
                { n: '2', l: 'шоурума' },
                { n: '100%', l: 'доволни клиенти' },
              ].map((s, i) => (
                <div key={s.l} className="text-center relative">
                  <div
                    className="font-display font-bold"
                    style={{ fontSize: 'clamp(1.8rem, 4.5vw, 2.8rem)', color: '#C4A882', lineHeight: 1 }}
                  >
                    {s.n}
                  </div>
                  <div
                    className="font-body mt-2"
                    style={{ fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}
                  >
                    {s.l}
                  </div>
                  {i < 3 && (
                    <div
                      className="hidden md:block absolute top-0 bottom-0 right-0"
                      style={{ width: 1, background: 'rgba(255,255,255,0.06)' }}
                      aria-hidden="true"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. WHY US ── */}
        <section
          className="section-py"
          style={{ backgroundColor: 'var(--color-cream)' }}
          aria-labelledby="why-heading"
        >
          <div className="container-main">
            <div className="text-center mb-10">
              <span className="eyebrow-pill">Защо да ни изберете</span>
              <h2
                id="why-heading"
                className="font-display font-bold heading-gradient leading-[1.1] mt-1"
                style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)' }}
              >
                Производство с грижа за детайла
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {whyUs.map(({ Icon, title, desc }, i) => (
                <div
                  key={title}
                  style={{
                    background: i === 0 ? 'linear-gradient(145deg, #2C2318, #1A1208)' : 'white',
                    borderRadius: 18,
                    padding: '26px 22px',
                    border: i === 0 ? '1px solid rgba(196,168,130,0.15)' : '1px solid #EDE5DA',
                    boxShadow: i === 0 ? '0 8px 32px rgba(0,0,0,0.15)' : '0 2px 12px rgba(0,0,0,0.04)',
                  }}
                >
                  <div
                    style={{
                      width: 46, height: 46, borderRadius: 13,
                      background: i === 0 ? 'rgba(196,168,130,0.15)' : 'rgba(139,111,71,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: 16,
                    }}
                    aria-hidden="true"
                  >
                    <Icon size={20} style={{ color: i === 0 ? '#C4A882' : '#8B6F47' }} />
                  </div>
                  <h3
                    className="font-display font-semibold mb-2"
                    style={{ fontSize: '1.05rem', lineHeight: 1.2, color: i === 0 ? 'white' : '#2C2520' }}
                  >
                    {title}
                  </h3>
                  <p
                    className="font-body leading-relaxed"
                    style={{ fontSize: '0.85rem', color: i === 0 ? 'rgba(255,255,255,0.65)' : '#6A6460' }}
                  >
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. PHOTO + PROCESS ── */}
        <section
          className="section-py"
          style={{ backgroundColor: 'var(--color-warm-white)' }}
          aria-labelledby="process-heading"
        >
          <div className="container-main">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

              {/* Photo left */}
              <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <Image
                  src="/images/real/kuhnya-03.png"
                  alt="Процес на изработка на кухня по поръчка — Dom Expert Мебел"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>

              {/* Process right */}
              <div>
                <span className="eyebrow-pill">Как работим</span>
                <h2
                  id="process-heading"
                  className="font-display font-bold heading-gradient leading-[1.1] mt-2 mb-7"
                  style={{ fontSize: 'clamp(1.6rem, 4vw, 2.3rem)' }}
                >
                  Кухни по поръчка — от идея до монтаж
                </h2>

                <div className="space-y-4">
                  {process.map((step, i) => (
                    <div
                      key={step.num}
                      className="flex gap-4 items-start"
                      style={{
                        background: 'white',
                        borderRadius: 16,
                        padding: '18px 20px',
                        border: '1px solid #EDE5DA',
                      }}
                    >
                      <div
                        className="flex-shrink-0 flex items-center justify-center font-display font-bold rounded-xl"
                        style={{
                          width: 42, height: 42,
                          background: 'rgba(139,111,71,0.1)',
                          color: '#8B6F47',
                          fontSize: '0.9rem',
                        }}
                      >
                        {step.num}
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-charcoal" style={{ fontSize: '1rem', lineHeight: 1.2 }}>
                          {step.title}
                        </h3>
                        <p className="font-body mt-1 leading-relaxed" style={{ fontSize: '0.84rem', color: '#7A7470' }}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── 7. SECOND PHOTO ROW ── */}
        <section aria-label="Реализирани проекти" className="section-py" style={{ background: 'var(--color-cream)' }}>
          <div className="container-main">
            <div className="text-center mb-8">
              <span className="eyebrow-pill">Реализации</span>
              <h2
                className="font-display font-bold heading-gradient leading-[1.1] mt-1"
                style={{ fontSize: 'clamp(1.6rem, 4vw, 2.3rem)' }}
              >
                Нашата работа говори сама
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { src: '/images/real/kuhnya-05.png', alt: 'Кухня по поръчка Благоевград' },
                { src: '/images/real/dnevna-01.png', alt: 'Дневна по поръчка Благоевград' },
                { src: '/images/real/garderob-02.png', alt: 'Гардероб по поръчка Благоевград' },
                { src: '/images/real/spalna-03.png', alt: 'Спалня по поръчка Благоевград' },
                { src: '/images/real/kuhnya-06.png', alt: 'Класическа кухня по поръчка' },
                { src: '/images/real/bedroom-modern.png', alt: 'Модерна спалня по поръчка' },
              ].map((photo) => (
                <div
                  key={photo.src}
                  className="relative overflow-hidden rounded-xl"
                  style={{ aspectRatio: '4/3' }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                    style={{ transition: 'transform 0.6s ease' }}
                  />
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/проекти/"
                className="inline-flex items-center gap-2 font-body font-semibold text-white rounded-full transition-all hover:-translate-y-0.5"
                style={{ background: '#8B6F47', fontSize: '0.88rem', padding: '12px 28px', boxShadow: '0 6px 24px rgba(139,111,71,0.4)' }}
              >
                Виж всички проекти →
              </Link>
            </div>
          </div>
        </section>

        {/* ── 8. CTA ── */}
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
              style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.58)', maxWidth: '46ch' }}
            >
              Свържете се с нас за безплатна консултация и 3D проект. Без задължения —
              просто разговор за вашите идеи.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/контакти/"
                className="inline-flex items-center gap-2 font-body font-semibold text-white rounded-full transition-all hover:-translate-y-0.5"
                style={{ background: '#8B6F47', fontSize: '0.92rem', padding: '14px 32px', boxShadow: '0 8px 32px rgba(139,111,71,0.5)' }}
              >
                Поискай безплатна консултация →
              </Link>
              <a
                href="tel:+359876081199"
                className="inline-flex items-center gap-2 font-body font-semibold rounded-full transition-all hover:-translate-y-0.5"
                style={{
                  border: '1.5px solid rgba(255,255,255,0.22)',
                  color: 'rgba(255,255,255,0.82)',
                  fontSize: '0.92rem',
                  padding: '14px 32px',
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                📞 0876 081 199
              </a>
            </div>
            <p className="font-body mt-10" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.28)' }}>
              Научете повече за{' '}
              <Link href="/" style={{ color: 'rgba(196,168,130,0.65)' }} className="hover:underline underline-offset-2">
                нашите услуги на началната страница
              </Link>
              {' '}или разгледайте{' '}
              <Link href="/проекти/" style={{ color: 'rgba(196,168,130,0.65)' }} className="hover:underline underline-offset-2">
                завършените ни проекти
              </Link>.
            </p>
          </div>
        </section>

      </article>
    </>
  )
}
