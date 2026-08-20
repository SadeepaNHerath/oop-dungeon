import { ZONE_NOTES } from '../content/zoneNotes'
import { getZone, levelLabel } from '../content/zones'
import { useGame } from '../store/gameStore'
import { NoteSections } from './NoteSections'

export function SecretsVault() {
  const name = useGame((s) => s.state.playerName)
  const backToHub = useGame((s) => s.backToHub)
  const enterZone = useGame((s) => s.enterZone)

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 fade-up print:max-w-none">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-sigil">
        Course complete
      </p>
      <h1 className="mt-2 font-display text-4xl text-parchment">
        OOP Secrets — exam pack
      </h1>
      <p className="mt-2 text-faded">
        Nice work, {name}. Theory, real-code bridges, and under-taught traps in
        one scroll — print or copy the night before.
      </p>

      <section className="mt-8 rounded-xl border border-rune/40 bg-panel/80 p-5">
        <h2 className="font-display text-xl text-rune">You can explain…</h2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-parchment">
          {ZONE_NOTES.map((note) => {
            const zone = getZone(note.zoneId)
            return (
              <li key={note.zoneId}>
                <span className="font-semibold">
                  {levelLabel(zone)} — {zone.friendlyName}:
                </span>{' '}
                {note.youCanExplain}
              </li>
            )
          })}
        </ul>
      </section>

      <div className="mt-10 space-y-8">
        {ZONE_NOTES.map((note) => {
          const zone = getZone(note.zoneId)
          return (
            <article
              key={note.zoneId}
              className="break-inside-avoid rounded-xl border border-edge bg-panel p-5"
            >
              <p className="font-mono text-[11px] uppercase tracking-widest text-sigil">
                {levelLabel(zone)}
              </p>
              <h2 className="mt-1 font-display text-2xl text-parchment">
                {note.title}
              </h2>
              <p className="mt-1 text-sm text-faded">{note.why}</p>
              <div className="mt-4">
                <NoteSections note={note} showStudyCards compact />
              </div>
              <button
                type="button"
                onClick={() => enterZone(note.zoneId, { reviewNotes: true })}
                className="mt-3 text-xs text-sigil underline print:hidden"
              >
                Open level notes / replay
              </button>
            </article>
          )
        })}
      </div>

      <div className="mt-10 flex flex-wrap gap-3 print:hidden">
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
      </div>
    </main>
  )
}
