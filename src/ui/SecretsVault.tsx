import { useState } from 'react'
import { ZONE_NOTES } from '../content/zoneNotes'
import { getZone, levelLabel } from '../content/zones'
import { useGame } from '../store/gameStore'
import { cn } from './cn'
import { NoteSections } from './NoteSections'
import { StickyActionBar } from './StickyActionBar'

export function SecretsVault() {
  const name = useGame((s) => s.state.playerName)
  const backToHub = useGame((s) => s.backToHub)
  const enterZone = useGame((s) => s.enterZone)
  const [openZoneId, setOpenZoneId] = useState<string | null>(null)

  function jumpTo(zoneId: string) {
    setOpenZoneId(zoneId)
    requestAnimationFrame(() => {
      document.getElementById(`secret-${zoneId}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })
  }

  return (
    <main className="mx-auto max-w-3xl px-4 pb-4 pt-10 fade-up print:max-w-none">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-sigil">
        Course complete
      </p>
      <h1 className="mt-2 font-display text-4xl text-parchment">
        OOP Secrets Exam Pack
      </h1>
      <p className="mt-2 text-faded">
        Nice work, {name}. Jump a level, expand what you need, print the pack
        the night before.
      </p>

      <nav
        aria-label="Level jump"
        className="sticky top-[3.25rem] z-10 mt-6 -mx-1 overflow-x-auto rounded-xl border border-edge bg-ink/95 px-2 py-2 backdrop-blur print:static print:border-0"
      >
        <div className="flex min-w-max gap-1.5">
          {ZONE_NOTES.map((note) => {
            const zone = getZone(note.zoneId)
            return (
              <button
                key={note.zoneId}
                type="button"
                onClick={() => jumpTo(note.zoneId)}
                className={cn(
                  'rounded-md px-2.5 py-1.5 font-mono text-xs font-semibold',
                  openZoneId === note.zoneId
                    ? 'bg-rune text-ink'
                    : 'border border-edge text-faded hover:text-parchment',
                )}
              >
                L{zone.displayNumber}
              </button>
            )
          })}
        </div>
      </nav>

      <section className="mt-8 rounded-xl border border-rune/40 bg-panel/80 p-5">
        <h2 className="font-display text-xl text-rune">You can explain…</h2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-parchment">
          {ZONE_NOTES.map((note) => {
            const zone = getZone(note.zoneId)
            return (
              <li key={note.zoneId}>
                <span className="font-semibold">
                  {levelLabel(zone)}: {zone.friendlyName}:
                </span>{' '}
                {note.youCanExplain}
              </li>
            )
          })}
        </ul>
      </section>

      <div className="mt-8 space-y-3">
        {ZONE_NOTES.map((note) => {
          const zone = getZone(note.zoneId)
          const open = openZoneId === note.zoneId
          return (
            <article
              key={note.zoneId}
              id={`secret-${note.zoneId}`}
              className="scroll-mt-28 break-inside-avoid rounded-xl border border-edge bg-panel"
            >
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpenZoneId(open ? null : note.zoneId)}
                className={cn(
                  'flex w-full flex-col gap-1 px-5 py-4 text-left',
                  open && 'border-b border-edge',
                )}
              >
                <p className="font-mono text-[11px] uppercase tracking-widest text-sigil">
                  {levelLabel(zone)}
                </p>
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-display text-xl text-parchment">
                    {note.title}
                  </h2>
                  <span className="shrink-0 font-mono text-xs text-faded">
                    {open ? 'Collapse' : 'Expand'}
                  </span>
                </div>
                <p className="text-sm text-moss">
                  <span className="font-semibold">You can explain. </span>
                  {note.youCanExplain}
                </p>
              </button>
              {open ? (
                <div className="px-5 py-4">
                  <p className="mb-4 text-sm text-faded">{note.why}</p>
                  <NoteSections note={note} showStudyCards compact />
                  <button
                    type="button"
                    onClick={() =>
                      enterZone(note.zoneId, { reviewNotes: true })
                    }
                    className="mt-4 text-xs text-sigil underline print:hidden"
                  >
                    Open level notes / replay
                  </button>
                </div>
              ) : null}
            </article>
          )
        })}
      </div>

      <StickyActionBar className="print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-lg border border-sigil/50 px-5 py-3 font-semibold text-sigil hover:bg-panel"
        >
          Print / save as PDF
        </button>
        <button
          type="button"
          onClick={backToHub}
          className="rounded-lg bg-rune px-5 py-3 font-semibold text-ink hover:bg-rune-dim"
        >
          Back to roadmap
        </button>
      </StickyActionBar>
    </main>
  )
}
