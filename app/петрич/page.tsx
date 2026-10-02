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
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = completePageMetadata({
  title: { absolute: 'Мебели по поръчка Петрич | Dom Expert Мебел' },
  description: 'Мебели по поръчка в Петрич — кухни, гардероби, спални и дневни. Оглед 50 €, приспадат се, 3D проект с приспадане, монтаж и 2 г. гаранция. Опит от 2012 г. Тел: 0876 081 199',
  alternates: { canonical: 'https://domexpertmebel.com/петрич/' },
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    siteName: 'Dom Expert Мебел',
    url: 'https://domexpertmebel.com/петрич/',
    title: 'Мебели по поръчка Петрич | Dom Expert Мебел',
    description: 'Мебели по поръчка в Петрич с оглед 50 €, приспадат се, 3D проект и монтаж. Опит от 2012 г.',
    images: [{ url: '/images/og/home.webp', width: 1200, height: 630, alt: 'Примерна интериорна визуализация за мебели по поръчка в Петрич' }],
  },
})

const faqItems = [
  {
    question: 'Правите ли мебели по поръчка в Петрич?',
    answer: 'Да. Обслужваме Петрич и района с мебели по поръчка — кухни, гардероби, спални, дневни и офис мебели. Идваме на оглед и вземане на размери — 50 €, приспадат се от цената при поръчка, след което изработваме мебелите в нашата работилница в Благоевград и организираме доставка и монтаж.',
  },
  {
    question: 'Колко струват мебелите по поръчка в Петрич?',
    answer: 'Цената се влияе от точните размери, броя модули, материалите, плотовете, механизмите, осветлението и сложността на монтажа. След огледа изготвяме конкретна оферта за избраните решения, а не обща цена без размери.',
  },
  {
    question: 'Идвате ли на оглед в Петрич?',
    answer: 'Да, идваме на оглед в Петрич — 50 €, приспадат се от цената при поръчка. Позвънете на 0876 081 199 или попълнете формата, за да уговорим удобно време за вас.',
  },
  {
    question: 'Колко време отнема изработката на мебели за Петрич?',
    answer: 'Стандартният срок за производство е 4–6 седмици от одобряване на проекта и избора на материали. За монтаж на готови мебели или при спешни случаи можем да реагираме по-бързо. Срокът е същият за Петрич, както за Благоевград.',
  },
  {
    question: 'Правите ли 3D проект преди изработката?',
    answer: 'Да. 3D проектът се заплаща (от 100 € за кухня, от 50 € за гардероб/спалня/дневна), но при поръчка на мебелите приспадаме платената сума 100% от стойността на поръчката. Така виждате точно какво ще получите преди изработката.',
  },
  {
    question: 'Имате ли реализирани проекти в Петрич?',
    answer: 'Да, имаме реализирани проекти в Петрич и Петричкия район. За примери от завършени проекти в региона, свържете се с нас или разгледайте общата ни галерия с реализации.',
  },
]

const features = [
  'Обслужваме Петрич и Петричкия район',
  'Оглед на адрес — 50 €, приспадат се при поръчка',
  'Платен 3D проект с 100% приспадане при поръчка',
  'Производство в Благоевград — 4–6 седмици',
  '2 години гаранция на всички изделия',
  'Опит от 2012 г. и 100+ проекта',
]

const quickLinks = [
  { label: 'Кухни', href: '/услуги/кухни-по-поръчка/' },
  { label: 'Гардероби', href: '/услуги/гардероби-по-поръчка/' },
  { label: 'Спални', href: '/услуги/спални-по-поръчка/' },
  { label: 'Контакти', href: '/контакти/' },
]

const guideSections = [
  {
    title: 'Какво изработваме в Петрич',
    paragraphs: [
      'Поемаме изработката на кухни, вградени и корпусни гардероби, легла и спални комплекти, ТВ секции и мебели за дневна, офис мебели — бюра, шкафове, рецепции. Всеки проект започва от точните размери на помещението и нуждите, които мебелите трябва да решават.',
      'Работим както с отделни мебели, така и с цялостно обзавеждане на няколко зони. Преди офертата уточняваме обхвата, материалите, механизмите, осветлението, монтажа и допълнителните елементи.',
    ],
  },
  {
    title: 'Как работим с клиенти от Петрич',
    paragraphs: [
      'Базата ни е в Благоевград, а обслужваме Петрич и района с оглед на място — 50 €, приспадат се от цената при поръчка. Посещаваме адреса, вземаме точни размери, проверяваме стени, под, отвори, изводи за ток и вода.',
      'При кухня отбелязваме позициите на вода, ток, аспирация и уредите; при гардероб или спалня проверяваме нишите, свободното отваряне и проходите. Това намалява риска от корекции при монтажа и гарантира, че мебелите ще се впишат точно.',
      'След огледа изготвяме 3D проект. Проектът е платена услуга (от 100 € за кухня, от 50 € за други мебели), но при поръчка на мебелите приспадаме 100% от платената сума. Така виждате реалната визуализация преди изработка без допълнителни разходи, ако възложите проекта на нас.',
      'Изработваме мебелите в нашата работилница в Благоевград в срок от 4–6 седмици. След производството организираме доставка и монтаж в Петрич. Монтажът е включен в цената при поръчка на мебели по поръчка. За изработените изделия предоставяме 2 години гаранция.',
    ],
  },
  {
    title: '3D визуализация преди изработка',
    paragraphs: [
      'Професионалната 3D визуализация показва как ще изглеждат мебелите в реалното пространство. Виждате точните размери, материали, цветове и разположение преди да започнем производство.',
      'Правим корекции в проекта докато не постигнем желания резултат. Промените в цветове, материали или разпределение са част от процеса и не се таксуват допълнително. Крайната оферта е за одобрен от вас проект, без изненади при монтажа.',
      'За повече информация вижте нашата специална страница за 3D визуализация.',
    ],
  },
]

const guideSteps = [
  { title: 'Запитване', description: 'Пращате снимки и описание на мебелите и адрес в Петрич.' },
  { title: 'Консултация', description: 'Безплатна консултация по телефон или снимки, ориентировъчна оценка.' },
  { title: 'Оглед и размери', description: 'Посещаваме адреса, вземаме точни размери — 50 €, приспадат се.' },
  { title: '3D проект', description: 'Професионална визуализация — от 100 € (кухня) / от 50 € (друго), приспада се.' },
  { title: 'Изработка', description: 'Произвеждаме в Благоевград в срок 4–6 седмици.' },
  { title: 'Доставка и монтаж', description: 'Доставяме и монтираме в Петрич с 2 г. гаранция.' },
]

const guideLinks = [
  {
    href: '/услуги/кухни-по-поръчка/',
    label: 'Кухни по поръчка',
    description: 'Модерни и класически кухни с 3D проект, монтаж и гаранция.',
  },
  {
    href: '/услуги/гардероби-по-поръчка/',
    label: 'Гардероби по поръчка',
    description: 'Вградени гардероби и гардеробни системи с LED осветление.',
  },
  {
    href: '/услуги/спални-по-поръчка/',
    label: 'Спални по поръчка',
    description: 'Тапицирани легла, скринове и цялостни спални комплекти.',
  },
  {
    href: '/услуги/3d-визуализация/',
    label: '3D визуализация',
    description: 'Виж как работи 3D проектът и какво включва.',
  },
  {
    href: '/проекти/',
    label: 'Реализирани проекти',
    description: 'Примери от завършени проекти в региона.',
  },
  {
    href: '/контакти/',
    label: 'Адрес и телефон',
    description: 'Свържете се с нас за безплатна консултация.',
  },
]

export default function PetrichPage() {
  return (
    <>
      <ServiceSchema
        name="Мебели по поръчка в Петрич"
        url="https://domexpertmebel.com/петрич/"
        city="Петрич"
        description="Проектиране, изработка и монтаж на мебели по поръчка в Петрич и региона."
      />
      <FAQSchema items={faqItems} />
      <BreadcrumbSchema items={[
        { name: 'Начало', url: 'https://domexpertmebel.com/' },
        { name: 'Мебели Петрич', url: 'https://domexpertmebel.com/петрич/' },
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
            <span style={{ color: '#3C2A18', fontWeight: 500 }}>Мебели Петрич</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <span className="eyebrow-pill">Петрич</span>
              <h1 className="font-display font-bold text-charcoal leading-[1.05]" style={{ fontSize: 'var(--text-h1)' }}>
                Мебели по поръчка в Петрич
              </h1>
              <p className="font-body text-warm-gray leading-relaxed" style={{ fontSize: '1.05rem' }}>
                Dom Expert Мебел обслужва Петрич и района с безплатен оглед, изработка на мебели по поръчка в собствена работилница в Благоевград, доставка и монтаж. Изработваме кухни, гардероби, спални, дневни и офис мебели с 3D проект, монтаж и 2 години гаранция.
              </p>

              {/* GEO key facts */}
              <ul className="font-body text-sm text-warm-gray space-y-1">
                <li>• Обслужваме Петрич и Петричкия район</li>
                <li>• Работно време: Пон–Пет, 09:00–18:00</li>
                <li>• Производствен срок: 4–6 седмици</li>
                <li>• Реализирани проекти: над 100</li>
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
                <Phone size={16} /> Обадете се: 0876 081 199
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
                <h2 className="font-display font-semibold text-charcoal text-xl mb-2">Безплатен оглед и оферта</h2>
                <p className="font-body text-warm-gray text-sm mb-6">
                  3D проектът се заплаща и се приспада 100% при поръчка на мебелите.
                </p>
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceGuide
        eyebrow="Местна услуга"
        title="Как работим с клиенти от Петрич"
        intro="Обслужваме Петрич и района с безплатен оглед на място, изработка в нашата работилница в Благоевград и монтаж с гаранция. Ето процеса от заявката до готовите мебели."
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
              Често задавани въпроси за Петрич
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
