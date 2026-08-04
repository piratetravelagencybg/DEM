import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

interface GuideSection {
  title: string
  paragraphs: string[]
  bullets?: string[]
}

interface GuideStep {
  title: string
  description: string
}

interface GuideLink {
  href: string
  label: string
  description: string
}

interface ServiceGuideProps {
  eyebrow?: string
  title: string
  intro: string
  sections: GuideSection[]
  steps?: GuideStep[]
  links?: GuideLink[]
}

export default function ServiceGuide({
  eyebrow = 'Полезна информация',
  title,
  intro,
  sections,
  steps = [],
  links = [],
}: ServiceGuideProps) {
  return (
    <section className="section-py" style={{ backgroundColor: 'var(--color-warm-white)' }}>
      <div className="container-main">
        <div className="max-w-3xl mb-10">
          <span className="eyebrow-pill">{eyebrow}</span>
          <h2 className="section-title text-left">{title}</h2>
          <p className="font-body text-warm-gray leading-relaxed mt-4" style={{ fontSize: '1rem' }}>
            {intro}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-2xl bg-white"
              style={{ border: '1px solid #EDE5DA', padding: 'clamp(1.25rem, 3vw, 1.75rem)' }}
            >
              <h3 className="font-display font-semibold text-charcoal mb-3" style={{ fontSize: '1.25rem' }}>
                {section.title}
              </h3>
              <div className="space-y-3">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="font-body text-warm-gray leading-relaxed" style={{ fontSize: '0.93rem' }}>
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.bullets && section.bullets.length > 0 && (
                <ul className="space-y-2 mt-4">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5 font-body text-charcoal" style={{ fontSize: '0.88rem' }}>
                      <CheckCircle size={15} className="text-walnut flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>

        {steps.length > 0 && (
          <div className="mt-14">
            <h2 className="font-display font-bold text-charcoal mb-6" style={{ fontSize: 'clamp(1.45rem, 3vw, 2rem)' }}>
              Как протича работата
            </h2>
            <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {steps.map((step, index) => (
                <li
                  key={step.title}
                  className="rounded-2xl bg-cream"
                  style={{ border: '1px solid #E7DDCF', padding: '1.15rem' }}
                >
                  <span
                    className="inline-flex items-center justify-center rounded-full bg-walnut text-white font-body font-semibold mb-3"
                    style={{ width: 30, height: 30, fontSize: '0.78rem' }}
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  <h3 className="font-display font-semibold text-charcoal mb-1" style={{ fontSize: '1rem' }}>
                    {step.title}
                  </h3>
                  <p className="font-body text-warm-gray leading-relaxed" style={{ fontSize: '0.82rem' }}>
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        )}

        {links.length > 0 && (
          <div className="mt-14">
            <h2 className="font-display font-bold text-charcoal mb-6" style={{ fontSize: 'clamp(1.45rem, 3vw, 2rem)' }}>
              Разгледайте още
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group rounded-2xl bg-white transition-transform duration-200 hover:-translate-y-0.5"
                  style={{ border: '1px solid #E7DDCF', padding: '1.15rem' }}
                >
                  <span className="flex items-center justify-between gap-3 font-display font-semibold text-charcoal group-hover:text-walnut transition-colors">
                    {link.label}
                    <ArrowRight size={16} className="flex-shrink-0" aria-hidden="true" />
                  </span>
                  <span className="block font-body text-warm-gray leading-relaxed mt-2" style={{ fontSize: '0.82rem' }}>
                    {link.description}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
