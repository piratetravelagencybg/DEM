import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle, ChevronDown, Clock3, MapPin, Phone } from 'lucide-react'
import QuoteForm from '@/components/ui/QuoteForm'
import ServiceGuide from '@/components/ui/ServiceGuide'
import ServiceLinks from '@/components/ui/ServiceLinks'
import GoogleReviews from '@/components/home/GoogleReviews'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import FAQSchema from '@/components/seo/FAQSchema'
import ServiceSchema from '@/components/seo/ServiceSchema'
import { projectHref, projectImageAlt, projects } from '@/lib/projects'
import { completePageMetadata } from '@/lib/seo'

export const metadata: Metadata = completePageMetadata({
  title: { absolute: 'Мебели по поръчка София | 3D проект и монтаж | Dom Expert' },
  description: 'Кухни, гардероби и спални по поръчка за София с 3D проект преди изработка. 30+ проекта в София, собствено производство от 2012 г., 2 г. гаранция.',
  alternates: { canonical: 'https://domexpertmebel.com/софия/' },
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    siteName: 'Dom Expert Мебел',
    url: 'https://domexpertmebel.com/софия/',
    title: 'Мебели по поръчка София | 3D проект и монтаж | Dom Expert',
    description: 'Кухни, гардероби и спални по поръчка за София с 3D проект преди изработка. 30+ проекта в София, собствено производство от 2012 г., 2 г. гаранция.',
    images: [{ url: '/images/og/home.webp', width: 1200, height: 630, alt: 'Примерна интериорна визуализация за мебели по поръчка в София' }],
  },
})

const faqItems = [
  {
    question: 'Колко струва оглед в София?',
    answer: 'Огледът на адрес в София е 50 € и сумата се приспада от цената при поръчка. Преди огледа ни изпратете снимки и описание на помещението — така идваме подготвени, а понякога можем да започнем направо с дистанционен 3D проект.',
  },
  {
    question: 'Колко време отнема кухня по поръчка за София?',
    answer: 'Изработката отнема 4–6 седмици след одобрение на 3D проекта и материалите. Датата за доставка и монтаж в София уговаряме отделно за всеки проект, за да е удобна за вас.',
  },
  {
    question: 'Правите ли 3D проект без оглед?',
    answer: 'Да. По вашите снимки и размери изготвяме дистанционен 3D проект — за кухня от 100 €, за друга мебел от 50 €. Сумата се приспада при поръчка, а преди производството правим оглед, за да потвърдим размерите на място.',
  },
  {
    question: 'Включен ли е монтажът?',
    answer: 'Доставката и монтажът в София се извършват от нашия екип. Условията и датата се уговарят за всеки проект и влизат в офертата, така че знаете предварително какво включва поръчката.',
  },
  {
    question: 'В кои квартали на София работите?',
    answer: 'Обслужваме цяла София и Софийска област — от Лозенец, Младост и Люлин до Бояна, Драгалевци, Симеоново, Банкя, Бистрица и Панчарево. Огледът, доставката и монтажът се правят на вашия адрес.',
  },
  {
    question: 'Колко струват мебелите по поръчка в София?',
    answer: 'Нямаме фиксирани цени „от“, защото цената зависи от размерите, материалите, механизмите и сложността на проекта. Конкретна оферта получавате след 3D проекта или огледа.',
  },
  {
    question: 'Имате ли реализирани проекти в София?',
    answer: 'Да, реализирали сме над 30 проекта в София. Един от тях — кухня с централен остров — е описан подробно в раздел „Проекти“.',
  },
  {
    question: 'Защо мебелите се изработват в Благоевград?',
    answer: 'Там е нашата собствена работилница. Един екип води проекта от 3D дизайна през производството до монтажа в София, без посредници, така че отговаряме за всеки детайл.',
  },
]

const quickFacts = [
  'Семейна работилница от 2012 г.',
  '100+ проекта, от тях 30+ в София',
  'Оглед 50 € — приспада се при поръчка',
  '3D проект от 100 € за кухня, от 50 € за друга мебел',
  'Изработка 4–6 седмици след одобрение',
  '2 години гаранция',
]

const remoteSteps = [
  { title: 'Снимки и размери', description: 'Изпращате снимки, размери и описание на помещението в София.' },
  { title: 'Дистанционен 3D проект', description: 'Подготвяме 3D проект и го коригираме, докато разпределението ви хареса.' },
  { title: 'Оглед', description: 'Идваме на адреса в София, за да потвърдим точните размери преди изработка.' },
  { title: 'Производство', description: 'Изработваме мебелите в собствената ни работилница в Благоевград за 4–6 седмици.' },
  { title: 'Доставка и монтаж', description: 'Нашият екип доставя и монтира в уговорения с вас ден.' },
]

const remoteSections = [
  {
    title: 'Започнете, без да чакате оглед',
    paragraphs: [
      'Повечето проекти за София започват дистанционно. Изпращате ни снимки на помещението, основните размери и какво искате да постигнете — повече място за съхранение, остров в кухнята, гардероб до тавана.',
      'По тези данни изготвяме 3D проект, в който виждате разпределението, фронтовете и цветовете, преди да поръчате. Корекциите правим по телефон или имейл, а сумата за проекта се приспада при поръчка.',
    ],
  },
  {
    title: 'Оглед, изработка и монтаж',
    paragraphs: [
      'Когато проектът е одобрен, идваме на оглед в София, за да проверим стените, отворите и изводите и да потвърдим всеки размер. Огледът е 50 € и също се приспада.',
      'Мебелите се изработват в Благоевград, а доставката и монтажът се уговарят за всеки проект. Така един и същ екип отговаря за проекта от първата скица до последната регулировка на вратите.',
    ],
  },
]

const sofiaDistricts = [
  'Лозенец', 'Младост', 'Люлин', 'Надежда', 'Овча купел', 'Красно село', 'Студентски град',
  'Дружба', 'Витоша', 'Бояна', 'Драгалевци', 'Симеоново', 'Манастирски ливади', 'Борово',
  'Изток', 'Изгрев', 'Гео Милев', 'Банишора', 'Център', 'Банкя', 'Бистрица', 'Панчарево',
]

const furnitureBlocks = [
  {
    title: 'Кухни по поръчка в София',
    text: 'Кухнята е най-честата поръчка от София. Проектираме прави, ъглови, П-образни кухни и кухни с остров, като в 3D проекта планираме уредите, плота, осветлението и всяко чекмедже. 3D проектът на кухня е от 100 € и се приспада при поръчка.',
    links: [
      { href: '/софия/кухни-по-поръчка/', label: 'кухни по поръчка в София' },
      { href: '/услуги/кухни-по-поръчка/', label: 'видове кухни и материали' },
    ],
  },
  {
    title: 'Гардероби и гардеробни в София',
    text: 'В новите сгради и в по-старите апартаменти в София нишите рядко са стандартни. Изработваме вградени гардероби и гардеробни по точни размери, а вътрешното разпределение — рафтове, лостове, чекмеджета — планираме в 3D проекта.',
    links: [
      { href: '/услуги/гардероби-по-поръчка/', label: 'гардероби по поръчка' },
      { href: '/блог/vutreshno-razpredelenie-na-garderob/', label: 'как да разпределим гардероба' },
    ],
  },
  {
    title: 'Спални по поръчка в София',
    text: 'Спалнята по поръчка събира в един проект леглото, нощните шкафчета и гардероба, в една визия и с размери, които пасват на стаята. В 3D проекта виждате как ще изглежда цялата стая, преди изработка.',
    links: [
      { href: '/услуги/спални-по-поръчка/', label: 'спални по поръчка' },
      { href: '/услуги/3d-визуализация/', label: '3D проект преди изработка' },
    ],
  },
]

const sofiaProjects = projects.filter((project) => project.city === 'София')
// TODO: добави още реални проекти от София в data/projects.json (има 30+, описан е само един).

const guideLinks = [
  {
    href: '/софия/кухни-по-поръчка/',
    label: 'Кухни по поръчка в София',
    description: 'Процес, материали, срокове и цени за кухня в София.',
  },
  {
    href: '/услуги/3d-визуализация/',
    label: '3D визуализация',
    description: 'Дистанционен 3D проект за цялата страна.',
  },
  {
    href: '/услуги/интериорен-дизайн/',
    label: 'Интериорен дизайн',
    description: 'Пълен интериорен дизайн с изработка на мебелите.',
  },
  {
    href: '/услуги/офис-мебели/',
    label: 'Офис мебели',
    description: 'Бюра, шкафове и рецепции по поръчка.',
  },
  {
    href: '/блог/ot-kakvo-zavisi-tsenata-na-kuhnya-po-poruchka/',
    label: 'От какво зависи цената',
    description: 'Какво определя цената на кухня по поръчка.',
  },
  {
    href: '/контакти/',
    label: 'Контакти',
    description: 'Телефон, имейл и форма за запитване.',
  },
]

const features = [
  '3D проект преди изработка',
  'Собствено производство в Благоевград',
  'Оглед, доставка и монтаж в цяла София',
  'Един екип от дизайна до монтажа',
]

const quickLinks = [
  { label: 'Кухни София', href: '/софия/кухни-по-поръчка/' },
  { label: 'Гардероби', href: '/услуги/гардероби-по-поръчка/' },
  { label: 'Спални', href: '/услуги/спални-по-поръчка/' },
  { label: 'Проекти', href: '/проекти/' },
]

export default function SofiaPage() {
  return (
    <>
      <ServiceSchema
        name="Мебели по поръчка в София"
        url="https://domexpertmebel.com/софия/"
        city="София"
        description="Кухни, гардероби и спални по поръчка за София и Софийска област: дистанционен 3D проект, оглед, изработка в собствена работилница в Благоевград, доставка и монтаж."
      />
      <FAQSchema items={faqItems} />
      <BreadcrumbSchema items={[
        { name: 'Начало', url: 'https://domexpertmebel.com/' },
        { name: 'Мебели София', url: 'https://domexpertmebel.com/софия/' },
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
                Мебели по поръчка в София — 3D проект, изработка и монтаж
              </h1>
              <p className="font-body text-warm-gray leading-relaxed" style={{ fontSize: '1.05rem' }}>
                Dom Expert Мебел изработва кухни, гардероби и спални по поръчка за София с 3D проект преди изработка, собствено производство в Благоевград и монтаж от нашия екип. Огледът е 50 €, 3D проектът е от 100 € за кухня и от 50 € за друга мебел — и двете се приспадат при поръчка, а срокът е 4–6 седмици след одобрение на проекта.
              </p>

              {/* Quick facts */}
              <div>
                <h2 className="font-display font-semibold text-charcoal mb-2" style={{ fontSize: '1.05rem' }}>Бързи факти</h2>
                <ul className="font-body text-sm text-warm-gray space-y-1">
                  {quickFacts.map((fact) => (
                    <li key={fact}>• {fact}</li>
                  ))}
                </ul>
              </div>

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

              <div className="flex flex-wrap gap-3">
                <a href="tel:+359876081199" className="btn-primary inline-flex items-center gap-2">
                  <Phone size={16} /> 0876 081 199
                </a>
                <a href="#zapitvane" className="btn-outline inline-flex items-center gap-2">
                  Изпратете снимки и размери
                </a>
              </div>

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

            <div id="zapitvane" style={{ scrollMarginTop: '6rem' }}>
              <div
                className="bg-white rounded-2xl p-8"
                style={{ border: '1px solid #EDE5DA', boxShadow: '0 4px 32px rgba(0,0,0,0.06)' }}
              >
                <h2 className="font-display font-semibold text-charcoal text-xl mb-2">Запитване за оферта</h2>
                <p className="font-body text-warm-gray text-sm mb-6">
                  Прикачете снимки и размери — ще ви върнем отговор с предложение за 3D проект или оглед в София.
                </p>
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Kitchens, wardrobes, bedrooms ── */}
      <section className="section-py" style={{ backgroundColor: '#FDFCFA' }}>
        <div className="container-main">
          <div className="max-w-3xl mb-10">
            <span className="eyebrow-pill">Какво изработваме</span>
            <h2 className="section-title text-left">Кухни, гардероби и спални по поръчка за София</h2>
            <p className="font-body text-warm-gray leading-relaxed mt-4" style={{ fontSize: '1rem' }}>
              Всяка мебел започва от 3D проект по размерите на вашето помещение. Изработваме и дневни, ТВ секции, антрета, детски и офис мебели, но най-често клиентите от София ни търсят за тези три.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {furnitureBlocks.map((block) => (
              <article
                key={block.title}
                className="rounded-2xl bg-white"
                style={{ border: '1px solid #EDE5DA', padding: 'clamp(1.25rem, 3vw, 1.75rem)' }}
              >
                <h3 className="font-display font-semibold text-charcoal mb-3" style={{ fontSize: '1.25rem' }}>
                  {block.title}
                </h3>
                <p className="font-body text-warm-gray leading-relaxed" style={{ fontSize: '0.93rem' }}>
                  {block.text}
                </p>
                <ul className="space-y-2 mt-4">
                  {block.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="inline-flex items-center gap-2 font-body font-medium text-walnut hover:underline underline-offset-2" style={{ fontSize: '0.88rem' }}>
                        <ArrowRight size={14} aria-hidden="true" /> {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Remote process ── */}
      <ServiceGuide
        eyebrow="От разстояние"
        title="Как работим със София от разстояние"
        intro="Работилницата ни е в Благоевград, но процесът е изграден така, че да не губите време в пътуване и чакане. Повечето решения се вземат още по снимки и 3D проект."
        sections={remoteSections}
        steps={remoteSteps}
        links={guideLinks}
      />

      {/* ── Projects in Sofia ── */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container-main">
          <div className="max-w-3xl mb-10">
            <span className="eyebrow-pill">Проекти</span>
            <h2 className="section-title text-left">Проекти в София</h2>
            <p className="font-body text-warm-gray leading-relaxed mt-4" style={{ fontSize: '1rem' }}>
              Реализирали сме над 30 проекта в София. Тук показваме описаните в портфолиото; изображенията са визуализации, а не снимки от обектите.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sofiaProjects.map((project) => (
              <Link
                key={project.slug}
                href={projectHref(project)}
                className="group overflow-hidden rounded-2xl bg-white transition-transform duration-200 hover:-translate-y-0.5"
                style={{ border: '1px solid #E7DDCF' }}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={project.images[0]}
                    alt={projectImageAlt(project)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div style={{ padding: '1.15rem' }}>
                  <h3 className="font-display font-semibold text-charcoal group-hover:text-walnut transition-colors" style={{ fontSize: '1.15rem' }}>
                    {project.title}
                  </h3>
                  <p className="font-body text-warm-gray leading-relaxed mt-2" style={{ fontSize: '0.85rem' }}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-4 mt-3 font-body text-xs text-warm-gray">
                    <span className="inline-flex items-center gap-1.5"><MapPin size={13} className="text-walnut" aria-hidden="true" />{project.city}</span>
                    <span className="inline-flex items-center gap-1.5"><Clock3 size={13} className="text-walnut" aria-hidden="true" />{project.duration}</span>
                  </div>
                  <p className="font-body text-warm-gray mt-3" style={{ fontSize: '0.72rem' }}>{project.imageCaption}</p>
                </div>
              </Link>
            ))}
            <Link
              href="/3d-проекти/"
              className="group flex flex-col justify-center rounded-2xl bg-white transition-transform duration-200 hover:-translate-y-0.5"
              style={{ border: '1px dashed #D9C9B4', padding: '1.5rem' }}
            >
              <h3 className="font-display font-semibold text-charcoal group-hover:text-walnut transition-colors" style={{ fontSize: '1.15rem' }}>
                3D проекти
              </h3>
              <p className="font-body text-warm-gray leading-relaxed mt-2" style={{ fontSize: '0.85rem' }}>
                Вижте 3D визуализации на кухни, подготвени преди изработка — така изглежда и проектът, който ще получите за вашия дом в София.
              </p>
              <span className="inline-flex items-center gap-2 font-body font-medium text-walnut mt-4" style={{ fontSize: '0.88rem' }}>
                Към 3D проектите <ArrowRight size={14} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Districts ── */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-warm-white)' }}>
        <div className="container-main max-w-4xl">
          <div className="text-center mb-8">
            <span className="eyebrow-pill">Зона на обслужване</span>
            <h2 className="font-display font-bold heading-gradient" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}>
              Работим във всички квартали на София
            </h2>
            <p className="font-body text-warm-gray leading-relaxed mt-4 mx-auto" style={{ maxWidth: '42rem', fontSize: '1rem' }}>
              Огледът, доставката и монтажът покриват цяла София и Софийска област. Обслужваме, наред с други, следните квартали и населени места:
            </p>
          </div>
          <ul className="flex flex-wrap justify-center gap-2.5">
            {sofiaDistricts.map((district) => (
              <li
                key={district}
                className="font-body"
                style={{
                  padding: '8px 16px', borderRadius: 100, fontSize: '0.85rem',
                  border: '1px solid rgba(139,111,71,0.2)',
                  color: '#3C2A18',
                  background: 'white',
                }}
              >
                {district}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Защо клиенти от София избират нас ── */}
      <section className="section-py" style={{ backgroundColor: '#FDFCFA' }}>
        <div className="container-main max-w-4xl">
          <div className="text-center mb-12">
            <span className="eyebrow-pill">Нашето предимство</span>
            <h2 className="font-display font-bold heading-gradient" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}>
              Защо клиенти от София избират нас
            </h2>
            <p className="font-body text-warm-gray leading-relaxed mt-4 mx-auto" style={{ maxWidth: '42rem', fontSize: '1rem' }}>
              В София има много мебелни фирми. Нашата разлика е, че проектът, производството и монтажът са в ръцете на един семеен екип.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Собствено производство',
                description: 'Мебелите се изработват в нашата работилница в Благоевград, а не се поръчват при подизпълнител.',
              },
              {
                title: 'Семейна работилница от 2012 г.',
                description: 'Над 100 реализирани проекта, от които повече от 30 в София.',
              },
              {
                title: '3D проект преди изработка',
                description: 'Одобрявате разпределението и визията, преди да започне производството.',
              },
              {
                title: 'Един екип от дизайна до монтажа',
                description: 'Говорите с хората, които проектират, изработват и монтират мебелите.',
              },
              {
                title: '2 години гаранция',
                description: 'Гаранцията важи за изработените от нас мебели.',
              },
              {
                title: 'Конкурентна цена за качеството',
                description: 'Не се състезаваме с най-ниската цена — държим на точна изработка и материали, подходящи за натоварването.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group"
                style={{
                  padding: '24px',
                  borderRadius: 16,
                  background: 'white',
                  border: '1px solid rgba(139,111,71,0.12)',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: 'rgba(139,111,71,0.10)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                }}>
                  <CheckCircle size={20} style={{ color: '#8B6F47' }} />
                </div>
                <h3 className="font-display font-semibold text-charcoal mb-2" style={{ fontSize: '1.05rem' }}>
                  {item.title}
                </h3>
                <p className="font-body text-warm-gray leading-relaxed" style={{ fontSize: '0.9rem' }}>
                  {item.description}
                </p>
              </div>
            ))}
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
              Често задавани въпроси за София
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

      {/* ── Final CTA ── */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-warm-white)' }}>
        <div
          className="container-main max-w-3xl text-center rounded-2xl bg-white"
          style={{ border: '1px solid #EDE5DA', padding: 'clamp(1.75rem, 5vw, 3rem)', boxShadow: '0 4px 32px rgba(0,0,0,0.06)' }}
        >
          <h2 className="font-display font-bold heading-gradient" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}>
            Започнете с 3D проект за вашия дом в София
          </h2>
          <p className="font-body text-warm-gray leading-relaxed mt-4 mx-auto" style={{ maxWidth: '36rem', fontSize: '1rem' }}>
            Изпратете ни снимки и размери на помещението. Ще ви предложим следващата стъпка — дистанционен 3D проект или оглед на адрес.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-7">
            <a href="tel:+359876081199" className="btn-primary inline-flex items-center gap-2">
              <Phone size={16} /> 0876 081 199
            </a>
            <a href="#zapitvane" className="btn-outline inline-flex items-center gap-2">
              Изпратете запитване
            </a>
          </div>
        </div>
      </section>

      <ServiceLinks title="Всички услуги за София" background="var(--color-warm-white)" />

      {/* ── Other locations ── */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container-main">
          <h2 className="font-display font-semibold text-charcoal text-center mb-8" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)' }}>
            Обслужваме и други градове
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'Мебели Благоевград', href: '/благоевград/' },
              { label: 'Мебели Дупница', href: '/дупница/' },
              { label: 'Мебели Сандански', href: '/сандански/' },
              { label: 'Мебели Петрич', href: '/петрич/' },
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
