import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import QuoteForm from '@/components/ui/QuoteForm'
import GoogleReviews from '@/components/home/GoogleReviews'
import LocalBusinessSchema from '@/components/seo/LocalBusinessSchema'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import { GOOGLE_BUSINESS_PROFILE_URL } from '@/lib/business'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Контакти | Dom Expert Мебел',
  description: 'Свържете се с Dom Expert Мебел за консултация и оферта за мебели по поръчка. Тел: 0876 081 199 | domexpertmebel@gmail.com | Благоевград',
  path: '/контакти/',
  imageAlt: 'Контакти на Dom Expert Мебел',
})

export default function ContactsPage() {
  return (
    <>
      <LocalBusinessSchema />
      <BreadcrumbSchema items={[
        { name: 'Начало', url: 'https://domexpertmebel.com/' },
        { name: 'Контакти', url: 'https://domexpertmebel.com/контакти/' },
      ]} />
      <div className="pt-24">
        <section className="section-py bg-cream">
          <div className="container-main">

            {/* Key facts block for AI/GEO */}
            <div className="max-w-3xl mx-auto mb-10">
              <span className="inline-block font-body text-xs font-semibold tracking-widest uppercase text-walnut mb-3">
                Свържете се
              </span>
              <h1 className="font-display font-semibold text-charcoal" style={{ fontSize: 'var(--text-h1)' }}>
                Свържете се с нас
              </h1>
              <p className="font-body text-warm-gray mt-4 leading-relaxed">
                Dom Expert Мебел е на ваше разположение за безплатна консултация, оглед на място и изготвяне на оферта. Отговаряме в рамките на 24 часа.
              </p>
              {/* GEO key facts */}
              <ul className="mt-4 space-y-1 font-body text-sm text-warm-gray">
                <li>• Работно време: Понеделник–Петък, 09:00–18:00</li>
                <li>• Телефон: <a href="tel:+359876081199" className="text-walnut hover:underline">0876 081 199</a></li>
                <li>• Имейл: <a href="mailto:domexpertmebel@gmail.com" className="text-walnut hover:underline">domexpertmebel@gmail.com</a></li>
                <li>
                  • Адрес:{' '}
                  <a
                    href={GOOGLE_BUSINESS_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-walnut hover:underline"
                  >
                    ул. Стамболийски 52, 2700 Благоевград
                  </a>
                </li>
                <li>• Обслужваме: Благоевград, София, Дупница, Сандански, Банско, Разлог</li>
              </ul>
            </div>

            <div className="grid lg:grid-cols-2 gap-16">
              {/* Left: Info */}
              <div className="space-y-8">
                <div className="space-y-4">
                  {[
                    { icon: Phone, label: 'Телефон', value: '0876 081 199', href: 'tel:+359876081199' },
                    { icon: Mail, label: 'Имейл', value: 'domexpertmebel@gmail.com', href: 'mailto:domexpertmebel@gmail.com' },
                    { icon: MapPin, label: 'Адрес', value: 'ул. Стамболийски 52, 2700 Благоевград', href: GOOGLE_BUSINESS_PROFILE_URL },
                    { icon: Clock, label: 'Работно време', value: 'Понеделник — Петък: 09:00 — 18:00', href: null },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-4 bg-warm-white p-4 rounded-card">
                      <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center flex-shrink-0">
                        <Icon size={18} className="text-walnut" />
                      </div>
                      <div>
                        <div className="font-body text-xs text-warm-gray mb-0.5">{label}</div>
                        {href ? (
                          <a
                            href={href}
                            target={href.startsWith('http') ? '_blank' : undefined}
                            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="font-body font-medium text-charcoal hover:text-walnut transition-colors"
                          >
                            {value}
                          </a>
                        ) : (
                          <div className="font-body font-medium text-charcoal">{value}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Lightweight directions link — no map embed or third-party script. */}
                <a
                  href={GOOGLE_BUSINESS_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Отвори профила на Dom Expert Мебел в Google Maps"
                  className="group rounded-card overflow-hidden h-56 bg-light-tan flex items-center justify-center transition-colors hover:bg-cream"
                >
                  <div className="text-center text-warm-gray font-body text-sm px-6">
                    <MapPin size={32} className="mx-auto mb-3 text-walnut transition-transform group-hover:-translate-y-0.5" />
                    <p className="font-semibold text-charcoal">Посетете ни в Благоевград</p>
                    <p className="text-xs mt-1">ул. Стамболийски 52, 2700 Благоевград</p>
                    <span className="inline-block mt-4 font-semibold text-walnut group-hover:underline">
                      Отвори в Google Maps →
                    </span>
                  </div>
                </a>
              </div>

              {/* Right: Form */}
              <div>
                <div className="bg-warm-white rounded-card p-8 shadow-sm sticky top-24">
                  <h2 className="font-display font-semibold text-charcoal text-2xl mb-6">Изпрати запитване</h2>
                  <QuoteForm />
                </div>
              </div>
            </div>
          </div>
        </section>
        <GoogleReviews compact />
      </div>
    </>
  )
}
