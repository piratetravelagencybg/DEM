export default function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'FurnitureStore'],
    '@id': 'https://domexpertmebel.bg/#business',
    name: 'Dom Expert Мебел',
    alternateName: 'ДомЕксперт Мебел',
    description: 'Семейна фирма за мебели по поръчка в Благоевград и София. Кухни, гардероби, спални и офис мебели с 10+ години опит.',
    url: 'https://domexpertmebel.bg',
    telephone: '+359888123456',
    email: 'office@domexpertmebel.bg',
    foundingDate: '2014',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Благоевград',
      postalCode: '2700',
      addressRegion: 'Благоевград',
      addressCountry: 'BG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 42.0135,
      longitude: 23.0944,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    priceRange: '$$',
    areaServed: [
      { '@type': 'City', name: 'Благоевград' },
      { '@type': 'City', name: 'София' },
      { '@type': 'City', name: 'Дупница' },
      { '@type': 'City', name: 'Сандански' },
      { '@type': 'City', name: 'Банско' },
      { '@type': 'City', name: 'Разлог' },
    ],
    image: 'https://domexpertmebel.bg/images/hero/hero.png',
    logo: 'https://domexpertmebel.bg/images/logo-icon.png',
    // TODO: Replace with actual social profile URLs
    sameAs: [
      'https://www.facebook.com/domexpertmebel',
      'https://www.instagram.com/domexpertmebel',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
