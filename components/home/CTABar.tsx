import Link from 'next/link'
import { Phone, Shield, ArrowRight } from 'lucide-react'

export default function CTABar() {
  return (
    <>
      {/* ─── MOBILE: modern floating pill ─── */}
      <div
        className="md:hidden fixed z-[100]"
        style={{
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 28px)',
          maxWidth: 400,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: 'rgba(255,255,255,0.96)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: 22,
            padding: '10px 10px 10px 14px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.18), 0 2px 12px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.7)',
          }}
        >
          {/* Phone button */}
          <a
            href="tel:+359888123456"
            style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 14,
                background: 'rgba(139,111,71,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Phone size={17} style={{ color: '#8B6F47' }} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.88rem', color: '#2C2C2C', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                0888 123 456
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', color: '#8B7E76', marginTop: 1 }}>
                Обади се сега
              </div>
            </div>
          </a>

          {/* Divider */}
          <div style={{ width: 1, height: 32, background: '#E8DDD0', flexShrink: 0 }} />

          {/* Заявка button */}
          <Link
            href="/контакти/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: '#8B6F47',
              color: 'white',
              borderRadius: 16,
              padding: '11px 18px',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '0.86rem',
              boxShadow: '0 4px 18px rgba(139,111,71,0.5)',
              flexShrink: 0,
              whiteSpace: 'nowrap',
              textDecoration: 'none',
            }}
          >
            Заявка <ArrowRight size={14} />
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
                <a href="tel:+359888123456" className="font-display text-white text-3xl font-semibold hover:text-walnut transition-colors">
                  0888 123 456
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
