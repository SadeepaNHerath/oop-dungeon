import { useEffect } from 'react'
import { getZoneQuiz } from '../content/quizzes'
import { getZone, levelLabel } from '../content/zones'
import { useGame } from '../store/gameStore'
import { cn } from './cn'
import { StickyActionBar } from './StickyActionBar'

export function MiniQuiz() {
  const state = useGame((s) => s.state)
  const selectQuizChoice = useGame((s) => s.selectQuizChoice)
  const submitQuiz = useGame((s) => s.submitQuiz)
  const backToNotes = useGame((s) => s.backToNotes)
  const backToHub = useGame((s) => s.backToHub)
  const zoneId = state.currentZoneId

  const quiz = zoneId ? getZoneQuiz(zoneId) : undefined
  const zone = zoneId ? getZone(zoneId) : null
  const question = quiz?.questions[state.quizIndex]

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (!question) return
      if (event.key >= '1' && event.key <= '4') {
        const choice = question.choices[Number(event.key) - 1]
        if (choice) selectQuizChoice(choice.id)
      }
      if (event.key === 'Enter') submitQuiz()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [question, selectQuizChoice, submitQuiz])

  if (!zone || !quiz || !question) {
    return <p className="p-8 text-faded">Warm-up round not found.</p>
  }

  const progress = ((state.quizIndex + 1) / quiz.questions.length) * 100

  return (
    <main className="mx-auto max-w-2xl px-4 pb-4 pt-10 fade-up">
      <p className="font-mono text-xs uppercase tracking-widest text-sigil">
        {levelLabel(zone)} · Warm-up round · {state.quizIndex + 1}/
        {quiz.questions.length}
      </p>
      <div
        className="mt-3 h-1.5 overflow-hidden rounded-full bg-edge"
        role="progressbar"
        aria-valuenow={state.quizIndex + 1}
        aria-valuemin={1}
        aria-valuemax={quiz.questions.length}
      >
        <div
          className="h-full rounded-full bg-rune transition-[width]"
          style={{ width: `${progress}%` }}
        />
      </div>
      <h1 className="mt-4 font-display text-2xl text-parchment">
        {question.prompt}
      </h1>
      <p className="mt-1 text-sm text-faded">
        No HP cost — warm up before the arena. Unlimited retries.
      </p>

      <div className="mt-6 grid gap-3">
        {question.choices.map((choice, index) => {
          const selected = state.quizSelectedId === choice.id
          return (
            <button
              key={choice.id}
              type="button"
              onClick={() => selectQuizChoice(choice.id)}
              className={cn(
                'rounded-xl border px-4 py-3 text-left',
                selected
                  ? 'border-rune bg-panel-2 ring-2 ring-rune/40'
                  : 'border-edge bg-panel hover:border-faded',
              )}
            >
              <span className="mr-2 font-mono text-xs text-rune">{index + 1}</span>
              <span className="text-parchment">{choice.label}</span>
            </button>
          )
        })}
      </div>

      {state.quizTip ? (
        <p className="mt-4 rounded-lg border border-rune/40 bg-panel px-4 py-3 text-sm text-parchment">
          <span className="font-semibold text-rune">Why that was wrong. </span>
          {state.quizTip} Try again.
        </p>
      ) : null}

      <StickyActionBar>
        <button
          type="button"
          onClick={submitQuiz}
          disabled={!state.quizSelectedId}
          className="rounded-lg bg-rune px-5 py-3 font-semibold text-ink enabled:hover:bg-rune-dim disabled:opacity-40"
        >
          {state.quizIndex >= quiz.questions.length - 1
            ? 'Enter the arena'
            : 'Next question'}
        </button>
        <button
          type="button"
          onClick={backToNotes}
          className="rounded-lg border border-edge px-5 py-3 text-faded hover:text-parchment"
        >
          Back to lesson
        </button>
        <button
          type="button"
          onClick={backToHub}
          className="rounded-lg border border-edge px-5 py-3 text-faded hover:text-parchment"
        >
          Roadmap
        </button>
      </StickyActionBar>
    </main>
  )
}
