import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import QuoteForm from '@/components/ui/QuoteForm'
import LocalBusinessSchema from '@/components/seo/LocalBusinessSchema'

export const metadata: Metadata = {
  title: 'Контакти | Dom Expert Мебел — Благоевград и София',
  description: 'Свържете се с Dom Expert Мебел за безплатна консултация и оферта. Тел: 0888 123 456 | office@domexpertmebel.bg',
  alternates: { canonical: 'https://domexpertmebel.bg/контакти/' },
}

export default function ContactsPage() {
  return (
    <>
      <LocalBusinessSchema />
      <div className="pt-24">
        <section className="section-py bg-cream">
          <div className="container-main">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Left: Info */}
              <div className="space-y-8">
                <div>
                  <span className="inline-block font-body text-xs font-semibold tracking-widest uppercase text-walnut mb-3">
                    Свържете се
                  </span>
                  <h1 className="font-display font-semibold text-charcoal" style={{ fontSize: 'var(--text-h1)' }}>
                    Свържете се с нас
                  </h1>
                  <p className="font-body text-warm-gray mt-4 leading-relaxed">
                    Готови сме да отговорим на всичките ви въпроси. Безплатна консултация и оценка.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { icon: Phone, label: 'Телефон', value: '0888 123 456', href: 'tel:+359888123456' },
                    { icon: Mail, label: 'Имейл', value: 'office@domexpertmebel.bg', href: 'mailto:office@domexpertmebel.bg' },
                    { icon: MapPin, label: 'Адрес', value: 'Благоевград, България', href: null },
                    { icon: Clock, label: 'Работно време', value: 'Понеделник — Петък: 09:00 — 18:00', href: null },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-4 bg-warm-white p-4 rounded-card">
                      <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center flex-shrink-0">
                        <Icon size={18} className="text-walnut" />
                      </div>
                      <div>
                        <div className="font-body text-xs text-warm-gray mb-0.5">{label}</div>
                        {href ? (
                          <a href={href} className="font-body font-medium text-charcoal hover:text-walnut transition-colors">{value}</a>
                        ) : (
                          <div className="font-body font-medium text-charcoal">{value}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map placeholder */}
                <div className="rounded-card overflow-hidden h-56 bg-light-tan flex items-center justify-center">
                  <div className="text-center text-warm-gray font-body text-sm">
                    <MapPin size={32} className="mx-auto mb-2 text-walnut" />
                    <p>Google Maps</p>
                    <p className="text-xs mt-1">Благоевград, България</p>
                  </div>
                </div>
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
      </div>
    </>
  )
}
