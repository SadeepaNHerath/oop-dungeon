import { getZoneNote } from '../content/zoneNotes'
import { getZone, levelLabel } from '../content/zones'
import { useGame } from '../store/gameStore'
import { LessonWizard } from './LessonWizard'

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
          Continue to warm-up
        </button>
      </main>
    )
  }

  return (
    <LessonWizard
      note={note}
      levelLabelText={levelLabel(zone)}
      quizDone={quizDone}
      onContinue={continueFromNotes}
      onSkipToMap={quizDone ? skipNotesToMap : undefined}
      onBackToHub={backToHub}
    />
  )
}
