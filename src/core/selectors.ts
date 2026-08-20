import { PuzzleFactory } from '../puzzles/PuzzleFactory'
import { getRoom } from '../content/zones'
import type { GameState } from './GameState'
import type { Puzzle } from '../puzzles/types'

export function currentPuzzle(state: GameState): Puzzle | null {
  if (!state.currentRoomId) return null
  const room = getRoom(state.currentRoomId)
  const id = room.puzzleIds[state.puzzleIndex]
  if (!id) return null
  return PuzzleFactory.create(id)
}
