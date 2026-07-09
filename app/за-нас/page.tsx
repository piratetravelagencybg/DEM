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
    description: 'Семейна работилница с 10+ години опит в мебели по поръчка – Благоевград. 500+ реализирани проекта.',
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
  description: 'Семейна фирма за мебели по поръчка в Благоевград.',
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
    dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'],
    opens: '09:00', closes: '18:00',
  }],
  priceRange: '$$',
  areaServed: ['Благоевград','София','Дупница','Сандански','Банско','Разлог'],
  image: 'https://domexpertmebel.com/images/real/kuhnya-04.png',
  sameAs: ['https://www.facebook.com/domexpertmebel','https://www.instagram.com/domexpertmebel'],
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

const whyUs = [
  { Icon: Shield,  title: 'Качество без компромис',  desc: 'Материали Egger, Blum и Hafele. 2-годишна гаранция на всички изделия.' },
  { Icon: Users,   title: 'Индивидуален подход',     desc: 'Всеки проект е уникален — съобразен с вашето пространство и бюджет.' },
  { Icon: MapPin,  title: 'Местен и достъпен',       desc: 'Семейна фирма от Благоевград. Собственикът участва лично в проектите.' },
  { Icon: Award,   title: 'Гарантиран резултат',     desc: '500+ реализирани проекта. Стоим зад всяко изделие с гаранция.' },
]

const process = [
  { num: '01', title: 'Безплатна консултация', desc: 'Разговаряме за вашите нужди, пространство и вкус. Без задължения.' },
  { num: '02', title: '3D дизайн проект',      desc: 'Виждате резултата преди да е наредена и една дъска.' },
  { num: '03', title: 'Производство',          desc: 'Изработваме мебелите с прецизно CNC рязане и ръчна обработка.' },
  { num: '04', title: 'Монтаж и предаване',    desc: 'Монтираме прецизно, почистваме и предаваме готовия проект.' },
]

const facts = [
  'Работим с материали Egger, Blum, Hafele — водещи европейски марки',
  '2-годишна гаранция на всички изработени мебели',
  'Безплатен 3D проект при сключен договор',
  'Собствена транспортна и монтажна бригада',
]

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <BreadcrumbSchema items={[
        { name: 'Начало', url: 'https://domexpertmebel.com/' },
        { name: 'За нас',  url: 'https://domexpertmebel.com/за-нас/' },
      ]} />

      <article>

        {/* ══════════════════════════════════
            1. HERO — full-bleed image, text overlay
        ══════════════════════════════════ */}
        <section
          aria-label="Представяне"
          style={{ position: 'relative', minHeight: '90vh', display: 'flex', flexDirection: 'column' }}
        >
          <Image
            src="/images/real/kuhnya-04.png"
            alt="Кухня по поръчка — Dom Expert Мебел Благоевград"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          {/* Gradient: transparent top → very dark bottom */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(8,5,2,0.35) 0%, rgba(8,5,2,0.20) 40%, rgba(8,5,2,0.78) 80%, rgba(8,5,2,0.92) 100%)',
          }} />

          <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '5.5rem var(--container-px, 1.25rem) 4rem' }}>

            {/* Top breadcrumb */}
            <nav aria-label="Навигационна следа">
              <ol className="flex items-center gap-2 font-body" style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)' }}>
                <li><Link href="/" style={{ color: 'rgba(255,255,255,0.7)' }} className="hover:underline underline-offset-2">Начало</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">За нас</li>
              </ol>
            </nav>

            {/* Bottom title */}
            <div style={{ maxWidth: 1120, margin: '0 auto', width: '100%' }}>
              <span
                className="font-body font-semibold"
                style={{
                  display: 'inline-block',
                  fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: '#C4A882', background: 'rgba(196,168,130,0.12)',
                  border: '1px solid rgba(196,168,130,0.25)',
                  borderRadius: 100, padding: '5px 14px', marginBottom: 20,
                }}
              >
                За нас
              </span>
              <h1
                className="font-display font-bold text-white"
                style={{ fontSize: 'clamp(2.4rem, 7vw, 5rem)', lineHeight: 1.04, maxWidth: '16ch', marginBottom: '1.25rem' }}
              >
                Мебели с душа и точност
              </h1>
              <p
                className="font-body"
                style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: 'rgba(255,255,255,0.68)', maxWidth: '46ch', lineHeight: 1.65, marginBottom: '2rem' }}
              >
                Семейна работилница от Благоевград — над 10 години опит,
                500+ реализирани кухни, гардероби и спални.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/контакти/"
                  className="inline-flex items-center gap-2 font-body font-semibold text-white rounded-full transition-all hover:-translate-y-0.5"
                  style={{ background: '#8B6F47', fontSize: '0.88rem', padding: '12px 26px', boxShadow: '0 6px 28px rgba(139,111,71,0.55)' }}
                >
                  Безплатна консултация →
                </Link>
                <Link
                  href="/проекти/"
                  className="inline-flex items-center font-body font-semibold rounded-full transition-all hover:-translate-y-0.5"
                  style={{ border: '1px solid rgba(255,255,255,0.28)', color: 'rgba(255,255,255,0.88)', fontSize: '0.88rem', padding: '12px 26px', background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(8px)' }}
                >
                  Нашите проекти
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            2. STORY + STATS — editorial split
        ══════════════════════════════════ */}
        <section
          style={{ backgroundColor: 'var(--color-cream)', padding: '100px 0' }}
          aria-labelledby="story-heading"
        >
          <div className="container-main">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

              {/* Left: story */}
              <div>
                <span className="eyebrow-pill">Нашата история</span>
                <h2
                  id="story-heading"
                  className="font-display font-bold heading-gradient leading-[1.1] mt-2 mb-7"
                  style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}
                >
                  Семеен бизнес с над 10 години традиция
                </h2>
                <div className="space-y-5">
                  <p className="font-body leading-relaxed" style={{ fontSize: '1rem', color: '#5A5450' }}>
                    Всичко започна с едно просто желание — да правим мебели, каквито сами бихме искали
                    у дома. Преди над 10 години основахме Dom Expert Мебел в Благоевград като малка
                    семейна работилница, с ясна цел:{' '}
                    <strong style={{ color: '#3C2A18', fontWeight: 600 }}>качество, честност и внимание към всеки детайл.</strong>
                  </p>
                  <p className="font-body leading-relaxed" style={{ fontSize: '1rem', color: '#5A5450' }}>
                    С годините израснахме — разширихме екипа и оборудвахме работилницата с модерни
                    машини. Но ценностите ни останаха същите. Собственикът участва лично в
                    повечето проекти и е постоянна контактна точка за всеки клиент.
                  </p>
                  <p className="font-body leading-relaxed" style={{ fontSize: '1rem', color: '#5A5450' }}>
                    Специализирали сме се основно в{' '}
                    <strong style={{ color: '#3C2A18', fontWeight: 600 }}>кухни по поръчка</strong>,
                    но правим и гардероби, спални и офис мебели. Всеки проект минава
                    през 3D визуализация — клиентът вижда резултата преди финалното решение.
                  </p>
                </div>
                <ul className="space-y-3 mt-8">
                  {facts.map((fact) => (
                    <li key={fact} className="flex items-start gap-3 font-body" style={{ fontSize: '0.92rem', color: '#5A5450' }}>
                      <CheckCircle2 size={16} style={{ color: '#8B6F47', flexShrink: 0, marginTop: 3 }} aria-hidden="true" />
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: large elegant stats */}
              <div style={{ paddingTop: '1rem' }}>
                {[
                  { n: '500+', l: 'реализирани проекта', sub: 'Кухни, гардероби, спални и офис мебели' },
                  { n: '10+',  l: 'години опит',          sub: 'Основани 2014 г. в Благоевград' },
                  { n: '100%', l: 'доволни клиенти',      sub: 'Гаранция на всички изделия' },
                ].map((s, i) => (
                  <div
                    key={s.l}
                    style={{
                      paddingBottom: i < 2 ? 40 : 0,
                      marginBottom: i < 2 ? 40 : 0,
                      borderBottom: i < 2 ? '1px solid #EDE5DA' : 'none',
                    }}
                  >
                    <div
                      className="font-display font-bold"
                      style={{ fontSize: 'clamp(3.5rem, 7vw, 5.5rem)', color: '#8B6F47', lineHeight: 1 }}
                    >
                      {s.n}
                    </div>
                    <div
                      className="font-body font-semibold"
                      style={{ fontSize: '1rem', color: '#2C2520', marginTop: 8, textTransform: 'none' }}
                    >
                      {s.l}
                    </div>
                    <div
                      className="font-body"
                      style={{ fontSize: '0.82rem', color: '#9B9490', marginTop: 4 }}
                    >
                      {s.sub}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            3. FULL-WIDTH SHOWCASE IMAGE
        ══════════════════════════════════ */}
        <section aria-label="Реализация" style={{ backgroundColor: 'var(--color-cream)', paddingBottom: 80 }}>
          <div className="container-main">
            <div
              className="relative overflow-hidden"
              style={{ borderRadius: 24, aspectRatio: '21/9' }}
            >
              <Image
                src="/images/real/spalna-08.png"
                alt="Спалня по поръчка — реализация на Dom Expert Мебел Благоевград"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <p
              className="font-body text-center"
              style={{ fontSize: '0.78rem', color: '#A09890', marginTop: 14, fontStyle: 'italic' }}
            >
              Спалня по поръчка — реализация на Dom Expert Мебел, Благоевград
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════
            4. VALUES — clean 2-col layout
        ══════════════════════════════════ */}
        <section
          style={{ backgroundColor: 'var(--color-warm-white)', padding: '100px 0' }}
          aria-labelledby="why-heading"
        >
          <div className="container-main">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

              {/* Left heading */}
              <div>
                <span className="eyebrow-pill">Защо да ни изберете</span>
                <h2
                  id="why-heading"
                  className="font-display font-bold heading-gradient leading-[1.1] mt-2 mb-5"
                  style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}
                >
                  Производство с грижа за детайла
                </h2>
                <p className="font-body leading-relaxed" style={{ fontSize: '1rem', color: '#6A6460', maxWidth: '38ch' }}>
                  Изграждаме всеки проект като да е за собствения ни дом —
                  без съкращения, без компромиси с качеството.
                </p>
                <Link
                  href="/контакти/"
                  className="inline-flex items-center gap-2 font-body font-semibold text-white rounded-full transition-all hover:-translate-y-0.5 mt-8"
                  style={{ background: '#8B6F47', fontSize: '0.88rem', padding: '12px 26px', boxShadow: '0 6px 24px rgba(139,111,71,0.4)' }}
                >
                  Поискай оферта →
                </Link>
              </div>

              {/* Right: 4 values, clean */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
                {whyUs.map(({ Icon, title, desc }) => (
                  <div key={title}>
                    <div
                      style={{
                        width: 44, height: 44, borderRadius: 12,
                        background: 'rgba(139,111,71,0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginBottom: 14,
                      }}
                      aria-hidden="true"
                    >
                      <Icon size={19} style={{ color: '#8B6F47' }} />
                    </div>
                    <h3
                      className="font-display font-semibold"
                      style={{ fontSize: '1.05rem', color: '#2C2520', lineHeight: 1.25, marginBottom: 8 }}
                    >
                      {title}
                    </h3>
                    <p className="font-body leading-relaxed" style={{ fontSize: '0.87rem', color: '#7A7470' }}>
                      {desc}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            5. PHOTO DIPTYCH
        ══════════════════════════════════ */}
        <section aria-label="Реализирани проекти" style={{ backgroundColor: 'var(--color-warm-white)', paddingBottom: 100 }}>
          <div className="container-main">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: '3/4' }}>
                <Image
                  src="/images/real/kuhnya-03.png"
                  alt="Кухня по поръчка — реализация Dom Expert Мебел"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: '3/4' }}>
                <Image
                  src="/images/real/garderob-02.png"
                  alt="Гардероб по поръчка — реализация Dom Expert Мебел"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            6. PROCESS — clean numbered list
        ══════════════════════════════════ */}
        <section
          style={{ backgroundColor: '#1A1208', padding: '100px 0' }}
          aria-labelledby="process-heading"
        >
          <div className="container-main">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

              {/* Left heading */}
              <div>
                <span
                  className="font-body font-semibold"
                  style={{
                    display: 'inline-block',
                    fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase',
                    color: '#C4A882', background: 'rgba(196,168,130,0.1)',
                    border: '1px solid rgba(196,168,130,0.2)',
                    borderRadius: 100, padding: '5px 14px', marginBottom: 20,
                  }}
                >
                  Как работим
                </span>
                <h2
                  id="process-heading"
                  className="font-display font-bold"
                  style={{
                    fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #E8D5BA 60%, #C4A882 100%)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text', lineHeight: 1.1, marginBottom: '1.25rem',
                  }}
                >
                  От идея до монтаж
                </h2>
                <p className="font-body leading-relaxed" style={{ fontSize: '0.97rem', color: 'rgba(255,255,255,0.55)', maxWidth: '36ch' }}>
                  Процесът е ясен и прозрачен — знаете какво се случва на всяка стъпка.
                </p>
              </div>

              {/* Right steps */}
              <div>
                {process.map((step, i) => (
                  <div
                    key={step.num}
                    className="flex items-start gap-6"
                    style={{
                      paddingBottom: i < 3 ? 36 : 0,
                      marginBottom: i < 3 ? 36 : 0,
                      borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                    }}
                  >
                    <div
                      className="font-display font-bold flex-shrink-0"
                      style={{ fontSize: 'clamp(2rem,4vw,3rem)', color: 'rgba(196,168,130,0.25)', lineHeight: 1, width: 56 }}
                    >
                      {step.num}
                    </div>
                    <div style={{ paddingTop: 4 }}>
                      <h3
                        className="font-display font-semibold"
                        style={{ fontSize: '1.08rem', color: 'white', lineHeight: 1.2, marginBottom: 8 }}
                      >
                        {step.title}
                      </h3>
                      <p className="font-body leading-relaxed" style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.52)' }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            7. CTA — centered, dark
        ══════════════════════════════════ */}
        <section
          style={{ backgroundColor: 'var(--color-cream)', padding: '100px 0' }}
          aria-label="Покана за действие"
        >
          <div className="container-main" style={{ maxWidth: 680, textAlign: 'center' }}>
            <span className="eyebrow-pill">Следваща стъпка</span>
            <h2
              className="font-display font-bold heading-gradient leading-[1.1] mt-2 mb-5"
              style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}
            >
              Готови да направим вашата мечтана кухня?
            </h2>
            <p className="font-body leading-relaxed mb-8" style={{ fontSize: '1rem', color: '#6A6460' }}>
              Свържете се с нас за безплатна консултация и 3D проект.
              Без задължения — просто разговор за вашите идеи.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/контакти/"
                className="inline-flex items-center gap-2 font-body font-semibold text-white rounded-full transition-all hover:-translate-y-0.5"
                style={{ background: '#8B6F47', fontSize: '0.92rem', padding: '14px 32px', boxShadow: '0 8px 32px rgba(139,111,71,0.45)' }}
              >
                Поискай безплатна консултация →
              </Link>
              <a
                href="tel:+359876081199"
                className="inline-flex items-center gap-2 font-body font-semibold rounded-full transition-all hover:-translate-y-0.5"
                style={{ border: '1.5px solid rgba(139,111,71,0.3)', color: '#8B6F47', fontSize: '0.92rem', padding: '14px 32px', background: 'white' }}
              >
                📞 0876 081 199
              </a>
            </div>
            <p className="font-body mt-10" style={{ fontSize: '0.8rem', color: '#B0A8A0' }}>
              Разгледайте{' '}
              <Link href="/" style={{ color: '#8B6F47' }} className="hover:underline underline-offset-2">нашите услуги</Link>
              {' '}или{' '}
              <Link href="/проекти/" style={{ color: '#8B6F47' }} className="hover:underline underline-offset-2">завършените проекти</Link>.
            </p>
          </div>
        </section>

      </article>
    </>
  )
}
