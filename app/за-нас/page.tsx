import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, Shield, Users, MapPin, Award } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import AnimatedStats from '@/components/about/AnimatedStats'

export const metadata: Metadata = {
  title: { absolute: 'За нас | Мебели по поръчка Благоевград — Dom Expert Мебел' },
  description:
    'Семейна работилница с 10+ години опит в мебели по поръчка в Благоевград. 500+ реализирани кухни, гардероби и спални. Безплатна консултация. Тел: 0876 081 199',
  alternates: { canonical: 'https://domexpertmebel.com/за-нас/' },
  openGraph: {
    title: 'За Нас – Мебели по Поръчка Благоевград | Dom Expert Мебел',
    description: 'Семейна работилница с 10+ години опит – Благоевград. 500+ реализирани проекта.',
    url: 'https://domexpertmebel.com/за-нас/',
    type: 'website',
    locale: 'bg_BG',
    siteName: 'Dom Expert Мебел',
    images: [{ url: '/images/real/kuhnya-05.png', width: 1200, height: 630, alt: 'Dom Expert Мебел — мебели по поръчка Благоевград' }],
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
  { Icon: Shield, title: 'Качество без компромис', desc: 'Материали Egger, Blum и Hafele. 2-годишна гаранция на всички изделия.' },
  { Icon: Users,  title: 'Индивидуален подход',    desc: 'Всеки проект е уникален — съобразен с пространството и бюджета.' },
  { Icon: MapPin, title: 'Местен и достъпен',      desc: 'Семейна фирма от Благоевград. Собственикът участва лично.' },
  { Icon: Award,  title: 'Гарантиран резултат',    desc: '500+ реализирани проекта. Гаранция и следпродажбено обслужване.' },
]

const process = [
  { num: '01', title: 'Безплатна консултация', desc: 'Разговаряме за вашите нужди, пространство и вкус. Без задължения.' },
  { num: '02', title: '3D дизайн проект',      desc: 'Виждате резултата преди да е наредена и една дъска.' },
  { num: '03', title: 'Производство',          desc: 'Изработваме мебелите с прецизно CNC рязане и ръчна обработка.' },
  { num: '04', title: 'Монтаж и предаване',    desc: 'Монтираме прецизно, почистваме и предаваме готовия проект.' },
]

const facts = [
  'Материали Egger, Blum, Hafele — водещи европейски марки',
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

        {/* ══ 1. HERO ══ */}
        <section
          aria-label="Представяне"
          style={{ position: 'relative', minHeight: '88vh', display: 'flex', flexDirection: 'column' }}
        >
          <Image
            src="/images/real/kuhnya-04.png"
            alt="Кухня по поръчка — Dom Expert Мебел Благоевград"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(8,5,2,0.32) 0%, rgba(8,5,2,0.18) 35%, rgba(8,5,2,0.75) 75%, rgba(8,5,2,0.92) 100%)',
          }} />

          <div style={{
            position: 'relative', zIndex: 10, flex: 1,
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            padding: '5.5rem max(1.25rem, calc((100vw - 1120px) / 2)) 4rem',
          }}>
            <nav aria-label="Навигационна следа">
              <ol className="flex items-center gap-2 font-body" style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)' }}>
                <li><Link href="/" style={{ color: 'rgba(255,255,255,0.65)' }} className="hover:underline underline-offset-2">Начало</Link></li>
                <li>/</li>
                <li aria-current="page">За нас</li>
              </ol>
            </nav>
            <div>
              <span className="font-body font-semibold" style={{
                display: 'inline-block', fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase',
                color: '#C4A882', background: 'rgba(196,168,130,0.12)', border: '1px solid rgba(196,168,130,0.25)',
                borderRadius: 100, padding: '5px 14px', marginBottom: 20,
              }}>
                За нас
              </span>
              <h1
                className="font-display font-bold text-white"
                style={{ fontSize: 'clamp(2.5rem, 7.5vw, 5.5rem)', lineHeight: 1.03, maxWidth: '15ch', marginBottom: '1.1rem' }}
              >
                Мебели с душа и точност
              </h1>
              <p className="font-body" style={{
                fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: 'rgba(255,255,255,0.65)',
                maxWidth: '44ch', lineHeight: 1.6, marginBottom: '2rem',
              }}>
                Семейна работилница от Благоевград — над 10 години опит, 500+ реализирани кухни, гардероби и спални.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/контакти/"
                  className="inline-flex items-center gap-2 font-body font-semibold text-white rounded-full transition-all hover:-translate-y-0.5"
                  style={{ background: '#8B6F47', fontSize: '0.9rem', padding: '12px 26px', boxShadow: '0 6px 28px rgba(139,111,71,0.55)' }}
                >
                  Безплатна консултация →
                </Link>
                <Link href="/проекти/"
                  className="inline-flex items-center font-body font-semibold rounded-full transition-all hover:-translate-y-0.5"
                  style={{ border: '1px solid rgba(255,255,255,0.26)', color: 'rgba(255,255,255,0.88)', fontSize: '0.9rem', padding: '12px 26px', background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(8px)' }}
                >
                  Нашите проекти
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 2. ANIMATED STATS ══ */}
        <AnimatedStats />

        {/* ══ 3. STORY + IMAGE ══ */}
        <section
          style={{ backgroundColor: 'var(--color-cream)', padding: '56px 0' }}
          aria-labelledby="story-heading"
        >
          <div className="container-main">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

              {/* Text */}
              <div>
                <span className="eyebrow-pill">Нашата история</span>
                <h2
                  id="story-heading"
                  className="font-display font-bold heading-gradient leading-[1.1] mt-2 mb-6"
                  style={{ fontSize: 'clamp(1.7rem, 3.8vw, 2.4rem)' }}
                >
                  Семеен бизнес с над 10 години традиция
                </h2>
                <div className="space-y-4">
                  <p className="font-body leading-relaxed" style={{ fontSize: '1.02rem', color: '#3C3830', lineHeight: 1.75 }}>
                    Всичко започна с просто желание — да правим мебели, каквито сами бихме искали у дома.
                    Преди над 10 години основахме Dom Expert Мебел като малка семейна работилница с ясна цел:{' '}
                    <strong style={{ color: '#1C1208', fontWeight: 700 }}>качество, честност и внимание към всеки детайл.</strong>
                  </p>
                  <p className="font-body leading-relaxed" style={{ fontSize: '1.02rem', color: '#3C3830', lineHeight: 1.75 }}>
                    С годините израснахме — разширихме екипа и оборудвахме работилницата с модерни машини.
                    Собственикът участва лично в повечето проекти и е постоянна контактна точка.
                  </p>
                  <p className="font-body leading-relaxed" style={{ fontSize: '1.02rem', color: '#3C3830', lineHeight: 1.75 }}>
                    Специализирани сме основно в{' '}
                    <strong style={{ color: '#1C1208', fontWeight: 700 }}>кухни по поръчка</strong>, но правим
                    и гардероби, спални и офис мебели. Всеки проект минава през 3D визуализация.
                  </p>
                </div>
                <ul className="space-y-2.5 mt-6">
                  {facts.map((fact) => (
                    <li key={fact} className="flex items-start gap-3 font-body" style={{ fontSize: '0.95rem', color: '#3C3830' }}>
                      <CheckCircle2 size={15} style={{ color: '#8B6F47', flexShrink: 0, marginTop: 3 }} />
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Photo */}
              <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '4/5' }}>
                <Image
                  src="/images/real/spalna-01.png"
                  alt="Спалня по поръчка — Dom Expert Мебел Благоевград"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(12,8,4,0.7) 0%, transparent 55%)',
                }} />
                <div style={{ position: 'absolute', bottom: 22, left: 22, right: 22 }}>
                  <p className="font-body font-semibold text-white" style={{ fontSize: '0.85rem' }}>
                    ул. Стамболийски 52, Благоевград
                  </p>
                  <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>
                    Пон–Пет 09:00–18:00 · 0876 081 199
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ══ 4. FULL-WIDTH IMAGE ══ */}
        <section style={{ backgroundColor: 'var(--color-cream)', paddingBottom: 56 }}>
          <div className="container-main">
            <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: '21/9' }}>
              <Image
                src="/images/real/kuhnya-06.png"
                alt="Кухня по поръчка — реализация Dom Expert Мебел Благоевград"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <p className="font-body text-center" style={{ fontSize: '0.75rem', color: '#A09890', marginTop: 12, fontStyle: 'italic' }}>
              Кухня по поръчка — реализация на Dom Expert Мебел, Благоевград
            </p>
          </div>
        </section>

        {/* ══ 5. VALUES ══ */}
        <section
          style={{ backgroundColor: 'var(--color-warm-white)', padding: '56px 0' }}
          aria-labelledby="why-heading"
        >
          <div className="container-main">
            <div className="text-center mb-8">
              <span className="eyebrow-pill">Защо да ни изберете</span>
              <h2
                id="why-heading"
                className="font-display font-bold heading-gradient leading-[1.1] mt-2"
                style={{ fontSize: 'clamp(1.7rem, 3.8vw, 2.4rem)' }}
              >
                Производство с грижа за детайла
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {whyUs.map(({ Icon, title, desc }, i) => (
                <div
                  key={title}
                  style={{
                    background: i === 0 ? 'linear-gradient(145deg, #2C2318, #1A1208)' : 'white',
                    borderRadius: 18,
                    padding: '24px 20px',
                    border: i === 0 ? '1px solid rgba(196,168,130,0.15)' : '1px solid #EDE5DA',
                    boxShadow: i === 0 ? '0 8px 32px rgba(0,0,0,0.15)' : '0 2px 10px rgba(0,0,0,0.04)',
                  }}
                >
                  <div style={{
                    width: 42, height: 42, borderRadius: 12,
                    background: i === 0 ? 'rgba(196,168,130,0.14)' : 'rgba(139,111,71,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14,
                  }}>
                    <Icon size={18} style={{ color: i === 0 ? '#C4A882' : '#8B6F47' }} />
                  </div>
                  <h3 className="font-display font-semibold mb-2"
                    style={{ fontSize: '1rem', lineHeight: 1.25, color: i === 0 ? 'white' : '#2C2520' }}>
                    {title}
                  </h3>
                  <p className="font-body leading-relaxed"
                    style={{ fontSize: '0.84rem', color: i === 0 ? 'rgba(255,255,255,0.6)' : '#6A6460' }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 6. PROCESS + PHOTO ══ */}
        <section
          style={{ backgroundColor: '#2A1E14', padding: '56px 0' }}
          aria-labelledby="process-heading"
        >
          <div className="container-main">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

              {/* Left */}
              <div>
                <span className="font-body font-semibold" style={{
                  display: 'inline-block', fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: '#C4A882', background: 'rgba(196,168,130,0.1)', border: '1px solid rgba(196,168,130,0.2)',
                  borderRadius: 100, padding: '5px 14px', marginBottom: 20,
                }}>
                  Как работим
                </span>
                <h2
                  id="process-heading"
                  className="font-display font-bold"
                  style={{
                    fontSize: 'clamp(1.7rem, 3.8vw, 2.4rem)',
                    background: 'linear-gradient(135deg, #fff 0%, #E8D5BA 60%, #C4A882 100%)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text', lineHeight: 1.1, marginBottom: '1.5rem',
                  }}
                >
                  От идея до монтаж
                </h2>

                {process.map((step, i) => (
                  <div
                    key={step.num}
                    className="flex items-start gap-5"
                    style={{
                      paddingBottom: i < 3 ? 20 : 0,
                      marginBottom: i < 3 ? 20 : 0,
                      borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.12)' : 'none',
                    }}
                  >
                    <div className="font-display font-bold flex-shrink-0"
                      style={{ fontSize: '1.6rem', color: '#C4A882', lineHeight: 1, width: 42, paddingTop: 3, opacity: 0.6 }}>
                      {step.num}
                    </div>
                    <div>
                      <h3 className="font-display font-semibold"
                        style={{ fontSize: '1.05rem', color: 'white', lineHeight: 1.2, marginBottom: 5 }}>
                        {step.title}
                      </h3>
                      <p className="font-body leading-relaxed"
                        style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.68)', lineHeight: 1.6 }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right: photo */}
              <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '4/5' }}>
                <Image
                  src="/images/real/kuhnya-03.png"
                  alt="Процес на изработка на кухня по поръчка — Dom Expert Мебел"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>

            </div>
          </div>
        </section>

        {/* ══ 7. DIPTYCH ══ */}
        <section style={{ backgroundColor: 'var(--color-cream)', padding: '56px 0' }}>
          <div className="container-main">
            <div className="text-center mb-8">
              <span className="eyebrow-pill">Реализации</span>
              <h2
                className="font-display font-bold heading-gradient leading-[1.1] mt-2"
                style={{ fontSize: 'clamp(1.7rem, 3.8vw, 2.4rem)' }}
              >
                Нашата работа говори сама
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: '3/4' }}>
                <Image src="/images/real/garderob-02.png" alt="Гардероб по поръчка — Dom Expert Мебел"
                  fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
              </div>
              <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: '3/4' }}>
                <Image src="/images/real/dnevna-02.png" alt="Дневна по поръчка — Dom Expert Мебел"
                  fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
              </div>
            </div>
            <div className="text-center mt-7">
              <Link href="/проекти/"
                className="inline-flex items-center gap-2 font-body font-semibold text-white rounded-full transition-all hover:-translate-y-0.5"
                style={{ background: '#8B6F47', fontSize: '0.88rem', padding: '12px 28px', boxShadow: '0 6px 24px rgba(139,111,71,0.4)' }}
              >
                Виж всички проекти →
              </Link>
            </div>
          </div>
        </section>

        {/* ══ 8. CTA ══ */}
        <section
          style={{ backgroundColor: 'var(--color-warm-white)', padding: '56px 0' }}
          aria-label="Покана за действие"
        >
          <div className="container-main" style={{ maxWidth: 640, textAlign: 'center' }}>
            <span className="eyebrow-pill">Следваща стъпка</span>
            <h2
              className="font-display font-bold heading-gradient leading-[1.1] mt-2 mb-4"
              style={{ fontSize: 'clamp(1.7rem, 4.5vw, 2.8rem)' }}
            >
              Готови да направим вашата мечтана кухня?
            </h2>
            <p className="font-body leading-relaxed mb-7" style={{ fontSize: '1rem', color: '#6A6460' }}>
              Свържете се с нас за безплатна консултация и 3D проект. Без задължения.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/контакти/"
                className="inline-flex items-center gap-2 font-body font-semibold text-white rounded-full transition-all hover:-translate-y-0.5"
                style={{ background: '#8B6F47', fontSize: '0.9rem', padding: '13px 30px', boxShadow: '0 6px 24px rgba(139,111,71,0.45)' }}
              >
                Поискай безплатна консултация →
              </Link>
              <a href="tel:+359876081199"
                className="inline-flex items-center gap-2 font-body font-semibold rounded-full transition-all hover:-translate-y-0.5"
                style={{ border: '1.5px solid rgba(139,111,71,0.3)', color: '#8B6F47', fontSize: '0.9rem', padding: '13px 30px', background: 'white' }}
              >
                📞 0876 081 199
              </a>
            </div>
            <p className="font-body mt-8" style={{ fontSize: '0.78rem', color: '#B0A8A0' }}>
              <Link href="/" style={{ color: '#8B6F47' }} className="hover:underline underline-offset-2">Нашите услуги</Link>
              {' · '}
              <Link href="/проекти/" style={{ color: '#8B6F47' }} className="hover:underline underline-offset-2">Завършени проекти</Link>
            </p>
          </div>
        </section>

      </article>
    </>
  )
}
