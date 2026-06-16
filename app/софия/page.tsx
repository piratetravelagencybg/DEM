import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Phone } from 'lucide-react'
import QuoteForm from '@/components/ui/QuoteForm'

export const metadata: Metadata = {
  title: 'Мебели по поръчка София | Dom Expert Мебел',
  description: 'Мебели по поръчка в София. Кухни, гардероби, спални. Безплатна консултация и 3D проект. Обадете се: 0888 123 456',
  alternates: { canonical: 'https://domexpertmebel.bg/софия/' },
}

const features = [
  'Безплатна консултация в София',
  'Безплатен 3D проект',
  'Монтаж в цяла София',
  '2 години гаранция',
]

const quickLinks = [
  { label: 'Кухни', href: '/услуги/кухни-по-поръчка/' },
  { label: 'Гардероби', href: '/услуги/гардероби-по-поръчка/' },
  { label: 'Спални', href: '/услуги/спални-по-поръчка/' },
  { label: 'За нас', href: '/за-нас/' },
]

export default function SofiaPage() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, #F5F0E8 0%, #EDE4D6 55%, #E6D8C3 100%)',
        paddingTop: '7rem',
        paddingBottom: 'var(--section-py)',
      }}
    >
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-80px', right: '-60px',
        width: '450px', height: '450px', borderRadius: '50%',
        background: 'rgba(139,111,71,0.10)', filter: 'blur(65px)', pointerEvents: 'none',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '-50px', left: '-30px',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'rgba(139,111,71,0.06)', filter: 'blur(50px)', pointerEvents: 'none',
      }} />

      <div className="container-main relative">
        <div className="grid lg:grid-cols-2 gap-12">

          <div className="space-y-6">
            <span className="eyebrow-pill">София</span>
            <h1 className="font-display font-bold text-charcoal leading-[1.05]" style={{ fontSize: 'var(--text-h1)' }}>
              Мебели по поръчка в София — индивидуален проект и монтаж
            </h1>
            <p className="font-body text-warm-gray leading-relaxed" style={{ fontSize: '1.05rem' }}>
              Обслужваме клиенти в София и Софийска област. Изработваме кухни, гардероби, спални и офис мебели по поръчка с безплатен 3D проект.
            </p>

            <div className="space-y-2">
              {features.map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-3"
                  style={{
                    padding: '10px 14px', borderRadius: 12,
                    background: 'rgba(255,255,255,0.72)',
                    border: '1px solid rgba(139,111,71,0.13)',
                  }}
                >
                  <div style={{
                    width: 24, height: 24, borderRadius: 7,
                    background: 'rgba(139,111,71,0.13)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <CheckCircle size={13} style={{ color: '#8B6F47' }} />
                  </div>
                  <span className="font-body text-charcoal" style={{ fontSize: '0.88rem', fontWeight: 500 }}>{f}</span>
                </div>
              ))}
            </div>

            <a href="tel:+359888123456" className="btn-primary inline-flex items-center gap-2">
              <Phone size={16} /> 0888 123 456
            </a>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              {quickLinks.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="text-center font-body font-medium transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    padding: '10px 8px', borderRadius: 12, fontSize: '0.82rem',
                    background: 'rgba(255,255,255,0.72)',
                    border: '1px solid rgba(139,111,71,0.15)',
                    color: '#8B6F47',
                  }}
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div
              className="bg-white rounded-2xl p-8"
              style={{ border: '1px solid #EDE5DA', boxShadow: '0 4px 32px rgba(0,0,0,0.06)' }}
            >
              <h2 className="font-display font-semibold text-charcoal text-xl mb-6">Безплатна оферта за София</h2>
              <QuoteForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
