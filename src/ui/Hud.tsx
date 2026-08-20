import {
  ZONES,
  currentRoadmapLevel,
  getZone,
  levelLabel,
  zoneProgress,
} from '../content/zones'
import { useGame } from '../store/gameStore'
import { HealthBar } from './HealthBar'

interface HudProps {
  onOpenCodex: () => void
  onOpenSecrets?: () => void
}

export function Hud({ onOpenCodex, onOpenSecrets }: HudProps) {
  const state = useGame((s) => s.state)
  const zone = state.currentZoneId ? getZone(state.currentZoneId) : null
  const progress = zone
    ? zoneProgress(zone.id, state.clearedRoomIds)
    : { done: 0, total: 0 }
  const roadmap = currentRoadmapLevel(state.clearedRoomIds)
  const showHp =
    state.phase === 'battle' ||
    state.phase === 'feedback' ||
    state.phase === 'gameOver' ||
    state.phase === 'map'
  const secretsReady = state.courseComplete

  return (
    <header className="sticky top-0 z-20 border-b border-edge/80 bg-ink/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <div className="min-w-0 flex-1">
          <p className="font-display text-sm text-rune">
            {zone
              ? `${levelLabel(zone)} · ${zone.friendlyName}`
              : 'Overnight Java OOP'}
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
            ? `${progress.done}/${progress.total} challenges`
            : `Level ${roadmap.displayNumber} of ${ZONES.length}`}
        </p>
        <button
          type="button"
          onClick={onOpenCodex}
          className="rounded-md border border-sigil/40 bg-panel px-3 py-1.5 text-sm font-semibold text-sigil hover:bg-panel-2"
        >
          Notes
        </button>
        {secretsReady && onOpenSecrets ? (
          <button
            type="button"
            onClick={onOpenSecrets}
            className="rounded-md border border-rune/50 bg-panel px-3 py-1.5 text-sm font-semibold text-rune hover:bg-panel-2"
          >
            Secrets
          </button>
        ) : null}
      </div>
    </header>
  )
}
