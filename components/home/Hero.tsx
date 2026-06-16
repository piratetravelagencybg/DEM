'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: `url('/images/hero/hero.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay — dark only at top & bottom, clear in the middle so the image shines */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(10,7,4,0.60) 0%, rgba(10,7,4,0.0) 32%, rgba(10,7,4,0.0) 50%, rgba(10,7,4,0.60) 72%, rgba(10,7,4,0.88) 100%)',
        zIndex: 1,
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minHeight: '100svh',
        padding: '0 1.25rem',
      }}>

        {/* Spacer for fixed header */}
        <div style={{ height: '72px', flexShrink: 0 }} />

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.22)',
            borderRadius: '100px',
            padding: '6px 14px',
            fontSize: '0.66rem',
            fontWeight: 700,
            color: 'white',
            letterSpacing: '0.09em',
            textTransform: 'uppercase',
            marginBottom: '1.4rem',
            width: 'fit-content',
            fontFamily: 'var(--font-body)',
          }}
        >
          <span style={{ fontSize: '0.75rem' }}>🔨</span> Семейна мебелна работилница
        </motion.div>

        {/* H1 — bold, NOT italic */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.32 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.4rem, 9vw, 5rem)',
            fontWeight: 700,
            fontStyle: 'normal',
            color: 'white',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
          }}
        >
          Мебели по поръчка<br />за домове с характер
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.46 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.97rem',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.78)',
            maxWidth: '34ch',
          }}
        >
          Проектираме, изработваме и монтираме —<br />
          кухни, гардероби и спални по вашия вкус.
        </motion.p>

        <div style={{ flex: 1, minHeight: '2rem' }} />

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            display: 'flex',
            borderTop: '1px solid rgba(255,255,255,0.16)',
            paddingTop: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          {[
            { n: '10+', l: 'Години опит' },
            { n: '500+', l: 'Проекти' },
            { n: '100%', l: 'Доволни клиенти' },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center', position: 'relative' }}>
              <span style={{
                display: 'block',
                fontFamily: 'var(--font-display)',
                fontSize: '1.8rem',
                fontWeight: 700,
                color: 'white',
                lineHeight: 1,
              }}>{s.n}</span>
              <span style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontSize: '0.67rem',
                color: 'rgba(255,255,255,0.55)',
                marginTop: '4px',
              }}>{s.l}</span>
              {i < 2 && (
                <div style={{
                  position: 'absolute',
                  right: 0, top: '10%', bottom: '10%',
                  width: '1px',
                  background: 'rgba(255,255,255,0.15)',
                }} />
              )}
            </div>
          ))}
        </motion.div>

        {/* Buttons — wide on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.72 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.65rem',
            paddingBottom: '2.5rem',
            width: '100%',
            maxWidth: '360px',
          }}
        >
          {/* Primary */}
          <motion.a
            href="/контакти/"
            whileHover={{
              y: -3,
              boxShadow: '0 16px 48px rgba(139,111,71,0.75)',
              filter: 'brightness(1.18)',
            }}
            whileTap={{ y: -1, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: '#8B6F47',
              color: 'white',
              borderRadius: '100px',
              padding: '14px 28px',
              fontSize: '0.88rem',
              fontWeight: 700,
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase' as const,
              boxShadow: '0 6px 28px rgba(139,111,71,0.55)',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            Безплатна консултация →
          </motion.a>

          {/* Secondary */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <motion.a
              href="/проекти/"
              initial={{ backgroundColor: 'rgba(255,255,255,0)' }}
              whileHover={{
                y: -3,
                backgroundColor: 'rgba(255,255,255,0.13)',
                boxShadow: '0 8px 32px rgba(255,255,255,0.08)',
              }}
              whileTap={{ y: -1, scale: 0.98, backgroundColor: 'rgba(255,255,255,0.07)' }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                border: '1.5px solid rgba(255,255,255,0.45)',
                color: 'white',
                borderRadius: '100px',
                padding: '13px 28px',
                fontSize: '0.88rem',
                fontWeight: 600,
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase' as const,
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              Виж проекти
            </motion.a>

            {/* Scroll mouse icon */}
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.7, ease: 'easeInOut' }}
              style={{
                flexShrink: 0,
                width: '36px',
                height: '56px',
                borderRadius: '100px',
                border: '2px solid rgba(255,255,255,0.28)',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingTop: '8px',
              }}
            >
              <div style={{
                width: '3px',
                height: '8px',
                borderRadius: '100px',
                background: 'rgba(255,255,255,0.5)',
              }} />
            </motion.div>
          </div>
        </motion.div>

      </div>


    </section>
  )
}
