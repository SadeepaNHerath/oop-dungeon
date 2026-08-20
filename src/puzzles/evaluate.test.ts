import { describe, expect, it } from 'vitest'
import { evaluate } from './evaluate'
import { ALL_PUZZLES, PuzzleFactory } from './PuzzleFactory'

describe('evaluate', () => {
  it('accepts the correct choice for every puzzle', () => {
    for (const puzzle of ALL_PUZZLES) {
      const result = evaluate(puzzle, puzzle.correctId)
      expect(result.correct, puzzle.id).toBe(true)
      expect(result.explanation, puzzle.id).toBeTruthy()
      expect(result.explanationSteps?.length, puzzle.id).toBeGreaterThan(0)
      expect(result.codexId, puzzle.id).toBe(puzzle.codexId)
    }
  })

  it('rejects every other choice and returns a hint', () => {
    for (const puzzle of ALL_PUZZLES) {
      for (const choice of puzzle.choices) {
        if (choice.id === puzzle.correctId) continue
        const result = evaluate(puzzle, choice.id)
        expect(result.correct, `${puzzle.id}:${choice.id}`).toBe(false)
        expect(result.hint, `${puzzle.id}:${choice.id}`).toBeTruthy()
      }
    }
  })

  it('rejects unknown choice ids', () => {
    const puzzle = ALL_PUZZLES[0]
    const result = evaluate(puzzle, 'not-a-choice')
    expect(result.correct).toBe(false)
    expect(result.hint).toBe(puzzle.hint)
  })
})

describe('PuzzleFactory', () => {
  it('loads every authored puzzle by id', () => {
    for (const puzzle of ALL_PUZZLES) {
      expect(PuzzleFactory.create(puzzle.id).id).toBe(puzzle.id)
    }
  })
})
