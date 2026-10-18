interface ServiceSchemaProps {
  name: string
  url: string
  city: string | string[]
  description?: string
  serviceType?: string
}

const BUSINESS_ID = 'https://domexpertmebel.com/#business'

export default function ServiceSchema({ name, url, city, description, serviceType = 'Мебели по поръчка' }: ServiceSchemaProps) {
  const cities = Array.isArray(city) ? city : [city]
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    ...(description ? { description } : {}),
    serviceType,
    url,
    provider: {
      '@id': BUSINESS_ID,
    },
    areaServed: cities.map((name) => ({
      '@type': 'City',
      name,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
    />
  )
}
