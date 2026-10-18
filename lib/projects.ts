import rawProjects from '@/data/projects.json'

export type ProjectStatus = 'realized' | '3d'

export type Project = {
  id: string
  slug: string
  /** Set when the project is presented on its own page outside /проекти/. */
  page?: string
  title: string
  category: string
  /** Empty when the city is not confirmed yet. */
  city: string
  description: string
  materials: string
  duration: string
  images: string[]
  imageType: 'photo' | 'visualization'
  imageCaption: string
  featured: boolean
  status: ProjectStatus
}

export const projects = rawProjects as Project[]

/** Projects that get a case-study page under /проекти/<slug>/. */
export const caseStudyProjects = projects.filter((project) => !project.page)

export function projectHref(project: Project) {
  return project.page ?? `/проекти/${project.slug}/`
}

export function projectStatusLabel(project: Project) {
  return project.status === '3d' ? '3D проект' : 'Реализиран проект'
}

/** Short badge shown on top of the image. */
export function projectImageBadge(project: Project) {
  if (project.imageType === 'photo') return 'Реализиран проект'
  return project.status === '3d' ? '3D визуализация' : 'Примерна визуализация'
}

export function projectPlace(project: Project) {
  return project.city ? ` в ${project.city}` : ''
}

export function projectImageAlt(project: Project, view?: string) {
  const subject = project.title + projectPlace(project) + (view ? ` — ${view}` : '')
  if (project.imageType === 'photo') return `${subject} — реализиран проект`
  return project.status === '3d'
    ? `3D визуализация: ${subject}`
    : `${subject} — примерна визуализация към реализиран проект`
}

export function projectsByCity(city: string) {
  return projects.filter((project) => project.city === city)
}

export function projectsByCategory(category: string) {
  return projects.filter((project) => project.category === category)
}
