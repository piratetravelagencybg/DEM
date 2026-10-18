import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle, ChevronDown, Phone } from 'lucide-react'
import QuoteForm from '@/components/ui/QuoteForm'
import ServiceGuide from '@/components/ui/ServiceGuide'
import GoogleReviews from '@/components/home/GoogleReviews'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import FAQSchema from '@/components/seo/FAQSchema'
import ServiceSchema from '@/components/seo/ServiceSchema'
import { projectHref, projectImageAlt, projects } from '@/lib/projects'
import { completePageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'

const PATH = '/услуги/обзавеждане-на-обекти/салони-за-красота/'
const PAGE_URL = 'https://domexpertmebel.com' + PATH
const TITLE = 'Мебели и рецепции за салон за красота | Dom Expert'
const DESCRIPTION = 'Рецепция за салон, фризьорски станции, маникюрни бюра и шкафове по поръчка с 3D проект преди изработка. Мебели за салон за красота и козметичен салон.'

const salon = projects.find((project) => project.slug === '3d-proekt-salon-za-krasota')!

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
    images: [{ url: salon.images[0], width: 1920, height: 1280, alt: '3D визуализация на салон за красота — общ изглед' }],
  },
})

const views = [
  'общ изглед от входа',
  'фризьорски кът с овални огледала',
  'маникюрно бюро',
  'ниша за лакове с LED',
  'педикюр и мивка за измиване',
  'изглед към входа',
  'зона за чакане',
  'портал с дъбови летви',
  'кът за педикюр',
  'рафтове за лакове',
]

const faq = [
  {
    question: 'Изработвате ли рецепции за салони?',
    answer: 'Да. Рецепцията проектираме по размерите на входната зона и по начина, по който посрещате клиентите — с плот за клиента, работно място за администратора, място за терминал и кабели и витрина за продукти, ако продавате козметика.',
  },
  {
    question: 'Колко струва 3D проект на салон?',
    answer: '3D проектът на мебели е от 50 €, а цената зависи от размера на обекта и броя на зоните. Сумата се приспада изцяло, ако поръчате изработката при нас.',
  },
  {
    question: 'Колко време отнема обзавеждането на салон?',
    answer: 'Изработката е 4–6 седмици след одобрение на 3D проекта. Денят за доставка и монтаж уговаряме предварително, за да планирате отварянето.',
  },
  {
    question: 'Може ли да вградите оборудване, което вече сме избрали?',
    answer: 'Да. Стола за педикюр, мивката за измиване или маникюрната прахосмукачка взимаме предвид още в 3D проекта и проектираме шкафовете и рафтовете около тях.',
  },
  {
    question: 'Правите ли мебели за козметичен или маникюрен кабинет?',
    answer: 'Да — маникюрни бюра с вградено осветление, шкафове за консумативи, ниши за лакове и рафтове за продукти, в размерите на вашето помещение.',
  },
  {
    question: 'Работите ли извън Благоевград?',
    answer: `Да. Обслужваме ${SITE_CONFIG.cities.primary.join(', ')}, а 3D проект по снимки и размери можем да изготвим дистанционно за цялата страна.`,
  },
]

const zones = [
  {
    title: 'Фризьорски станции',
    text: 'Огледала с LED осветление, плот или конзола за инструментите и скрин за консумативи. Разстоянието между местата планираме така, че столовете да се въртят свободно.',
  },
  {
    title: 'Маникюрни бюра',
    text: 'Бюра с подходяща дълбочина за клиента и маникюристката, вградено осветление, място за лампа и прахосмукачка и чекмеджета за инструментите.',
  },
  {
    title: 'Ниши и рафтове за лакове',
    text: 'Осветени ниши и плитки рафтове, на които цветовете се виждат от пръв поглед — и които стават част от визията на салона.',
  },
  {
    title: 'Педикюр и измиване на коса',
    text: 'Шкафове и рафтове около стола за педикюр и мивката за измиване, с място за кърпи и продукти, без да пречат на движението.',
  },
  {
    title: 'Шкафове и витрини за продукти',
    text: 'Шкафове до тавана с отваряне с натиск, витрини за продуктите, които продавате, и затворено съхранение за всичко, което клиентите не трябва да виждат.',
  },
  {
    title: 'Зона за чакане',
    text: 'Стенни облицовки, летви и рафтове, които оформят зоната за чакане и продължават стила на салона от входа навътре.',
  },
]

export default function BeautySalonsPage() {
  return (
    <>
      <ServiceSchema
        name="Мебели за салони за красота"
        url={PAGE_URL}
        city={[...SITE_CONFIG.cities.primary]}
        serviceType="Мебели за салони за красота по поръчка"
        description="Проектиране с 3D проект, изработка и монтаж на мебели за салони за красота, фризьорски и козметични салони: рецепции, фризьорски станции, маникюрни бюра, ниши и шкафове."
      />
      <FAQSchema items={faq} />
      <BreadcrumbSchema items={[
        { name: 'Начало', url: 'https://domexpertmebel.com/' },
        { name: 'Услуги', url: 'https://domexpertmebel.com/услуги/' },
        { name: 'Мебели за салони за красота', url: PAGE_URL },
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
          width: '420px', height: '420px', borderRadius: '50%',
          background: 'rgba(139,111,71,0.10)', filter: 'blur(65px)', pointerEvents: 'none',
        }} />
        <div className="container-main relative">
          <nav className="flex flex-wrap items-center gap-2 font-body mb-8" style={{ fontSize: '0.78rem', color: '#9B9490' }}>
            <Link href="/" style={{ color: '#8B6F47' }} className="hover:underline underline-offset-2">Начало</Link>
            <span>/</span>
            <Link href="/услуги/" style={{ color: '#8B6F47' }} className="hover:underline underline-offset-2">Услуги</Link>
            <span>/</span>
            <span style={{ color: '#3C2A18', fontWeight: 500 }}>Салони за красота</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <span className="eyebrow-pill">Обзавеждане на обекти</span>
              <h1 className="font-display font-bold text-charcoal leading-[1.05]" style={{ fontSize: 'var(--text-h1)' }}>
                Мебели за салони за красота и козметични кабинети
              </h1>
              <p className="font-body text-warm-gray leading-relaxed" style={{ fontSize: '1.05rem' }}>
                Dom Expert Мебел проектира и изработва мебели за салони за красота, фризьорски и козметични салони — рецепции, фризьорски станции, маникюрни бюра, ниши и шкафове — в собствената си работилница в Благоевград. Всеки обект започва с 3D проект (от 50 €, според размера на обекта) и оглед 50 €, които се приспадат при поръчка, а изработката отнема 4–6 седмици след одобрение.
              </p>

              <ul className="space-y-2">
                {[
                  'Рецепции, фризьорски станции и маникюрни бюра по размер',
                  '3D проект на целия салон преди изработка',
                  'Мебели около оборудването, което сте избрали',
                  '2 години гаранция',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3"
                    style={{
                      padding: '10px 14px', borderRadius: 12,
                      background: 'rgba(255,255,255,0.72)',
                      border: '1px solid rgba(139,111,71,0.13)',
                    }}
                  >
                    <CheckCircle size={15} style={{ color: '#8B6F47', flexShrink: 0 }} aria-hidden="true" />
                    <span className="font-body text-charcoal" style={{ fontSize: '0.88rem', fontWeight: 500 }}>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                <a href="tel:+359876081199" className="btn-primary inline-flex items-center gap-2">
                  <Phone size={16} /> 0876 081 199
                </a>
                <a href="#zapitvane" className="btn-outline inline-flex items-center gap-2">
                  Изпратете плана на салона
                </a>
              </div>
            </div>

            <div id="zapitvane" style={{ scrollMarginTop: '6rem' }}>
              <div
                className="bg-white rounded-2xl p-8"
                style={{ border: '1px solid #EDE5DA', boxShadow: '0 4px 32px rgba(0,0,0,0.06)' }}
              >
                <h2 className="font-display font-semibold text-charcoal text-xl mb-2">Запитване за салон</h2>
                <p className="font-body text-warm-gray text-sm mb-6">
                  Прикачете план или снимки на помещението и опишете зоните — ще ви предложим 3D проект.
                </p>
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3D project gallery ── */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-warm-white)' }}>
        <div className="container-main">
          <div className="max-w-3xl mb-10">
            <span className="eyebrow-pill">3D проект</span>
            <h2 className="section-title text-left">3D проект на салон за красота</h2>
            <p className="font-body text-warm-gray leading-relaxed mt-4" style={{ fontSize: '1rem' }}>
              {salon.description} Изображенията са 3D визуализации — салонът предстои да бъде изработен.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {salon.images.map((src, index) => (
              <figure key={src} className="overflow-hidden rounded-2xl bg-white" style={{ border: '1px solid #EDE5DA' }}>
                <div className="relative aspect-[4/3]">
                  <Image
                    src={src}
                    alt={projectImageAlt(salon, views[index])}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-charcoal/80 px-3 py-1 font-body text-[0.65rem] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                    3D визуализация
                  </span>
                </div>
                <figcaption className="p-3 font-body text-sm text-warm-gray">
                  {views[index][0].toLocaleUpperCase('bg-BG') + views[index].slice(1)}
                </figcaption>
              </figure>
            ))}
          </div>
          <Link href={projectHref(salon)} className="btn-outline inline-flex items-center gap-2 mt-8">
            Вижте 3D проекта подробно <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ── Zones ── */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container-main">
          <div className="max-w-3xl mb-10">
            <span className="eyebrow-pill">Какво изработваме</span>
            <h2 className="section-title text-left">Мебели за всяка зона в салона</h2>
            <p className="font-body text-warm-gray leading-relaxed mt-4" style={{ fontSize: '1rem' }}>
              Мебелите за салон за красота работят по-усилено от домашните — отварят се десетки пъти на ден, по тях попадат вода, лакове и препарати. Затова проектираме всяка зона според процедурите, които се правят в нея.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {zones.map((zone) => (
              <article
                key={zone.title}
                className="rounded-2xl bg-white"
                style={{ border: '1px solid #EDE5DA', padding: 'clamp(1.25rem, 3vw, 1.75rem)' }}
              >
                <h3 className="font-display font-semibold text-charcoal mb-3" style={{ fontSize: '1.2rem' }}>{zone.title}</h3>
                <p className="font-body text-warm-gray leading-relaxed" style={{ fontSize: '0.93rem' }}>{zone.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reception ── */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-warm-white)' }}>
        <div className="container-main max-w-3xl">
          <span className="eyebrow-pill">Рецепции</span>
          <h2 className="section-title text-left">Рецепция за салон по поръчка</h2>
          <div className="space-y-4 font-body text-warm-gray leading-relaxed mt-4" style={{ fontSize: '1rem' }}>
            <p>
              Рецепцията е първото, което клиентът вижда, и мястото, където се записват часовете, плаща се и се продава козметика. Затова я проектираме едновременно като визитна картичка на салона и като удобно работно място.
            </p>
            <ul className="space-y-2">
              {[
                'Два нива на плота — по-висок към клиента и работно бюро за администратора',
                'Място за компютър, касов апарат и терминал, със скрити кабели',
                'Витрина или рафтове за продуктите, които продавате',
                'Осветление, което подчертава логото или фронта на рецепцията',
                'Покритие, устойчиво на надраскване и лесно за почистване',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-charcoal" style={{ fontSize: '0.93rem' }}>
                  <CheckCircle size={15} className="text-walnut flex-shrink-0 mt-1" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>
              В 3D проекта виждате рецепцията заедно с целия салон — в същите материали и цветове като фризьорските станции и рафтовете, — преди да е изрязан първият детайл. Ако имате и офис, вижте и{' '}
              <Link href="/услуги/офис-мебели/" className="text-walnut font-medium underline underline-offset-2 hover:no-underline">
                рецепции и офис мебели по поръчка
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <ServiceGuide
        eyebrow="Процес"
        title="От плана на помещението до отварянето на салона"
        intro="Обзавеждането на салон е проект с няколко зони и оборудване от различни доставчици. Затова започваме от плана и от процедурите, които ще правите, а не от каталог."
        sections={[
          {
            title: '3D проект на целия салон',
            paragraphs: [
              'По план, снимки и размери подготвяме 3D проект на всички зони — от рецепцията до задното помещение. В него се виждат материалите, осветлението и разстоянията между работните места.',
              'Корекциите правим в 3D, докато разпределението и визията ви харесат. Сумата за проекта се приспада при поръчка.',
            ],
          },
          {
            title: 'Оглед, изработка и монтаж',
            paragraphs: [
              'Преди производството идваме на оглед (50 €, приспадат се), за да проверим стените, изводите за вода и ток и местата на оборудването. Мебелите се изработват в нашата работилница в Благоевград за 4–6 седмици след одобрението.',
              'Денят за монтаж уговаряме предварително, за да планирате отварянето. Мебелите са с 2 години гаранция.',
            ],
          },
        ]}
        steps={[
          { title: 'План и снимки', description: 'Изпращате план или снимки на помещението и списък на зоните.' },
          { title: '3D проект', description: 'Проектираме целия салон и го коригираме с вас.' },
          { title: 'Оглед', description: 'Проверяваме размерите и изводите на място.' },
          { title: 'Изработка', description: '4–6 седмици в работилницата в Благоевград.' },
          { title: 'Монтаж', description: 'Монтираме в уговорения ден.' },
        ]}
        links={[
          { href: projectHref(salon), label: '3D проект на салон', description: 'Всички изгледи и описание на проекта.' },
          { href: '/услуги/3d-визуализация/', label: '3D визуализация', description: 'Как работи 3D проектът преди изработка.' },
          { href: '/услуги/интериорен-дизайн/', label: 'Интериорен дизайн', description: 'Цялостен дизайн на обекта, не само на мебелите.' },
          { href: '/услуги/офис-мебели/', label: 'Офис мебели', description: 'Рецепции, бюра и шкафове за офиси.' },
          { href: '/благоевград/', label: 'Мебели по поръчка в Благоевград', description: 'Работилницата ни и проекти в града.' },
          { href: '/контакти/', label: 'Контакти', description: 'Телефон, имейл и форма за запитване.' },
        ]}
      />

      <GoogleReviews />

      {/* ── FAQ ── */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container-main max-w-3xl">
          <div className="text-center mb-10">
            <span className="eyebrow-pill">Въпроси и отговори</span>
            <h2 className="font-display font-bold heading-gradient" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}>
              Въпроси за мебели за салони
            </h2>
          </div>
          <div className="space-y-3">
            {faq.map((item) => (
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
            Вижте салона си в 3D, преди да го обзаведете
          </h2>
          <p className="font-body text-warm-gray leading-relaxed mt-4 mx-auto" style={{ maxWidth: '36rem', fontSize: '1rem' }}>
            Изпратете план или снимки на помещението и кои зони ви трябват. Ще предложим 3D проект на целия салон.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-7">
            <a href="tel:+359876081199" className="btn-primary inline-flex items-center gap-2">
              <Phone size={16} /> 0876 081 199
            </a>
            <a href="#zapitvane" className="btn-outline inline-flex items-center gap-2">
              Изпратете запитване
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {[
              { label: 'Благоевград', href: '/благоевград/' },
              { label: 'София', href: '/софия/' },
              { label: 'Дупница', href: '/дупница/' },
              { label: 'Сандански', href: '/сандански/' },
              { label: 'Петрич', href: '/петрич/' },
            ].map((city) => (
              <Link
                key={city.href}
                href={city.href}
                className="font-body font-medium"
                style={{ padding: '8px 16px', borderRadius: 100, fontSize: '0.85rem', border: '1px solid rgba(139,111,71,0.25)', color: '#8B6F47', background: 'rgba(139,111,71,0.05)' }}
              >
                Мебели по поръчка {city.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
