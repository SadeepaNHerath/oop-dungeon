import { useState, type FormEvent } from 'react'
import { useGame } from '../store/gameStore'

function lastName(): string {
  if (typeof localStorage === 'undefined') return ''
  return localStorage.getItem('bytecode-arena-last-name') ?? ''
}

interface TitleScreenProps {
  onOpenStudy: () => void
}

export function TitleScreen({ onOpenStudy }: TitleScreenProps) {
  const startGame = useGame((s) => s.startGame)
  const resume = useGame((s) => s.resume)
  const hasSave = useGame((s) => s.hasSave)
  const [name, setName] = useState(lastName)

  function onStart(event: FormEvent) {
    event.preventDefault()
    const trimmed = name.trim() || 'Student'
    localStorage.setItem('bytecode-arena-last-name', trimmed)
    startGame(trimmed)
  }

  return (
    <main className="mx-auto flex min-h-svh max-w-2xl flex-col justify-center px-6 py-16 fade-up">
      <p className="font-mono text-sm uppercase tracking-[0.25em] text-sigil">
        Bytecode Arena
      </p>
      <h1 className="mt-3 font-display text-5xl font-medium leading-tight text-parchment sm:text-6xl">
        Overnight exam path
      </h1>
      <p className="mt-4 text-lg text-faded">
        Guided lesson → warm-up round → arena challenges. Nine levels. Unlock the
        Secrets vault when you clear them all.
      </p>

      <form onSubmit={onStart} className="mt-10 space-y-4">
        <label className="block text-sm font-semibold text-parchment">
          Your name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={24}
            placeholder="Your name"
            className="mt-2 w-full rounded-lg border border-edge bg-panel px-4 py-3 text-base text-parchment outline-none ring-rune/40 placeholder:text-faded/60 focus:ring-2"
          />
        </label>
        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-lg bg-rune px-5 py-3 font-semibold text-ink hover:bg-rune-dim"
          >
            Enter the arena
          </button>
          <button
            type="button"
            onClick={onOpenStudy}
            className="rounded-lg border border-sigil/50 px-5 py-3 font-semibold text-sigil hover:bg-panel"
          >
            Lesson notes
          </button>
          {hasSave ? (
            <button
              type="button"
              onClick={resume}
              className="rounded-lg border border-edge px-5 py-3 font-semibold text-parchment hover:bg-panel"
            >
              Continue
            </button>
          ) : null}
        </div>
      </form>

      <section className="mt-12 rounded-xl border border-edge bg-panel/70 p-5">
        <h2 className="font-display text-xl text-rune">How it plays</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-faded">
          <li>Short guided lesson — one idea per screen, then warm-up.</li>
          <li>Arena fights: cast answers, learn from misses, break seals.</li>
          <li>
            After two misses you can show the full lesson. Keys{' '}
            <kbd className="text-parchment">1</kbd>–
            <kbd className="text-parchment">4</kbd> select,{' '}
            <kbd className="text-parchment">Enter</kbd> casts.
          </li>
        </ol>
      </section>
    </main>
  )
}
