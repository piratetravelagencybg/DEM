export default function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'FurnitureStore'],
    '@id': 'https://domexpertmebel.com/#business',
    name: 'Dom Expert Мебел',
    alternateName: 'Dom Expert',
    description: 'Семейна фирма за мебели по поръчка в Благоевград и София. Кухни, гардероби, спални, офис мебели. Безплатна консултация и 3D проект.',
    url: 'https://domexpertmebel.com',
    telephone: '+359876081199',
    email: 'office@domexpertmebel.com',
    foundingDate: '2014',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ул. Стамболийски 52',
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
      { '@type': 'City', name: 'Кресна' },
      { '@type': 'City', name: 'Банско' },
      { '@type': 'City', name: 'Разлог' },
    ],
    image: 'https://domexpertmebel.com/images/hero/hero.png',
    logo: 'https://domexpertmebel.com/images/logo-icon.png',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Мебели по поръчка',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Кухни по поръчка', url: 'https://domexpertmebel.com/услуги/кухни-по-поръчка/' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Гардероби по поръчка', url: 'https://domexpertmebel.com/услуги/гардероби-по-поръчка/' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Спални по поръчка', url: 'https://domexpertmebel.com/услуги/спални-по-поръчка/' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Дневни по поръчка', url: 'https://domexpertmebel.com/услуги/дневни-по-поръчка/' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Офис мебели', url: 'https://domexpertmebel.com/услуги/офис-мебели/' } },
      ],
    },
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
