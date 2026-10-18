import Link from 'next/link'
import { CheckCircle, ChevronDown, Phone } from 'lucide-react'
import QuoteForm from '@/components/ui/QuoteForm'
import ServiceGuide from '@/components/ui/ServiceGuide'
import ProjectHighlight from '@/components/ui/ProjectHighlight'
import GoogleReviews from '@/components/home/GoogleReviews'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import FAQSchema from '@/components/seo/FAQSchema'
import ServiceSchema from '@/components/seo/ServiceSchema'
import { projectHref, projectImageAlt, projectStatusLabel, projects } from '@/lib/projects'
import type { ComponentProps } from 'react'

type GuideProps = ComponentProps<typeof ServiceGuide>

interface CityLandingProps {
  city: string
  path: string
  h1: string
  intro: string
  schemaDescription: string
  features: string[]
  formIntro: string
  quickLinks: { label: string; href: string }[]
  guide: GuideProps
  projectSlug?: string
  area: { title: string; intro: string; places: string[] }
  faqTitle: string
  faq: { question: string; answer: string }[]
}

const CITY_LINKS = [
  { city: 'Благоевград', href: '/благоевград/' },
  { city: 'София', href: '/софия/' },
  { city: 'Дупница', href: '/дупница/' },
  { city: 'Сандански', href: '/сандански/' },
  { city: 'Петрич', href: '/петрич/' },
]

/** Shared layout of the regional city pages; every text comes from the page. */
export default function CityLandingTemplate({
  city,
  path,
  h1,
  intro,
  schemaDescription,
  features,
  formIntro,
  quickLinks,
  guide,
  projectSlug,
  area,
  faqTitle,
  faq,
}: CityLandingProps) {
  const pageUrl = 'https://domexpertmebel.com' + path
  const project = projectSlug ? projects.find((item) => item.slug === projectSlug) : undefined

  return (
    <>
      <ServiceSchema
        name={`Мебели по поръчка в ${city}`}
        url={pageUrl}
        city={city}
        description={schemaDescription}
      />
      <FAQSchema items={faq} />
      <BreadcrumbSchema items={[
        { name: 'Начало', url: 'https://domexpertmebel.com/' },
        { name: `Мебели ${city}`, url: pageUrl },
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
          width: '420px', height: '420px', borderRadius: '50%',
          background: 'rgba(139,111,71,0.10)', filter: 'blur(65px)', pointerEvents: 'none',
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute', bottom: '-50px', left: '-30px',
          width: '280px', height: '280px', borderRadius: '50%',
          background: 'rgba(139,111,71,0.06)', filter: 'blur(50px)', pointerEvents: 'none',
        }} />

        <div className="container-main relative">
          <nav className="flex items-center gap-2 font-body mb-8" style={{ fontSize: '0.78rem', color: '#9B9490' }}>
            <Link href="/" style={{ color: '#8B6F47' }} className="hover:underline underline-offset-2">Начало</Link>
            <span>/</span>
            <span style={{ color: '#3C2A18', fontWeight: 500 }}>Мебели {city}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <span className="eyebrow-pill">{city}</span>
              <h1 className="font-display font-bold text-charcoal leading-[1.05]" style={{ fontSize: 'var(--text-h1)' }}>
                {h1}
              </h1>
              <p className="font-body text-warm-gray leading-relaxed" style={{ fontSize: '1.05rem' }}>
                {intro}
              </p>

              <div className="space-y-2">
                {features.map((feature) => (
                  <div
                    key={feature}
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
                    <span className="font-body text-charcoal" style={{ fontSize: '0.88rem', fontWeight: 500 }}>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a href="tel:+359876081199" className="btn-primary inline-flex items-center gap-2">
                  <Phone size={16} /> 0876 081 199
                </a>
                <a href="#zapitvane" className="btn-outline inline-flex items-center gap-2">
                  Изпратете снимки и размери
                </a>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-2">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-center font-body font-medium transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      padding: '10px 8px', borderRadius: 12, fontSize: '0.82rem',
                      background: 'rgba(255,255,255,0.72)',
                      border: '1px solid rgba(139,111,71,0.15)',
                      color: '#8B6F47',
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div id="zapitvane" style={{ scrollMarginTop: '6rem' }}>
              <div
                className="bg-white rounded-2xl p-8"
                style={{ border: '1px solid #EDE5DA', boxShadow: '0 4px 32px rgba(0,0,0,0.06)' }}
              >
                <h2 className="font-display font-semibold text-charcoal text-xl mb-2">Запитване за оферта</h2>
                <p className="font-body text-warm-gray text-sm mb-6">{formIntro}</p>
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceGuide {...guide} />

      {project && (
        <ProjectHighlight
          title={`${project.title} в ${project.city}`}
          eyebrow={projectStatusLabel(project)}
          imageAlt={projectImageAlt(project)}
          description={project.description}
          city={project.city}
          duration={project.duration}
          image={project.images[0]}
          href={projectHref(project)}
          imageCaption={project.imageCaption}
        />
      )}

      {/* ── Service area ── */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container-main max-w-4xl">
          <div className="text-center mb-8">
            <span className="eyebrow-pill">Зона на обслужване</span>
            <h2 className="font-display font-bold heading-gradient" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}>
              {area.title}
            </h2>
            <p className="font-body text-warm-gray leading-relaxed mt-4 mx-auto" style={{ maxWidth: '42rem', fontSize: '1rem' }}>
              {area.intro}
            </p>
          </div>
          <ul className="flex flex-wrap justify-center gap-2.5">
            {area.places.map((place) => (
              <li
                key={place}
                className="font-body"
                style={{
                  padding: '8px 16px', borderRadius: 100, fontSize: '0.85rem',
                  border: '1px solid rgba(139,111,71,0.2)',
                  color: '#3C2A18',
                  background: 'white',
                }}
              >
                {place}
              </li>
            ))}
          </ul>
        </div>
      </section>

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

      {/* ── Other locations ── */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-warm-white)' }}>
        <div className="container-main">
          <h2 className="font-display font-semibold text-charcoal text-center mb-8" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)' }}>
            Обслужваме и други градове
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {CITY_LINKS.filter((link) => link.city !== city).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body font-medium transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  padding: '10px 20px', borderRadius: 100, fontSize: '0.88rem',
                  border: '1px solid rgba(139,111,71,0.25)',
                  color: '#8B6F47',
                  background: 'rgba(139,111,71,0.05)',
                }}
              >
                Мебели {link.city}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
