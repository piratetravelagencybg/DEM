import Link from 'next/link'
import { Clock3, ExternalLink, MapPin } from 'lucide-react'
import { GOOGLE_BUSINESS_PROFILE_URL } from '@/lib/business'

export default function GoogleBusinessProfile() {
  return (
    <section className="section-py" style={{ backgroundColor: 'var(--color-cream)' }}>
      <div className="container-main">
        <div
          className="grid md:grid-cols-[1.3fr_0.7fr] gap-8 md:gap-12 items-center overflow-hidden"
          style={{
            borderRadius: 24,
            background: 'linear-gradient(145deg, #FFFFFF 0%, #F5F0E8 100%)',
            border: '1px solid #E7DDCF',
            padding: 'clamp(1.5rem, 5vw, 3.25rem)',
          }}
        >
          <div>
            <span className="eyebrow-pill">Google Business Profile</span>
            <h2 className="font-display font-bold heading-gradient leading-tight mt-2" style={{ fontSize: 'clamp(1.8rem, 4.5vw, 2.6rem)' }}>
              Намерете Dom Expert Мебел в Google
            </h2>
            <p className="font-body text-warm-gray leading-relaxed mt-4 max-w-2xl">
              Отворете официалния ни профил за точна локация, маршрут и информация за бизнеса.
              Мненията в него се публикуват директно в Google.
            </p>
            <div className="flex flex-wrap gap-3 mt-7">
              <a
                href={GOOGLE_BUSINESS_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                Отвори профила в Google
                <ExternalLink size={15} aria-hidden="true" />
              </a>
              <Link href="/контакти/" className="btn-outline inline-flex">
                Всички контакти
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-2xl bg-white p-4" style={{ border: '1px solid #E7DDCF' }}>
              <MapPin size={19} className="text-walnut flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-body font-semibold text-charcoal text-sm">Адрес</p>
                <p className="font-body text-warm-gray text-sm mt-1">ул. „Стамболийски“ 52, Благоевград</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl bg-white p-4" style={{ border: '1px solid #E7DDCF' }}>
              <Clock3 size={19} className="text-walnut flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-body font-semibold text-charcoal text-sm">Работно време</p>
                <p className="font-body text-warm-gray text-sm mt-1">Понеделник–петък, 09:00–18:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
