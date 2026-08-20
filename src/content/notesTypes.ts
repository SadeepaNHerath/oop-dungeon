export interface QuizChoice {
  id: string
  label: string
}

export interface QuizQuestion {
  id: string
  prompt: string
  choices: QuizChoice[]
  correctId: string
  tip: string
}

export interface ZoneQuiz {
  zoneId: string
  questions: QuizQuestion[]
}

export interface ZoneNote {
  zoneId: string
  title: string
  why: string
  /** Short scan line for hubs / complete screens */
  bullets: string[]
  /** Core exam rules */
  theory: string[]
  /** Where the same rule shows up in real systems */
  inPractice: string[]
  /** Under-taught pitfalls exams and code reviews catch */
  untouchables: string[]
  /** One real-world consequence the student can explain after the level */
  youCanExplain: string
  snippet: string
  trap: string
}
