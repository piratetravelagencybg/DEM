import Link from 'next/link'

export const SERVICE_LINKS = [
  { label: 'Кухни по поръчка', href: '/услуги/кухни-по-поръчка/' },
  { label: 'Гардероби по поръчка', href: '/услуги/гардероби-по-поръчка/' },
  { label: 'Спални по поръчка', href: '/услуги/спални-по-поръчка/' },
  { label: 'Дневни по поръчка', href: '/услуги/дневни-по-поръчка/' },
  { label: 'Офис мебели по поръчка', href: '/услуги/офис-мебели/' },
  { label: 'Мебели за салони за красота', href: '/услуги/обзавеждане-на-обекти/салони-за-красота/' },
  { label: '3D визуализация', href: '/услуги/3d-визуализация/' },
  { label: 'Интериорен дизайн', href: '/услуги/интериорен-дизайн/' },
  { label: 'Монтаж на мебели', href: '/услуги/монтаж/' },
]

/** Links from a city page to every service page. */
export default function ServiceLinks({ title, background = 'var(--color-cream)' }: { title: string; background?: string }) {
  return (
    <section className="section-py" style={{ backgroundColor: background }}>
      <div className="container-main">
        <h2 className="font-display font-semibold text-charcoal text-center mb-8" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)' }}>
          {title}
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {SERVICE_LINKS.map((link) => (
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
