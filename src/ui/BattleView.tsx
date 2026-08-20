import { useEffect } from 'react'
import { getEnemy } from '../content/enemies'
import { getRoom } from '../content/zones'
import { MISSES_BEFORE_LESSON } from '../core/GameEngine'
import { currentPuzzle } from '../core/selectors'
import { strategyFor } from '../model/Ability'
import { useGame } from '../store/gameStore'
import { AnswerPanel } from './AnswerPanel'
import { HealthBar } from './HealthBar'
import { SpellTablet } from './SpellTablet'
import { StickyActionBar } from './StickyActionBar'

export function BattleView() {
  const state = useGame((s) => s.state)
  const selectChoice = useGame((s) => s.selectChoice)
  const submit = useGame((s) => s.submit)
  const revealLesson = useGame((s) => s.revealLesson)
  const puzzle = currentPuzzle(state)
  const room = state.currentRoomId ? getRoom(state.currentRoomId) : null
  const enemy = state.enemyId ? getEnemy(state.enemyId) : null

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (!puzzle) return
      if (event.key >= '1' && event.key <= '4') {
        const choice = puzzle.choices[Number(event.key) - 1]
        if (choice) selectChoice(choice.id)
      }
      if (event.key === 'Enter' && state.selectedChoiceId) submit()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [puzzle, selectChoice, submit, state.selectedChoiceId])

  if (!puzzle || !room || !enemy) {
    return <p className="p-8 text-center text-faded">No challenge loaded.</p>
  }

  const attack = strategyFor(puzzle.kind).present(puzzle)
  const miss = state.lastFeedback && !state.lastFeedback.correct
  const revealed = Boolean(state.lastFeedback?.lessonRevealed)
  const canReveal = state.missCount >= MISSES_BEFORE_LESSON && !revealed
  const stage =
    room.puzzleIds.length > 1
      ? `Part ${state.puzzleIndex + 1} of ${room.puzzleIds.length}`
      : null

  return (
    <main className="mx-auto max-w-5xl px-4 pb-4 pt-6 fade-up">
      <div className="mb-5 grid gap-4 rounded-xl border border-edge bg-panel/80 p-4 sm:grid-cols-[1fr_12rem]">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-sigil">
            {attack.banner}
          </p>
          <h1 className="mt-1 font-display text-2xl text-parchment">
            {enemy.name}
          </h1>
          <p className="text-sm text-faded">{enemy.title}</p>
          <p className="mt-2 italic text-parchment/90">“{enemy.taunt}”</p>
          {stage ? (
            <p className="mt-2 font-mono text-xs text-rune">{stage}</p>
          ) : null}
        </div>
        <HealthBar
          value={state.enemyHp}
          max={state.enemyMaxHp}
          tone="enemy"
          label="Challenge"
        />
      </div>

      <p className="mb-3 text-lg text-parchment">{puzzle.prompt}</p>
      <p className="mb-3 font-semibold text-rune">{attack.kindLabel}</p>

      <SpellTablet key={puzzle.id} code={puzzle.code} files={puzzle.files} />

      {miss ? (
        <div className="mt-4 space-y-2">
          <div className="rounded-lg border border-blood/40 bg-blood/10 px-4 py-3 text-sm text-parchment">
            <p className="font-semibold text-blood">What went wrong</p>
            <p className="mt-1">
              {state.lastFeedback?.wrongReason ?? state.lastFeedback?.hint}
            </p>
            <p className="mt-2 text-xs text-faded">You lost 15 HP.</p>
          </div>
          {state.lastFeedback?.commonTrap ? (
            <p className="rounded-lg border border-rune/30 bg-panel px-4 py-3 text-sm text-parchment">
              <span className="font-semibold text-rune">Common mistake. </span>
              {state.lastFeedback.commonTrap}
            </p>
          ) : null}
          {revealed ? (
            <div className="rounded-lg border border-moss/40 bg-moss/10 px-4 py-3 text-sm text-parchment">
              <p className="font-semibold text-moss">Full lesson</p>
              {state.lastFeedback?.correctLabel ? (
                <p className="mt-2">
                  <span className="font-semibold">Correct answer: </span>
                  {state.lastFeedback.correctLabel}
                </p>
              ) : null}
              {state.lastFeedback?.explanation ? (
                <p className="mt-2">{state.lastFeedback.explanation}</p>
              ) : null}
              {state.lastFeedback?.explanationSteps?.length ? (
                <ol className="mt-3 list-decimal space-y-1 pl-5">
                  {state.lastFeedback.explanationSteps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              ) : null}
            </div>
          ) : null}
          {canReveal ? (
            <button
              type="button"
              onClick={revealLesson}
              className="rounded-lg border border-moss/50 px-4 py-2 text-sm font-semibold text-moss hover:bg-panel"
            >
              Show full lesson
            </button>
          ) : null}
        </div>
      ) : null}

      <div className="mt-5">
        <AnswerPanel
          choices={puzzle.choices}
          selectedId={state.selectedChoiceId}
          onSelect={selectChoice}
        />
      </div>

      <StickyActionBar>
        <p className="mr-auto hidden text-xs text-faded sm:block">
          Shortcuts: 1–4 select · Enter check
        </p>
        <button
          type="button"
          onClick={submit}
          disabled={!state.selectedChoiceId}
          className="rounded-lg bg-rune px-5 py-2.5 font-semibold text-ink enabled:hover:bg-rune-dim disabled:cursor-not-allowed disabled:opacity-40"
        >
          Check answer
        </button>
      </StickyActionBar>
    </main>
  )
}
