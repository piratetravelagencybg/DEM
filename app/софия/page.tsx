import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Phone, ChevronDown } from 'lucide-react'
import QuoteForm from '@/components/ui/QuoteForm'
import ServiceGuide from '@/components/ui/ServiceGuide'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import FAQSchema from '@/components/seo/FAQSchema'
import ServiceSchema from '@/components/seo/ServiceSchema'
import { completePageMetadata } from '@/lib/seo'

export const metadata: Metadata = completePageMetadata({
  title: { absolute: 'Мебели по поръчка София | Dom Expert Мебел' },
  description: 'Мебели по поръчка в София — кухни, гардероби и спални. Безплатен оглед на адрес, над 10 г. опит и 2 г. гаранция. Тел: 0876 081 199',
  alternates: { canonical: 'https://domexpertmebel.com/софия/' },
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    siteName: 'Dom Expert Мебел',
    url: 'https://domexpertmebel.com/софия/',
    title: 'Мебели по поръчка София | Dom Expert Мебел',
    description: 'Dom Expert Мебел от Благоевград обслужва София с оглед на адрес, изработка и монтаж на мебели по поръчка.',
    images: [{ url: '/images/og/home.webp', width: 1200, height: 630, alt: 'Примерна интериорна визуализация за мебели по поръчка в София' }],
  },
})

const faqItems = [
  {
    question: 'Правите ли кухни по поръчка в София?',
    answer: 'Да, обслужваме клиенти в цяла София и Софийска област. Идваме на безплатен оглед и вземане на размери на адрес. 3D проектът се заплаща, а при възлагане цената му се приспада от поръчката.',
  },
  {
    question: 'Колко струват мебелите по поръчка в София?',
    answer: 'Цената зависи от размерите, материалите, механизмите и сложността на проекта. След безплатния оглед и вземането на размери подготвяме конкретна оферта за вашето обзавеждане.',
  },
  {
    question: 'Колко отнема изработката на мебели за София?',
    answer: 'Производственият срок е 4–6 седмици след одобряване на проекта. Доставката и монтажа в София организираме в рамките на договорения срок.',
  },
  {
    question: 'Правите ли и офис обзавеждане в София?',
    answer: 'Да, изработваме цялостно офис обзавеждане по поръчка — бюра, шкафове, конферентни маси и рецепции. Огледът и вземането на размери се извършват на адрес в София.',
  },
  {
    question: 'Може ли да поръчам само 3D проект без изработка?',
    answer: 'Да, можете да поръчате само 3D визуализация. Изпращате ни размерите дистанционно, ние изготвяме проекта онлайн. При поръчка на мебелите приспадаме 100% от платената сума.',
  },
  {
    question: 'Имате ли реализирани проекти в София?',
    answer: 'Да, имаме завършени проекти в София — кухни с острови, вградени гардероби, спални комплекти, офис обзавеждане. Можете да видите примерите в нашата галерия с реализирани проекти.',
  },
]

const guideSections = [
  {
    title: 'Какво изработваме в София',
    paragraphs: [
      'Обслужваме цяла София и Софийска област с пълната гама от мебели по поръчка — кухни с различни конфигурации (прави, ъглови, П-образни, с острови), вградени и корпусни гардероби с плъзгащи или разпашни врати, спални комплекти с легла, нощни шкафчета и скринове, ТВ секции, стелажи и библиотеки за дневни, офис мебели — бюра, шкафове, конферентни маси, рецепции.',
      'Също така предлагаме 3D визуализация преди изработка и цялостен интериорен дизайн на помещения. Всеки проект започва от точните размери и се изработва според одобрена от вас визуализация.',
    ],
  },
  {
    title: 'Оглед и монтаж в цяла София и Софийска област',
    paragraphs: [
      'Посещаваме адреси в цяла София и Софийска област за безплатен оглед и вземане на размери. Не ограничаваме услугата до конкретни квартали — обслужваме всички райони в столицата и околните населени места.',
      'При огледа вземаме точни размери на помещението, проверяваме стени, подове, отвори, изводи за ток, вода и аспирация. Обсъждаме какви мебели искате, стилови предпочитания, функционални нужди и ориентировъчен бюджет.',
      'След производството организираме доставка и монтаж на адреса в София. Монтажът е включен в цената при поръчка на мебели по поръчка. Монтажният екип почиства след работа и отнася ненужните опаковки.',
    ],
  },
  {
    title: 'Срок за доставка и монтаж в София',
    paragraphs: [
      'Производственият срок е 4–6 седмици от одобряване на 3D проекта и избора на материали. Мебелите се изработват в нашата работилница в Благоевград, след което организираме доставка до адреса в София.',
      'Доставката и монтажът се уговарят предварително, за да сте сигурни, че екипът ще дойде в удобно за вас време. За София доставката обикновено се извършва в рамките на 1-2 дни след готовността на мебелите.',
      'При по-големи проекти или специфични изисквания можем да координираме монтажа с други занаятчии — електрик, бояджия, подови настилки. Така всичко се изпълнява последователно и без забавяне.',
    ],
  },
  {
    title: 'Дистанционен 3D проект за клиенти от София',
    paragraphs: [
      'Не е задължително да идваме на оглед, ако имате точни размери. Предлагаме дистанционно изготвяне на 3D проект — изпращате ни размерите и план на помещението, ние подготвяме визуализацията онлайн.',
      'Процесът е прост: обменяме се по имейл или телефон, уточняваме нуждите, изпращаме първоначален вариант, правим корекции, финализираме проекта. След това, ако решите да възложите мебелите на нас, приспадаме 100% от платената сума за проекта.',
      'Този вариант е подходящ за клиенти от София, които предпочитат да не чакат оглед на място или имат готов план с точни размери. За повече информация вижте нашата специална страница за 3D визуализация.',
    ],
  },
  {
    title: 'Проекти в София',
    paragraphs: [
      'Имаме реализирани проекти в София — модерни кухни с централен остров и вградени уреди, вградени гардероби в нестандартни ниши, спални комплекти с тапицирани легла, офис обзавеждане за фирмени офиси.',
      'Един от примерните ни проекти е кухня с остров в София, която можете да видите в нашата галерия. Проектът включва пълно функционално разпределение, вградени уреди, работен плот и остров с допълнително съхранение.',
    ],
  },
]

const guideSteps = [
  { title: 'Запитване', description: 'Обаждате се или попълвате формата с описание на мебелите и адрес в София.' },
  { title: 'Безплатен оглед', description: 'Посещаваме адреса, вземаме размери, обсъждаме проекта.' },
  { title: '3D проект и оферта', description: 'Визуализация и конкретна цена. При поръчка — 100% приспадане на проекта.' },
  { title: 'Изработка', description: 'Произвеждаме в Благоевград в срок 4–6 седмици.' },
  { title: 'Доставка и монтаж', description: 'Доставяме и монтираме в София с 2 г. гаранция.' },
]

const guideLinks = [
  {
    href: '/услуги/кухни-по-поръчка/',
    label: 'Кухни по поръчка',
    description: 'Модерни и класически кухни с 3D проект.',
  },
  {
    href: '/услуги/гардероби-по-поръчка/',
    label: 'Гардероби по поръчка',
    description: 'Вградени гардероби и гардеробни системи.',
  },
  {
    href: '/услуги/спални-по-поръчка/',
    label: 'Спални по поръчка',
    description: 'Легла, скринове и цялостни спални.',
  },
  {
    href: '/услуги/офис-мебели/',
    label: 'Офис мебели',
    description: 'Бюра, шкафове, рецепции за офиси.',
  },
  {
    href: '/услуги/3d-визуализация/',
    label: '3D визуализация',
    description: 'Професионален проект преди изработка.',
  },
  {
    href: '/услуги/интериорен-дизайн/',
    label: 'Интериорен дизайн',
    description: 'Цялостен дизайн на помещения.',
  },
  {
    href: '/проекти/kuhnya-s-ostrov-sofia/',
    label: 'Проект в София',
    description: 'Кухня с остров, реализирана в София.',
  },
  {
    href: '/проекти/',
    label: 'Всички проекти',
    description: 'Примери от София и региона.',
  },
  {
    href: '/контакти/',
    label: 'Контакти',
    description: 'Адрес, телефон и форма за оглед.',
  },
]

const features = [
  'Безплатен оглед на адрес в София',
  'Платен 3D проект с приспадане при поръчка',
  'Изработка в базата ни в Благоевград',
  'Монтаж в цяла София и Софийска обл.',
  '2 години гаранция',
  'Над 10 години опит и 100+ проекта',
]

const quickLinks = [
  { label: 'Кухни', href: '/услуги/кухни-по-поръчка/' },
  { label: 'Гардероби', href: '/услуги/гардероби-по-поръчка/' },
  { label: 'Спални', href: '/услуги/спални-по-поръчка/' },
  { label: 'Проект в София', href: '/проекти/kuhnya-s-ostrov-sofia/' },
]

export default function SofiaPage() {
  return (
    <>
      <ServiceSchema
        name="Мебели по поръчка в София"
        url="https://domexpertmebel.com/софия/"
        city="София"
        description="Проектиране, изработка, доставка и монтаж на мебели по поръчка в София и Софийска област."
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
                Мебели по поръчка в София — индивидуален проект и монтаж
              </h1>
              <p className="font-body text-warm-gray leading-relaxed" style={{ fontSize: '1.05rem' }}>
                Базирани сме в Благоевград и обслужваме клиенти в цяла София и Софийска област. Изработваме кухни, гардероби, спални и офис мебели по поръчка. Идваме на безплатен оглед и вземане на размери на вашия адрес; 3D проектът се заплаща, но цената му се приспада при възлагане на поръчката.
              </p>

              {/* GEO key facts */}
              <ul className="font-body text-sm text-warm-gray space-y-1">
                <li>• Обслужваме цяла София и Софийска област</li>
                <li>• Безплатен оглед и размери на адрес в София</li>
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

              <a href="tel:+359876081199" className="btn-primary inline-flex items-center gap-2">
                <Phone size={16} /> 0876 081 199
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

      <ServiceGuide
        eyebrow="Местна услуга"
        title="Мебели по поръчка в цяла София и Софийска област"
        intro="Обслужваме клиенти в цяла София без ограничения по квартали. Ето как работим и какво можем да изработим за вас — от 3D проект до монтаж на адреса."
        sections={guideSections}
        steps={guideSteps}
        links={guideLinks}
      />

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
