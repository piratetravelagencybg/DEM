import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import SectionHeader from '@/components/ui/SectionHeader'
import {
  blogPosts,
  formatBlogDate,
  type BlogImage,
  type BlogPost,
} from '@/data/blog-posts'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Блог за мебели и интериор | Dom Expert Мебел',
  description:
    'Практични съвети за кухни, гардероби, готови мебели, измерване, материали и обзавеждане. Научете как да планирате правилния избор и поръчка.',
  path: '/блог/',
  image: '/images/og/home.webp',
  imageAlt: 'Примерна интериорна визуализация – блог на Dom Expert Мебел',
})

function ImageCaption({ image }: { image: BlogImage }) {
  if (image.kind === 'stock' && image.sourceUrl) {
    return (
      <a
        href={image.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-white/40 underline-offset-2 hover:text-white"
      >
        {image.caption}
      </a>
    )
  }

  return <span>{image.caption}</span>
}

function PostMedia({
  post,
  priority = false,
  sizes,
  featured = false,
}: {
  post: BlogPost
  priority?: boolean
  sizes: string
  featured?: boolean
}) {
  const image = post.heroImage

  return (
    <figure className="flex min-w-0 flex-col bg-charcoal">
      <Link
        href={`/блог/${post.slug}/`}
        aria-label={`Прочетете: ${post.title}`}
        className={
          featured
            ? 'group/image relative min-h-64 flex-1 overflow-hidden lg:min-h-[360px]'
            : 'group/image relative aspect-video overflow-hidden'
        }
      >
        <Image
          src={image.src}
          alt={`${image.alt}. ${image.caption}`}
          fill
          className="object-cover transition-transform duration-500 group-hover/image:scale-[1.03]"
          sizes={sizes}
          priority={priority}
        />
      </Link>
      <figcaption className="px-4 py-2 font-body text-[11px] leading-relaxed text-white/75">
        <ImageCaption image={image} />
      </figcaption>
    </figure>
  )
}

export default function BlogPage() {
  const [featured, ...rest] = blogPosts

  if (!featured) return null

  return (
    <div className="bg-cream pt-24 section-py">
      <div className="container-main">
        <SectionHeader
          level={1}
          eyebrow="Блог"
          title="Практични съвети за мебели и обзавеждане"
          subtitle="Подробни ръководства за планиране, размери, материали, мебели по поръчка и избор на готово обзавеждане."
        />

        <article className="mb-10 grid overflow-hidden rounded-card bg-warm-white shadow-sm lg:grid-cols-2">
          <PostMedia
            post={featured}
            priority
            featured
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="flex flex-col justify-center p-7 sm:p-9">
            <Badge variant="walnut" className="mb-4 self-start">
              {featured.category}
            </Badge>
            <h2 className="mb-3 font-display text-2xl font-semibold text-charcoal lg:text-3xl">
              <Link
                href={`/блог/${featured.slug}/`}
                className="transition-colors hover:text-walnut"
              >
                {featured.title}
              </Link>
            </h2>
            <p className="mb-5 font-body leading-relaxed text-warm-gray">
              {featured.description}
            </p>
            <p className="mb-5 font-body text-xs text-warm-gray">
              <time dateTime={featured.date}>{formatBlogDate(featured.date)}</time>
              {' · '}
              {featured.readingTimeMinutes} мин четене
            </p>
            <Link
              href={`/блог/${featured.slug}/`}
              className="font-body text-sm font-semibold text-walnut hover:underline"
            >
              Прочетете статията →
            </Link>
          </div>
        </article>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {rest.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col overflow-hidden rounded-card bg-warm-white shadow-sm transition-shadow hover:shadow-md"
            >
              <PostMedia
                post={post}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              />
              <div className="flex flex-1 flex-col p-5">
                <Badge variant="default" className="mb-3 self-start text-xs">
                  {post.category}
                </Badge>
                <h2 className="mb-2 line-clamp-2 font-display text-lg font-semibold text-charcoal">
                  <Link
                    href={`/блог/${post.slug}/`}
                    className="transition-colors hover:text-walnut"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mb-4 line-clamp-3 flex-1 font-body text-sm leading-relaxed text-warm-gray">
                  {post.description}
                </p>
                <p className="font-body text-xs text-warm-gray">
                  <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
                  {' · '}
                  {post.readingTimeMinutes} мин четене
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
