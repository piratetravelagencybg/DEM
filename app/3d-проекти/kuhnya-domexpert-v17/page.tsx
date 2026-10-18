import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Eye, Layers, Paintbrush } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import { completePageMetadata } from '@/lib/seo'
import { projects } from '@/lib/projects'

const PAGE_URL = 'https://domexpertmebel.com/3d-проекти/kuhnya-domexpert-v17/'
const TITLE = '3D проект на кухня с остров в Благоевград | Dom Expert'
const DESCRIPTION = '3D проект на П-образна кухня с остров в Благоевград: рамка в taupe, фронтове в кашмир, гръб Laminam и кафе колона. От първо предложение до одобрен дизайн.'

const project = projects.find((item) => item.page === '/3d-проекти/kuhnya-domexpert-v17/')!

export const metadata: Metadata = completePageMetadata({
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: 'article',
    locale: 'bg_BG',
    siteName: 'Dom Expert Мебел',
    url: PAGE_URL,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: project.images[0], width: 1920, height: 1280, alt: '3D визуализация на кухня с остров в Благоевград – одобрен дизайн' }],
  },
})

const views = ['общ изглед', 'фронтален изглед', 'остров и полилей', 'изглед от вратата', 'кафе станция', 'извита колона']
const images = project.images.map((src, index) => ({
  src,
  title: views[index][0].toLocaleUpperCase('bg-BG') + views[index].slice(1),
  alt: `3D визуализация на кухня с остров в Благоевград — ${views[index]}`,
}))

const firstProposal = [
  {
    src: '/portfolio/kuhnya-domexpert-v17/3d-vizualizatsiya-kuhnya-s-ostrov-blagoevgrad-parvo-predlozhenie-1.webp',
    alt: '3D визуализация на първото предложение за кухнята — изцяло в кашмир',
    caption: 'Първо предложение: всички фронтове в кашмир.',
  },
  {
    src: '/portfolio/kuhnya-domexpert-v17/3d-vizualizatsiya-kuhnya-s-ostrov-blagoevgrad-parvo-predlozhenie-2.webp',
    alt: '3D визуализация на първото предложение за кухнята — фронтален изглед',
    caption: 'Първо предложение: фронтален изглед.',
  },
]

const projectDetails = [
  { label: 'Помещение', value: 'П-образна кухня с остров 2 × 1 м' },
  { label: 'Град', value: 'Благоевград' },
  { label: 'Стил', value: 'Двуцветна: рамка в тъмен taupe, останалите фронтове в кашмир' },
  { label: 'Материали', value: 'МДФ кашмир и taupe, гръб Laminam с тъмен мрамор, компакт плот 12 мм, черни Gola профили' },
  { label: 'Тип', value: '3D визуализация — одобрен дизайн преди изработка' },
]

const creativeWorkSchema = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  '@id': `${PAGE_URL}#project`,
  url: PAGE_URL,
  name: '3D проект на кухня с остров в Благоевград',
  description: project.description,
  inLanguage: 'bg-BG',
  creator: { '@id': 'https://domexpertmebel.com/#business' },
  contentLocation: { '@type': 'City', name: 'Благоевград' },
  image: [...images, ...firstProposal].map((img) => ({
    '@type': 'ImageObject',
    url: `https://domexpertmebel.com${img.src}`,
    description: img.alt,
  })),
}

const videoObjectSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: 'Видео разходка в първото 3D предложение за кухня с остров',
  description: 'Разходка в първото 3D предложение за кухнята, изцяло в кашмир – LED осветление, вградени уреди, чекмеджета, кафе станция и остров.',
  thumbnailUrl: 'https://domexpertmebel.com/video/kitchen-tour-16x9-poster.webp',
  contentUrl: 'https://domexpertmebel.com/video/kitchen-tour-16x9-compressed.mp4',
  uploadDate: '2026-10-02',
  duration: 'PT30S',
}

export default function KuhnyaDomExpertV17Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoObjectSchema).replace(/</g, '\\u003c') }}
      />
      <BreadcrumbSchema items={[
        { name: 'Начало', url: 'https://domexpertmebel.com/' },
        { name: '3D проекти', url: 'https://domexpertmebel.com/3d-проекти/' },
        { name: 'Кухня с остров – Благоевград', url: PAGE_URL },
      ]} />

      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #F5F0E8 0%, #EDE4D6 55%, #E6D8C3 100%)',
          paddingTop: '7rem',
          paddingBottom: '3rem',
        }}
      >
        <div className="container-main relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-body mb-6" style={{ fontSize: '0.78rem', color: '#9B9490' }}>
            <Link href="/" style={{ color: '#8B6F47' }} className="hover:underline underline-offset-2">Начало</Link>
            <span>/</span>
            <Link href="/3d-проекти/" style={{ color: '#8B6F47' }} className="hover:underline underline-offset-2">3D проекти</Link>
            <span>/</span>
            <span style={{ color: '#3C2A18', fontWeight: 500 }}>Кухня с остров – Благоевград</span>
          </nav>

          <Link
            href="/3d-проекти/"
            className="inline-flex items-center gap-2 font-body font-medium text-sm mb-6 transition-colors hover:text-walnut"
            style={{ color: '#8B6F47' }}
          >
            <ArrowLeft size={16} />
            Назад към всички проекти
          </Link>

          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 font-body font-medium text-xs px-3 py-1.5 rounded-full" style={{ background: 'rgba(139,111,71,0.12)', color: '#8B6F47' }}>
                <Eye size={13} />
                3D визуализация
              </span>
              <span className="inline-flex items-center gap-1.5 font-body font-medium text-xs px-3 py-1.5 rounded-full" style={{ background: 'rgba(139,111,71,0.12)', color: '#8B6F47' }}>
                Благоевград
              </span>
            </div>
            <h1 className="font-display font-bold text-charcoal leading-[1.05] mb-5" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}>
              3D проект на кухня с остров в Благоевград
            </h1>
            <div className="font-body text-warm-gray leading-relaxed space-y-4" style={{ fontSize: '1.05rem', maxWidth: '65ch' }}>
              <p style={{ fontSize: '1.15rem', fontWeight: 500 }}>
                Одобреният 3D проект на П-образна кухня с остров за дом в Благоевград: рамка в тъмен taupe, фронтове в топъл кашмир и гръб от Laminam с тъмен мрамор.
              </p>
              <p>
                Помещението е с ширина 4,84 м и височина 2,59 м, с витрина отляво и врата отдясно. По задната стена са подредени свободностоящ хладилник side-by-side,
                колона с фурна на нивото на плота и микровълнова над нея, съдомиялна, мивка, чекмеджета и котлон. По дясната стена кафе колона до тавана
                със заоблен ъгъл и джобни врати крие кафемашината и осветените рафтове.
              </p>
              <p>
                Островът е 2 × 1 м, със заоблени ъгли и вертикални канали по фронта, а плотът е компакт 12 мм. Над него виси клонест полилей с опални сфери.
                Горният ред шкафове по задната и дясната стена, колоната с фурната и кафе колоната са в taupe и рамкират кухнята, а всичко останало — включително островът — е в кашмир.
              </p>
              <p>
                Това е 3D визуализация преди изработка, а не снимка от готов обект. Сумата за 3D проекта се приспада при поръчка на кухнята.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-warm-white)' }}>
        <div className="container-main">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {images.map((image, index) => (
              <div
                key={index}
                className="group relative aspect-[3/2] overflow-hidden rounded-2xl bg-cream"
                style={{ border: '1px solid #EDE5DA', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={index === 0}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="font-body text-white text-sm font-medium">{image.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* From first proposal to approved design */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container-main max-w-5xl">
          <div className="max-w-3xl mb-8">
            <span className="eyebrow-pill">Процесът с 3D</span>
            <h2 className="section-title text-left">От първото предложение до одобрения дизайн</h2>
            <div className="font-body text-warm-gray leading-relaxed mt-4 space-y-3" style={{ fontSize: '1rem' }}>
              <p>
                Първото предложение беше изцяло в кашмир. По него подготвихме няколко цветови варианта на същата кухня, за да се сравнят на екрана, а не по мостри.
              </p>
              <p>
                В одобрения дизайн тъмният taupe рамкира кухнята, а фурната е преместена в колоната на нивото на плота. Такива промени се правят за минути в 3D проекта, а не след изработка.
              </p>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[...firstProposal, { src: images[0].src, alt: 'Одобреният 3D дизайн на кухнята — рамка в taupe и кашмир', caption: 'Одобрен дизайн: рамка в taupe и фронтове в кашмир.' }].map((item) => (
              <figure key={item.src} className="overflow-hidden rounded-2xl bg-white" style={{ border: '1px solid #EDE5DA' }}>
                <div className="relative aspect-[3/2]">
                  <Image src={item.src} alt={item.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <figcaption className="p-4 font-body text-sm text-warm-gray">{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Video */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-warm-white)' }}>
        <div className="container-main max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="font-display font-bold heading-gradient mb-3" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}>
              Видео разходка в първото предложение
            </h2>
            <p className="font-body text-warm-gray" style={{ fontSize: '1.05rem' }}>
              Разходка в първото 3D предложение, изцяло в кашмир – LED осветление, вградени уреди, чекмеджета, кафе станция и остров.
            </p>
          </div>
          <div className="relative aspect-video rounded-2xl overflow-hidden" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.12)' }}>
            <video
              controls
              preload="metadata"
              poster="/video/kitchen-tour-poster.webp"
              className="w-full h-full"
              style={{ backgroundColor: '#1A1714' }}
            >
              <source src="/video/kitchen-tour-16x9-compressed.mp4" type="video/mp4" />
              Вашият браузър не поддържа видео.
            </video>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container-main max-w-4xl">
          <h2 className="font-display font-bold heading-gradient mb-8 text-center" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}>
            Детайли на проекта
          </h2>
          <div
            className="bg-white rounded-2xl overflow-hidden"
            style={{ border: '1px solid #EDE5DA', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
          >
            {projectDetails.map((detail, index) => (
              <div
                key={index}
                className="grid md:grid-cols-3 gap-4 p-6"
                style={{ borderBottom: index < projectDetails.length - 1 ? '1px solid #EDE5DA' : 'none' }}
              >
                <div className="font-body font-semibold text-charcoal flex items-center gap-2">
                  {detail.label === 'Стил' && <Paintbrush size={16} style={{ color: '#8B6F47' }} />}
                  {detail.label === 'Материали' && <Layers size={16} style={{ color: '#8B6F47' }} />}
                  {detail.label}
                </div>
                <div className="md:col-span-2 font-body text-warm-gray">
                  {detail.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-warm-white)' }}>
        <div className="container-main max-w-3xl text-center">
          <h2 className="font-display font-bold heading-gradient mb-6" style={{ fontSize: 'clamp(1.7rem, 4vw, 2.4rem)' }}>
            Искате подобен проект?
          </h2>
          <p className="font-body text-warm-gray leading-relaxed mb-8" style={{ fontSize: '1.05rem' }}>
            Започнете с 3D визуализация на вашата кухня. 3D проектът на кухня е от 100 €, огледът е 50 € —
            и двете се приспадат при поръчка.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-10">
            <Link href="/контакти/" className="btn-primary">
              Искам подобен проект →
            </Link>
            <Link href="/услуги/3d-визуализация/" className="btn-secondary">
              Как работи 3D проектът
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Link
              href="/услуги/кухни-по-поръчка/"
              className="group p-6 bg-white rounded-2xl transition-all duration-200 hover:-translate-y-1"
              style={{ border: '1px solid #EDE5DA', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}
            >
              <h3 className="font-display font-semibold text-charcoal mb-2" style={{ fontSize: '1.15rem' }}>
                Кухни по поръчка
              </h3>
              <p className="font-body text-warm-gray text-sm">
                Процес, възможности и запитване за кухня
              </p>
            </Link>
            <Link
              href="/благоевград/"
              className="group p-6 bg-white rounded-2xl transition-all duration-200 hover:-translate-y-1"
              style={{ border: '1px solid #EDE5DA', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}
            >
              <h3 className="font-display font-semibold text-charcoal mb-2" style={{ fontSize: '1.15rem' }}>
                Мебели по поръчка в Благоевград
              </h3>
              <p className="font-body text-warm-gray text-sm">
                Още проекти и работилницата ни в града
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
