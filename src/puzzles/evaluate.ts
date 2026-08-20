import type { Puzzle } from './types'

export interface EvaluateResult {
  correct: boolean
  hint?: string
  wrongReason?: string
  explanation?: string
  explanationSteps?: string[]
  correctLabel?: string
  codexId?: string
  commonTrap?: string
}

export function evaluate(puzzle: Puzzle, choiceId: string): EvaluateResult {
  if (choiceId === puzzle.correctId) {
    const correct = puzzle.choices.find((c) => c.id === puzzle.correctId)
    return {
      correct: true,
      explanation: puzzle.explanation,
      explanationSteps: puzzle.explanationSteps,
      correctLabel: correct?.label,
      codexId: puzzle.codexId,
      commonTrap: puzzle.commonTrap,
    }
  }
  return {
    correct: false,
    hint: puzzle.hint,
    wrongReason:
      puzzle.wrongReasons?.[choiceId] ??
      puzzle.hint ??
      'That choice does not match how Java behaves here.',
    commonTrap: puzzle.commonTrap,
  }
}
