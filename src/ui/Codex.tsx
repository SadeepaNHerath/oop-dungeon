import { useEffect, useMemo, useState } from 'react'
import { ZONE_NOTES } from '../content/zoneNotes'
import { ZONES, levelLabel } from '../content/zones'
import { cn } from './cn'
import { NoteSections } from './NoteSections'

interface CodexProps {
  onClose: () => void
}

export function Codex({ onClose }: CodexProps) {
  const [zoneId, setZoneId] = useState(ZONES[0].id)
  const [query, setQuery] = useState('')

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const notes = useMemo(() => {
    const q = query.trim().toLowerCase()
    return ZONE_NOTES.filter((note) => {
      if (note.zoneId !== zoneId) return false
      if (!q) return true
      const hay = [
        note.title,
        note.why,
        ...note.theory,
        ...note.inPractice,
        ...note.untouchables,
        note.youCanExplain,
      ]
        .join(' ')
        .toLowerCase()
      return hay.includes(q)
    })
  }, [zoneId, query])

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-ink/70 p-4 sm:items-center">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />
      <section className="relative z-10 flex max-h-[90svh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-edge bg-ink-2 fade-up">
        <div className="flex items-start justify-between gap-4 border-b border-edge p-5">
          <div>
            <h2 className="font-display text-2xl text-parchment">Lesson notes</h2>
            <p className="text-sm text-faded">
              Theory, real-code bridges, and under-taught traps. Open anytime.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-edge px-3 py-1 text-sm text-faded hover:text-parchment"
          >
            Close
          </button>
        </div>
        <div className="flex flex-wrap gap-2 border-b border-edge px-5 py-3">
          {ZONES.map((zone) => (
            <button
              key={zone.id}
              type="button"
              onClick={() => setZoneId(zone.id)}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm font-semibold',
                zoneId === zone.id
                  ? 'bg-rune text-ink'
                  : 'border border-edge text-faded hover:text-parchment',
              )}
            >
              {levelLabel(zone)}
            </button>
          ))}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search…"
            className="ml-auto min-w-40 flex-1 rounded-md border border-edge bg-panel px-3 py-1.5 text-sm text-parchment outline-none focus:ring-2 focus:ring-rune/40"
          />
        </div>
        <div className="overflow-y-auto p-5">
          <div className="grid gap-4">
            {notes.map((note) => (
              <article
                key={note.zoneId}
                className="rounded-xl border border-sigil/30 bg-panel p-4"
              >
                <h3 className="font-display text-xl text-rune">{note.title}</h3>
                <p className="mt-1 text-sm text-parchment">{note.why}</p>
                <div className="mt-4">
                  <NoteSections note={note} showStudyCards compact />
                </div>
              </article>
            ))}
            {notes.length === 0 ? (
              <p className="text-sm text-faded">No notes match that search.</p>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  )
}
