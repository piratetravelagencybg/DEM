import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle, ChevronDown, Clock3, MapPin, Phone } from 'lucide-react'
import QuoteForm from '@/components/ui/QuoteForm'
import ServiceGuide from '@/components/ui/ServiceGuide'
import GoogleReviews from '@/components/home/GoogleReviews'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import FAQSchema from '@/components/seo/FAQSchema'
import ServiceSchema from '@/components/seo/ServiceSchema'
import projects from '@/data/projects.json'
import { completePageMetadata } from '@/lib/seo'

const PAGE_URL = 'https://domexpertmebel.com/софия/кухни-по-поръчка/'
const TITLE = 'Кухни по поръчка София – 3D проект и монтаж | Dom Expert'
const DESCRIPTION = 'Кухня по поръчка за София: оглед, 3D проект, изработка в собствен цех и монтаж. 3D проект от 100 € – приспада се при поръчка. 2 г. гаранция.'

export const metadata: Metadata = completePageMetadata({
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    siteName: 'Dom Expert Мебел',
    url: PAGE_URL,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/images/og/kitchens.webp', width: 1200, height: 630, alt: 'Примерна визуализация на кухня по поръчка за София' }],
  },
})

const sofiaKitchen = projects.find((project) => project.slug === 'kuhnya-s-ostrov-sofia')!

const faqItems = [
  {
    question: 'Колко струва 3D проект на кухня за София?',
    answer: '3D проектът на кухня е от 100 € и цената зависи от размера на кухнята. Сумата се приспада изцяло, ако поръчате изработката при нас.',
  },
  {
    question: 'Колко време отнема кухня по поръчка за София?',
    answer: 'Изработката е 4–6 седмици след одобрение на 3D проекта и материалите. Денят за доставка и монтаж в София уговаряме отделно за всеки проект.',
  },
  {
    question: 'Трябва ли оглед, за да започнем?',
    answer: 'Не веднага. Можем да започнем с дистанционен 3D проект по вашите снимки и размери. Преди производството правим оглед на адреса в София (50 €, приспадат се), за да потвърдим размерите и изводите.',
  },
  {
    question: 'Колко струва кухня по поръчка в София?',
    answer: 'Нямаме фиксирана цена „от“, защото тя зависи от размерите, материала на корпуса и фронтовете, плота, механизмите и вградените уреди. Конкретна оферта получавате след 3D проекта.',
  },
  {
    question: 'Кой монтира кухнята в София?',
    answer: 'Доставката и монтажът се извършват от нашия екип — същият, който проектира и изработва кухнята. Условията се уговарят за всеки проект и влизат в офертата.',
  },
  {
    question: 'Каква е гаранцията на кухнята?',
    answer: 'Изработените от нас кухни са с 2 години гаранция.',
  },
]

const steps = [
  { title: 'Снимки и размери', description: 'Изпращате снимки на кухнята, размерите и позициите на вода, ток и аспирация.' },
  { title: '3D проект', description: 'Подготвяме 3D проект на кухнята — от 100 €, приспада се при поръчка.' },
  { title: 'Оглед в София', description: 'Потвърждаваме размерите и изводите на място — 50 €, също се приспадат.' },
  { title: 'Изработка', description: 'Кухнята се изработва в нашия цех в Благоевград за 4–6 седмици.' },
  { title: 'Монтаж', description: 'Нашият екип доставя и монтира кухнята в уговорения ден.' },
]

const sections = [
  {
    title: 'Разпределение: права, ъглова, П-образна или с остров',
    paragraphs: [
      'Формата на кухнята следва помещението, а не обратното. В по-малките апартаменти в София най-често работи права или ъглова кухня, а в отворените дневни с кухненски бокс островът дава допълнителна работна площ и място за сядане.',
      'В 3D проекта подреждаме зоните за съхранение, подготовка, готвене и миене така, че движението между хладилника, мивката и котлона да е кратко, а вратите и чекмеджетата да се отварят свободно.',
    ],
    bullets: [
      'Позиции на уредите, мивката и аспирацията',
      'Височина на работния плот и горните шкафове',
      'Колони за фурна и хладилник, ъглови решения',
    ],
  },
  {
    title: 'Материали: корпуси, фронтове и плот',
    paragraphs: [
      'Корпусите обикновено се изработват от ПДЧ, а за фронтовете избираме между ПДЧ, МДФ с фолио, боядисан МДФ или гланц според визията, бюджета и поддръжката. Около мивката и съдомиялната държим на кантове и материали, подходящи за влага.',
      'Плотът е отделно решение — от ламиниран до камък и кварц — и влияе съществено на цената. Сравнение на материалите има в статията за МДФ и ПДЧ.',
    ],
    bullets: [
      'Корпус и фронтове според натоварването',
      'Плот според начина на готвене и бюджета',
      'Механизми за чекмеджета, панти и подемни врати',
    ],
  },
]

const guideLinks = [
  {
    href: '/блог/mdf-ili-pdch-za-kuhnya/',
    label: 'МДФ или ПДЧ за кухня',
    description: 'Кой материал къде работи по-добре.',
  },
  {
    href: '/блог/mehanizmi-za-kuhnya-kakvo-da-proverim/',
    label: 'Механизми за кухня',
    description: 'Какво да проверите при пантите и чекмеджетата.',
  },
  {
    href: '/блог/kakvo-vklyuchva-3d-proekt-na-kuhnya/',
    label: 'Какво включва 3D проектът',
    description: 'Какво ще видите преди изработка.',
  },
  {
    href: '/блог/kuhnya-s-ostrov-kolko-myasto-e-neobhodimo/',
    label: 'Кухня с остров',
    description: 'Колко място е необходимо за остров.',
  },
  {
    href: '/услуги/кухни-по-поръчка/',
    label: 'Кухни по поръчка',
    description: 'Видове кухни, процес и срокове.',
  },
  {
    href: '/софия/',
    label: 'Мебели по поръчка в София',
    description: 'Гардероби, спални и всички квартали на София.',
  },
]

const facts = [
  '3D проект на кухня от 100 € — приспада се при поръчка',
  'Оглед в София 50 € — приспада се при поръчка',
  'Изработка 4–6 седмици след одобрение',
  '2 години гаранция',
]

export default function SofiaKitchensPage() {
  return (
    <>
      <ServiceSchema
        name="Кухни по поръчка в София"
        url={PAGE_URL}
        city="София"
        serviceType="Кухни по поръчка"
        description="Проектиране с 3D проект, изработка в собствена работилница в Благоевград, доставка и монтаж на кухни по поръчка в София и Софийска област."
      />
      <FAQSchema items={faqItems} />
      <BreadcrumbSchema items={[
        { name: 'Начало', url: 'https://domexpertmebel.com/' },
        { name: 'Мебели София', url: 'https://domexpertmebel.com/софия/' },
        { name: 'Кухни по поръчка София', url: PAGE_URL },
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

        <div className="container-main relative">
          <nav className="flex flex-wrap items-center gap-2 font-body mb-8" style={{ fontSize: '0.78rem', color: '#9B9490' }}>
            <Link href="/" style={{ color: '#8B6F47' }} className="hover:underline underline-offset-2">Начало</Link>
            <span>/</span>
            <Link href="/софия/" style={{ color: '#8B6F47' }} className="hover:underline underline-offset-2">Мебели София</Link>
            <span>/</span>
            <span style={{ color: '#3C2A18', fontWeight: 500 }}>Кухни по поръчка</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <span className="eyebrow-pill">Кухни · София</span>
              <h1 className="font-display font-bold text-charcoal leading-[1.05]" style={{ fontSize: 'var(--text-h1)' }}>
                Кухни по поръчка в София – 3D проект, изработка и монтаж
              </h1>
              <p className="font-body text-warm-gray leading-relaxed" style={{ fontSize: '1.05rem' }}>
                Проектираме, изработваме и монтираме кухни по поръчка за София: първо 3D проект по вашите размери, после изработка в собствения ни цех в Благоевград и монтаж от нашия екип. 3D проектът на кухня е от 100 €, огледът е 50 € — и двете се приспадат при поръчка, а срокът е 4–6 седмици след одобрение.
              </p>

              <ul className="space-y-2">
                {facts.map((fact) => (
                  <li
                    key={fact}
                    className="flex items-center gap-3"
                    style={{
                      padding: '10px 14px', borderRadius: 12,
                      background: 'rgba(255,255,255,0.72)',
                      border: '1px solid rgba(139,111,71,0.13)',
                    }}
                  >
                    <CheckCircle size={15} style={{ color: '#8B6F47', flexShrink: 0 }} aria-hidden="true" />
                    <span className="font-body text-charcoal" style={{ fontSize: '0.88rem', fontWeight: 500 }}>{fact}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                <a href="tel:+359876081199" className="btn-primary inline-flex items-center gap-2">
                  <Phone size={16} /> 0876 081 199
                </a>
                <a href="#zapitvane" className="btn-outline inline-flex items-center gap-2">
                  Изпратете размерите на кухнята
                </a>
              </div>
            </div>

            <div id="zapitvane" style={{ scrollMarginTop: '6rem' }}>
              <div
                className="bg-white rounded-2xl p-8"
                style={{ border: '1px solid #EDE5DA', boxShadow: '0 4px 32px rgba(0,0,0,0.06)' }}
              >
                <h2 className="font-display font-semibold text-charcoal text-xl mb-2">Запитване за кухня</h2>
                <p className="font-body text-warm-gray text-sm mb-6">
                  Прикачете снимки и размери на кухнята — ще ви предложим 3D проект или оглед в София.
                </p>
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceGuide
        eyebrow="Кухни по поръчка"
        title="Как изглежда кухня по поръчка за София"
        intro="Добрата кухня започва от точните размери и честния разговор за това как готвите. Ето кои решения взимаме заедно в 3D проекта."
        sections={sections}
        steps={steps}
        links={guideLinks}
      />

      {/* ── Case study ── */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container-main">
          <div
            className="grid md:grid-cols-2 items-stretch overflow-hidden rounded-2xl bg-white"
            style={{ border: '1px solid #E7DDCF' }}
          >
            <div className="relative min-h-[260px] md:min-h-[360px]">
              <Image
                src={sofiaKitchen.images[0]}
                alt="Кухня с остров в София — примерна визуализация към реализиран проект"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <p className="absolute inset-x-4 bottom-4 rounded-xl bg-charcoal/85 px-4 py-2 font-body text-xs leading-relaxed text-white backdrop-blur-sm">
                {sofiaKitchen.imageCaption}
              </p>
            </div>
            <div className="flex flex-col justify-center p-6 md:p-10">
              <span className="eyebrow-pill self-start">Казус от София</span>
              <h2 className="font-display font-bold text-charcoal mt-2" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.3rem)' }}>
                Кухня с остров в София
              </h2>
              <p className="font-body text-warm-gray leading-relaxed mt-4">
                {sofiaKitchen.description}
              </p>
              <p className="font-body text-warm-gray leading-relaxed mt-3">
                При кухня с остров най-важното е разстоянието между острова и шкафовете, за да се отварят свободно вратите на уредите и да има място за двама души. Затова островът се планира още в 3D проекта, заедно с изводите за ток и осветлението над него.
              </p>
              <div className="flex flex-wrap gap-4 mt-5 font-body text-sm text-warm-gray">
                <span className="inline-flex items-center gap-2">
                  <MapPin size={15} className="text-walnut" aria-hidden="true" />
                  {sofiaKitchen.city}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock3 size={15} className="text-walnut" aria-hidden="true" />
                  {sofiaKitchen.duration}
                </span>
              </div>
              <Link href={`/проекти/${sofiaKitchen.slug}/`} className="btn-outline inline-flex self-start items-center gap-2 mt-7">
                Вижте проекта
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-warm-white)' }}>
        <div className="container-main max-w-3xl">
          <span className="eyebrow-pill">Цена</span>
          <h2 className="section-title text-left">Колко струва кухня по поръчка в София</h2>
          <div className="space-y-4 font-body text-warm-gray leading-relaxed mt-4" style={{ fontSize: '1rem' }}>
            <p>
              Не даваме обща цена „от“, защото две кухни с еднаква дължина могат да се различават многократно. Цената на кухнята зависи от:
            </p>
            <ul className="space-y-2">
              {[
                'размерите и броя на модулите — долни, горни шкафове и колони;',
                'материала на корпуса и фронтовете;',
                'вида на работния плот;',
                'механизмите — панти, чекмеджета, подемни врати, ъглови решения;',
                'вградените уреди, осветлението и сложността на монтажа.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-charcoal" style={{ fontSize: '0.93rem' }}>
                  <CheckCircle size={15} className="text-walnut flex-shrink-0 mt-1" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>
              Затова първата стъпка е 3D проектът: в него виждате кухнята и получавате оферта за конкретните решения, а сумата за проекта се приспада при поръчка. Цените ни са конкурентни, но не се състезаваме с най-ниската цена — държим на точна изработка и материали, подходящи за ежедневното натоварване в кухнята. Повече за факторите вижте в статията{' '}
              <Link href="/блог/ot-kakvo-zavisi-tsenata-na-kuhnya-po-poruchka/" className="text-walnut font-medium underline underline-offset-2 hover:no-underline">
                от какво зависи цената на кухня по поръчка
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <GoogleReviews />

      {/* ── FAQ ── */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container-main max-w-3xl">
          <div className="text-center mb-10">
            <span className="eyebrow-pill">Въпроси и отговори</span>
            <h2 className="font-display font-bold heading-gradient" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}>
              Въпроси за кухни по поръчка в София
            </h2>
          </div>
          <div className="space-y-3">
            {faqItems.map((item) => (
              <details
                key={item.question}
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

      {/* ── Final CTA ── */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-warm-white)' }}>
        <div
          className="container-main max-w-3xl text-center rounded-2xl bg-white"
          style={{ border: '1px solid #EDE5DA', padding: 'clamp(1.75rem, 5vw, 3rem)', boxShadow: '0 4px 32px rgba(0,0,0,0.06)' }}
        >
          <h2 className="font-display font-bold heading-gradient" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}>
            Вижте кухнята си в 3D, преди да я поръчате
          </h2>
          <p className="font-body text-warm-gray leading-relaxed mt-4 mx-auto" style={{ maxWidth: '36rem', fontSize: '1rem' }}>
            Изпратете размерите и снимки на помещението. 3D проектът е от 100 € и се приспада при поръчка.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-7">
            <a href="tel:+359876081199" className="btn-primary inline-flex items-center gap-2">
              <Phone size={16} /> 0876 081 199
            </a>
            <a href="#zapitvane" className="btn-outline inline-flex items-center gap-2">
              Изпратете запитване
            </a>
          </div>
          <p className="font-body text-warm-gray mt-6" style={{ fontSize: '0.85rem' }}>
            Търсите гардероб или спалня? Вижте{' '}
            <Link href="/софия/" className="text-walnut font-medium underline underline-offset-2 hover:no-underline">
              мебели по поръчка в София
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  )
}
