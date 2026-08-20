import type { Puzzle } from './types'

export interface EvaluateResult {
  correct: boolean
  hint?: string
  explanation?: string
  explanationSteps?: string[]
  codexId?: string
  commonTrap?: string
}

export function evaluate(puzzle: Puzzle, choiceId: string): EvaluateResult {
  if (choiceId === puzzle.correctId) {
    return {
      correct: true,
      explanation: puzzle.explanation,
      explanationSteps: puzzle.explanationSteps,
      codexId: puzzle.codexId,
      commonTrap: puzzle.commonTrap,
    }
  }
  return {
    correct: false,
    hint: puzzle.hint,
    commonTrap: puzzle.commonTrap,
  }
}
