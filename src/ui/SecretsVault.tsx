import { ZONE_NOTES } from '../content/zoneNotes'
import { ZONES, getZone, levelLabel } from '../content/zones'
import { useGame } from '../store/gameStore'
import { SpellTablet } from './SpellTablet'

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
        Nice work, {name}. One scrollable review of every level you cleared —
        print or copy for the night before.
      </p>

      <section className="mt-8 rounded-xl border border-rune/40 bg-panel/80 p-5">
        <h2 className="font-display text-xl text-rune">You now know…</h2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-parchment">
          {ZONES.map((zone) => (
            <li key={zone.id}>
              <span className="font-semibold">{levelLabel(zone)} — {zone.friendlyName}:</span>{' '}
              {zone.topic}
            </li>
          ))}
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
              <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-parchment">
                {note.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <div className="mt-4">
                <SpellTablet code={note.snippet} filename="Notes.java" />
              </div>
              <p className="mt-4 rounded-lg border border-blood/30 bg-blood/10 px-3 py-2 text-sm text-parchment">
                <span className="font-semibold text-blood">Common mistake. </span>
                {note.trap}
              </p>
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
