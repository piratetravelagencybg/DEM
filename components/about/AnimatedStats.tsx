'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const stats = [
  { target: 500, suffix: '+', label: 'Реализирани проекта', sub: 'Кухни, гардероби, спални, офис мебели' },
  { target: 10,  suffix: '+', label: 'Години опит',          sub: 'Основани 2014 г. в Благоевград' },
  { target: 100, suffix: '%', label: 'Доволни клиенти',      sub: '2-годишна гаранция на всички изделия' },
]

function Counter({ target, suffix, duration = 1800 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const spanRef = useRef<HTMLSpanElement>(null)
  const inView = useInView(spanRef, { once: true })

  useEffect(() => {
    if (!inView) return
    let frame = 0
    const totalFrames = 60
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
    const timer = setInterval(() => {
      frame++
      const progress = easeOut(frame / totalFrames)
      setCount(Math.round(progress * target))
      if (frame >= totalFrames) clearInterval(timer)
    }, duration / totalFrames)
    return () => clearInterval(timer)
  }, [inView, target, duration])

  return (
    <span ref={spanRef}>
      {count}{suffix}
    </span>
  )
}

export default function AnimatedStats() {
  return (
    <section style={{ background: '#1A1208' }}>
      <div className="container-main">
        <div
          className="grid grid-cols-1 sm:grid-cols-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="text-center"
              style={{
                padding: '60px 24px',
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                borderBottom: i < 2 ? undefined : undefined,
              }}
            >
              <div
                className="font-display font-bold"
                style={{
                  fontSize: 'clamp(4rem, 9vw, 6.5rem)',
                  color: '#C4A882',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                <Counter target={s.target} suffix={s.suffix} />
              </div>
              <div
                className="font-body font-bold"
                style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'white',
                  marginTop: 18,
                }}
              >
                {s.label}
              </div>
              <div
                className="font-body"
                style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.38)', marginTop: 6 }}
              >
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
