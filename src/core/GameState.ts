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

export interface Feedback {
  correct: boolean
  hint: string | null
  explanation: string | null
  explanationSteps: string[]
  codexId: string | null
  commonTrap: string | null
  roomComplete: boolean
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
