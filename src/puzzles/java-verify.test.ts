import { describe, expect, it } from 'vitest'
import { ZONE_QUIZZES } from '../content/quizzes'
import { ZONE_NOTES } from '../content/zoneNotes'
import { ZONES } from '../content/zones'
import { ALL_PUZZLES } from './PuzzleFactory'
import { evaluate } from './evaluate'
import { hasJdk, verifyPuzzle } from './javaHarness'

describe('evaluate bank', () => {
  it('has unique ids and four choices with a valid correctId', () => {
    const ids = new Set<string>()
    for (const puzzle of ALL_PUZZLES) {
      expect(ids.has(puzzle.id), puzzle.id).toBe(false)
      ids.add(puzzle.id)
      expect(puzzle.choices.length, puzzle.id).toBe(4)
      expect(
        puzzle.choices.some((choice) => choice.id === puzzle.correctId),
        puzzle.id,
      ).toBe(true)
      expect(puzzle.commonTrap, puzzle.id).toBeTruthy()
      expect(puzzle.expectCompile === 'ok' || puzzle.expectCompile === 'fail').toBe(
        true,
      )
    }
  })

  it('keeps output puzzles aligned with expectedOutput', () => {
    for (const puzzle of ALL_PUZZLES) {
      if (puzzle.kind !== 'output' && puzzle.kind !== 'runtime') continue
      const winner = puzzle.choices.find((choice) => choice.id === puzzle.correctId)
      expect(puzzle.expectedOutput, puzzle.id).toBeDefined()
      expect(winner?.label, puzzle.id).toBe(puzzle.expectedOutput)
    }
  })

  it('accepts the correct choice and rejects the others', () => {
    for (const puzzle of ALL_PUZZLES) {
      const good = evaluate(puzzle, puzzle.correctId)
      expect(good.correct, puzzle.id).toBe(true)
      for (const choice of puzzle.choices) {
        if (choice.id === puzzle.correctId) continue
        const bad = evaluate(puzzle, choice.id)
        expect(bad.correct, `${puzzle.id}:${choice.id}`).toBe(false)
        expect(bad.hint, `${puzzle.id}:${choice.id}`).toBeTruthy()
      }
    }
  })
})

describe('notes and quizzes', () => {
  it('has short notes and a quiz for every zone', () => {
    for (const zone of ZONES) {
      expect(
        ZONE_NOTES.some((n) => n.zoneId === zone.id),
        `notes ${zone.id}`,
      ).toBe(true)
      const quiz = ZONE_QUIZZES.find((q) => q.zoneId === zone.id)
      expect(quiz, `quiz ${zone.id}`).toBeTruthy()
      expect(quiz!.questions.length).toBeGreaterThanOrEqual(3)
      expect(quiz!.questions.length).toBeLessThanOrEqual(5)
      for (const question of quiz!.questions) {
        expect(question.choices.some((c) => c.id === question.correctId)).toBe(
          true,
        )
      }
    }
  })
})

describe('javac / java fixtures', () => {
  const available = hasJdk()

  it.skipIf(!available)(
    'compiles and runs every authored snippet',
    () => {
      const failures: string[] = []
      for (const puzzle of ALL_PUZZLES) {
        failures.push(...verifyPuzzle(puzzle))
      }
      expect(failures, failures.join('\n\n')).toEqual([])
    },
    180_000,
  )

  it.skipIf(available)('skips when javac is not on PATH', () => {
    expect(available).toBe(false)
  })
})
