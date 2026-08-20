import { useEffect } from 'react'
import { getZoneNote } from '../content/zoneNotes'
import { getRoom } from '../content/zones'
import { currentPuzzle } from '../core/selectors'
import { useGame } from '../store/gameStore'

export function WhyPanel() {
  const state = useGame((s) => s.state)
  const continueFromFeedback = useGame((s) => s.continueFromFeedback)
  const feedback = state.lastFeedback
  const room = state.currentRoomId ? getRoom(state.currentRoomId) : null
  const note = state.currentZoneId
    ? getZoneNote(state.currentZoneId)
    : undefined
  const puzzle = currentPuzzle(state)

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Enter') continueFromFeedback()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [continueFromFeedback])

  if (!feedback?.correct) {
    return <p className="p-8 text-center text-faded">No explanation to show.</p>
  }

  const trap = feedback.commonTrap ?? puzzle?.commonTrap

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 fade-up">
      <p className="font-mono text-sm uppercase tracking-widest text-moss">
        {feedback.roomComplete ? 'Challenge cleared' : 'Correct'}
      </p>
      <h1 className="mt-2 font-display text-3xl text-parchment">
        Why that works
      </h1>
      {room ? (
        <p className="mt-1 text-faded">
          {room.name} · {room.topic}
        </p>
      ) : null}

      <p className="mt-6 leading-relaxed text-parchment">{feedback.explanation}</p>

      <ol className="mt-6 space-y-3">
        {feedback.explanationSteps.map((step, index) => (
          <li
            key={`${index}-${step.slice(0, 24)}`}
            className="flex gap-3 rounded-lg border border-edge bg-panel px-4 py-3"
          >
            <span className="font-mono text-sm text-rune">{index + 1}.</span>
            <span className="text-parchment">{step}</span>
          </li>
        ))}
      </ol>

      {trap ? (
        <p className="mt-6 rounded-lg border border-blood/30 bg-blood/10 px-4 py-3 text-sm text-parchment">
          <span className="font-semibold text-blood">Common mistake. </span>
          {trap}
        </p>
      ) : null}

      {note ? (
        <div className="mt-6 space-y-2 rounded-lg border border-sigil/30 bg-panel px-4 py-3 text-sm">
          <p className="text-sigil">
            Related notes: <span className="font-semibold">{note.title}</span>
          </p>
          {note.inPractice[0] ? (
            <p className="text-parchment">
              <span className="font-semibold text-sigil">In real code. </span>
              {note.inPractice[0]}
            </p>
          ) : null}
          {note.untouchables[0] ? (
            <p className="text-parchment">
              <span className="font-semibold text-blood">Easy to miss. </span>
              {note.untouchables[0]}
            </p>
          ) : null}
        </div>
      ) : null}

      <button
        type="button"
        onClick={continueFromFeedback}
        className="mt-8 rounded-lg bg-rune px-5 py-3 font-semibold text-ink hover:bg-rune-dim"
      >
        {!feedback.roomComplete
          ? 'Next part'
          : room?.isBoss
            ? 'Finish this level'
            : 'Return to challenges'}
        <span className="ml-2 text-xs opacity-70">Enter</span>
      </button>
    </main>
  )
}
