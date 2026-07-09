'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const stats = [
  { target: 500, suffix: '+', label: 'Реализирани проекта', sub: 'Кухни, гардероби, спални' },
  { target: 10,  suffix: '+', label: 'Години опит',          sub: 'Основани 2014 г.' },
  { target: 100, suffix: '%', label: 'Доволни клиенти',      sub: '2г. гаранция' },
]

function Counter({ target, suffix, duration = 1600 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const spanRef = useRef<HTMLSpanElement>(null)
  const inView = useInView(spanRef, { once: true })

  useEffect(() => {
    if (!inView) return
    let frame = 0
    const totalFrames = 55
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
    const timer = setInterval(() => {
      frame++
      setCount(Math.round(easeOut(frame / totalFrames) * target))
      if (frame >= totalFrames) clearInterval(timer)
    }, duration / totalFrames)
    return () => clearInterval(timer)
  }, [inView, target, duration])

  return <span ref={spanRef}>{count}{suffix}</span>
}

export default function AnimatedStats() {
  return (
    <section style={{ background: 'var(--color-warm-white)', borderTop: '1px solid #EDE5DA', borderBottom: '1px solid #EDE5DA' }}>
      <div className="container-main">
        <div className="grid grid-cols-3">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="text-center"
              style={{
                padding: 'clamp(28px, 5vw, 56px) clamp(8px, 3vw, 24px)',
                borderRight: i < 2 ? '1px solid #EDE5DA' : 'none',
              }}
            >
              <div
                className="font-display font-bold"
                style={{
                  fontSize: 'clamp(2rem, 8vw, 5rem)',
                  color: '#8B6F47',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                <Counter target={s.target} suffix={s.suffix} />
              </div>
              <div
                className="font-body font-bold"
                style={{
                  fontSize: 'clamp(0.55rem, 1.5vw, 0.72rem)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#2C2520',
                  marginTop: 'clamp(8px, 2vw, 14px)',
                }}
              >
                {s.label}
              </div>
              <div
                className="font-body hidden sm:block"
                style={{ fontSize: '0.72rem', color: '#9B9490', marginTop: 5 }}
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
