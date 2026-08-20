export type PuzzleKind =
  | 'output'
  | 'compile_error'
  | 'runtime'
  | 'fix'
  | 'concept'

export interface Choice {
  id: string
  label: string
}

export interface PuzzleFile {
  path: string
  contents: string
}

export interface Puzzle {
  id: string
  kind: PuzzleKind
  title: string
  prompt: string
  code: string
  choices: Choice[]
  correctId: string
  hint: string
  explanation: string
  explanationSteps: string[]
  codexId: string
  expectCompile: 'ok' | 'fail'
  commonTrap: string
  /** Why each wrong choiceId is incorrect (overnight teaching). */
  wrongReasons?: Record<string, string>
  expectedOutput?: string
  files?: PuzzleFile[]
  entryClass?: string
  fixMarker?: string
  /** For fix puzzles: inject choice into code, or compile the choice as its own source. */
  fixMode?: 'inject' | 'choice-source'
}

export function joinLines(lines: string[]): string {
  return lines.join('\n')
}
