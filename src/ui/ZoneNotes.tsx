import { getZoneNote } from '../content/zoneNotes'
import { getZone, levelLabel } from '../content/zones'
import { useGame } from '../store/gameStore'
import { SpellTablet } from './SpellTablet'

export function ZoneNotes() {
  const zoneId = useGame((s) => s.state.currentZoneId)
  const passed = useGame((s) => s.state.passedQuizZoneIds)
  const continueFromNotes = useGame((s) => s.continueFromNotes)
  const skipNotesToMap = useGame((s) => s.skipNotesToMap)
  const backToHub = useGame((s) => s.backToHub)

  if (!zoneId) {
    return <p className="p-8 text-faded">No level selected.</p>
  }

  const note = getZoneNote(zoneId)
  const zone = getZone(zoneId)
  const quizDone = passed.includes(zoneId)

  if (!note) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-10">
        <p className="text-faded">Notes missing for {zone.friendlyName}.</p>
        <button
          type="button"
          onClick={continueFromNotes}
          className="mt-4 rounded-lg bg-rune px-4 py-2 font-semibold text-ink"
        >
          Continue to quick check
        </button>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 fade-up">
      <p className="font-mono text-xs uppercase tracking-widest text-sigil">
        {levelLabel(zone)} · Lesson notes
      </p>
      <h1 className="mt-2 font-display text-3xl text-parchment">{note.title}</h1>
      <p className="mt-2 text-faded">{note.why}</p>

      <ul className="mt-6 list-disc space-y-2 pl-5 text-parchment">
        {note.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>

      <div className="mt-6">
        <SpellTablet code={note.snippet} filename="Notes.java" />
      </div>

      <p className="mt-4 rounded-lg border border-blood/30 bg-blood/10 px-4 py-3 text-sm">
        <span className="font-semibold text-blood">Common mistake. </span>
        {note.trap}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={continueFromNotes}
          className="rounded-lg bg-rune px-5 py-3 font-semibold text-ink hover:bg-rune-dim"
        >
          Take quick check
        </button>
        {quizDone ? (
          <button
            type="button"
            onClick={skipNotesToMap}
            className="rounded-lg border border-sigil/50 px-5 py-3 font-semibold text-sigil hover:bg-panel"
          >
            Skip to practice
          </button>
        ) : null}
        <button
          type="button"
          onClick={backToHub}
          className="rounded-lg border border-edge px-5 py-3 text-faded hover:text-parchment"
        >
          Back to roadmap
        </button>
      </div>
    </main>
  )
}
