import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
  level?: 1 | 2
}

export default function SectionHeader({ eyebrow, title, subtitle, align = 'center', className, level = 2 }: SectionHeaderProps) {
  const Tag = `h${level}` as 'h1' | 'h2'
  return (
    <div className={cn('mb-12', align === 'center' && 'text-center', className)}>
      {eyebrow && (
        <span className="inline-block font-body text-xs font-semibold tracking-widest uppercase text-walnut mb-3">
          {eyebrow}
        </span>
      )}
      <Tag className="section-title">{title}</Tag>
      {subtitle && (
        <p className="mt-4 text-warm-gray font-body text-base leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}
