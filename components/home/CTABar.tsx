import Link from 'next/link'
import { Phone, Shield, ArrowRight } from 'lucide-react'

export default function CTABar() {
  return (
    <>
      {/* Compact mobile contact dock */}
      <div
        className="md:hidden fixed z-[100]"
        style={{
          bottom: 'max(10px, env(safe-area-inset-bottom))',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 20px)',
          maxWidth: 390,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(255,255,255,0.94)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: 18,
            padding: 6,
            border: '1px solid rgba(224,213,201,0.9)',
            boxShadow: '0 10px 34px rgba(31,24,18,0.18), 0 2px 8px rgba(31,24,18,0.06)',
          }}
        >
          <a
            href="tel:+359876081199"
            aria-label="Позвъни на 0876 081 199"
            style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 8, padding: '4px 7px', textDecoration: 'none' }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 12,
                background: '#F1E9DE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Phone size={15} style={{ color: '#8B6F47' }} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.76rem', color: '#2C2C2C', lineHeight: 1.15, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
                0876 081 199
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.56rem', color: '#8B7E76', marginTop: 2 }}>
                Позвъни директно
              </div>
            </div>
          </a>
          <Link
            href="/контакти/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: '#2C241D',
              color: 'white',
              borderRadius: 13,
              padding: '11px 14px',
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: '0.78rem',
              boxShadow: '0 5px 16px rgba(44,36,29,0.24)',
              flexShrink: 0,
              whiteSpace: 'nowrap',
              textDecoration: 'none',
            }}
          >
            Запитване <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* ─── DESKTOP: dark section ─── */}
      <section className="hidden md:block bg-charcoal py-10">
        <div className="container-main">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-14 h-14 rounded-full bg-walnut flex items-center justify-center flex-shrink-0">
                <Phone size={22} className="text-white" />
              </div>
              <div className="text-center sm:text-left">
                <p className="font-body text-sm mb-1" style={{ color: 'rgba(250,250,247,0.55)' }}>Обадете се ни</p>
                <a href="tel:+359876081199" className="font-display text-white text-3xl font-semibold hover:text-walnut transition-colors">
                  0876 081 199
                </a>
                <p className="font-body text-xs mt-1" style={{ color: 'rgba(250,250,247,0.45)' }}>Пон – Пет. 09:00 – 18:00</p>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-end gap-3">
              <Link
                href="/контакти/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-walnut text-white font-body font-semibold rounded-btn hover:bg-walnut-dark transition-colors text-base"
              >
                Заявка за консултация →
              </Link>
              <div className="flex items-center gap-2 font-body text-xs" style={{ color: 'rgba(250,250,247,0.45)' }}>
                <Shield size={13} />
                Безплатна оценка и оферта
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
