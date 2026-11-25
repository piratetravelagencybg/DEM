'use client'

import { useState } from 'react'
import ProjectCards, { categoryLabels } from '@/components/ui/ProjectCards'
import type { Project } from '@/lib/projects'

const ALL = 'all'

/** Category chips above the project grid; only categories that have projects are shown. */
export default function ProjectFilter({ items }: { items: Project[] }) {
  const [active, setActive] = useState(ALL)
  const categories = Array.from(new Set(items.map((project) => project.category)))
  const visible = active === ALL ? items : items.filter((project) => project.category === active)

  const chips = [
    { key: ALL, label: 'Всички', count: items.length },
    ...categories.map((category) => ({
      key: category,
      label: categoryLabels[category] ?? 'Други',
      count: items.filter((project) => project.category === category).length,
    })),
  ]

  return (
    <>
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap" role="group" aria-label="Филтър по вид мебели">
        {chips.map((chip) => {
          const isActive = chip.key === active
          return (
            <button
              key={chip.key}
              type="button"
              onClick={() => setActive(chip.key)}
              aria-pressed={isActive}
              className={`flex-shrink-0 rounded-full px-4 py-2 font-body text-sm font-medium transition-colors ${isActive ? 'bg-charcoal text-white' : 'border border-walnut/20 bg-warm-white text-charcoal hover:border-walnut hover:text-walnut'}`}
            >
              {chip.label} <span className={isActive ? 'text-white/60' : 'text-warm-gray'}>{chip.count}</span>
            </button>
          )
        })}
      </div>
      <ProjectCards items={visible} headingLevel="h2" />
    </>
  )
}
