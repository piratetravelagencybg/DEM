import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: { absolute: 'Блог за мебели и интериор | Dom Expert Мебел' },
  description: 'Полезни съвети за кухни и гардероби по поръчка, интериорен дизайн и обзавеждане на дома. Ценови наръчници и практически идеи от Dom Expert Мебел.',
  alternates: { canonical: 'https://domexpertmebel.com/блог/' },
}

const posts = [
  {
    slug: 'kak-da-izberem-kuhnya-po-poruchka',
    title: 'Как да изберем кухня по поръчка — 7 въпроса преди поръчката',
    description: 'Преди да поръчате кухня по поръчка, задайте си тези 7 въпроса за да вземете правилното решение.',
    category: 'Кухни',
    date: '2025-06-01',
    image: '/images/services/kuhnya.png',
    readTime: '5 мин',
  },
  {
    slug: 'garderob-po-poruchka-ili-gotov',
    title: 'Гардероб по поръчка или готов — кое е по-изгодно?',
    description: 'Сравняваме плюсовете и минусите на гардероб по поръчка спрямо готов, за да вземете правилното решение.',
    category: 'Гардероби',
    date: '2025-05-15',
    image: '/images/services/garderob.png',
    readTime: '4 мин',
  },
  {
    slug: 'tseni-mebeli-po-poruchka-balgariya',
    title: 'Колко струват мебелите по поръчка в България?',
    description: 'Пълно ръководство за цените на мебели по поръчка в България — кухни, гардероби, спални.',
    category: 'Съвети',
    date: '2025-04-20',
    image: '/images/hero/hero.png',
    readTime: '6 мин',
  },
  {
    slug: 'mebeli-malak-apartament',
    title: 'Как да обзаведем малък апартамент умно',
    description: 'Практични идеи за обзавеждане на малък апартамент — как мебелите по поръчка спестяват пространство.',
    category: 'Съвети',
    date: '2025-03-10',
    image: '/images/services/spalna.png',
    readTime: '5 мин',
  },
  {
    slug: 'mebeli-po-poruchka-tendentsii-2026',
    title: 'Мебели по поръчка 2026 — тенденции и цени в България',
    description: 'Актуални тенденции при мебелите по поръчка в България за 2026 г. Цени, материали и защо все повече хора избират мебели по поръчка пред готови.',
    category: 'Съвети',
    date: '2026-07-10',
    image: '/images/real/kuhnya-04.png',
    readTime: '5 мин',
  },
]

export default function BlogPage() {
  const [featured, ...rest] = posts

  return (
    <div className="pt-24 section-py bg-cream">
      <div className="container-main">
        <SectionHeader
          level={1}
          eyebrow="Блог"
          title="Съвети и вдъхновение"
          subtitle="Полезни статии за мебели по поръчка, интериорен дизайн и обзавеждане на дома."
        />

        {/* Featured */}
        <Link href={`/блог/${featured.slug}/`} className="group block mb-8">
          <div className="grid lg:grid-cols-2 gap-0 bg-warm-white rounded-card overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="relative aspect-video lg:aspect-auto overflow-hidden">
              <Image src={featured.image} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="50vw" />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <Badge variant="walnut" className="mb-4 self-start">{featured.category}</Badge>
              <h2 className="font-display font-semibold text-charcoal text-2xl lg:text-3xl mb-3 group-hover:text-walnut transition-colors">
                {featured.title}
              </h2>
              <p className="font-body text-warm-gray leading-relaxed mb-4">{featured.description}</p>
              <p className="font-body text-warm-gray text-xs">{featured.date} · {featured.readTime} четене</p>
            </div>
          </div>
        </Link>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {rest.map((post) => (
            <Link key={post.slug} href={`/блог/${post.slug}/`} className="group card overflow-hidden">
              <div className="relative aspect-video overflow-hidden">
                <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="33vw" />
              </div>
              <div className="p-5">
                <Badge variant="default" className="mb-3 text-xs">{post.category}</Badge>
                <h2 className="font-display font-semibold text-charcoal text-lg mb-2 group-hover:text-walnut transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="font-body text-warm-gray text-sm line-clamp-2 mb-3">{post.description}</p>
                <p className="font-body text-warm-gray text-xs">{post.date} · {post.readTime}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
