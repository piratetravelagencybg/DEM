import LandingPage from '@/components/ui/LandingPage'
import { SOFIA_PAGES } from '@/lib/sofia-pages'

type LandingProps = React.ComponentProps<typeof LandingPage>

/** /софия/<service>/ pages: LandingPage with the Sofia breadcrumb, area and related links. */
export default function SofiaServiceLanding({
  breadcrumbLabel,
  schema,
  ...props
}: Omit<LandingProps, 'breadcrumbs' | 'related' | 'schema'> & {
  breadcrumbLabel: string
  schema: Omit<LandingProps['schema'], 'areaServed'>
}) {
  return (
    <LandingPage
      {...props}
      breadcrumbs={[
        { name: 'Мебели София', href: '/софия/' },
        { name: breadcrumbLabel, href: new URL(props.pageUrl).pathname },
      ]}
      schema={{ ...schema, areaServed: 'София' }}
      related={{
        title: 'Още за София',
        links: [{ href: '/софия/', label: 'Мебели по поръчка в София' }, ...SOFIA_PAGES],
      }}
    />
  )
}
