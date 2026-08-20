import type { Puzzle, PuzzleKind } from '../puzzles/types'

export interface PresentedAttack {
  banner: string
  kindLabel: string
}

/** Strategy: how a challenge presents a puzzle type. */
export interface AttackStrategy {
  present(puzzle: Puzzle): PresentedAttack
}

export class OutputSpell implements AttackStrategy {
  present(puzzle: Puzzle): PresentedAttack {
    return {
      banner: `Output check — ${puzzle.title}`,
      kindLabel: 'What is the exact output?',
    }
  }
}

export class CompileHex implements AttackStrategy {
  present(puzzle: Puzzle): PresentedAttack {
    return {
      banner: `Compile check — ${puzzle.title}`,
      kindLabel: 'Why does this fail to compile?',
    }
  }
}

export class RuntimeCurse implements AttackStrategy {
  present(puzzle: Puzzle): PresentedAttack {
    return {
      banner: `Runtime check — ${puzzle.title}`,
      kindLabel: 'What happens when this runs?',
    }
  }
}

export class RefactorCharm implements AttackStrategy {
  present(puzzle: Puzzle): PresentedAttack {
    return {
      banner: `Fix check — ${puzzle.title}`,
      kindLabel: 'Which snippet compiles and fixes the bug?',
    }
  }
}

export class ConceptWard implements AttackStrategy {
  present(puzzle: Puzzle): PresentedAttack {
    return {
      banner: `Concept check — ${puzzle.title}`,
      kindLabel: 'Which statement is correct?',
    }
  }
}

export function strategyFor(kind: PuzzleKind): AttackStrategy {
  switch (kind) {
    case 'output':
      return new OutputSpell()
    case 'compile_error':
      return new CompileHex()
    case 'runtime':
      return new RuntimeCurse()
    case 'fix':
      return new RefactorCharm()
    case 'concept':
      return new ConceptWard()
  }
}
