import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'

const EXAMPLE_AREAS = [60, 90]

/** Interior design price block; every number comes from SITE_CONFIG.pricing.interiorDesign. */
export default function InteriorDesignPricing({ title, city }: { title: string; city?: string }) {
  const { pricePerSqm, minimumSqm, currency } = SITE_CONFIG.pricing.interiorDesign
  const rows = [minimumSqm, ...EXAMPLE_AREAS].map((area) => ({
    area,
    price: area * pricePerSqm,
  }))

  return (
    <section className="section-py" style={{ backgroundColor: 'var(--color-warm-white)' }}>
      <div className="container-main max-w-3xl">
        <span className="eyebrow-pill">Цени</span>
        <h2 className="section-title text-left">{title}</h2>
        <div className="space-y-4 font-body text-warm-gray leading-relaxed mt-4" style={{ fontSize: '1rem' }}>
          <p>
            Интериорният дизайн{city ? ` в ${city}` : ''} се таксува на квадратен метър — от {pricePerSqm} {currency}/кв.м при минимум {minimumSqm} кв.м. Ето ориентировъчно колко струва интериорен дизайн на апартамент според площта:
          </p>
          <div className="overflow-hidden rounded-2xl bg-white" style={{ border: '1px solid #EDE5DA' }}>
            <table className="w-full text-left" style={{ fontSize: '0.93rem' }}>
              <thead>
                <tr style={{ background: '#F7F3ED' }}>
                  <th scope="col" className="px-4 py-3 font-semibold text-charcoal">Площ</th>
                  <th scope="col" className="px-4 py-3 font-semibold text-charcoal">Цена на проекта</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.area} style={{ borderTop: '1px solid #EDE5DA' }}>
                    <td className="px-4 py-3 text-charcoal">{row.area} кв.м</td>
                    <td className="px-4 py-3 text-charcoal">от {row.price} {currency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="space-y-2">
            {[
              'Функционално разпределение, материали, цветове и осветление',
              '3D визуализации на всяко помещение',
              'Точна оферта след оглед и уточняване на обхвата',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-charcoal" style={{ fontSize: '0.93rem' }}>
                <CheckCircle size={15} className="text-walnut flex-shrink-0 mt-1" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p>
            Мебелите по поръчка от проекта изработваме в собствената ни работилница. Всички цени са събрани на страницата{' '}
            <Link href="/цени/" className="text-walnut font-medium underline underline-offset-2 hover:no-underline">
              цени
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
