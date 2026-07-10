import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import CTABar from '@/components/home/CTABar'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'

const MONTHS = [
  'януари', 'февруари', 'март', 'април', 'май', 'юни',
  'юли', 'август', 'септември', 'октомври', 'ноември', 'декември',
]
function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-')
  return `${day} ${MONTHS[parseInt(month) - 1]} ${year}`
}

interface Props {
  params: { slug: string }
}

const posts: Record<string, {
  title: string
  description: string
  category: string
  date: string
  readTime: string
  image: string
  content: string
}> = {
  'kak-da-izberem-kuhnya-po-poruchka': {
    title: 'Как да изберем кухня по поръчка — 7 въпроса преди поръчката',
    description: 'Преди да поръчате кухня по поръчка, задайте си тези 7 въпроса за да вземете правилното решение.',
    category: 'Кухни',
    date: '2025-06-01',
    readTime: '5 мин',
    image: '/images/real/kuhnya-01.png',
    content: `Изборът на кухня по поръчка е важно решение, което ще определи облика на дома ви за години напред. Преди да се срещнете с мебелна фирма, отговорете на тези ключови въпроси.

## 1. Какъв е размерът на кухненското ви пространство?

Измерете точните размери — ширина, дължина и височина. Включете нишите, прозорците и вратите. Точните измервания са основата на добрия проект.

## 2. Какъв стил предпочитате?

Модерен минимализъм, класически, рустик или индустриален? Разгледайте снимки в Pinterest и Instagram за вдъхновение преди срещата с дизайнера.

## 3. Какъв е вашият бюджет?

Бъдете честни за бюджета си. Добра мебелна фирма ще намери решение за всеки бюджет без да жертва качеството там, където е важно.

## 4. Кои уреди ще вградите?

Уредите определят размерите и позициите на шкафовете. Решете предварително дали искате вградена фурна, микровълнова, хладилник side-by-side или стандартен.

## 5. Какви материали предпочитате?

МДФ гланц, МДФ мат, ПДЧ с декоративно фолио или масив? Всеки материал има плюсове и минуси по отношение на издръжливост, поддръжка и цена.

## 6. Нужен ли ви е остров?

Кухненският остров е удобен, но изисква минимум 90-100 см свободно пространство около него. Проверете дали пространството ви го позволява.

## 7. Какъв е срокът?

Кухните по поръчка се изработват 4-6 седмици. Планирайте предварително, особено ако сте при ремонт.`,
  },
  'garderob-po-poruchka-ili-gotov': {
    title: 'Гардероб по поръчка или готов — кое е по-изгодно?',
    description: 'Сравняваме плюсовете и минусите на гардероб по поръчка спрямо готов за да вземете правилното решение.',
    category: 'Гардероби',
    date: '2025-05-15',
    readTime: '4 мин',
    image: '/images/real/garderob-01.png',
    content: `Въпросът "гардероб по поръчка или готов?" е един от най-честите, които получаваме. Отговорът зависи от конкретната ситуация.

## Готов гардероб: плюсове и минуси

**Плюсове:**
- По-бърза доставка (обикновено 1-2 седмици)
- По-ниска начална цена
- Можете да го видите физически преди покупка

**Минуси:**
- Стандартни размери — не пасва перфектно на нестандартни ниши
- Ограничен избор на вътрешна конфигурация
- По-ниско качество на материалите при масовото производство

## Гардероб по поръчка: плюсове и минуси

**Плюсове:**
- Точни размери за вашето пространство
- Пълна свобода на вътрешната конфигурация
- По-добри материали и изработка
- Оптимизация на всеки сантиметър

**Минуси:**
- По-дълъг срок (3-4 седмици)
- По-висока цена

## Кога да изберете по поръчка?

Изберете гардероб по поръчка, ако:
- Имате нестандартна ниша или наклонен таван
- Искате максимално оползотворяване на пространството
- Нуждаете се от специфични отделения

За стандартно пространство и ограничен бюджет — готовият гардероб може да е добро решение.`,
  },
  'tseni-mebeli-po-poruchka-balgariya': {
    title: 'Колко струват мебелите по поръчка в България?',
    description: 'Пълно ръководство за цените на мебели по поръчка в България — кухни, гардероби, спални.',
    category: 'Съвети',
    date: '2025-04-20',
    readTime: '6 мин',
    image: '/images/real/kuhnya-04.png',
    content: `Цените на мебелите по поръчка в България варират значително в зависимост от материалите, размерите и производителя.

## Кухни по поръчка

Стандартна кухня с корпуси, врати и плот (без уреди):
- **Бюджетна**: 2,000 — 4,000 лв.
- **Средна**: 4,000 — 8,000 лв.
- **Висок клас**: 8,000+ лв.

## Гардероби по поръчка

Вграден гардероб 2-3 метра ширина:
- **Базов**: 800 — 1,500 лв.
- **Стандартен**: 1,500 — 3,000 лв.
- **Висок клас**: 3,000+ лв.

## Спални по поръчка

Цялостна спалня (легло + нощни + гардероб):
- **Бюджетна**: 2,500 — 5,000 лв.
- **Средна**: 5,000 — 10,000 лв.

## Какво влияе на цената?

1. **Материал** — МДФ гланц е по-скъп от ПДЧ
2. **Размер** — повече квадратура = повече материал
3. **Оборудване** — качеството на пантите, писти и дръжките
4. **Плот** — гранит и кварц са по-скъпи от ламинат

## Съвет

Не избирайте само по цена. Поискайте оферта от няколко фирми, сравнете материалите и гаранцията — не само крайната сума.`,
  },
  'mebeli-malak-apartament': {
    title: 'Как да обзаведем малък апартамент умно',
    description: 'Практични идеи за обзавеждане на малък апартамент — как мебелите по поръчка спестяват пространство.',
    category: 'Съвети',
    date: '2025-03-10',
    readTime: '5 мин',
    image: '/images/real/dnevna-01.png',
    content: `Малкото пространство не означава компромис с комфорта. Ето как мебелите по поръчка могат да трансформират малкия апартамент.

## 1. Вградени шкафове вместо свободностоящи

Вградените шкафове използват всеки сантиметър — включително ниши, пространство под стълбите и ъглите. Печелите 20-30% повече съхранение.

## 2. Леглото с ракла

Леглото с ракла за съхранение е незаменимо в малките апартаменти. Предлага огромно пространство за завивки, сезонни дрехи и резервни вещи.

## 3. Сгъваема маса или остров

В малка кухня или студио — сгъваемата маса е идеална. Използвайте я само когато е нужна, а останалото време тя е компактна.

## 4. Многофункционална дневна

Диван с ракла + холна маса с повдигащ се плот = всичко необходимо без претрупване.

## 5. Вертикалното пространство

В малки помещения гледайте нагоре! Стелажи до тавана, вградени шкафове от пода до тавана — удвоявате капацитета за съхранение.

## 6. Огледалните врати

Гардеробите с огледални врати визуално удвояват пространството и са функционални едновременно.

Свържете се с нас за безплатна консултация и 3D проект за вашия малък апартамент.`,
  },
  'mebeli-po-poruchka-tendentsii-2026': {
    title: 'Мебели по поръчка 2026 — тенденции и цени в България',
    description: 'Актуални тенденции при мебелите по поръчка в България за 2026 г. Цени, материали и защо все повече хора избират мебели по поръчка пред готови.',
    category: 'Съвети',
    date: '2026-07-10',
    readTime: '5 мин',
    image: '/images/real/kuhnya-04.png',
    content: `През 2026 година все повече български семейства избират мебели по поръчка вместо готови решения от магазина. Причините са няколко — нестандартни пространства в новото строителство, желание за индивидуалност и разочарование от качеството на масовото производство.

## Водещи тенденции при мебелите по поръчка за 2026

## Топли естествени материали

Масивното дърво, фурнирът и натуралните тъкани доминират. Клиентите все по-рядко избират студен бял гланц и все по-често търсят топли дървесни тонове — орех, дъб, бук.

## Функционални решения за малки пространства

Новото строителство в България предлага по-малки апартаменти. Мебелите по поръчка са идеалното решение — всяка ниша, всеки сантиметър се използва максимално.

## Интегрирано осветление

Вградените LED ленти в кухните и гардеробите са вече стандарт, не лукс.

## Минимализъм с топлина

Чисти линии, без излишни орнаменти, но с топли материали и цветове — това е балансът, който клиентите търсят.

## Цени на мебели по поръчка в България за 2026

Цените варират значително в зависимост от материалите и сложността:

**Кухня по поръчка** — от 3,000 лв. до 15,000+ лв.
**Гардероб по поръчка** — от 1,500 лв. до 6,000 лв.
**Спалня по поръчка** — от 2,000 лв. до 8,000 лв.
**Цялостно обзавеждане** — индивидуална оферта

При Dom Expert Мебел предлагаме безплатна консултация и оферта — без ангажимент.

## Как да изберем фирма за мебели по поръчка

При избора на производител обърнете внимание на:

- Портфолио от реализирани проекти — поискайте снимки на завършени обекти
- Гаранция — минимум 2 години на изработката
- 3D проект преди поръчка — задължително условие за сериозна фирма
- Прозрачно ценообразуване — офертата трябва да включва всичко

## Заключение

Мебелите по поръчка в България стават все по-достъпни и все по-търсени. Ако обзавеждате нов дом или правите ремонт — свържете се с нас за безплатна консултация и 3D проект.`,
  },
}

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = posts[params.slug]
  if (!post) return {}
  return {
    title: { absolute: `${post.title} | Dom Expert Мебел` },
    description: post.description,
    alternates: { canonical: `https://domexpertmebel.com/блог/${params.slug}/` },
    openGraph: {
      type: 'article',
      publishedTime: post.date,
      images: [{ url: `https://domexpertmebel.com${post.image}`, width: 1200, height: 630, alt: post.title }],
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = posts[params.slug]
  if (!post) notFound()

  const sections = post.content.split('\n\n').filter(Boolean)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: [`https://domexpertmebel.com${post.image}`],
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: 'Dom Expert Мебел',
      url: 'https://domexpertmebel.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Dom Expert Мебел',
      logo: {
        '@type': 'ImageObject',
        url: 'https://domexpertmebel.com/images/logo-icon.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://domexpertmebel.com/блог/${params.slug}/`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BreadcrumbSchema items={[
        { name: 'Начало', url: 'https://domexpertmebel.com/' },
        { name: 'Блог', url: 'https://domexpertmebel.com/блог/' },
        { name: post.title, url: `https://domexpertmebel.com/блог/${params.slug}/` },
      ]} />
      <div className="pt-24">
        {/* Hero */}
        <div className="relative h-72 lg:h-96">
          <Image src={post.image} alt={post.title} fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-charcoal/20" />
        </div>

        <section className="section-py bg-cream">
          <div className="container-main max-w-3xl">
            <Link href="/блог/" className="inline-flex items-center gap-2 text-warm-gray hover:text-walnut text-sm mb-6 transition-colors font-body">
              <ArrowLeft size={16} /> Назад към блога
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <Badge variant="walnut">{post.category}</Badge>
              <span className="flex items-center gap-1.5 text-warm-gray text-sm font-body">
                <Calendar size={14} /> {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5 text-warm-gray text-sm font-body">
                <Clock size={14} /> {post.readTime} четене
              </span>
            </div>

            <h1 className="font-display font-semibold text-charcoal mb-8" style={{ fontSize: 'var(--text-h1)' }}>
              {post.title}
            </h1>

            {/* Content */}
            <div className="prose-custom space-y-5">
              {sections.map((section, i) => {
                if (section.startsWith('## ')) {
                  return <h2 key={i} className="font-display font-semibold text-charcoal text-2xl mt-8 mb-3">{section.replace('## ', '')}</h2>
                }
                if (section.startsWith('**')) {
                  const parts = section.split('\n')
                  return (
                    <div key={i} className="space-y-1">
                      {parts.map((p, j) => {
                        if (p.startsWith('**') && p.endsWith('**')) {
                          return <p key={j} className="font-body font-semibold text-charcoal">{p.replace(/\*\*/g, '')}</p>
                        }
                        if (p.startsWith('- ')) {
                          return <p key={j} className="font-body text-warm-gray ml-4">• {p.replace('- ', '')}</p>
                        }
                        return <p key={j} className="font-body text-warm-gray leading-relaxed">{p}</p>
                      })}
                    </div>
                  )
                }
                return <p key={i} className="font-body text-warm-gray leading-relaxed">{section}</p>
              })}
            </div>

            {/* CTA */}
            <div className="mt-12 p-8 bg-walnut rounded-card text-center">
              <h3 className="font-display font-semibold text-white text-2xl mb-3">Готови да започнем?</h3>
              <p className="font-body text-white/70 mb-6">Безплатна консултация и 3D проект.</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/контакти/" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-walnut font-medium rounded-btn hover:bg-cream transition-colors font-body">
                  Изпратете запитване →
                </Link>
                <Link href="/за-нас/" className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white font-medium rounded-btn hover:bg-white/10 transition-colors font-body">
                  За нас
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <CTABar />
    </>
  )
}
