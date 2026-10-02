import { SITE_CONFIG } from '@/lib/site-config'

export default function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'FurnitureStore'],
    '@id': `${SITE_CONFIG.siteUrl}/#business`,
    name: SITE_CONFIG.name,
    alternateName: 'Dom Expert',
    description: 'Семейна фирма за мебели по поръчка в Благоевград, София и региона. Безплатен оглед, платен 3D проект с приспадане при поръчка и 2 години гаранция.',
    url: SITE_CONFIG.siteUrl,
    telephone: SITE_CONFIG.phoneInternational,
    email: SITE_CONFIG.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      postalCode: SITE_CONFIG.address.postalCode,
      addressRegion: SITE_CONFIG.address.region,
      addressCountry: SITE_CONFIG.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE_CONFIG.geo.latitude,
      longitude: SITE_CONFIG.geo.longitude,
    },
    hasMap: SITE_CONFIG.googleBusinessProfile.url,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    priceRange: '$$',
    areaServed: SITE_CONFIG.cities.primary.map((city) => ({
      '@type': 'City',
      name: city,
    })),
    image: `${SITE_CONFIG.siteUrl}/images/og/home.webp`,
    logo: `${SITE_CONFIG.siteUrl}/images/logo-icon.webp`,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Мебели по поръчка',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Кухни по поръчка', url: `${SITE_CONFIG.siteUrl}/услуги/кухни-по-поръчка/` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Гардероби по поръчка', url: `${SITE_CONFIG.siteUrl}/услуги/гардероби-по-поръчка/` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Спални по поръчка', url: `${SITE_CONFIG.siteUrl}/услуги/спални-по-поръчка/` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Дневни по поръчка', url: `${SITE_CONFIG.siteUrl}/услуги/дневни-по-поръчка/` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Офис мебели', url: `${SITE_CONFIG.siteUrl}/услуги/офис-мебели/` } },
      ],
    },
    sameAs: [
      SITE_CONFIG.googleBusinessProfile.url,
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.instagram,
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
    />
  )
}
