import Link from 'next/link'

const CITY_LINKS = [
  { city: 'Благоевград', href: '/благоевград/' },
  { city: 'София', href: '/софия/' },
  { city: 'Дупница', href: '/дупница/' },
  { city: 'Сандански', href: '/сандански/' },
  { city: 'Петрич', href: '/петрич/' },
]

/** Links from a service page to every city page, plus optional extra links. */
export default function CityLinks({
  title,
  extra = [],
}: {
  title: string
  extra?: { label: string; href: string }[]
}) {
  const links = [
    ...CITY_LINKS.map((item) => ({ label: `Мебели по поръчка в ${item.city}`, href: item.href })),
    ...extra,
  ]
  return (
    <section className="section-py" style={{ backgroundColor: 'var(--color-warm-white)' }}>
      <div className="container-main">
        <h2 className="font-display font-semibold text-charcoal text-center mb-8" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)' }}>
          {title}
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body font-medium transition-all duration-200 hover:-translate-y-0.5"
              style={{
                padding: '10px 20px', borderRadius: 100, fontSize: '0.88rem',
                border: '1px solid rgba(139,111,71,0.25)',
                color: '#8B6F47',
                background: 'rgba(139,111,71,0.05)',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
