import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Phone, ChevronDown } from 'lucide-react'
import QuoteForm from '@/components/ui/QuoteForm'
import ServiceGuide from '@/components/ui/ServiceGuide'
import GoogleReviews from '@/components/home/GoogleReviews'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import FAQSchema from '@/components/seo/FAQSchema'
import ServiceSchema from '@/components/seo/ServiceSchema'
import { completePageMetadata } from '@/lib/seo'

export const metadata: Metadata = completePageMetadata({
  title: { absolute: 'Мебели по поръчка Сандански | Dom Expert Мебел' },
  description: 'Мебели по поръчка в Сандански — кухни, гардероби и спални. Оглед 50 €, приспадат се, опит от 2012 г., монтаж и 2 г. гаранция. Тел: 0876 081 199',
  alternates: { canonical: 'https://domexpertmebel.com/сандански/' },
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    siteName: 'Dom Expert Мебел',
    url: 'https://domexpertmebel.com/сандански/',
    title: 'Мебели по поръчка Сандански | Dom Expert Мебел',
    description: 'Dom Expert Мебел от Благоевград обслужва Сандански с оглед, изработка и монтаж на мебели по поръчка.',
    images: [{ url: '/images/og/home.webp', width: 1200, height: 630, alt: 'Примерна интериорна визуализация за мебели по поръчка в Сандански' }],
  },
})

const faqItems = [
  {
    question: 'Правите ли мебели по поръчка в Сандански?',
    answer: 'Да. Базата ни е в Благоевград, а обслужваме клиенти в Сандански и Петричкия район. Идваме на оглед и вземане на размери — 50 €, приспадат се от цената при поръчка, след което организираме изработката и монтажа.',
  },
  {
    question: 'Колко струват мебелите по поръчка в Сандански?',
    answer: 'Цената зависи от вида мебел, размерите, материалите, механизмите и сложността. Даваме конкретна оферта след огледа. 3D проектът се заплаща, но цената му се приспада при възлагане на поръчката.',
  },
  {
    question: 'Идвате ли на оглед в Сандански?',
    answer: 'Да, идваме на оглед в Сандански — 50 €, приспадат се от цената при поръчка. Обадете се или попълнете формата и ще уговорим удобен ден за вас.',
  },
  {
    question: 'Правите ли кухни по поръчка в Сандански?',
    answer: 'Да, изработваме кухни по поръчка от МДФ и ПДЧ, с монтаж и 2 години гаранция. 3D проектът е платен, а цената му се приспада от поръчката при възлагане. Обслужваме Сандански и Петричкия район.',
  },
  {
    question: 'Колко време отнема изработката за Сандански?',
    answer: 'Производственият срок е 4–6 седмици от одобряване на проекта. Доставката и монтажът в Сандански се организират в удобен за вас ден след готовността на мебелите.',
  },
  {
    question: 'Имате ли реализирани проекти в Сандански?',
    answer: 'Да, имаме реализирани проекти в Сандански — кухни, гардероби и спални. Можете да видите примерен проект от Сандански в нашата галерия или да се свържете с нас за референции.',
  },
]

const guideSections = [
  {
    title: 'Какво изработваме в Сандански',
    paragraphs: [
      'Обслужваме Сандански и Петричкия район с пълната гама от мебели по поръчка — кухни с различни конфигурации, вградени и корпусни гардероби, спални комплекти с легла и нощни шкафчета, ТВ секции и стелажи за дневна, офис мебели и работни зони.',
      'Всеки проект е индивидуален и започва от точните размери на помещението. Проектираме според реалните нужди, а не според готови шаблони. Мебелите се изработват в нашата работилница в Благоевград според одобрен от вас 3D проект.',
    ],
  },
  {
    title: 'Как работим с клиенти от Сандански',
    paragraphs: [
      'Първата стъпка е огледът на място — 50 €, приспадат се от цената при поръчка. Посещаваме адреса в Сандански, вземаме точни размери, проверяваме стени, подове, отвори, изводи за ток и вода. Обсъждаме какво искате да постигнете, стилови предпочитания и ориентировъчен бюджет.',
      'След огледа изготвяме 3D проект. Проектът е платена услуга (от 100 € за кухня, от 50 € за гардероб/спалня/дневна), но при поръчка на мебелите приспадаме 100% от платената сума. Така виждате точно какво ще получите преди изработката, без рискове.',
      'Изработваме мебелите в работилницата в Благоевград в срок от 4–6 седмици. Използваме ПДЧ, МДФ, гланц и други материали според избрания дизайн. След производството организираме доставка и монтаж в Сандански. Монтажът е включен в цената при поръчка на мебели.',
      'За изработените изделия предоставяме 2 години гаранция. Оставаме на разположение за въпроси и съдействие след монтажа.',
    ],
  },
  {
    title: 'Проекти в Сандански',
    paragraphs: [
      'Имаме реализирани проекти в Сандански — модерни и класически кухни, вградени гардероби в ниши с нестандартни размери, спални с тапицирани легла и скринове.',
      'Един от примерните ни проекти е класическа кухня в Сандански с фрезовани лица, светла визия и пълно цялостно изпълнение — от проект до монтаж. Можете да го видите в нашата галерия с реализирани проекти.',
    ],
  },
  {
    title: '3D проект преди изработка',
    paragraphs: [
      '3D визуализацията показва как ще изглеждат мебелите в реалното пространство. Виждате материалите, цветовете, разположението на модулите, размерите на всеки елемент. Правим корекции докато не постигнем желания резултат.',
      'За повече информация вижте нашата специална страница за 3D визуализация и интериорен дизайн.',
    ],
  },
]

const guideSteps = [
  { title: 'Запитване', description: 'Пращате снимки и описание на мебелите и адрес в Сандански.' },
  { title: 'Консултация', description: 'Безплатна консултация по телефон или снимки, ориентировъчна оценка.' },
  { title: 'Оглед и размери', description: 'Посещаваме адреса, вземаме точни размери — 50 €, приспадат се.' },
  { title: '3D проект', description: 'Професионална визуализация — от 100 € (кухня) / от 50 € (друго), приспада се.' },
  { title: 'Изработка', description: 'Произвеждаме в Благоевград в срок 4–6 седмици.' },
  { title: 'Доставка и монтаж', description: 'Доставяме и монтираме в Сандански с 2 г. гаранция.' },
]

const guideLinks = [
  {
    href: '/услуги/кухни-по-поръчка/',
    label: 'Кухни по поръчка',
    description: 'Модерни и класически кухни с 3D проект и монтаж.',
  },
  {
    href: '/услуги/гардероби-по-поръчка/',
    label: 'Гардероби по поръчка',
    description: 'Вградени гардероби и гардеробни системи.',
  },
  {
    href: '/услуги/3d-визуализация/',
    label: '3D визуализация',
    description: 'Професионална визуализация преди изработка.',
  },
  {
    href: '/проекти/kuhnya-klasicheska-sandanski/',
    label: 'Проект в Сандански',
    description: 'Класическа кухня, реализирана в Сандански.',
  },
  {
    href: '/проекти/',
    label: 'Всички проекти',
    description: 'Примери от Сандански, Благоевград и региона.',
  },
  {
    href: '/контакти/',
    label: 'Контакти',
    description: 'Адрес, телефон и форма за оглед 50 €, приспадат се.',
  },
]

const features = [
  'Базирани в Благоевград, обслужваме Сандански',
  'Оглед 50 €, приспадат се при поръчка',
  'Платен 3D проект с приспадане при поръчка',
  'Типичен срок за изработка: 4–6 седмици',
  '2 години гаранция',
  'Опит от 2012 г. и 100+ проекта',
]

export default function SandanskiPage() {
  return (
    <>
      <ServiceSchema
        name="Мебели по поръчка в Сандански"
        url="https://domexpertmebel.com/сандански/"
        city="Сандански"
        description="Проектиране, изработка, доставка и монтаж на мебели по поръчка в Сандански и Петричкия район."
      />
      <FAQSchema items={faqItems} />
      <BreadcrumbSchema items={[
        { name: 'Начало', url: 'https://domexpertmebel.com/' },
        { name: 'Мебели Сандански', url: 'https://domexpertmebel.com/сандански/' },
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
        <div aria-hidden="true" style={{
          position: 'absolute', bottom: '-50px', left: '-30px',
          width: '280px', height: '280px', borderRadius: '50%',
          background: 'rgba(139,111,71,0.06)', filter: 'blur(50px)', pointerEvents: 'none',
        }} />

        <div className="container-main relative">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-body mb-8" style={{ fontSize: '0.78rem', color: '#9B9490' }}>
            <Link href="/" style={{ color: '#8B6F47' }} className="hover:underline underline-offset-2">Начало</Link>
            <span>/</span>
            <span style={{ color: '#3C2A18', fontWeight: 500 }}>Мебели Сандански</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <span className="eyebrow-pill">Сандански</span>
              <h1 className="font-display font-bold text-charcoal leading-[1.05]" style={{ fontSize: 'var(--text-h1)' }}>
                Мебели по поръчка в Сандански
              </h1>
              <p className="font-body text-warm-gray leading-relaxed" style={{ fontSize: '1.05rem' }}>
                Базата на Dom Expert Мебел е в Благоевград, а обслужваме клиенти в Сандански и Петричкия район. Изработваме кухни, гардероби, спални и офис мебели по поръчка. Идваме на оглед и вземане на размери на адрес — 50 €, приспадат се при поръчка; 3D проектът се заплаща и се приспада от цената при възлагане.
              </p>

              {/* GEO key facts */}
              <ul className="font-body text-sm text-warm-gray space-y-1">
                <li>• Обслужваме Сандански и Петричкия район</li>
                <li>• Оглед на адрес — 50 €, приспадат се</li>
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

              <div className="grid grid-cols-2 gap-2.5 pt-2">
                {[
                  { label: 'Кухни', href: '/услуги/кухни-по-поръчка/' },
                  { label: 'Гардероби', href: '/услуги/гардероби-по-поръчка/' },
                  { label: 'Проект в Сандански', href: '/проекти/kuhnya-klasicheska-sandanski/' },
                  { label: 'Контакти', href: '/контакти/' },
                ].map((s) => (
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
                <h2 className="font-display font-semibold text-charcoal text-xl mb-6">Безплатна оферта</h2>
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceGuide
        eyebrow="Местна услуга"
        title="Мебели по поръчка в Сандански и Петричкия район"
        intro="Обслужваме Сандански с оглед на място — 50 €, приспадат се при поръчка, изработка в нашата работилница в Благоевград и монтаж с гаранция. Ето как работим и какво можем да изработим за вас."
        sections={guideSections}
        steps={guideSteps}
        links={guideLinks}
      />

      <GoogleReviews />

      {/* ── FAQ ── */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container-main max-w-3xl">
          <div className="text-center mb-10">
            <span className="eyebrow-pill">Въпроси и отговори</span>
            <h2 className="font-display font-bold heading-gradient" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}>
              Често задавани въпроси за Сандански
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
              { label: 'Мебели София', href: '/софия/' },
              { label: 'Мебели Дупница', href: '/дупница/' },
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
