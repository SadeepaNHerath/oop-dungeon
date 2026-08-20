import type { Choice } from '../puzzles/types'
import { cn } from './cn'

interface AnswerPanelProps {
  choices: Choice[]
  selectedId: string | null
  onSelect: (id: string) => void
  disabled?: boolean
}

export function AnswerPanel({
  choices,
  selectedId,
  onSelect,
  disabled,
}: AnswerPanelProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {choices.map((choice, index) => {
        const selected = selectedId === choice.id
        return (
          <button
            key={choice.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(choice.id)}
            className={cn(
              'rounded-xl border px-4 py-3 text-left transition',
              selected
                ? 'border-rune bg-panel-2 ring-2 ring-rune/40'
                : 'border-edge bg-panel hover:border-faded',
              disabled && 'opacity-70',
            )}
          >
            <span className="mb-1 inline-flex size-6 items-center justify-center rounded-md bg-ink font-mono text-xs text-rune">
              {index + 1}
            </span>
            <pre className="mt-1 whitespace-pre-wrap font-mono text-sm leading-snug text-parchment">
              {choice.label}
            </pre>
          </button>
        )
      })}
    </div>
  )
}
