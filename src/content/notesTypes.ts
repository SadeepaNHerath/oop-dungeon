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
  bullets: string[]
  snippet: string
  trap: string
}
