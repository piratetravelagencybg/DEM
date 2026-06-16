'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Phone, Pencil, Hammer, CheckCircle } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Консултация',
    description: 'Изслушваме вашите идеи и нужди. Безплатна среща на място или онлайн — без ангажимент.',
    Icon: Phone,
    color: '#C4914A',
    colorBg: 'rgba(196,145,74,0.15)',
    colorBorder: 'rgba(196,145,74,0.4)',
  },
  {
    number: '02',
    title: 'Проектиране',
    description: 'Изготвяме 3D проект с точни размери и материали. Коригираме докато сте напълно доволни.',
    Icon: Pencil,
    color: '#5EA87C',
    colorBg: 'rgba(94,168,124,0.15)',
    colorBorder: 'rgba(94,168,124,0.4)',
  },
  {
    number: '03',
    title: 'Изработка',
    description: 'Произвеждаме с прецизност само от висококачествени материали от доказани доставчици.',
    Icon: Hammer,
    color: '#5A9BBF',
    colorBg: 'rgba(90,155,191,0.15)',
    colorBorder: 'rgba(90,155,191,0.4)',
  },
  {
    number: '04',
    title: 'Монтаж',
    description: 'Доставяме и монтираме в уговорен срок. Проверяваме всеки детайл, почистваме след себе си.',
    Icon: CheckCircle,
    color: '#4AAD82',
    colorBg: 'rgba(74,173,130,0.15)',
    colorBorder: 'rgba(74,173,130,0.4)',
  },
]

export default function ProcessSteps() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section-py" style={{ backgroundColor: '#1A1208' }}>
      <div className="container-main">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16 text-center"
        >
          <span className="eyebrow-pill-dark">Как работим</span>
          <h2
            className="font-display font-bold leading-[1.1] mb-4"
            style={{
              fontSize: 'clamp(2rem, 5.5vw, 3rem)',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #E8D5BA 50%, #C4A882 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            От идея до реалност
          </h2>
          <p
            className="font-body mx-auto leading-relaxed"
            style={{ fontSize: '1rem', maxWidth: '46ch', color: 'rgba(255,255,255,0.58)' }}
          >
            Следваме ясен, прозрачен процес — знаете точно какво се случва на всяка стъпка.
          </p>
        </motion.div>

        {/* ─── MOBILE: vertical timeline ─── */}
        <div className="md:hidden relative">
          {/* Connecting line */}
          <div
            className="absolute top-7 bottom-7"
            style={{
              left: 27,
              width: 2,
              background: 'linear-gradient(to bottom, rgba(196,168,130,0.6) 0%, rgba(196,168,130,0.05) 100%)',
              borderRadius: 2,
            }}
          />

          <div className="space-y-5">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.09 }}
                className="flex gap-4 items-start"
              >
                {/* Icon circle */}
                <div
                  className="relative z-10 flex-shrink-0 flex items-center justify-center rounded-full"
                  style={{
                    width: 56,
                    height: 56,
                    background: step.colorBg,
                    border: `2px solid ${step.colorBorder}`,
                    boxShadow: `0 4px 20px ${step.colorBg}`,
                  }}
                >
                  <step.Icon size={20} style={{ color: step.color }} />
                </div>

                {/* Content */}
                <div
                  className="flex-1 rounded-[16px] p-4"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="font-body font-bold"
                      style={{ fontSize: '0.62rem', letterSpacing: '0.1em', color: step.color }}
                    >
                      {step.number}
                    </span>
                    <h3
                      className="font-display font-bold text-white"
                      style={{ fontSize: '1.1rem' }}
                    >
                      {step.title}
                    </h3>
                  </div>
                  <p
                    className="font-body leading-relaxed"
                    style={{ fontSize: '0.87rem', color: 'rgba(255,255,255,0.62)' }}
                  >
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── DESKTOP: 4 cards with connecting line ─── */}
        <div className="hidden md:block relative">

          {/* Connecting dashed line between icons */}
          <div
            className="absolute"
            style={{
              top: 40,
              left: '14%',
              right: '14%',
              height: 1,
              background: 'repeating-linear-gradient(90deg, rgba(196,168,130,0.4) 0px, rgba(196,168,130,0.4) 8px, transparent 8px, transparent 20px)',
            }}
          />

          <div className="grid grid-cols-4 gap-5">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.08 + i * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                {/* Icon circle */}
                <div
                  className="relative z-10 flex items-center justify-center rounded-full mb-6"
                  style={{
                    width: 80,
                    height: 80,
                    background: step.colorBg,
                    border: `2px solid ${step.colorBorder}`,
                    boxShadow: `0 6px 30px ${step.colorBg}`,
                  }}
                >
                  <step.Icon size={28} style={{ color: step.color }} />
                  {/* Step number badge */}
                  <span
                    className="absolute -top-2 -right-2 flex items-center justify-center rounded-full font-body font-bold text-white"
                    style={{
                      width: 24,
                      height: 24,
                      fontSize: '0.62rem',
                      background: step.color,
                    }}
                  >
                    {i + 1}
                  </span>
                </div>

                {/* Card */}
                <div
                  className="w-full rounded-[20px] p-6 flex-1"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: `1px solid ${step.colorBorder}`,
                    boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
                    borderTop: `3px solid ${step.color}`,
                  }}
                >
                  <h3
                    className="font-display font-bold text-white mb-3 leading-tight"
                    style={{ fontSize: '1.25rem' }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="font-body leading-relaxed"
                    style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.62)' }}
                  >
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
