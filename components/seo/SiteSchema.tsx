import { SITE_CONFIG } from '@/lib/site-config'

/** Organization + WebSite entities for the home page. */
export default function SiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_CONFIG.siteUrl}/#organization`,
        name: SITE_CONFIG.name,
        alternateName: 'Dom Expert',
        url: `${SITE_CONFIG.siteUrl}/`,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_CONFIG.siteUrl}/images/logo-icon.png`,
        },
        image: `${SITE_CONFIG.siteUrl}/images/og/home.webp`,
        foundingDate: SITE_CONFIG.foundingDate,
        telephone: SITE_CONFIG.phoneInternational,
        email: SITE_CONFIG.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: SITE_CONFIG.address.street,
          addressLocality: SITE_CONFIG.address.city,
          postalCode: SITE_CONFIG.address.postalCode,
          addressCountry: SITE_CONFIG.address.country,
        },
        sameAs: [
          SITE_CONFIG.social.facebook,
          SITE_CONFIG.social.instagram,
          SITE_CONFIG.googleBusinessProfile.url,
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_CONFIG.siteUrl}/#website`,
        url: `${SITE_CONFIG.siteUrl}/`,
        name: SITE_CONFIG.siteName,
        inLanguage: 'bg-BG',
        publisher: { '@id': `${SITE_CONFIG.siteUrl}/#organization` },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
    />
  )
}
