import type { Metadata } from 'next'
import ServicePageTemplate from '@/components/ui/ServicePageTemplate'
import ProjectHighlight from '@/components/ui/ProjectHighlight'
import ServiceGuide from '@/components/ui/ServiceGuide'
import services from '@/data/services.json'
import { projectHref, projectImageAlt, projectStatusLabel, projects } from '@/lib/projects'
import { completePageMetadata } from '@/lib/seo'

const service = services.find((s) => s.id === 'ofis')!
const featuredProject = projects.find((project) => project.slug === 'ofis-blagoevgrad')!

const TITLE = 'Офис мебели по поръчка – бюра и рецепции | Dom Expert'
const DESCRIPTION = 'Офис обзавеждане по поръчка: бюра, рецепции за офис, шкафове и конферентни маси с 3D проект преди изработка. Собствена работилница, 2 г. гаранция.'

const guideSections = [
  {
    title: 'Бюро по поръчка',
    paragraphs: [
      'Готовите бюра рядко пасват на нишата, на броя монитори и на начина, по който работите. Бюрото по поръчка проектираме по размерите на помещението — с подходяща дълбочина, канал за кабелите, контейнер с чекмеджета и място за техниката.',
      'При работни места за няколко души планираме бюрата в редове или групи, с разстояния за минаване и шкафове между тях, така че офисът да остане подреден.',
    ],
    bullets: [
      'Размер и дълбочина според монитора и задачите',
      'Скрито окабеляване и място за компютъра',
      'Контейнери и шкафове към всяко работно място',
    ],
  },
  {
    title: 'Рецепция за офис',
    paragraphs: [
      'Рецепцията е първото, което вижда посетителят, и работно място за служителя по цял ден. Проектираме я с по-висок плот към посетителите, бюро за служителя, място за принтер и документи и скрити кабели.',
      'Фронтът на рецепцията може да носи логото и цветовете на фирмата, а осветлението да го подчертава. Всичко това се вижда в 3D проекта преди изработка.',
    ],
  },
  {
    title: 'Шкафове, архив и конферентни маси',
    paragraphs: [
      'Архивни шкафове до тавана, гардероби за връхни дрехи, етажерки за папки и конферентни маси, оразмерени според броя на хората в залата. Материалите избираме според натоварването — офисните мебели се ползват всеки ден и от много хора.',
    ],
  },
  {
    title: 'Офис обзавеждане от един изпълнител',
    paragraphs: [
      'Проектираме, изработваме в собствената си работилница в Благоевград и монтираме. Така офисът има единна визия, а вие — един отговорен човек от 3D проекта до последната регулировка. Мебелите са с 2 години гаранция.',
    ],
  },
]

const guideSteps = [
  { title: 'План и задачи', description: 'Изпращате план на офиса и колко работни места ви трябват.' },
  { title: '3D проект', description: 'Проектираме бюрата, рецепцията и шкафовете в 3D.' },
  { title: 'Оглед', description: 'Проверяваме размерите и изводите — 50 €, приспадат се.' },
  { title: 'Изработка', description: '4–6 седмици в работилницата в Благоевград.' },
  { title: 'Монтаж', description: 'В уговорен ден, за да не спира работата.' },
]

const guideLinks = [
  { href: '/услуги/обзавеждане-на-обекти/салони-за-красота/', label: 'Мебели за салони за красота', description: 'Рецепции, станции и шкафове за салони.' },
  { href: '/услуги/3d-визуализация/', label: '3D визуализация', description: 'Как изглежда проектът преди изработка.' },
  { href: '/услуги/интериорен-дизайн/', label: 'Интериорен дизайн', description: 'Цялостен дизайн на офиса.' },
  { href: '/благоевград/', label: 'Мебели по поръчка в Благоевград', description: 'Работилницата ни и проекти в града.' },
  { href: '/софия/', label: 'Мебели по поръчка в София', description: 'Оглед, доставка и монтаж в цяла София.' },
  { href: '/контакти/', label: 'Контакти', description: 'Телефон, имейл и форма за запитване.' },
]

export const metadata: Metadata = completePageMetadata({
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: 'https://domexpertmebel.com/услуги/офис-мебели/' },
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    siteName: 'Dom Expert Мебел',
    url: 'https://domexpertmebel.com/услуги/офис-мебели/',
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/images/og/office.webp', width: 1200, height: 630, alt: 'Примерна визуализация на офис мебели по поръчка' }],
  },
})

export default function OfisMebeliPage() {
  return (
    <ServicePageTemplate
      title={service.title}
      subtitle="Проектираме и изработваме офис мебели по поръчка — бюра, рецепции за офис, шкафове и конферентни маси — с 3D проект преди изработка, в собствената си работилница в Благоевград. 3D проектът е от 50 €, огледът е 50 € (приспадат се при поръчка), а изработката отнема 4–6 седмици след одобрение."
      heroImage={service.image}
      gallery={service.gallery}
      features={service.features}
      faq={service.faq}
      slug={service.slug}
      schemaDescription="Офис обзавеждане по поръчка: бюра, рецепции за офис, архивни шкафове и конферентни маси с 3D проект, изработка в Благоевград и монтаж."
    >
      <ServiceGuide
        eyebrow="Офис обзавеждане"
        title="Офис обзавеждане по поръчка, планирано за работния ден"
        intro="Добрият офис започва от това колко души работят в него и какво правят. Затова проектираме бюрата, рецепцията и съхранението заедно, в един 3D проект."
        sections={guideSections}
        steps={guideSteps}
        links={guideLinks}
      />
      <ProjectHighlight
        title={featuredProject.title}
        description={featuredProject.description}
        city={featuredProject.city}
        duration={featuredProject.duration}
        image={featuredProject.images[0]}
        href={projectHref(featuredProject)}
        eyebrow={projectStatusLabel(featuredProject)}
        imageAlt={projectImageAlt(featuredProject)}
        imageCaption={featuredProject.imageCaption}
      />
    </ServicePageTemplate>
  )
}
