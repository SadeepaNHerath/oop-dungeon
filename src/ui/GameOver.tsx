import { getRoom } from '../content/zones'
import { useGame } from '../store/gameStore'

export function GameOver() {
  const state = useGame((s) => s.state)
  const restartRoom = useGame((s) => s.restartRoom)
  const restartZone = useGame((s) => s.restartZone)
  const backToHub = useGame((s) => s.backToHub)
  const room = state.currentRoomId ? getRoom(state.currentRoomId) : null
  const hint = state.lastFeedback?.hint
  const trap = state.lastFeedback?.commonTrap

  return (
    <main className="mx-auto max-w-lg px-4 py-16 text-center fade-up">
      <p className="font-mono text-sm uppercase tracking-widest text-blood">
        Defeated
      </p>
      <h1 className="mt-2 font-display text-4xl text-parchment">HP reached 0</h1>
      {room ? (
        <p className="mt-3 text-faded">
          You fell in <span className="text-parchment">{room.name}</span>.
        </p>
      ) : null}
      {hint ? (
        <p className="mt-6 rounded-lg border border-edge bg-panel px-4 py-3 text-left text-sm text-parchment">
          <span className="font-semibold text-rune">Last hint. </span>
          {hint}
        </p>
      ) : null}
      {trap ? (
        <p className="mt-3 rounded-lg border border-blood/30 bg-blood/10 px-4 py-3 text-left text-sm text-parchment">
          <span className="font-semibold text-blood">Exam trap. </span>
          {trap}
        </p>
      ) : null}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={restartRoom}
          className="rounded-lg bg-rune px-5 py-3 font-semibold text-ink hover:bg-rune-dim"
        >
          Retry this room
        </button>
        <button
          type="button"
          onClick={restartZone}
          className="rounded-lg border border-edge px-5 py-3 font-semibold text-parchment hover:bg-panel"
        >
          Restart this zone
        </button>
        <button
          type="button"
          onClick={backToHub}
          className="rounded-lg border border-edge px-5 py-3 font-semibold text-parchment hover:bg-panel"
        >
          Back to zones
        </button>
      </div>
      <p className="mt-4 text-xs text-faded">
        Retry restores HP. Other zones you already cleared stay cleared.
      </p>
    </main>
  )
}
