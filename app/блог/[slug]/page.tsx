import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import CTABar from '@/components/home/CTABar'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import Badge from '@/components/ui/Badge'
import {
  blogPosts,
  formatBlogDate,
  getBlogPost,
  type BlogBlock,
  type BlogImage,
  type BlogLink,
  type BlogPost,
} from '@/data/blog-posts'
import { createPageMetadata, prepareSeoDescription } from '@/lib/seo'

const SITE_URL = 'https://domexpertmebel.com'

const BLOG_SOCIAL_IMAGES: Record<string, string> = {
  'Кухни': '/images/og/kitchens.webp',
  'Гардероби': '/images/og/wardrobes.webp',
  'Спални': '/images/og/bedrooms.webp',
  'Детска стая': '/images/og/bedrooms.webp',
}

interface Props {
  params: { slug: string }
}

export const dynamicParams = false

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getBlogPost(params.slug)
  if (!post) return { robots: { index: false, follow: false } }

  const description = prepareSeoDescription(
    post.description,
    'Прочетете практичните насоки от Dom Expert Мебел.',
  )
  const imageAlt = `Примерна интериорна визуализация към тема „${post.category}“`
  const socialImage = BLOG_SOCIAL_IMAGES[post.category] || '/images/og/home.webp'
  const baseMetadata = createPageMetadata({
    title: `${post.title} | Dom Expert Мебел`,
    description,
    path: `/блог/${post.slug}/`,
    image: socialImage,
    imageAlt,
  })

  return {
    ...baseMetadata,
    openGraph: {
      ...baseMetadata.openGraph,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.dateModified ?? post.date,
      section: post.category,
    },
  }
}

function ImageCaption({ image }: { image: BlogImage }) {
  if (image.kind === 'stock' && image.sourceUrl) {
    return (
      <a
        href={image.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-current/40 underline-offset-2 hover:text-walnut"
      >
        {image.caption}
      </a>
    )
  }

  return <span>{image.caption}</span>
}

function ResourceLink({ link }: { link: BlogLink }) {
  const className =
    'block rounded-btn border border-walnut/20 bg-warm-white px-4 py-3 transition-colors hover:border-walnut hover:bg-sand/30'
  const content = (
    <>
      <span className="block font-body text-sm font-semibold text-charcoal">
        {link.label} →
      </span>
      {link.description && (
        <span className="mt-1 block font-body text-xs leading-relaxed text-warm-gray">
          {link.description}
        </span>
      )}
    </>
  )

  if (/^https?:\/\//.test(link.href)) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    )
  }

  return (
    <Link href={link.href} className={className}>
      {content}
    </Link>
  )
}

function ArticleFigure({ image, priority = false }: { image: BlogImage; priority?: boolean }) {
  return (
    <figure className="my-9 overflow-hidden rounded-card border border-walnut/10 bg-warm-white shadow-sm">
      <div className="relative aspect-[4/3] bg-charcoal/5 sm:aspect-video">
        <Image
          src={image.src}
          alt={`${image.alt}. ${image.caption}`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 768px"
          priority={priority}
        />
      </div>
      <figcaption className="border-t border-walnut/10 px-4 py-3 font-body text-xs leading-relaxed text-warm-gray">
        <ImageCaption image={image} />
      </figcaption>
    </figure>
  )
}

function BlockRenderer({ block, index }: { block: BlogBlock; index: number }) {
  switch (block.type) {
    case 'heading': {
      if (block.level === 3) {
        return (
          <h3 className="mb-3 mt-7 font-display text-xl font-semibold text-charcoal">
            {block.text}
          </h3>
        )
      }

      return (
        <h2 className="mb-3 mt-10 font-display text-2xl font-semibold text-charcoal">
          {block.text}
        </h2>
      )
    }
    case 'paragraph':
      return (
        <p className="font-body leading-7 text-warm-gray">
          {block.text}
        </p>
      )
    case 'list': {
      const ListTag = block.style === 'numbered' ? 'ol' : 'ul'
      return (
        <ListTag
          className={
            block.style === 'numbered'
              ? 'ml-6 list-decimal space-y-2 font-body leading-7 text-warm-gray marker:font-semibold marker:text-walnut'
              : 'ml-6 list-disc space-y-2 font-body leading-7 text-warm-gray marker:text-walnut'
          }
        >
          {block.items.map((item, itemIndex) => (
            <li key={`${index}-${itemIndex}`}>{item}</li>
          ))}
        </ListTag>
      )
    }
    case 'note': {
      const defaultTitle =
        block.tone === 'important'
          ? 'Важно'
          : block.tone === 'info'
            ? 'Добре е да знаете'
            : 'Практичен съвет'

      return (
        <aside
          role="note"
          className="my-7 rounded-card border-l-4 border-walnut bg-sand/40 px-5 py-4"
        >
          <p className="mb-1 font-body text-sm font-semibold text-charcoal">
            {block.title ?? defaultTitle}
          </p>
          <p className="font-body text-sm leading-6 text-warm-gray">{block.text}</p>
        </aside>
      )
    }
    case 'image':
      return <ArticleFigure image={block} />
    case 'links': {
      const headingId = `article-links-${index}`
      return (
        <section
          aria-labelledby={headingId}
          className="my-9 rounded-card border border-walnut/15 bg-sand/20 p-5"
        >
          <h2 id={headingId} className="mb-4 font-display text-xl font-semibold text-charcoal">
            {block.title}
          </h2>
          <ul className="grid list-none gap-3 p-0 sm:grid-cols-2">
            {block.links.map((link) => (
              <li key={`${link.href}-${link.label}`}>
                <ResourceLink link={link} />
              </li>
            ))}
          </ul>
        </section>
      )
    }
  }
}

function relatedPostsFor(post: BlogPost): readonly BlogPost[] {
  const sameCategory = blogPosts.filter(
    (candidate) => candidate.slug !== post.slug && candidate.category === post.category,
  )
  const otherCategories = blogPosts.filter(
    (candidate) => candidate.slug !== post.slug && candidate.category !== post.category,
  )
  return [...sameCategory, ...otherCategories].slice(0, 3)
}

function RelatedPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="overflow-hidden rounded-card bg-warm-white shadow-sm">
      <figure className="bg-charcoal">
        <Link
          href={`/блог/${post.slug}/`}
          aria-label={`Прочетете: ${post.title}`}
          className="relative block aspect-video overflow-hidden"
        >
          <Image
            src={post.heroImage.src}
            alt={`${post.heroImage.alt}. ${post.heroImage.caption}`}
            fill
            className="object-cover transition-transform duration-500 hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </Link>
        <figcaption className="px-3 py-2 font-body text-[11px] leading-relaxed text-white/75">
          <ImageCaption image={post.heroImage} />
        </figcaption>
      </figure>
      <div className="p-5">
        <Badge className="mb-3">{post.category}</Badge>
        <h3 className="font-display text-lg font-semibold text-charcoal">
          <Link href={`/блог/${post.slug}/`} className="hover:text-walnut">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 font-body text-xs text-warm-gray">
          <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
          {' · '}
          {post.readingTimeMinutes} мин четене
        </p>
      </div>
    </article>
  )
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.slug)
  if (!post) notFound()

  const canonicalUrl = `${SITE_URL}/блог/${post.slug}/`
  const imageUrl = new URL(post.heroImage.src, SITE_URL).toString()
  const relatedPosts = relatedPostsFor(post)
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    inLanguage: 'bg-BG',
    articleSection: post.category,
    image: {
      '@type': 'ImageObject',
      url: imageUrl,
      description: post.heroImage.alt,
      caption: post.heroImage.caption,
      ...(post.heroImage.credit ? { creditText: post.heroImage.credit } : {}),
    },
    datePublished: post.date,
    dateModified: post.dateModified ?? post.date,
    author: {
      '@type': 'Organization',
      name: 'Dom Expert Мебел',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Dom Expert Мебел',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo-icon.webp`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema).replace(/</g, '\\u003c'),
        }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Начало', url: `${SITE_URL}/` },
          { name: 'Блог', url: `${SITE_URL}/блог/` },
          { name: post.title, url: canonicalUrl },
        ]}
      />

      <main className="pt-24">
        <div className="bg-cream pt-7">
          <div className="container-main max-w-5xl">
            <Link
              href="/блог/"
              className="mb-6 inline-flex items-center gap-2 font-body text-sm text-warm-gray transition-colors hover:text-walnut"
            >
              <ArrowLeft size={16} /> Назад към блога
            </Link>

            <div className="mb-5 flex flex-wrap items-center gap-4">
              <Badge variant="walnut">{post.category}</Badge>
              <span className="flex items-center gap-1.5 font-body text-sm text-warm-gray">
                <Calendar size={14} />
                <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
              </span>
              <span className="flex items-center gap-1.5 font-body text-sm text-warm-gray">
                <Clock size={14} /> {post.readingTimeMinutes} мин четене
              </span>
            </div>

            <h1
              className="mb-5 max-w-4xl font-display font-semibold text-charcoal"
              style={{ fontSize: 'var(--text-h1)' }}
            >
              {post.title}
            </h1>
            <p className="mb-8 max-w-3xl font-body text-lg leading-relaxed text-warm-gray">
              {post.description}
            </p>

            <ArticleFigure image={post.heroImage} priority />
          </div>
        </div>

        <section className="bg-cream pb-16 lg:pb-24">
          <div className="container-main max-w-3xl">
            <div className="space-y-5">
              {post.blocks.map((block, index) => (
                <BlockRenderer key={`${block.type}-${index}`} block={block} index={index} />
              ))}
            </div>

            <div className="mt-12 rounded-card bg-walnut p-8 text-center">
              <h2 className="mb-3 font-display text-2xl font-semibold text-white">
                Искате решение за вашето пространство?
              </h2>
              <p className="mb-6 font-body text-white/75">
                Огледът и измерването са безплатни. Платеният 3D проект се приспада при
                поръчка на мебелите от нас.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/контакти/"
                  className="inline-flex items-center gap-2 rounded-btn bg-white px-6 py-3 font-body font-medium text-walnut transition-colors hover:bg-cream"
                >
                  Изпратете запитване →
                </Link>
                <Link
                  href="/услуги/"
                  className="inline-flex items-center gap-2 rounded-btn border border-white/30 px-6 py-3 font-body font-medium text-white transition-colors hover:bg-white/10"
                >
                  Разгледайте услугите
                </Link>
              </div>
            </div>
          </div>
        </section>

        {relatedPosts.length > 0 && (
          <section className="bg-warm-white section-py" aria-labelledby="related-posts-heading">
            <div className="container-main">
              <h2
                id="related-posts-heading"
                className="mb-8 text-center font-display text-3xl font-semibold text-charcoal"
              >
                Още полезни статии
              </h2>
              <div className="grid gap-5 md:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <RelatedPostCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <CTABar />
    </>
  )
}
