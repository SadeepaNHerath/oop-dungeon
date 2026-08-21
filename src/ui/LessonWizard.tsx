import { useEffect, useState } from 'react'
import type { ZoneNote } from '../content/notesTypes'
import { studyCardsForZone } from '../content/study'
import { cn } from './cn'
import { SpellTablet } from './SpellTablet'
import { StickyActionBar } from './StickyActionBar'

const STEP_LABELS = [
  'Hook',
  'Theory',
  'Real code',
  'Easy to miss',
  'Ready',
] as const

interface LessonWizardProps {
  note: ZoneNote
  levelLabelText: string
  quizDone: boolean
  onContinue: () => void
  onSkipToMap?: () => void
  onBackToHub: () => void
}

export function LessonWizard({
  note,
  levelLabelText,
  quizDone,
  onContinue,
  onSkipToMap,
  onBackToHub,
}: LessonWizardProps) {
  const [step, setStep] = useState(0)
  const [openDiveId, setOpenDiveId] = useState<string | null>(null)
  const cards = studyCardsForZone(note.zoneId)
  const last = STEP_LABELS.length - 1

  useEffect(() => {
    setStep(0)
    setOpenDiveId(null)
  }, [note.zoneId])

  return (
    <main className="mx-auto max-w-2xl px-4 pb-4 pt-10">
      <p className="font-mono text-xs uppercase tracking-widest text-sigil">
        {levelLabelText} · Guided lesson
      </p>
      <h1 className="mt-2 font-display text-3xl text-parchment">{note.title}</h1>

      <div className="mt-5 flex items-center gap-2" aria-label="Lesson progress">
        {STEP_LABELS.map((label, i) => (
          <button
            key={label}
            type="button"
            title={label}
            onClick={() => setStep(i)}
            className={cn(
              'h-2.5 flex-1 rounded-full transition',
              i <= step ? 'bg-rune' : 'bg-edge',
              i === step && 'ring-2 ring-rune/40',
            )}
            aria-current={i === step ? 'step' : undefined}
          />
        ))}
      </div>
      <p className="mt-2 font-mono text-xs text-faded">
        Step {step + 1} of {STEP_LABELS.length} · {STEP_LABELS[step]}
      </p>

      <div key={`${note.zoneId}-${step}`} className="mt-6 fade-up">
        {step === 0 ? (
          <section className="space-y-4">
            <p className="text-lg leading-relaxed text-parchment">{note.why}</p>
            <div className="rounded-xl border border-rune/30 bg-panel/60 px-4 py-3">
              <p className="font-mono text-[11px] uppercase tracking-widest text-rune">
                60-second scan
              </p>
              <ul className="mt-2 list-disc space-y-1.5 pl-4 text-parchment">
                {note.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {step === 1 ? (
          <section className="space-y-4">
            <h2 className="font-display text-xl text-rune">Theory (must know)</h2>
            <ul className="list-disc space-y-2 pl-5 text-parchment">
              {note.theory.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <SpellTablet code={note.snippet} filename="Notes.java" />
          </section>
        ) : null}

        {step === 2 ? (
          <section className="space-y-4">
            <h2 className="font-display text-xl text-sigil">In real code</h2>
            <p className="text-sm text-faded">
              Where the same rule shows up outside the exam paper.
            </p>
            <ul className="list-disc space-y-2 pl-5 text-parchment">
              {note.inPractice.slice(0, 3).map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {step === 3 ? (
          <section className="space-y-4">
            <h2 className="font-display text-xl text-blood">Easy to miss</h2>
            <ul className="list-disc space-y-2 pl-5 text-parchment">
              {note.untouchables.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className="rounded-lg border border-blood/30 bg-blood/10 px-4 py-3 text-sm">
              <span className="font-semibold text-blood">Common mistake. </span>
              {note.trap}
            </p>
          </section>
        ) : null}

        {step === 4 ? (
          <section className="space-y-4">
            <h2 className="font-display text-xl text-moss">Ready for the arena?</h2>
            <p className="rounded-lg border border-moss/30 bg-moss/10 px-4 py-3 text-parchment">
              <span className="font-semibold text-moss">You can explain. </span>
              {note.youCanExplain}
            </p>
            <p className="text-sm text-faded">
              Next: a short warm-up round (no HP), then arena challenges.
            </p>
            {cards.length > 0 ? (
              <div className="space-y-2">
                <p className="font-mono text-xs uppercase tracking-widest text-faded">
                  Need more detail? ({cards.length} deep dives)
                </p>
                {cards.map((card) => {
                  const open = openDiveId === card.id
                  return (
                    <div
                      key={card.id}
                      className="overflow-hidden rounded-xl border border-edge bg-panel/80"
                    >
                      <button
                        type="button"
                        aria-expanded={open}
                        onClick={() => setOpenDiveId(open ? null : card.id)}
                        className={cn(
                          'flex w-full items-center justify-between gap-3 px-4 py-3 text-left',
                          open && 'border-b border-edge',
                        )}
                      >
                        <span className="font-display text-base text-rune">
                          {card.title}
                        </span>
                        <span className="font-mono text-xs text-faded">
                          {open ? 'Hide' : 'Show'}
                        </span>
                      </button>
                      {open ? (
                        <div className="px-4 py-3">
                          <p className="text-sm text-faded">{card.summary}</p>
                          <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-parchment">
                            {card.theory.map((t) => (
                              <li key={t}>{t}</li>
                            ))}
                          </ul>
                          <div className="mt-3">
                            <SpellTablet
                              code={card.snippet}
                              filename="Card.java"
                            />
                          </div>
                        </div>
                      ) : null}
                    </div>
                  )
                })}
              </div>
            ) : null}
          </section>
        ) : null}
      </div>

      <StickyActionBar>
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="rounded-lg border border-edge px-5 py-3 text-faded hover:text-parchment"
          >
            Back
          </button>
        ) : (
          <button
            type="button"
            onClick={onBackToHub}
            className="rounded-lg border border-edge px-5 py-3 text-faded hover:text-parchment"
          >
            Roadmap
          </button>
        )}
        {step < last ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            className="rounded-lg bg-rune px-5 py-3 font-semibold text-ink hover:bg-rune-dim"
          >
            Next
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={onContinue}
              className="rounded-lg bg-rune px-5 py-3 font-semibold text-ink hover:bg-rune-dim"
            >
              Take warm-up round
            </button>
            {quizDone && onSkipToMap ? (
              <button
                type="button"
                onClick={onSkipToMap}
                className="rounded-lg border border-sigil/50 px-5 py-3 font-semibold text-sigil hover:bg-panel"
              >
                Skip to arena
              </button>
            ) : null}
          </>
        )}
      </StickyActionBar>
    </main>
  )
}
