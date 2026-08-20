import { getZone } from '../content/zones'
import { useGame } from '../store/gameStore'
import { cn } from './cn'

export function DungeonMap() {
  const state = useGame((s) => s.state)
  const enterRoom = useGame((s) => s.enterRoom)
  const backToHub = useGame((s) => s.backToHub)
  const enterZone = useGame((s) => s.enterZone)

  if (!state.currentZoneId) {
    return <p className="p-8 text-faded">No level selected.</p>
  }

  const zone = getZone(state.currentZoneId)

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 fade-up">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl text-parchment">
            Level {zone.displayNumber} — {zone.friendlyName}
          </h1>
          <p className="mt-1 text-faded">{zone.topic}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() =>
              enterZone(state.currentZoneId!, { reviewNotes: true })
            }
            className="rounded-md border border-sigil/40 px-3 py-1.5 text-sm text-sigil hover:bg-panel"
          >
            Lesson notes
          </button>
          <button
            type="button"
            onClick={backToHub}
            className="rounded-md border border-edge px-3 py-1.5 text-sm text-faded hover:text-parchment"
          >
            Back to roadmap
          </button>
        </div>
      </div>

      <div className="relative mx-auto aspect-[4/5] w-full max-w-lg">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          {zone.edges.map(([from, to]) => {
            const a = zone.rooms.find((room) => room.id === from)
            const b = zone.rooms.find((room) => room.id === to)
            if (!a || !b) return null
            const lit =
              state.clearedRoomIds.includes(from) ||
              state.unlockedRoomIds.includes(to)
            return (
              <line
                key={`${from}-${to}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={lit ? '#7dd3d0' : '#3d3a4a'}
                strokeWidth="0.7"
                strokeDasharray={lit ? undefined : '1.5 1.2'}
              />
            )
          })}
        </svg>

        {zone.rooms.map((room) => {
          const cleared = state.clearedRoomIds.includes(room.id)
          const unlocked = state.unlockedRoomIds.includes(room.id)
          const locked = !cleared && !unlocked
          const clickable = unlocked && !cleared

          return (
            <button
              key={room.id}
              type="button"
              disabled={!clickable}
              onClick={() => enterRoom(room.id)}
              style={{ left: `${room.x}%`, top: `${room.y}%` }}
              title={room.topic}
              className={cn(
                'absolute w-40 -translate-x-1/2 -translate-y-1/2 rounded-xl border px-2 py-2 text-center transition',
                cleared && 'border-moss/50 bg-panel text-moss',
                clickable &&
                  'border-rune bg-panel text-parchment shadow-[0_0_18px_rgba(232,184,109,0.25)] hover:bg-panel-2',
                locked && 'cursor-not-allowed border-edge bg-ink-2 text-faded/50',
                room.isBoss && clickable && 'border-blood text-rune',
              )}
            >
              <span className="block font-display text-sm leading-tight">
                {cleared ? '✓ ' : locked ? '✕ ' : ''}
                {room.name}
              </span>
              <span className="mt-0.5 block text-[11px] leading-tight text-faded">
                {room.topic}
              </span>
            </button>
          )
        })}
      </div>
    </main>
  )
}
