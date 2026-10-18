import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Phone, ChevronDown } from 'lucide-react'
import QuoteForm from '@/components/ui/QuoteForm'
import ServiceGuide from '@/components/ui/ServiceGuide'
import ServiceLinks from '@/components/ui/ServiceLinks'
import { QuickFactsList } from '@/components/ui/QuickFacts'
import GoogleReviews from '@/components/home/GoogleReviews'
import GoogleBusinessProfile from '@/components/home/GoogleBusinessProfile'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import FAQSchema from '@/components/seo/FAQSchema'
import ServiceSchema from '@/components/seo/ServiceSchema'
import ProjectCards from '@/components/ui/ProjectCards'
import { projectsByCity } from '@/lib/projects'
import { completePageMetadata } from '@/lib/seo'

export const metadata: Metadata = completePageMetadata({
  title: { absolute: 'Мебели по поръчка Благоевград – кухни и спални | Dom Expert' },
  description: 'Семейна мебелна работилница в Благоевград от 2012 г. Кухни, гардероби и спални по поръчка с 3D проект. 5★ в Google, 2 г. гаранция. ☎ 0876 081 199',
  alternates: { canonical: 'https://domexpertmebel.com/благоевград/' },
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    siteName: 'Dom Expert Мебел',
    url: 'https://domexpertmebel.com/благоевград/',
    title: 'Мебели по поръчка Благоевград – кухни и спални | Dom Expert',
    description: 'Семейна мебелна работилница в Благоевград от 2012 г. Кухни, гардероби и спални по поръчка с 3D проект. 5★ в Google, 2 г. гаранция. ☎ 0876 081 199',
    images: [{ url: '/images/og/home.webp', width: 1200, height: 630, alt: 'Примерна интериорна визуализация за мебели по поръчка в Благоевград' }],
  },
})


const faqItems = [
  {
    question: 'Правите ли кухни по поръчка в Благоевград?',
    answer: 'Да. Базирани сме в Благоевград и поемаме измерването, проекта, изработката и монтажа на кухни в града и региона. Огледът на адрес — 50 €, приспадат се от цената при поръчка. 3D проектът се заплаща, а при поръчка на кухнята приспадаме платената за него сума.',
  },
  {
    question: 'Колко струва кухня по поръчка в Благоевград?',
    answer: 'Цената зависи от точните размери, броя модули, лицата, плота, механизмите, осветлението и подготовката за уредите. След огледа изготвяме конкретна оферта за избраните решения.',
  },
  {
    question: 'Колко бързо можете да направите мебели в Благоевград?',
    answer: 'Стандартният срок за производство е 4–6 седмици от одобряване на проекта. За монтаж на готови мебели или при спешни случаи можем да реагираме по-бързо.',
  },
  {
    question: 'Имате ли реализирани проекти в Благоевград?',
    answer: 'Да, имаме реализирани проекти в Благоевград — базирани сме тук от 2012 г. Можете да видите примери в нашата галерия с реализирани проекти.',
  },
]

const features = [
  'База и екип в Благоевград',
  'Оглед на адрес — 50 €, приспадат се при поръчка',
  'Платен 3D проект с приспадане при поръчка',
  'Монтаж в Благоевград и региона',
  '2 години гаранция на всички изделия',
  'Опит от 2012 г. и 100+ реализирани проекта',
]

const quickLinks = [
  { label: 'Кухни', href: '/услуги/кухни-по-поръчка/' },
  { label: 'Гардероби', href: '/услуги/гардероби-по-поръчка/' },
  { label: 'Спални', href: '/услуги/спални-по-поръчка/' },
  { label: 'За нас', href: '/за-нас/' },
]

const guideSections = [
  {
    title: 'Какво изработваме',
    paragraphs: [
      'Поемаме кухни, вградени и корпусни гардероби, легла и цялостни спални, дневни и офис мебели. Всеки проект започва от реалните размери и начина, по който ще използвате помещението.',
      'Можем да изпълним отделна мебел или да планираме няколко свързани зони. Преди офертата уточняваме обхвата, материалите, механизмите, монтажа и всички допълнителни елементи.',
    ],
  },
  {
    title: 'Оглед на адрес в Благоевград',
    paragraphs: [
      'Посещаваме адреса, вземаме точни размери и проверяваме стени, под, отвори и налични изводи. Огледът — 50 €, приспадат се от цената при поръчка.',
      'При кухня отбелязваме вода, ток, аспирация и уреди; при гардероб или спалня проверяваме нишите, свободното отваряне и проходите. Това намалява риска от корекции при монтажа.',
    ],
  },
  {
    title: 'Проект и ясна оферта',
    paragraphs: [
      '3D проектът е платена услуга. Ако ни възложите изработката на кухнята или другите мебели, приспадаме платената за проекта сума от стойността на поръчката.',
      'Крайната цена се влияе от размерите, броя модули, материалите, плотовете, механизмите, осветлението и сложността на монтажа. Получавате оферта за конкретно описан обхват, а не обща цена без размери.',
    ],
  },
  {
    title: 'Срок, монтаж и гаранция',
    paragraphs: [
      'Обичайният срок за производство е 4–6 седмици след одобряване на проекта и избора на материали. Ако изпълнението изисква повече време, уточняваме това преди старта.',
      'Организираме доставката и монтажа в Благоевград и региона. За изработените изделия предоставяме 2 години гаранция и съдействие при възникнал въпрос след монтажа.',
    ],
  },
]

const guideSteps = [
  { title: 'Запитване', description: 'Пращате снимки и описание на мебелите и адрес в Благоевград.' },
  { title: 'Консултация', description: 'Изпращате снимки и размери, обсъждаме по телефона идеите и бюджета.' },
  { title: 'Оглед и размери', description: 'Посещаваме адреса, вземаме точни размери — 50 €, приспадат се.' },
  { title: '3D проект', description: 'Професионална визуализация — от 100 € (кухня) / от 50 € (друго), приспада се.' },
  { title: 'Изработка', description: 'Произвеждаме в Благоевград в срок 4–6 седмици.' },
  { title: 'Доставка и монтаж', description: 'Доставяме и монтираме с 2 г. гаранция.' },
]

const guideLinks = [
  {
    href: '/проекти/garderob-sistema-blagoevgrad/',
    label: 'Гардеробна система',
    description: 'Реализиран проект за вградено съхранение в Благоевград.',
  },
  {
    href: '/проекти/spalna-tapicirano-leglo-blagoevgrad/',
    label: 'Спалня с тапицирано легло',
    description: 'Цялостна спалня, изпълнена за клиент в Благоевград.',
  },
  {
    href: '/проекти/ofis-blagoevgrad/',
    label: 'Офис обзавеждане',
    description: 'Бюра, архивни шкафове и рецепция по индивидуален проект.',
  },
  {
    href: '/услуги/3d-визуализация/',
    label: '3D визуализация',
    description: 'Професионална визуализация на мебелите преди изработка.',
  },
  {
    href: '/услуги/интериорен-дизайн/',
    label: 'Интериорен дизайн',
    description: 'Цялостен дизайн на помещения с дизайн + производство на едно място.',
  },
  {
    href: '/блог/tseni-mebeli-po-poruchka-balgariya/',
    label: 'Как се определя цената',
    description: 'Практично обяснение на основните фактори в офертата.',
  },
  {
    href: '/проекти/',
    label: 'Всички реализирани проекти',
    description: 'Разгледайте примери от Благоевград, София и региона.',
  },
  {
    href: '/контакти/',
    label: 'Адрес и оглед 50 €',
    description: 'Вижте контактите ни и уговорете удобно време за посещение.',
  },
]

export default function BlagoevgradPage() {
  return (
    <>
      <ServiceSchema
        name="Мебели по поръчка в Благоевград"
        url="https://domexpertmebel.com/благоевград/"
        city="Благоевград"
        description="Проектиране, изработка и монтаж на мебели по поръчка в Благоевград и региона."
      />
      <FAQSchema items={faqItems} />
      <BreadcrumbSchema items={[
        { name: 'Начало', url: 'https://domexpertmebel.com/' },
        { name: 'Мебели Благоевград', url: 'https://domexpertmebel.com/благоевград/' },
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
            <span style={{ color: '#3C2A18', fontWeight: 500 }}>Мебели Благоевград</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <span className="eyebrow-pill">Благоевград</span>
              <h1 className="font-display font-bold text-charcoal leading-[1.05]" style={{ fontSize: 'var(--text-h1)' }}>
                Мебели по поръчка в Благоевград
              </h1>
              <p className="font-body text-warm-gray leading-relaxed" style={{ fontSize: '1.05rem' }}>
                Dom Expert Мебел е семейна мебелна работилница в Благоевград, която от 2012 г. проектира и изработва кухни, гардероби, спални и офис мебели по поръчка — с 3D проект преди изработка и монтаж от нашия екип. Огледът е 50 €, 3D проектът е от 100 € за кухня и от 50 € за друга мебел (и двете се приспадат при поръчка), а изработката отнема 4–6 седмици след одобрение.
              </p>

              <QuickFactsList />

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
                <h2 className="font-display font-semibold text-charcoal text-xl mb-2">Запитване за оферта</h2>
                <p className="font-body text-warm-gray text-sm mb-6">
                  Огледът — 50 €, приспадат се. 3D проектът се заплаща и се приспада при поръчка.
                </p>
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceGuide
        eyebrow="Местна услуга"
        title="От размерите до монтажа — всичко на едно място"
        intro="Когато мебелите са по поръчка, точният оглед и ясното задание са толкова важни, колкото и самата изработка. Ето как работим с клиентите си в Благоевград."
        sections={guideSections}
        steps={guideSteps}
        links={guideLinks}
      />

      {/* ── Kitchens in Blagoevgrad ── */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-warm-white)' }}>
        <div className="container-main max-w-3xl">
          <span className="eyebrow-pill">Кухни</span>
          <h2 className="font-display font-bold heading-gradient mb-5" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}>
            Кухни по поръчка в Благоевград
          </h2>
          <div className="space-y-4 font-body text-warm-gray leading-relaxed" style={{ fontSize: '1rem' }}>
            <p>
              Кухнята е проектът, при който точните размери и добре планираното разпределение имат най-голямо значение. Затова започваме с оглед на адрес в Благоевград — 50 €, които се приспадат от цената при поръчка.
            </p>
            <p>
              След огледа изготвяме 3D проект на кухнята (от 100 €, също се приспада при поръчка), за да видите разположението на шкафовете, уредите и плота преди изработка. След одобрение изработваме кухнята в собствения ни цех в Благоевград за 4–6 седмици, а монтажът се извършва от нашия екип.
            </p>
            <p>
              Повече за видовете кухни, материалите и механизмите вижте на страницата за{' '}
              <Link href="/услуги/кухни-по-поръчка/" className="text-walnut font-medium underline underline-offset-2 hover:no-underline">
                кухни по поръчка в Благоевград
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* ── Projects in Blagoevgrad ── */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container-main">
          <div className="max-w-3xl mb-10">
            <span className="eyebrow-pill">Проекти</span>
            <h2 className="section-title text-left">Проекти в Благоевград</h2>
            <p className="font-body text-warm-gray leading-relaxed mt-4" style={{ fontSize: '1rem' }}>
              Реализирани обекти и 3D проекти за клиенти в Благоевград. Всеки проект е обозначен, а изображенията са визуализации, а не снимки от обектите.
            </p>
          </div>
          <ProjectCards items={projectsByCity('Благоевград')} />
        </div>
      </section>

      <GoogleBusinessProfile />

      <GoogleReviews />

      {/* ── FAQ ── */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container-main max-w-3xl">
          <div className="text-center mb-10">
            <span className="eyebrow-pill">Въпроси и отговори</span>
            <h2 className="font-display font-bold heading-gradient" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}>
              Често задавани въпроси за Благоевград
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

      <ServiceLinks title="Всички услуги за Благоевград" background="var(--color-warm-white)" />

      {/* ── Other locations ── */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-warm-white)' }}>
        <div className="container-main">
          <h2 className="font-display font-semibold text-charcoal text-center mb-8" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)' }}>
            Обслужваме и други градове
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'Мебели София', href: '/софия/' },
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
