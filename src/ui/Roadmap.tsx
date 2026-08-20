import {
  ZONES,
  currentRoadmapLevel,
  isLevelUnlocked,
  levelLabel,
  zoneCleared,
  zoneProgress,
} from '../content/zones'
import { useGame } from '../store/gameStore'
import { cn } from './cn'

export function Roadmap() {
  const cleared = useGame((s) => s.state.clearedRoomIds)
  const passedQuizzes = useGame((s) => s.state.passedQuizZoneIds)
  const courseComplete = useGame((s) => s.state.courseComplete)
  const enterZone = useGame((s) => s.enterZone)
  const openSecretsVault = useGame((s) => s.openSecretsVault)
  const current = currentRoadmapLevel(cleared)
  const doneLevels = ZONES.filter((z) => zoneCleared(z.id, cleared)).length

  return (
    <main className="mx-auto max-w-xl px-4 py-10 fade-up">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-sigil">
        Overnight path
      </p>
      <h1 className="mt-2 font-display text-3xl text-parchment">
        Java OOP roadmap
      </h1>
      <p className="mt-2 text-faded">
        Level {Math.min(doneLevels + 1, 9)} of 9 · theory → real-code traps →
        check → practice. Finish before your exam.
      </p>
      <p className="mt-1 text-sm text-rune">
        ~ one night · learn the untouching points · Secrets unlock at the end
      </p>

      <ol className="mt-10 space-y-0">
        {ZONES.map((zone, index) => {
          const unlocked = isLevelUnlocked(zone.id, cleared)
          const complete = zoneCleared(zone.id, cleared)
          const { done, total } = zoneProgress(zone.id, cleared)
          const quizDone = passedQuizzes.includes(zone.id)
          const isCurrent = !complete && unlocked && zone.id === current.id
          const locked = !unlocked

          return (
            <li key={zone.id} className="relative flex gap-4">
              {index < ZONES.length - 1 ? (
                <span
                  className={cn(
                    'absolute left-[15px] top-10 h-[calc(100%-0.5rem)] w-px',
                    complete ? 'bg-moss/60' : 'bg-edge',
                  )}
                  aria-hidden
                />
              ) : null}
              <div
                className={cn(
                  'relative z-10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-xs',
                  complete && 'border-moss bg-moss/20 text-moss',
                  isCurrent && 'border-rune bg-rune/20 text-rune',
                  locked && 'border-edge bg-ink-2 text-faded/50',
                  !complete && !isCurrent && unlocked && 'border-sigil/40 text-sigil',
                )}
              >
                {complete ? '✓' : zone.displayNumber}
              </div>
              <div className="mb-4 min-w-0 flex-1">
                <button
                  type="button"
                  disabled={locked}
                  onClick={() => enterZone(zone.id)}
                  className={cn(
                    'w-full rounded-xl border px-4 py-3 text-left transition',
                    locked &&
                      'cursor-not-allowed border-edge/60 bg-ink-2/50 opacity-60',
                    isCurrent &&
                      'border-rune bg-panel shadow-[0_0_20px_rgba(232,184,109,0.15)]',
                    complete && 'border-moss/40 bg-panel/80 hover:border-moss',
                    unlocked &&
                      !complete &&
                      !isCurrent &&
                      'border-edge bg-panel hover:border-sigil',
                  )}
                >
                  <p className="font-mono text-[11px] uppercase tracking-widest text-sigil">
                    {levelLabel(zone)}
                    {locked ? ' · locked' : complete ? ' · done' : isCurrent ? ' · now' : ''}
                  </p>
                  <h2 className="mt-0.5 font-display text-xl text-parchment">
                    {zone.friendlyName}
                  </h2>
                  <p className="mt-1 text-sm text-faded">{zone.topic}</p>
                  <p className="mt-2 font-mono text-xs text-rune">
                    {done}/{total} challenges
                    <span className="ml-2 text-faded">
                      · check {quizDone ? 'done' : 'open'}
                    </span>
                  </p>
                </button>
                {quizDone && unlocked ? (
                  <button
                    type="button"
                    className="mt-1.5 text-xs text-sigil underline"
                    onClick={() => enterZone(zone.id, { reviewNotes: true })}
                  >
                    Review lesson notes
                  </button>
                ) : null}
              </div>
            </li>
          )
        })}

        <li className="relative flex gap-4">
          <div
            className={cn(
              'relative z-10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-xs',
              courseComplete
                ? 'border-rune bg-rune/20 text-rune'
                : 'border-edge bg-ink-2 text-faded/50',
            )}
          >
            ★
          </div>
          <div className="min-w-0 flex-1">
            <button
              type="button"
              disabled={!courseComplete}
              onClick={() => openSecretsVault()}
              className={cn(
                'w-full rounded-xl border px-4 py-3 text-left',
                courseComplete
                  ? 'border-rune bg-panel hover:bg-panel-2'
                  : 'cursor-not-allowed border-edge/60 bg-ink-2/50 opacity-60',
              )}
            >
              <p className="font-mono text-[11px] uppercase tracking-widest text-sigil">
                Course clear
              </p>
              <h2 className="mt-0.5 font-display text-xl text-parchment">
                Secrets vault
              </h2>
              <p className="mt-1 text-sm text-faded">
                {courseComplete
                  ? 'Full exam pack — every level’s notes and common mistakes.'
                  : 'Unlocks when all 9 levels’ challenges are cleared.'}
              </p>
            </button>
          </div>
        </li>
      </ol>
    </main>
  )
}
