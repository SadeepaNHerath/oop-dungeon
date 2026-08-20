import type { GameState } from './GameState'

const KEY = 'bytecode-arena-v4'
const LEGACY_KEYS = [
  'bytecode-arena-v3',
  'bytecode-arena-v2',
  'bytecode-arena-zone1-v1',
]

function normalize(raw: unknown): GameState | null {
  if (!raw || typeof raw !== 'object') return null
  const s = raw as Partial<GameState>
  if (typeof s.playerName !== 'string') return null
  const last = s.lastFeedback
  return {
    phase: s.phase ?? 'hub',
    playerName: s.playerName,
    hp: typeof s.hp === 'number' ? s.hp : 100,
    maxHp: typeof s.maxHp === 'number' ? s.maxHp : 100,
    currentZoneId: s.currentZoneId ?? null,
    currentRoomId: s.currentRoomId ?? null,
    puzzleIndex: s.puzzleIndex ?? 0,
    unlockedRoomIds: s.unlockedRoomIds ?? [],
    clearedRoomIds: s.clearedRoomIds ?? [],
    unlockedCodexIds: s.unlockedCodexIds ?? [],
    passedQuizZoneIds: s.passedQuizZoneIds ?? [],
    courseComplete: Boolean(s.courseComplete),
    missCount: s.missCount ?? 0,
    quizIndex: s.quizIndex ?? 0,
    quizSelectedId: s.quizSelectedId ?? null,
    quizTip: s.quizTip ?? null,
    lastFeedback: last
      ? {
          correct: Boolean(last.correct),
          hint: last.hint ?? null,
          wrongReason: last.wrongReason ?? null,
          explanation: last.explanation ?? null,
          explanationSteps: last.explanationSteps ?? [],
          correctLabel: last.correctLabel ?? null,
          codexId: last.codexId ?? null,
          commonTrap: last.commonTrap ?? null,
          roomComplete: Boolean(last.roomComplete),
          lessonRevealed: Boolean(last.lessonRevealed),
        }
      : null,
    selectedChoiceId: s.selectedChoiceId ?? null,
    hpPulseKey: s.hpPulseKey ?? 0,
    enemyHp: s.enemyHp ?? 0,
    enemyMaxHp: s.enemyMaxHp ?? 0,
    enemyId: s.enemyId ?? null,
  }
}

export function saveState(state: GameState): void {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(KEY, JSON.stringify(state))
}

export function loadState(): GameState | null {
  if (typeof localStorage === 'undefined') return null
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return normalize(JSON.parse(raw))
    for (const legacy of LEGACY_KEYS) {
      const old = localStorage.getItem(legacy)
      if (!old) continue
      const migrated = normalize(JSON.parse(old))
      if (migrated) {
        saveState(migrated)
        localStorage.removeItem(legacy)
        return migrated
      }
    }
    return null
  } catch {
    return null
  }
}

export function clearSave(): void {
  if (typeof localStorage === 'undefined') return
  localStorage.removeItem(KEY)
  for (const legacy of LEGACY_KEYS) localStorage.removeItem(legacy)
}
