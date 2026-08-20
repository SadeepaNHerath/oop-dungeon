import { ZONES, getZone, zoneProgress } from '../content/zones'
import { useGame } from '../store/gameStore'
import { HealthBar } from './HealthBar'

interface HudProps {
  onOpenCodex: () => void
}

export function Hud({ onOpenCodex }: HudProps) {
  const state = useGame((s) => s.state)
  const zone = state.currentZoneId ? getZone(state.currentZoneId) : null
  const progress = zone
    ? zoneProgress(zone.id, state.clearedRoomIds)
    : { done: 0, total: 0 }
  const allRooms = ZONES.reduce((n, item) => n + item.rooms.length, 0)
  const allDone = state.clearedRoomIds.length
  const quizzes = state.passedQuizZoneIds.length
  const showHp =
    state.phase === 'battle' ||
    state.phase === 'feedback' ||
    state.phase === 'gameOver' ||
    state.phase === 'map'

  return (
    <header className="sticky top-0 z-20 border-b border-edge/80 bg-ink/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <div className="min-w-0 flex-1">
          <p className="font-display text-sm text-rune">
            {zone ? zone.name : 'Bytecode Arena'}
          </p>
          <p className="truncate text-lg font-semibold text-parchment">
            {state.playerName}
          </p>
        </div>
        {showHp ? (
          <div className="w-40 sm:w-56">
            <HealthBar
              value={state.hp}
              max={state.maxHp}
              pulseKey={state.hpPulseKey}
              label="HP"
            />
          </div>
        ) : null}
        <p className="hidden font-mono text-sm text-faded sm:block">
          {zone
            ? `${progress.done}/${progress.total} rooms`
            : `${allDone}/${allRooms} · ${quizzes}/${ZONES.length} quizzes`}
        </p>
        <button
          type="button"
          onClick={onOpenCodex}
          className="rounded-md border border-sigil/40 bg-panel px-3 py-1.5 text-sm font-semibold text-sigil hover:bg-panel-2"
        >
          Study
        </button>
      </div>
    </header>
  )
}
