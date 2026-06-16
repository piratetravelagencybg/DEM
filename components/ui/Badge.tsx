import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'walnut' | 'success' | 'outline'
  className?: string
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center px-3 py-1 rounded-full text-xs font-body font-semibold',
      variant === 'default' && 'bg-sand text-charcoal',
      variant === 'walnut' && 'bg-walnut text-white',
      variant === 'success' && 'bg-success/10 text-success',
      variant === 'outline' && 'border border-walnut text-walnut',
      className
    )}>
      {children}
    </span>
  )
}
