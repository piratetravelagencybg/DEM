import type { Metadata } from 'next'
import Image from 'next/image'
import { createPageMetadata } from '@/lib/seo'

// Кратка презентация за хотели, партньори и собственици — линкът се праща във Viber/имейл.
// Отваря се навсякъде (вграденият браузър на Viber/Android не показва PDF). Не се индексира.
export const metadata: Metadata = createPageMetadata({
  title: 'Презентация — Dom Expert Мебел',
  description: 'Мебели по поръчка от производителя: собствен цех в Благоевград, 14 години опит, кухни, гардероби, спални и обзавеждане за хотели.',
  path: '/prezentaciya/',
  index: false,
})

const P = '/portfolio'
const projects = [
  { src: `${P}/kuhnya-domexpert-v17/3d-vizualizatsiya-kuhnya-s-ostrov-blagoevgrad-obsht-izgled-1.webp`, caption: 'Кухня с извит остров' },
  { src: `${P}/3d-proekt-kuhnya-mramor-i-vino-blagoevgrad/3d-vizualizatsiya-kuhnya-mramor-i-vino-blagoevgrad-obsht-izgled-1.webp`, caption: 'Кухня с мраморен гръб и стена за вино' },
  { src: `${P}/3d-proekt-salon-za-krasota/3d-vizualizatsiya-salon-za-krasota-friziorski-kat-2.webp`, caption: 'Салон за красота — обзавеждане по поръчка' },
  { src: '/images/visualizations/24-modern-wardrobe-led-lighting-01.webp', caption: 'Гардероб с LED осветление' },
]

const V = '/video/prezentaciya'
const videos = [
  { src: `${V}/kuhnya.mp4`, poster: `${V}/kuhnya.jpg`, caption: 'Кухня по поръчка' },
  { src: `${V}/salon.mp4`, poster: `${V}/salon.jpg`, caption: 'Салон за красота' },
  { src: `${V}/garderob.mp4`, poster: `${V}/garderob.jpg`, caption: 'Гардероб по поръчка' },
]

const why = [
  ['Цени на производител', 'Работим от собствения ни цех — без посредник и без търговска надценка по веригата.'],
  ['Egger и Blum', 'Плоскости Egger и механизми Blum, а при нужда — по-изгодни материали с добро качество за цената.'],
  ['3D визуализация', 'Виждате мебелите в Вашето пространство, преди да започне изработката.'],
  ['Оферта до 48 часа', 'След проект или размери получавате ясна оферта в рамките на два дни.'],
  ['Гаранция 2 години', 'Отговаряме за всичко, което изработваме и монтираме.'],
  ['По точни размери', 'Всеки сантиметър се използва — особено важно при мансарди, ниши и малки апартаменти.'],
]

const forWho = [
  ['Хотели и къщи за гости', 'Обзавеждане и обновяване на стаи, рецепция и ресторант — удобно извън сезона.'],
  ['Собственици на апартаменти под наем', 'Кухня, гардероби и легла по размер, бърз монтаж — апартаментът е готов за гости.'],
  ['Дизайнери и архитекти', 'Изработваме точно по Вашите чертежи; клиентът остава Ваш. 10% партньорско възнаграждение.'],
  ['Строители, агенции и търговци', 'Пакет за купувачите, обзавеждане на имоти, производство по Ваши модели.'],
]

const steps = [
  ['Снимки и размери', 'Изпращате ни снимки, скица или размери.'],
  ['Проект и 3D', 'Подготвяме проект и визуализация.'],
  ['Оферта', 'Ясна цена до 48 часа.'],
  ['Изработка', 'В собствения ни цех в Благоевград.'],
  ['Доставка и монтаж', 'С гаранция 2 години.'],
]

export default function Presentation() {
  return (
    <article className="bg-warm-white">
      {/* Корица */}
      <section className="relative" style={{ minHeight: '78vh', display: 'flex', alignItems: 'flex-end' }}>
        <Image src={projects[0].src} alt="Кухня по поръчка — 3D визуализация от Dom Expert Мебел" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 30%, rgba(20,14,10,0.85) 100%)' }} />
        <div className="relative w-full px-5 pb-10 pt-24 mx-auto" style={{ maxWidth: 760 }}>
          <p className="font-body uppercase tracking-[0.2em] text-sand" style={{ fontSize: '0.75rem' }}>Dom Expert Мебел · DEM</p>
          <h1 className="font-display text-white mt-2" style={{ fontSize: 'clamp(2.1rem, 8vw, 3.4rem)', lineHeight: 1.08 }}>Мебели по поръчка<br />от производителя</h1>
          <p className="font-body text-white/85 mt-4" style={{ fontSize: '1.05rem', lineHeight: 1.6 }}>
            Собствен цех в Благоевград и 14 години опит — кухни, гардероби и спални, както и обзавеждане за хотели и обществени сгради.
          </p>
        </div>
      </section>

      <div className="mx-auto px-5" style={{ maxWidth: 760 }}>
        {/* Защо DEM */}
        <section className="py-12">
          <p className="font-body uppercase tracking-[0.18em] text-walnut" style={{ fontSize: '0.75rem' }}>Защо DEM</p>
          <h2 className="font-display text-charcoal mt-1" style={{ fontSize: 'clamp(1.6rem, 6vw, 2.2rem)' }}>Качество на производител, без посредник</h2>
          <div className="grid gap-4 mt-6 sm:grid-cols-2">
            {why.map(([t, d]) => (
              <div key={t} className="rounded-xl bg-cream p-5">
                <h3 className="font-body font-semibold text-charcoal" style={{ fontSize: '1.02rem' }}>{t}</h3>
                <p className="font-body text-warm-gray mt-1" style={{ fontSize: '0.95rem', lineHeight: 1.55 }}>{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Проекти */}
        <section className="pb-12">
          <p className="font-body uppercase tracking-[0.18em] text-walnut" style={{ fontSize: '0.75rem' }}>Наши проекти</p>
          <h2 className="font-display text-charcoal mt-1" style={{ fontSize: 'clamp(1.6rem, 6vw, 2.2rem)' }}>От идеята до готовия интериор</h2>
          <p className="font-body text-warm-gray mt-2" style={{ fontSize: '0.95rem' }}>3D визуализации, изработени от нашия екип за клиенти.</p>
          <div className="grid gap-5 mt-6 sm:grid-cols-2">
            {projects.map((p) => (
              <figure key={p.src} className="m-0">
                <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: '4 / 3' }}>
                  <Image src={p.src} alt={p.caption} fill sizes="(max-width: 640px) 100vw, 380px" className="object-cover" />
                </div>
                <figcaption className="font-body text-warm-gray mt-2" style={{ fontSize: '0.9rem' }}>{p.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* 3D видео — вертикални, плъзгат се настрани; зареждат се чак при натискане */}
        <section className="pb-12">
          <p className="font-body uppercase tracking-[0.18em] text-walnut" style={{ fontSize: '0.75rem' }}>3D видео</p>
          <h2 className="font-display text-charcoal mt-1" style={{ fontSize: 'clamp(1.6rem, 6vw, 2.2rem)' }}>Вижте проектите в движение</h2>
          <p className="font-body text-warm-gray mt-2" style={{ fontSize: '0.95rem' }}>Натиснете видео, за да го пуснете. Плъзнете настрани за следващото.</p>
          <div className="mt-6 flex gap-4 overflow-x-auto pb-3" style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}>
            {videos.map((v) => (
              <figure key={v.src} className="m-0 shrink-0" style={{ width: 'min(72vw, 260px)', scrollSnapAlign: 'start' }}>
                <video src={v.src} poster={v.poster} controls playsInline preload="none" className="w-full rounded-xl bg-charcoal" style={{ aspectRatio: '9 / 16', objectFit: 'cover' }} />
                <figcaption className="font-body text-warm-gray mt-2" style={{ fontSize: '0.9rem' }}>{v.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* За кого */}
        <section className="pb-12">
          <p className="font-body uppercase tracking-[0.18em] text-walnut" style={{ fontSize: '0.75rem' }}>С кого работим</p>
          <h2 className="font-display text-charcoal mt-1" style={{ fontSize: 'clamp(1.6rem, 6vw, 2.2rem)' }}>Работим заедно</h2>
          <div className="mt-6 space-y-4">
            {forWho.map(([t, d]) => (
              <div key={t} className="border-l-2 border-walnut pl-4">
                <h3 className="font-body font-semibold text-charcoal" style={{ fontSize: '1.02rem' }}>{t}</h3>
                <p className="font-body text-warm-gray mt-1" style={{ fontSize: '0.95rem', lineHeight: 1.55 }}>{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Как работим */}
        <section className="pb-12">
          <p className="font-body uppercase tracking-[0.18em] text-walnut" style={{ fontSize: '0.75rem' }}>Как работим</p>
          <h2 className="font-display text-charcoal mt-1" style={{ fontSize: 'clamp(1.6rem, 6vw, 2.2rem)' }}>Пет ясни стъпки</h2>
          <ol className="mt-6 space-y-3 list-none p-0">
            {steps.map(([t, d], i) => (
              <li key={t} className="flex gap-4 items-start rounded-xl bg-cream p-4">
                <span className="font-display text-walnut" style={{ fontSize: '1.6rem', lineHeight: 1 }}>{i + 1}</span>
                <span><b className="font-body text-charcoal">{t}</b><br /><span className="font-body text-warm-gray" style={{ fontSize: '0.95rem' }}>{d}</span></span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {/* Контакт */}
      <section className="bg-charcoal text-white px-5 py-12">
        <div className="mx-auto" style={{ maxWidth: 760 }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.6rem, 6vw, 2.2rem)' }}>Да поговорим за Вашия проект</h2>
          <p className="font-body text-white/70 mt-2">Костадин Христов, управител · DEM — Дом Експерт Мебел</p>
          <div className="grid gap-3 mt-6 sm:grid-cols-3">
            <a href="tel:+359876081199" className="rounded-xl bg-walnut text-white text-center font-body font-semibold py-4">📞 0876 081 199</a>
            <a href="viber://chat?number=%2B359876081199" className="rounded-xl text-center font-body font-semibold py-4" style={{ background: '#7360F2', color: '#fff' }}>Viber</a>
            <a href="mailto:domexpertmebel@gmail.com" className="rounded-xl bg-white/10 text-white text-center font-body font-semibold py-4">Имейл</a>
          </div>
          <p className="font-body text-white/50 mt-6" style={{ fontSize: '0.9rem' }}>domexpertmebel.com · Благоевград</p>
        </div>
      </section>
    </article>
  )
}
