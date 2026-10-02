import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Phone, ChevronDown } from 'lucide-react'
import QuoteForm from '@/components/ui/QuoteForm'
import ServiceGuide from '@/components/ui/ServiceGuide'
import GoogleReviews from '@/components/home/GoogleReviews'
import GoogleBusinessProfile from '@/components/home/GoogleBusinessProfile'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import FAQSchema from '@/components/seo/FAQSchema'
import LocalBusinessSchema from '@/components/seo/LocalBusinessSchema'
import ServiceSchema from '@/components/seo/ServiceSchema'
import { completePageMetadata } from '@/lib/seo'

export const metadata: Metadata = completePageMetadata({
  title: { absolute: 'Мебели по поръчка Благоевград | Dom Expert Мебел' },
  description: 'Мебели по поръчка в Благоевград. Кухни, гардероби, спални — семейна фирма с 10+ г. опит и конкурентни цени. Безплатна консултация. Тел: 0876 081 199',
  alternates: { canonical: 'https://domexpertmebel.com/благоевград/' },
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    siteName: 'Dom Expert Мебел',
    url: 'https://domexpertmebel.com/благоевград/',
    title: 'Мебели по поръчка Благоевград | Dom Expert Мебел',
    description: 'Мебели по поръчка в Благоевград. Кухни, гардероби, спални — семейна фирма с 10+ г. опит.',
    images: [{ url: '/images/og/home.webp', width: 1200, height: 630, alt: 'Примерна интериорна визуализация за мебели по поръчка в Благоевград' }],
  },
})


const faqItems = [
  {
    question: 'Правите ли кухни по поръчка в Благоевград?',
    answer: 'Да. Базирани сме в Благоевград и поемаме измерването, проекта, изработката и монтажа на кухни в града и региона. Огледът е безплатен. 3D проектът се заплаща, а при поръчка на кухнята приспадаме платената за него сума.',
  },
  {
    question: 'Колко струва кухня по поръчка в Благоевград?',
    answer: 'Цената зависи от точните размери, броя модули, лицата, плота, механизмите, осветлението и подготовката за уредите. След безплатния оглед изготвяме конкретна оферта за избраните решения.',
  },
  {
    question: 'Колко бързо можете да направите мебели в Благоевград?',
    answer: 'Стандартният срок за производство е 4–6 седмици от одобряване на проекта. За монтаж на готови мебели или при спешни случаи можем да реагираме по-бързо.',
  },
  {
    question: 'Идвате ли на оглед в Благоевград безплатно?',
    answer: 'Да, огледът и консултацията в Благоевград са напълно безплатни и без задължения. Позвънете на 0876 081 199 или попълнете формата, за да уговорим удобно за вас време.',
  },
]

const features = [
  'База и екип в Благоевград',
  'Безплатен оглед и вземане на размери',
  'Платен 3D проект с приспадане при поръчка',
  'Монтаж в Благоевград и региона',
  '2 години гаранция на всички изделия',
  'Над 10 години опит и 100+ реализирани проекта',
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
    title: 'Безплатен оглед в Благоевград',
    paragraphs: [
      'Посещаваме адреса, вземаме точни размери и проверяваме стени, под, отвори и налични изводи. Огледът и първоначалната консултация са безплатни за клиентите ни.',
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
  { title: 'Запитване', description: 'Разказвате ни какво помещение и мебели искате да обзаведете.' },
  { title: 'Безплатен оглед', description: 'Посещаваме адреса в Благоевград и вземаме точни размери.' },
  { title: 'Проект и оферта', description: 'Подготвяме платен 3D проект; сумата се приспада при поръчка на мебелите.' },
  { title: 'Изработка', description: 'Произвеждаме одобрените елементи в обичайния срок от 4–6 седмици.' },
  { title: 'Монтаж', description: 'Доставяме, монтираме и проверяваме готовото обзавеждане на място.' },
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
    label: 'Адрес и безплатен оглед',
    description: 'Вижте контактите ни и уговорете удобно време за посещение.',
  },
]

export default function BlagoevgradPage() {
  return (
    <>
      <LocalBusinessSchema />
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
                Dom Expert Мебел е семейна фирма с база в Благоевград, над 10 години опит и повече от 100 реализирани проекта. Изработваме кухни, гардероби, спални и офис мебели по поръчка, като поемаме огледа, проекта, производството и монтажа.
              </p>

              {/* GEO key facts */}
              <ul className="font-body text-sm text-warm-gray space-y-1">
                <li>• Базирани сме в Благоевград — обслужваме целия град и региона</li>
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
                  3D проектът се заплаща и се приспада при поръчка на мебелите.
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
