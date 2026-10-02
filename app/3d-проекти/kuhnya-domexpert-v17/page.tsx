import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Eye, Layers, Paintbrush } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import { completePageMetadata } from '@/lib/seo'

export const metadata: Metadata = completePageMetadata({
  title: { absolute: '3D проект на модерна кухня с остров – кашмир и Laminam | Dom Expert Мебел' },
  description: 'П-образна кухня с остров, кашмир фронтове, Laminam мраморен гръб, LED осветление и кафе станция. Детайлна 3D визуализация и видео разходка.',
  alternates: { canonical: 'https://domexpertmebel.com/3d-проекти/kuhnya-domexpert-v17/' },
  openGraph: {
    type: 'article',
    locale: 'bg_BG',
    siteName: 'Dom Expert Мебел',
    url: 'https://domexpertmebel.com/3d-проекти/kuhnya-domexpert-v17/',
    title: '3D проект на модерна кухня с остров – кашмир и Laminam | Dom Expert Мебел',
    description: 'П-образна кухня с остров, кашмир фронтове, Laminam мраморен гръб, LED осветление и кафе станция.',
    images: [{ url: '/portfolio/kuhnya-domexpert-v17/3d-proekt-kuhnya-moderna-obsht-1.webp', width: 1500, height: 1000, alt: '3D визуализация на модерна кухня – кашмир – Dom Expert Мебел' }],
  },
})

const images = [
  {
    src: '/portfolio/kuhnya-domexpert-v17/3d-proekt-kuhnya-moderna-obsht-1.webp',
    alt: '3D визуализация на модерна кухня – общ изглед на П-образната кухня с остров и полилей – Dom Expert Мебел',
    title: 'Общ изглед',
  },
  {
    src: '/portfolio/kuhnya-domexpert-v17/3d-proekt-kuhnya-moderna-frontalen-2.webp',
    alt: '3D визуализация на модерна кухня – фронтален изглед с мраморен гръб и бели шкафове – Dom Expert Мебел',
    title: 'Фронтален изглед',
  },
  {
    src: '/portfolio/kuhnya-domexpert-v17/3d-proekt-kuhnya-moderna-vrata-3.webp',
    alt: '3D визуализация на модерна кухня – изглед от входа към кухнята с остров – Dom Expert Мебел',
    title: 'Изглед от входа',
  },
]

const projectDetails = [
  { label: 'Помещение', value: 'Кухня' },
  { label: 'Стил', value: 'Модерна, монохромна' },
  { label: 'Материали', value: 'Кашмир фронтове, Laminam мрамор, остров с канали' },
  { label: 'Тип', value: '3D визуализация' },
]

// Schema.org - CreativeWork
const creativeWorkSchema = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: '3D проект на модерна кухня с остров – кашмир и Laminam',
  description: 'П-образна кухня с остров, кашмир фронтове, Laminam мраморен гръб, LED осветление и кафе станция. Детайлна 3D визуализация.',
  creator: {
    '@type': 'Organization',
    name: 'Dom Expert Мебел',
    url: 'https://domexpertmebel.com',
  },
  image: images.map(img => ({
    '@type': 'ImageObject',
    url: `https://domexpertmebel.com${img.src}`,
    description: img.alt,
  })),
}

// Schema.org - VideoObject
const videoObjectSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: 'Видео разходка в 3D проект на модерна кухня с остров',
  description: 'Разходка в 3D визуализацията на кухня с кашмир фронтове и Laminam мрамор – LED осветление, вградени уреди, чекмеджета, кафе станция и остров.',
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
        { name: 'Кашмир монохромна', url: 'https://domexpertmebel.com/3d-проекти/kuhnya-domexpert-v17/' },
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
            <span style={{ color: '#3C2A18', fontWeight: 500 }}>Кашмир монохромна</span>
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
            </div>
            <h1 className="font-display font-bold text-charcoal leading-[1.05] mb-5" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}>
              3D проект на модерна кухня с остров – кашмир и Laminam
            </h1>
            <div className="font-body text-warm-gray leading-relaxed space-y-4" style={{ fontSize: '1.05rem', maxWidth: '65ch' }}>
              <p style={{ fontSize: '1.15rem', fontWeight: 500 }}>
                Модерна монохромна кухня с елегантна визия — неутрална цветова палитра, луксозни материали и функционално разпределение.
              </p>
              <p>
                Идеята на проекта е да създаде хармонична и светла кухня с акцент върху естествените текстури и качествените материали.
                Всички фронтове са в топъл кашмир тон, който допълва тъмния мраморен гръб от Laminam — италиански порцеланов материал с реалистична мраморна текстура,
                устойчив на топлина, драскотини и влага.
              </p>
              <p>
                Разпределението е П-образно с централен остров, който осигурява допълнителна работна повърхност и място за хранене.
                Островът включва вградени канали за съхранение, скрити чекмеджета и интегрирана мивка. Горните шкафове са проектирани с push-to-open механизми,
                а долните включват вградени уреди — фурна, микровълнова печка и хладилник.
              </p>
              <p>
                Осветлението е многослойно — вграден LED монтиран под горните шкафове осветява работните зони,
                а централен полилей с топла светлина създава уют над трапезарията. Включена е и отделна кафе станция с вградена кафемашина и рафтове за чаши.
              </p>
              <p>
                Клиентът получава пълен пакет от детайлни 3D визуализации от различни ъгли, интерактивна видео разходка в кухнята,
                и възможност за корекции преди началото на производството. 3D проектът се приспада 100% от крайната цена при поръчка.
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
                  quality={90}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="font-body text-white text-sm font-medium">{image.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container-main max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="font-display font-bold heading-gradient mb-3" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}>
              Видео разходка в кухнята
            </h2>
            <p className="font-body text-warm-gray" style={{ fontSize: '1.05rem' }}>
              Разходка в 3D визуализацията – LED осветление, вградени уреди, чекмеджета, кафе станция и остров.
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
      <section className="section-py" style={{ backgroundColor: 'var(--color-warm-white)' }}>
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
      <section className="section-py" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container-main max-w-3xl text-center">
          <h2 className="font-display font-bold heading-gradient mb-6" style={{ fontSize: 'clamp(1.7rem, 4vw, 2.4rem)' }}>
            Искате подобен проект?
          </h2>
          <p className="font-body text-warm-gray leading-relaxed mb-8" style={{ fontSize: '1.05rem' }}>
            Започнете с 3D визуализация на вашата кухня. Огледът е 50 €, приспадат се при поръчка.
            3D проектът също се приспада 100% от цената при поръчка.
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
              href="/услуги/интериорен-дизайн/"
              className="group p-6 bg-white rounded-2xl transition-all duration-200 hover:-translate-y-1"
              style={{ border: '1px solid #EDE5DA', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}
            >
              <h3 className="font-display font-semibold text-charcoal mb-2" style={{ fontSize: '1.15rem' }}>
                Интериорен дизайн
              </h3>
              <p className="font-body text-warm-gray text-sm">
                Цялостно проектиране на помещения
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
