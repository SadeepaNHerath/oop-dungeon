import { getZoneNote } from '../content/zoneNotes'
import { getZone, levelLabel, nextLevel } from '../content/zones'
import { useGame } from '../store/gameStore'

export function ZoneComplete() {
  const name = useGame((s) => s.state.playerName)
  const zoneId = useGame((s) => s.state.currentZoneId)
  const backToHub = useGame((s) => s.backToHub)
  const enterZone = useGame((s) => s.enterZone)
  const openSecretsVault = useGame((s) => s.openSecretsVault)
  const restartZone = useGame((s) => s.restartZone)
  const zone = zoneId ? getZone(zoneId) : null
  const note = zoneId ? getZoneNote(zoneId) : undefined
  const next = zoneId ? nextLevel(zoneId) : null

  return (
    <main className="mx-auto max-w-2xl px-4 py-16 celebrate-in">
      <p className="font-mono text-sm uppercase tracking-widest text-sigil">
        Arena cleared
      </p>
      <h1 className="mt-2 font-display text-4xl text-parchment">
        {zone ? `${levelLabel(zone)} — ${zone.friendlyName}` : 'Level'} yields,{' '}
        {name}
      </h1>
      <p className="mt-3 text-faded">
        Quick recap, then continue the overnight path.
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
          <p className="mt-3 text-sm text-sigil">
            <span className="font-semibold">In real code. </span>
            {note.inPractice[0]}
          </p>
          <p className="mt-2 text-sm text-moss">
            <span className="font-semibold">You can explain. </span>
            {note.youCanExplain}
          </p>
          <p className="mt-3 text-sm text-blood">
            <span className="font-semibold">Common mistake. </span>
            {note.trap}
          </p>
        </article>
      ) : null}
      <div className="mt-8 flex flex-wrap gap-3">
        {next ? (
          <button
            type="button"
            onClick={() => enterZone(next.id)}
            className="rounded-lg bg-rune px-5 py-3 font-semibold text-ink hover:bg-rune-dim"
          >
            Next: {levelLabel(next)} — {next.friendlyName}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => openSecretsVault()}
            className="rounded-lg bg-rune px-5 py-3 font-semibold text-ink hover:bg-rune-dim"
          >
            Open Secrets vault
          </button>
        )}
        <button
          type="button"
          onClick={backToHub}
          className="rounded-lg border border-edge px-5 py-3 font-semibold text-parchment hover:bg-panel"
        >
          Back to roadmap
        </button>
        <button
          type="button"
          onClick={restartZone}
          className="rounded-lg border border-edge px-5 py-3 font-semibold text-parchment hover:bg-panel"
        >
          Replay this level
        </button>
      </div>
    </main>
  )
}
