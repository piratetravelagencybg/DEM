export default function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FurnitureStore',
    name: 'Dom Expert Мебел',
    description: 'Семейна фирма за мебели по поръчка в Благоевград и София',
    url: 'https://domexpertmebel.bg',
    telephone: '+359888123456',
    email: 'office@domexpertmebel.bg',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Благоевград',
      postalCode: '2700',
      addressCountry: 'BG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 42.0135,
      longitude: 23.0944,
    },
    openingHours: 'Mo-Fr 09:00-18:00',
    priceRange: '$$',
    areaServed: ['Благоевград', 'София', 'Дупница', 'Сандански', 'Банско', 'Разлог'],
    image: 'https://domexpertmebel.bg/images/hero/hero.png',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
