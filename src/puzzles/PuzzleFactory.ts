import type { Puzzle } from './types'
import { BRIDGE_PUZZLES } from './bridges'
import { ZONE0_PUZZLES } from './zone0'
import { ZONE1_PUZZLES } from './zone1'
import { ZONE2_PUZZLES } from './zone2'
import { ZONE3_PUZZLES } from './zone3'
import { ZONE4_PUZZLES } from './zone4'
import { ZONE5_PUZZLES } from './zone5'
import { ZONE6_PUZZLES } from './zone6'
import { ZONE7_PUZZLES } from './zone7'
import { ZONE8_PUZZLES } from './zone8'

const registry = new Map<string, Puzzle>()

export const ALL_PUZZLES: Puzzle[] = [
  ...ZONE0_PUZZLES,
  ...ZONE1_PUZZLES,
  ...ZONE2_PUZZLES,
  ...ZONE3_PUZZLES,
  ...ZONE4_PUZZLES,
  ...ZONE5_PUZZLES,
  ...ZONE6_PUZZLES,
  ...ZONE7_PUZZLES,
  ...ZONE8_PUZZLES,
  ...BRIDGE_PUZZLES,
]

for (const puzzle of ALL_PUZZLES) {
  registry.set(puzzle.id, puzzle)
}

export class PuzzleFactory {
  static create(id: string): Puzzle {
    const puzzle = registry.get(id)
    if (!puzzle) {
      throw new Error(`Unknown puzzle: ${id}`)
    }
    return puzzle
  }

  static all(): Puzzle[] {
    return [...registry.values()]
  }
}
