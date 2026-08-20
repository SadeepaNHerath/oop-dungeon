import type { ZoneNote } from '../content/notesTypes'
import { studyCardsForZone } from '../content/study'
import { SpellTablet } from './SpellTablet'

interface NoteSectionsProps {
  note: ZoneNote
  /** Show deep-dive study cards under the main note */
  showStudyCards?: boolean
  compact?: boolean
}

export function NoteSections({
  note,
  showStudyCards = false,
  compact = false,
}: NoteSectionsProps) {
  const cards = showStudyCards ? studyCardsForZone(note.zoneId) : []
  const listClass = compact
    ? 'mt-2 list-disc space-y-1 pl-4 text-sm text-parchment'
    : 'mt-3 list-disc space-y-1.5 pl-5 text-parchment'

  return (
    <div className="space-y-6">
      <section>
        <h3 className="font-display text-lg text-rune">Theory (must know)</h3>
        <ul className={listClass}>
          {note.theory.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-display text-lg text-sigil">In real code</h3>
        <ul className={listClass}>
          {note.inPractice.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-display text-lg text-blood">Untouching points</h3>
        <p className="mt-1 text-xs text-faded">
          Easy to skip in lectures — exams and code reviews love these.
        </p>
        <ul className={listClass}>
          {note.untouchables.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <div>
        <SpellTablet code={note.snippet} filename="Notes.java" />
      </div>

      <p className="rounded-lg border border-blood/30 bg-blood/10 px-4 py-3 text-sm text-parchment">
        <span className="font-semibold text-blood">Common mistake. </span>
        {note.trap}
      </p>

      <p className="rounded-lg border border-moss/30 bg-moss/10 px-4 py-3 text-sm text-parchment">
        <span className="font-semibold text-moss">You can explain. </span>
        {note.youCanExplain}
      </p>

      {cards.length > 0 ? (
        <section className="space-y-4">
          <h3 className="font-display text-lg text-parchment">Deep dive cards</h3>
          {cards.map((card) => (
            <article
              key={card.id}
              className="rounded-xl border border-edge bg-panel/80 p-4"
            >
              <h4 className="font-display text-base text-rune">{card.title}</h4>
              <p className="mt-1 text-sm text-faded">{card.summary}</p>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-parchment">
                {card.theory.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <div className="mt-3">
                <SpellTablet code={card.snippet} filename="Card.java" />
              </div>
              <p className="mt-2 text-sm text-blood">
                <span className="font-semibold">Trap. </span>
                {card.trap}
              </p>
            </article>
          ))}
        </section>
      ) : null}
    </div>
  )
}
