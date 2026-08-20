import { cn } from './cn'

interface HealthBarProps {
  value: number
  max: number
  pulseKey?: number
  tone?: 'player' | 'enemy'
  label?: string
}

export function HealthBar({
  value,
  max,
  pulseKey = 0,
  tone = 'player',
  label,
}: HealthBarProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  const fill = tone === 'player' ? 'bg-blood' : 'bg-sigil'

  return (
    <div className="min-w-0">
      {label ? (
        <div className="mb-1 flex justify-between text-xs uppercase tracking-wide text-faded">
          <span>{label}</span>
          <span className="font-mono text-parchment">
            {value}/{max}
          </span>
        </div>
      ) : null}
      <div
        key={pulseKey}
        className={cn(
          'h-2.5 overflow-hidden rounded-full border border-edge bg-ink',
          tone === 'player' && pulseKey > 0 && 'hp-flash',
        )}
      >
        <div
          className={cn('h-full rounded-full transition-[width] duration-300', fill)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
