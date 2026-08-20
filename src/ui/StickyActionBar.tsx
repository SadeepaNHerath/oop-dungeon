import type { ReactNode } from 'react'
import { cn } from './cn'

interface StickyActionBarProps {
  children: ReactNode
  className?: string
}

/** Always-visible next-action strip for long lesson / quiz / battle screens. */
export function StickyActionBar({ children, className }: StickyActionBarProps) {
  return (
    <div
      className={cn(
        'sticky bottom-0 z-30 -mx-4 mt-8 border-t border-edge/80 bg-ink/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-t-xl',
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}
