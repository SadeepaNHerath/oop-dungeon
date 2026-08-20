import { ZONE_GROUPS, ZONES, zoneProgress } from '../content/zones'
import { useGame } from '../store/gameStore'

export function ZoneHub() {
  const cleared = useGame((s) => s.state.clearedRoomIds)
  const passedQuizzes = useGame((s) => s.state.passedQuizZoneIds)
  const enterZone = useGame((s) => s.enterZone)

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 fade-up">
      <h1 className="font-display text-3xl text-parchment">Java OOP course</h1>
      <p className="mt-2 max-w-2xl text-faded">
        Short notes → mini quiz → code rooms. All zones are open. Suggested
        order: Foundations, then Edge cases, then Types & design.
      </p>

      {ZONE_GROUPS.map((group) => {
        const zones = ZONES.filter((z) => z.group === group.id)
        return (
          <section key={group.id} className="mt-10">
            <h2 className="font-display text-xl text-rune">{group.title}</h2>
            <p className="text-sm text-faded">{group.blurb}</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {zones.map((zone) => {
                const { done, total } = zoneProgress(zone.id, cleared)
                const quizDone = passedQuizzes.includes(zone.id)
                return (
                  <button
                    key={zone.id}
                    type="button"
                    onClick={() => enterZone(zone.id)}
                    className="rounded-2xl border border-edge bg-panel p-5 text-left transition hover:border-rune hover:bg-panel-2"
                  >
                    <p className="font-mono text-xs uppercase tracking-widest text-sigil">
                      {zone.short}
                    </p>
                    <h3 className="mt-1 font-display text-2xl text-parchment">
                      {zone.name}
                    </h3>
                    <p className="mt-2 text-sm text-faded">{zone.topic}</p>
                    <p className="mt-4 font-mono text-sm text-rune">
                      {done}/{total} rooms
                      <span className="ml-2 text-faded">
                        · quiz {quizDone ? 'done' : 'open'}
                      </span>
                    </p>
                    {quizDone ? (
                      <button
                        type="button"
                        className="mt-2 text-xs text-sigil underline"
                        onClick={(e) => {
                          e.stopPropagation()
                          enterZone(zone.id, { reviewNotes: true })
                        }}
                      >
                        Review notes
                      </button>
                    ) : null}
                  </button>
                )
              })}
            </div>
          </section>
        )
      })}
    </main>
  )
}
