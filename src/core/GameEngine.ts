import { Player, PLAYER_MAX_HP } from '../model/Player'
import { PuzzleFactory } from '../puzzles/PuzzleFactory'
import { evaluate } from '../puzzles/evaluate'
import { getZoneQuiz } from '../content/quizzes'
import {
  getRoom,
  getZone,
  unlockedInZone,
  zoneCleared,
} from '../content/zones'
import { loadState, saveState } from './persist'
import type { Feedback, GameState } from './GameState'

export const WRONG_DAMAGE = 15

export function createInitialState(playerName = ''): GameState {
  return {
    phase: 'title',
    playerName,
    hp: PLAYER_MAX_HP,
    maxHp: PLAYER_MAX_HP,
    currentZoneId: null,
    currentRoomId: null,
    puzzleIndex: 0,
    unlockedRoomIds: [],
    clearedRoomIds: [],
    unlockedCodexIds: [],
    passedQuizZoneIds: [],
    quizIndex: 0,
    quizSelectedId: null,
    quizTip: null,
    lastFeedback: null,
    selectedChoiceId: null,
    hpPulseKey: 0,
    enemyHp: 0,
    enemyMaxHp: 0,
    enemyId: null,
  }
}

type Listener = () => void

export class GameEngine {
  private state: GameState
  private player: Player
  private listeners = new Set<Listener>()

  constructor() {
    this.state = createInitialState()
    this.player = new Player('Adept')
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  getState(): GameState {
    return structuredClone(this.state)
  }

  hasSave(): boolean {
    const saved = loadState()
    return saved != null && saved.phase !== 'title'
  }

  startGame(name: string): void {
    const playerName = name.trim() || 'Adept'
    this.player = new Player(playerName)
    this.state = createInitialState(playerName)
    this.state.phase = 'hub'
    this.emit()
  }

  resume(): void {
    const saved = loadState()
    if (!saved || saved.phase === 'title') return
    this.state = saved
    this.player = new Player(saved.playerName)
    this.player.hp = saved.hp
    this.emit()
  }

  enterZone(zoneId: string, options?: { reviewNotes?: boolean }): void {
    this.player.restore()
    this.state.hp = this.player.hp
    this.state.currentZoneId = zoneId
    this.state.currentRoomId = null
    this.state.puzzleIndex = 0
    this.state.selectedChoiceId = null
    this.state.lastFeedback = null
    this.state.quizIndex = 0
    this.state.quizSelectedId = null
    this.state.quizTip = null
    this.state.unlockedRoomIds = unlockedInZone(zoneId, this.state.clearedRoomIds)
    const quizPassed = this.state.passedQuizZoneIds.includes(zoneId)
    if (options?.reviewNotes || !quizPassed) {
      this.state.phase = 'notes'
    } else {
      this.state.phase = 'map'
    }
    this.emit()
  }

  continueFromNotes(): void {
    if (this.state.phase !== 'notes' || !this.state.currentZoneId) return
    this.state.quizIndex = 0
    this.state.quizSelectedId = null
    this.state.quizTip = null
    this.state.phase = 'quiz'
    this.emit()
  }

  backToNotes(): void {
    if (!this.state.currentZoneId) return
    this.state.quizIndex = 0
    this.state.quizSelectedId = null
    this.state.quizTip = null
    this.state.phase = 'notes'
    this.emit()
  }

  skipNotesToMap(): void {
    if (!this.state.currentZoneId) return
    if (!this.state.passedQuizZoneIds.includes(this.state.currentZoneId)) return
    this.state.phase = 'map'
    this.emit()
  }

  selectQuizChoice(choiceId: string): void {
    if (this.state.phase !== 'quiz') return
    this.state.quizSelectedId = choiceId
    this.state.quizTip = null
    this.emit()
  }

  submitQuiz(): void {
    if (
      this.state.phase !== 'quiz' ||
      !this.state.currentZoneId ||
      !this.state.quizSelectedId
    ) {
      return
    }
    const quiz = getZoneQuiz(this.state.currentZoneId)
    if (!quiz) {
      this.markQuizPassedAndEnterMap()
      return
    }
    const question = quiz.questions[this.state.quizIndex]
    if (!question) return

    if (this.state.quizSelectedId !== question.correctId) {
      this.state.quizTip = question.tip
      this.emit()
      return
    }

    if (this.state.quizIndex < quiz.questions.length - 1) {
      this.state.quizIndex += 1
      this.state.quizSelectedId = null
      this.state.quizTip = null
      this.emit()
      return
    }

    this.markQuizPassedAndEnterMap()
  }

  private markQuizPassedAndEnterMap(): void {
    const zoneId = this.state.currentZoneId
    if (zoneId && !this.state.passedQuizZoneIds.includes(zoneId)) {
      this.state.passedQuizZoneIds = [...this.state.passedQuizZoneIds, zoneId]
    }
    this.state.quizIndex = 0
    this.state.quizSelectedId = null
    this.state.quizTip = null
    this.state.phase = 'map'
    this.emit()
  }

  backToHub(): void {
    this.player.restore()
    this.state.hp = this.player.hp
    this.state.phase = 'hub'
    this.state.currentZoneId = null
    this.state.currentRoomId = null
    this.state.lastFeedback = null
    this.state.selectedChoiceId = null
    this.state.quizTip = null
    this.emit()
  }

  enterRoom(roomId: string): void {
    if (!this.state.unlockedRoomIds.includes(roomId)) return
    if (this.state.clearedRoomIds.includes(roomId)) return
    const room = getRoom(roomId)
    this.state.currentRoomId = roomId
    this.state.puzzleIndex = 0
    this.state.selectedChoiceId = null
    this.state.lastFeedback = null
    this.state.enemyId = room.enemyId
    this.state.enemyMaxHp = 100
    this.state.enemyHp = 100
    this.state.phase = 'battle'
    this.emit()
  }

  selectChoice(choiceId: string): void {
    if (this.state.phase !== 'battle') return
    this.state.selectedChoiceId = choiceId
    this.emit()
  }

  submit(): void {
    if (
      this.state.phase !== 'battle' ||
      !this.state.selectedChoiceId ||
      !this.state.currentRoomId
    ) {
      return
    }
    const room = getRoom(this.state.currentRoomId)
    const puzzleId = room.puzzleIds[this.state.puzzleIndex]
    const puzzle = PuzzleFactory.create(puzzleId)
    const result = evaluate(puzzle, this.state.selectedChoiceId)

    if (result.correct) {
      const slices = room.puzzleIds.length
      const nextHp = this.state.enemyHp - Math.ceil(100 / slices)
      this.state.enemyHp =
        this.state.puzzleIndex >= slices - 1 ? 0 : Math.max(0, nextHp)
      const feedback: Feedback = {
        correct: true,
        hint: null,
        explanation: result.explanation ?? '',
        explanationSteps: result.explanationSteps ?? [],
        codexId: result.codexId ?? null,
        commonTrap: result.commonTrap ?? puzzle.commonTrap,
        roomComplete: this.state.puzzleIndex >= slices - 1,
      }
      if (result.codexId && !this.state.unlockedCodexIds.includes(result.codexId)) {
        this.state.unlockedCodexIds = [...this.state.unlockedCodexIds, result.codexId]
      }
      this.state.lastFeedback = feedback
      this.state.phase = 'feedback'
    } else {
      this.player.takeDamage(WRONG_DAMAGE)
      this.state.hp = this.player.hp
      this.state.hpPulseKey += 1
      this.state.lastFeedback = {
        correct: false,
        hint: result.hint ?? 'Not quite.',
        explanation: null,
        explanationSteps: [],
        codexId: null,
        commonTrap: result.commonTrap ?? puzzle.commonTrap,
        roomComplete: false,
      }
      if (this.player.isDefeated) {
        this.state.phase = 'gameOver'
      }
    }
    this.emit()
  }

  continueFromFeedback(): void {
    if (this.state.phase !== 'feedback' || !this.state.currentRoomId) return
    const room = getRoom(this.state.currentRoomId)
    if (this.state.puzzleIndex < room.puzzleIds.length - 1) {
      this.state.puzzleIndex += 1
      this.state.selectedChoiceId = null
      this.state.lastFeedback = null
      this.state.phase = 'battle'
      this.emit()
      return
    }
    const roomId = this.state.currentRoomId
    if (!this.state.clearedRoomIds.includes(roomId)) {
      this.state.clearedRoomIds = [...this.state.clearedRoomIds, roomId]
    }
    const zoneId = this.state.currentZoneId
    if (zoneId) {
      this.state.unlockedRoomIds = unlockedInZone(zoneId, this.state.clearedRoomIds)
    }
    this.state.currentRoomId = null
    this.state.puzzleIndex = 0
    this.state.selectedChoiceId = null
    this.state.lastFeedback = null
    this.state.enemyId = null
    this.state.phase =
      zoneId && zoneCleared(zoneId, this.state.clearedRoomIds) ? 'zoneClear' : 'map'
    this.emit()
  }

  restartRoom(): void {
    this.player.restore()
    this.state.hp = this.player.hp
    this.state.lastFeedback = null
    this.state.selectedChoiceId = null
    this.state.puzzleIndex = 0
    this.state.enemyHp = 100
    this.state.phase = this.state.currentRoomId ? 'battle' : 'map'
    this.emit()
  }

  restartZone(): void {
    const zoneId = this.state.currentZoneId
    if (!zoneId) {
      this.startGame(this.state.playerName || 'Adept')
      return
    }
    const ids = new Set(getZone(zoneId).rooms.map((room) => room.id))
    this.state.clearedRoomIds = this.state.clearedRoomIds.filter((id) => !ids.has(id))
    this.state.passedQuizZoneIds = this.state.passedQuizZoneIds.filter(
      (id) => id !== zoneId,
    )
    this.enterZone(zoneId, { reviewNotes: true })
  }

  private emit(): void {
    if (this.state.phase !== 'title') {
      saveState(this.state)
    }
    for (const listener of this.listeners) {
      listener()
    }
  }
}

export const gameEngine = new GameEngine()
