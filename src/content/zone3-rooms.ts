import type { Room } from './rooms'
import { linearEdges } from './rooms'

export const ZONE3_ROOMS: Room[] = [
  {
    id: 'z3-override',
    name: 'True Voice',
    topic: 'Instance method override',
    enemyId: 'true-voice',
    puzzleIds: ['z3-override'],
    requires: [],
    x: 50,
    y: 10,
  },
  {
    id: 'z3-static',
    name: 'Static Mask',
    topic: 'static methods hide, they do not override',
    enemyId: 'static-mask',
    puzzleIds: ['z3-static'],
    requires: ['z3-override'],
    x: 50,
    y: 26,
  },
  {
    id: 'z3-field',
    name: 'Field Mirage',
    topic: 'Fields are chosen by compile-time type',
    enemyId: 'field-mirage',
    puzzleIds: ['z3-field'],
    requires: ['z3-static'],
    x: 50,
    y: 42,
  },
  {
    id: 'z3-overload',
    name: 'Exact Match',
    topic: 'Overload: exact vs widening vs boxing',
    enemyId: 'exact-match',
    puzzleIds: ['z3-overload', 'z3-bridge'],
    requires: ['z3-field'],
    x: 50,
    y: 58,
  },
  {
    id: 'z3-varargs',
    name: 'Varargs Last',
    topic: 'Boxing beats varargs',
    enemyId: 'varargs-last',
    puzzleIds: ['z3-varargs'],
    requires: ['z3-overload'],
    x: 50,
    y: 74,
  },
  {
    id: 'z3-boss',
    name: 'Two Clocks',
    topic: 'Overload at compile time, override at runtime',
    enemyId: 'two-clocks',
    puzzleIds: ['z3-boss'],
    requires: ['z3-varargs'],
    x: 50,
    y: 90,
    isBoss: true,
  },
]

export const ZONE3_EDGES = linearEdges(ZONE3_ROOMS)
