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
  title: { absolute: 'Мебели по поръчка Дупница | Dom Expert Мебел' },
  description: 'Мебели по поръчка в Дупница — кухни, гардероби и спални. Безплатен оглед, над 10 г. опит, монтаж и 2 г. гаранция. Тел: 0876 081 199',
  alternates: { canonical: 'https://domexpertmebel.com/дупница/' },
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    siteName: 'Dom Expert Мебел',
    url: 'https://domexpertmebel.com/дупница/',
    title: 'Мебели по поръчка Дупница | Dom Expert Мебел',
    description: 'Dom Expert Мебел от Благоевград обслужва Дупница с оглед, изработка и монтаж на мебели по поръчка.',
    images: [{ url: '/images/og/home.webp', width: 1200, height: 630, alt: 'Примерна интериорна визуализация за мебели по поръчка в Дупница' }],
  },
})

const faqItems = [
  {
    question: 'Правите ли мебели по поръчка в Дупница?',
    answer: 'Да. Базата ни е в Благоевград, а обслужваме клиенти в Дупница и Кюстендилска област. Идваме на безплатен оглед и вземане на размери, след което организираме изработката и монтажа.',
  },
  {
    question: 'Колко струват мебелите по поръчка в Дупница?',
    answer: 'Цената зависи от вида мебел, размерите, материалите, механизмите и сложността. Даваме конкретна оферта след безплатния оглед. 3D проектът се заплаща, но цената му се приспада при възлагане на поръчката.',
  },
  {
    question: 'Идвате ли на оглед в Дупница?',
    answer: 'Да, идваме на оглед в Дупница безплатно и без задължения. Уговаряме удобно за вас време. Обадете се на 0876 081 199 или попълнете формата.',
  },
  {
    question: 'Колко отнема производството и монтажът в Дупница?',
    answer: 'Стандартният производствен срок е 4–6 седмици. Монтажът в Дупница организираме след готовността на мебелите в съгласуван с клиента ден.',
  },
  {
    question: 'Правите ли 3D визуализация преди изработка?',
    answer: 'Да. 3D проектът се заплаща (от 100 € за кухня, от 50 € за гардероб/спалня/дневна), но при поръчка на мебелите приспадаме платената сума 100%.',
  },
  {
    question: 'Имате ли реализирани проекти в Дупница?',
    answer: 'Да, имаме завършени проекти в Дупница — кухни, гардероби и дневни. Можете да видите примери в нашата галерия или да се свържете с нас за референции.',
  },
]

const guideSections = [
  {
    title: 'Какво изработваме в Дупница',
    paragraphs: [
      'Обслужваме Дупница и Кюстендилска област с мебели по поръчка — кухни с различни конфигурации, вградени и корпусни гардероби, спални с легла и нощни шкафчета, ТВ секции и стелажи за дневна, офис мебели.',
      'Всеки проект започва от точните размери на помещението и се проектира според вашите нужди. Мебелите се изработват в нашата работилница в Благоевград според одобрен от вас 3D проект.',
    ],
  },
  {
    title: 'Как работим с клиенти от Дупница',
    paragraphs: [
      'Посещаваме адреса в Дупница за безплатен оглед. Вземаме точни размери, проверяваме стени, подове, отвори и изводи. Обсъждаме какви мебели искате, стилови предпочитания и ориентировъчен бюджет.',
      'След огледа изготвяме 3D проект. Проектът е платена услуга (от 100 € за кухня, от 50 € за други мебели), но при поръчка на мебелите приспадаме 100% от платената сума. Така виждате точно какво ще получите преди изработката.',
      'Изработваме мебелите в Благоевград в срок 4–6 седмици. След производството организираме доставка и монтаж в Дупница. Монтажът е включен в цената при поръчка на мебели. За изработените изделия предоставяме 2 години гаранция.',
    ],
  },
  {
    title: '3D визуализация и интериорен дизайн',
    paragraphs: [
      'Предлагаме професионална 3D визуализация на мебелите преди изработка и цялостен интериорен дизайн на помещения. Виждате точно как ще изглежда крайният резултат и можете да правите промени преди производството.',
      'За повече информация вижте нашите специални страници за 3D визуализация и интериорен дизайн.',
    ],
  },
]

const guideSteps = [
  { title: 'Запитване', description: 'Обаждате се или попълвате формата с описание на мебелите.' },
  { title: 'Оглед в Дупница', description: 'Посещаваме адреса безплатно, вземаме размери.' },
  { title: '3D проект', description: 'Визуализация с 100% приспадане при поръчка.' },
  { title: 'Изработка', description: 'Произвеждаме в Благоевград в срок 4–6 седмици.' },
  { title: 'Монтаж', description: 'Доставяме и монтираме в Дупница с гаранция.' },
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
    href: '/услуги/3d-визуализация/',
    label: '3D визуализация',
    description: 'Професионална визуализация преди изработка.',
  },
  {
    href: '/проекти/dnevna-po-poruchka-dupnitsa/',
    label: 'Проект в Дупница',
    description: 'Дневна по поръчка, реализирана в Дупница.',
  },
  {
    href: '/проекти/',
    label: 'Всички проекти',
    description: 'Примери от Дупница и региона.',
  },
  {
    href: '/контакти/',
    label: 'Контакти',
    description: 'Адрес, телефон и форма за оглед.',
  },
]

const features = [
  'Базирани в Благоевград, обслужваме Дупница',
  'Безплатен оглед и вземане на размери',
  'Платен 3D проект с приспадане при поръчка',
  'Типичен срок за изработка: 4–6 седмици',
  '2 години гаранция',
  'Над 10 години опит и 100+ проекта',
]

export default function DupnicaPage() {
  return (
    <>
      <ServiceSchema
        name="Мебели по поръчка в Дупница"
        url="https://domexpertmebel.com/дупница/"
        city="Дупница"
        description="Проектиране, изработка, доставка и монтаж на мебели по поръчка в Дупница и Кюстендилска област."
      />
      <FAQSchema items={faqItems} />
      <BreadcrumbSchema items={[
        { name: 'Начало', url: 'https://domexpertmebel.com/' },
        { name: 'Мебели Дупница', url: 'https://domexpertmebel.com/дупница/' },
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
            <span style={{ color: '#3C2A18', fontWeight: 500 }}>Мебели Дупница</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <span className="eyebrow-pill">Дупница</span>
              <h1 className="font-display font-bold text-charcoal leading-[1.05]" style={{ fontSize: 'var(--text-h1)' }}>
                Мебели по поръчка в Дупница
              </h1>
              <p className="font-body text-warm-gray leading-relaxed" style={{ fontSize: '1.05rem' }}>
                Базата на Dom Expert Мебел е в Благоевград, а обслужваме клиенти в Дупница и Кюстендилска област. Изработваме кухни, гардероби, спални и офис мебели по поръчка. Идваме на безплатен оглед и вземане на размери; 3D проектът се заплаща и се приспада от цената при възлагане.
              </p>

              {/* GEO key facts */}
              <ul className="font-body text-sm text-warm-gray space-y-1">
                <li>• Обслужваме Дупница и Кюстендилска област</li>
                <li>• Безплатен оглед на място в Дупница</li>
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
                  { label: 'Проект в Дупница', href: '/проекти/dnevna-po-poruchka-dupnitsa/' },
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
        title="Мебели по поръчка в Дупница и Кюстендилска област"
        intro="Обслужваме Дупница с безплатен оглед на място, изработка в работилницата в Благоевград и монтаж с гаранция. Ето как работим и какво можем да изработим за вас."
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
              Често задавани въпроси за Дупница
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
