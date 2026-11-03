import Link from 'next/link'
import { ArrowRight, CheckCircle, ChevronDown, Phone } from 'lucide-react'
import QuoteForm from '@/components/ui/QuoteForm'
import ServiceGuide from '@/components/ui/ServiceGuide'
import ProjectCards from '@/components/ui/ProjectCards'
import GoogleReviews from '@/components/home/GoogleReviews'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import FAQSchema from '@/components/seo/FAQSchema'
import ServiceSchema from '@/components/seo/ServiceSchema'
import type { Project } from '@/lib/projects'

type GuideSection = { title: string; paragraphs: string[]; bullets?: string[] }
type GuideStep = { title: string; description: string }
type GuideLink = { href: string; label: string; description: string }
type FaqItem = { question: string; answer: string }

type Crumb = { name: string; href: string }

/**
 * Shared layout of the landing pages (/софия/<service>/, niche pages). Every
 * page passes its own text; only the structure (hero + form, guide, projects,
 * FAQ, CTA, related links) is shared.
 */
export default function LandingPage({
  pageUrl,
  breadcrumbs,
  eyebrow,
  title,
  intro,
  facts,
  ctaLabel,
  formTitle,
  formText,
  schema,
  guide,
  projects,
  children,
  faqTitle,
  faq,
  finalTitle,
  finalText,
  related,
}: {
  pageUrl: string
  /** Trail between „Начало“ and the current page; the last item is the page itself. */
  breadcrumbs: Crumb[]
  eyebrow: string
  title: string
  intro: string
  facts: string[]
  ctaLabel: string
  formTitle: string
  formText: string
  schema: { name: string; serviceType: string; description: string; areaServed: string | string[] }
  guide: { eyebrow: string; title: string; intro: string; sections: GuideSection[]; steps: GuideStep[]; links: GuideLink[] }
  projects?: { title: string; intro: string; items: Project[] }
  children?: React.ReactNode
  faqTitle: string
  faq: FaqItem[]
  finalTitle: string
  finalText: string
  related: { title: string; links: { href: string; label: string }[] }
}) {
  const path = new URL(pageUrl).pathname
  const relatedLinks = related.links.filter((link) => encodeURI(link.href) !== path && link.href !== path)
  const trail = breadcrumbs.slice(0, -1)
  const current = breadcrumbs[breadcrumbs.length - 1]

  return (
    <>
      <ServiceSchema
        name={schema.name}
        url={pageUrl}
        city={schema.areaServed}
        serviceType={schema.serviceType}
        description={schema.description}
      />
      <FAQSchema items={faq} />
      <BreadcrumbSchema items={[
        { name: 'Начало', url: 'https://domexpertmebel.com/' },
        ...trail.map((crumb) => ({ name: crumb.name, url: `https://domexpertmebel.com${crumb.href}` })),
        { name: current.name, url: pageUrl },
      ]} />

      {/* ── Hero ── */}
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

        <div className="container-main relative">
          <nav className="flex flex-wrap items-center gap-2 font-body mb-8" style={{ fontSize: '0.78rem', color: '#9B9490' }}>
            <Link href="/" style={{ color: '#8B6F47' }} className="hover:underline underline-offset-2">Начало</Link>
            {trail.map((crumb) => (
              <span key={crumb.href} className="contents">
                <span>/</span>
                <Link href={crumb.href} style={{ color: '#8B6F47' }} className="hover:underline underline-offset-2">{crumb.name}</Link>
              </span>
            ))}
            <span>/</span>
            <span style={{ color: '#3C2A18', fontWeight: 500 }}>{current.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <span className="eyebrow-pill">{eyebrow}</span>
              <h1 className="font-display font-bold text-charcoal leading-[1.05]" style={{ fontSize: 'var(--text-h1)' }}>
                {title}
              </h1>
              <p className="font-body text-warm-gray leading-relaxed" style={{ fontSize: '1.05rem' }}>
                {intro}
              </p>

              <ul className="space-y-2">
                {facts.map((fact) => (
                  <li
                    key={fact}
                    className="flex items-center gap-3"
                    style={{
                      padding: '10px 14px', borderRadius: 12,
                      background: 'rgba(255,255,255,0.72)',
                      border: '1px solid rgba(139,111,71,0.13)',
                    }}
                  >
                    <CheckCircle size={15} style={{ color: '#8B6F47', flexShrink: 0 }} aria-hidden="true" />
                    <span className="font-body text-charcoal" style={{ fontSize: '0.88rem', fontWeight: 500 }}>{fact}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                <a href="tel:+359876081199" className="btn-primary inline-flex items-center gap-2">
                  <Phone size={16} /> 0876 081 199
                </a>
                <a href="#zapitvane" className="btn-outline inline-flex items-center gap-2">
                  {ctaLabel}
                </a>
              </div>
            </div>

            <div id="zapitvane" style={{ scrollMarginTop: '6rem' }}>
              <div
                className="bg-white rounded-2xl p-8"
                style={{ border: '1px solid #EDE5DA', boxShadow: '0 4px 32px rgba(0,0,0,0.06)' }}
              >
                <h2 className="font-display font-semibold text-charcoal text-xl mb-2">{formTitle}</h2>
                <p className="font-body text-warm-gray text-sm mb-6">{formText}</p>
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceGuide
        eyebrow={guide.eyebrow}
        title={guide.title}
        intro={guide.intro}
        sections={guide.sections}
        steps={guide.steps}
        links={guide.links}
      />

      {children}

      {projects && projects.items.length > 0 && (
        <section className="section-py" style={{ backgroundColor: 'var(--color-cream)' }}>
          <div className="container-main">
            <div className="max-w-3xl mb-10">
              <span className="eyebrow-pill">Проекти</span>
              <h2 className="section-title text-left">{projects.title}</h2>
              <p className="font-body text-warm-gray leading-relaxed mt-4" style={{ fontSize: '1rem' }}>
                {projects.intro}
              </p>
            </div>
            <ProjectCards items={projects.items} />
          </div>
        </section>
      )}

      <GoogleReviews />

      {/* ── FAQ ── */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container-main max-w-3xl">
          <div className="text-center mb-10">
            <span className="eyebrow-pill">Въпроси и отговори</span>
            <h2 className="font-display font-bold heading-gradient" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}>
              {faqTitle}
            </h2>
          </div>
          <div className="space-y-3">
            {faq.map((item) => (
              <details
                key={item.question}
                className="group cursor-pointer"
                style={{ background: 'white', borderRadius: 16, border: '1px solid #EDE5DA', overflow: 'hidden' }}
              >
                <summary
                  className="flex items-center justify-between font-display font-semibold text-charcoal list-none"
                  style={{ fontSize: '1rem', padding: '18px 22px' }}
                >
                  {item.question}
                  <ChevronDown size={18} className="text-walnut group-open:rotate-180 transition-transform flex-shrink-0 ml-3" />
                </summary>
                <div style={{ borderTop: '1px solid #EDE5DA', padding: '16px 22px 20px' }}>
                  <p className="font-body text-warm-gray leading-relaxed" style={{ fontSize: '0.9rem' }}>{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-warm-white)' }}>
        <div
          className="container-main max-w-3xl text-center rounded-2xl bg-white"
          style={{ border: '1px solid #EDE5DA', padding: 'clamp(1.75rem, 5vw, 3rem)', boxShadow: '0 4px 32px rgba(0,0,0,0.06)' }}
        >
          <h2 className="font-display font-bold heading-gradient" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}>
            {finalTitle}
          </h2>
          <p className="font-body text-warm-gray leading-relaxed mt-4 mx-auto" style={{ maxWidth: '36rem', fontSize: '1rem' }}>
            {finalText}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-7">
            <a href="tel:+359876081199" className="btn-primary inline-flex items-center gap-2">
              <Phone size={16} /> 0876 081 199
            </a>
            <a href="#zapitvane" className="btn-outline inline-flex items-center gap-2">
              Изпратете запитване
            </a>
          </div>
        </div>
      </section>

      {/* ── Related pages ── */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container-main">
          <h2 className="font-display font-semibold text-charcoal text-center mb-8" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)' }}>
            {related.title}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-2 font-body font-medium transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  padding: '10px 20px', borderRadius: 100, fontSize: '0.88rem',
                  border: '1px solid rgba(139,111,71,0.25)',
                  color: '#8B6F47',
                  background: 'rgba(139,111,71,0.05)',
                }}
              >
                {link.label} <ArrowRight size={14} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
