import { getZoneNote } from '../content/zoneNotes'
import { getZone } from '../content/zones'
import { useGame } from '../store/gameStore'

export function ZoneComplete() {
  const name = useGame((s) => s.state.playerName)
  const zoneId = useGame((s) => s.state.currentZoneId)
  const backToHub = useGame((s) => s.backToHub)
  const restartZone = useGame((s) => s.restartZone)
  const zone = zoneId ? getZone(zoneId) : null
  const note = zoneId ? getZoneNote(zoneId) : undefined

  return (
    <main className="mx-auto max-w-2xl px-4 py-16 fade-up">
      <p className="font-mono text-sm uppercase tracking-widest text-sigil">
        Zone complete
      </p>
      <h1 className="mt-2 font-display text-4xl text-parchment">
        {zone?.name ?? 'The zone'} yields, {name}
      </h1>
      <p className="mt-3 text-faded">
        Quick recap, then pick another zone from the hub — or run this one
        again.
      </p>
      {note ? (
        <article className="mt-8 rounded-xl border border-sigil/30 bg-panel p-4">
          <h2 className="font-display text-xl text-parchment">{note.title}</h2>
          <p className="mt-1 text-sm text-faded">{note.why}</p>
          <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-parchment">
            {note.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-blood">
            <span className="font-semibold">Exam trap. </span>
            {note.trap}
          </p>
        </article>
      ) : null}
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={backToHub}
          className="rounded-lg bg-rune px-5 py-3 font-semibold text-ink hover:bg-rune-dim"
        >
          Back to zones
        </button>
        <button
          type="button"
          onClick={restartZone}
          className="rounded-lg border border-edge px-5 py-3 font-semibold text-parchment hover:bg-panel"
        >
          Replay this zone
        </button>
      </div>
    </main>
  )
}
