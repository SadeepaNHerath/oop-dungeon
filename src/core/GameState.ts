export type GamePhase =
  | 'title'
  | 'hub'
  | 'notes'
  | 'quiz'
  | 'map'
  | 'battle'
  | 'feedback'
  | 'gameOver'
  | 'zoneClear'
  | 'courseClear'

export interface Feedback {
  correct: boolean
  hint: string | null
  wrongReason: string | null
  explanation: string | null
  explanationSteps: string[]
  correctLabel: string | null
  codexId: string | null
  commonTrap: string | null
  roomComplete: boolean
  lessonRevealed: boolean
}

export interface GameState {
  phase: GamePhase
  playerName: string
  hp: number
  maxHp: number
  currentZoneId: string | null
  currentRoomId: string | null
  puzzleIndex: number
  unlockedRoomIds: string[]
  clearedRoomIds: string[]
  unlockedCodexIds: string[]
  passedQuizZoneIds: string[]
  courseComplete: boolean
  /** Wrong attempts on the current challenge (resets on new puzzle / room). */
  missCount: number
  quizIndex: number
  quizSelectedId: string | null
  quizTip: string | null
  lastFeedback: Feedback | null
  selectedChoiceId: string | null
  hpPulseKey: number
  enemyHp: number
  enemyMaxHp: number
  enemyId: string | null
}
