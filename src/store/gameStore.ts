import { create } from 'zustand'
import { gameEngine } from '../core/GameEngine'
import type { GameState } from '../core/GameState'

interface GameStore {
  state: GameState
  hasSave: boolean
  startGame: (name: string) => void
  resume: () => void
  enterZone: (zoneId: string, options?: { reviewNotes?: boolean }) => void
  continueFromNotes: () => void
  backToNotes: () => void
  skipNotesToMap: () => void
  selectQuizChoice: (choiceId: string) => void
  submitQuiz: () => void
  backToHub: () => void
  enterRoom: (roomId: string) => void
  selectChoice: (choiceId: string) => void
  submit: () => void
  continueFromFeedback: () => void
  restartRoom: () => void
  restartZone: () => void
}

export const useGame = create<GameStore>(() => ({
  state: gameEngine.getState(),
  hasSave: gameEngine.hasSave(),
  startGame: (name) => gameEngine.startGame(name),
  resume: () => gameEngine.resume(),
  enterZone: (zoneId, options) => gameEngine.enterZone(zoneId, options),
  continueFromNotes: () => gameEngine.continueFromNotes(),
  backToNotes: () => gameEngine.backToNotes(),
  skipNotesToMap: () => gameEngine.skipNotesToMap(),
  selectQuizChoice: (choiceId) => gameEngine.selectQuizChoice(choiceId),
  submitQuiz: () => gameEngine.submitQuiz(),
  backToHub: () => gameEngine.backToHub(),
  enterRoom: (roomId) => gameEngine.enterRoom(roomId),
  selectChoice: (choiceId) => gameEngine.selectChoice(choiceId),
  submit: () => gameEngine.submit(),
  continueFromFeedback: () => gameEngine.continueFromFeedback(),
  restartRoom: () => gameEngine.restartRoom(),
  restartZone: () => gameEngine.restartZone(),
}))

gameEngine.subscribe(() => {
  useGame.setState({
    state: gameEngine.getState(),
    hasSave: gameEngine.hasSave(),
  })
})
