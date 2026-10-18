import { CheckCircle } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'

const { pricing, stats } = SITE_CONFIG

/** Short, quotable facts for people and AI answers (GEO). */
export const QUICK_FACTS = [
  'Семейна работилница със собствено производство от 2012 г.',
  `${stats.projects}, от тях ${stats.projectsSofia} в София`,
  `Гаранция ${stats.warranty}`,
  `Оглед ${pricing.inspection.price} € — приспада се при поръчка`,
  `3D проект: кухня от ${pricing.visualization.kitchen.from} €, друга мебел от ${pricing.visualization.other.from} €`,
  `Изработка ${stats.deliveryTime} след одобрение на проекта`,
]

/** Compact list, e.g. inside a hero column. */
export function QuickFactsList() {
  return (
    <div>
      <h2 className="font-display font-semibold text-charcoal mb-2" style={{ fontSize: '1.05rem' }}>Бързи факти</h2>
      <ul className="font-body text-sm text-warm-gray space-y-1">
        {QUICK_FACTS.map((fact) => (
          <li key={fact}>• {fact}</li>
        ))}
      </ul>
    </div>
  )
}

/** Full-width section for the home page. */
export default function QuickFactsSection() {
  return (
    <section className="section-py" style={{ backgroundColor: 'var(--color-cream)' }}>
      <div className="container-main max-w-5xl">
        <div className="text-center mb-8">
          <span className="eyebrow-pill">Dom Expert Мебел</span>
          <h2 className="font-display font-bold heading-gradient" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}>
            Бързи факти
          </h2>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {QUICK_FACTS.map((fact) => (
            <li
              key={fact}
              className="flex items-start gap-3 rounded-2xl bg-white font-body text-charcoal"
              style={{ padding: '16px 18px', border: '1px solid #EDE5DA', fontSize: '0.92rem' }}
            >
              <CheckCircle size={16} className="text-walnut flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span>{fact}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
