import type { Room } from './rooms'
import { linearEdges } from './rooms'

export const ZONE5_ROOMS: Room[] = [
  {
    id: 'z5-final-ref',
    name: 'Frozen Handle',
    topic: 'final reference vs mutable object',
    enemyId: 'frozen-handle',
    puzzleIds: ['z5-final-ref'],
    requires: [],
    x: 50,
    y: 10,
  },
  {
    id: 'z5-final-method',
    name: 'Last Word',
    topic: 'final methods cannot be overridden',
    enemyId: 'last-word',
    puzzleIds: ['z5-final-method'],
    requires: ['z5-final-ref'],
    x: 50,
    y: 26,
  },
  {
    id: 'z5-hash',
    name: 'Broken Contract',
    topic: 'equals and hashCode',
    enemyId: 'broken-contract',
    puzzleIds: ['z5-hash'],
    requires: ['z5-final-method'],
    x: 50,
    y: 42,
  },
  {
    id: 'z5-equals',
    name: 'One-Way Mirror',
    topic: 'equals must be symmetric',
    enemyId: 'one-way',
    puzzleIds: ['z5-equals'],
    requires: ['z5-hash'],
    x: 50,
    y: 58,
  },
  {
    id: 'z5-sealed',
    name: 'Sealed Gate',
    topic: 'sealed classes and permits (Java 17+)',
    enemyId: 'sealed-gate',
    puzzleIds: ['z5-sealed'],
    requires: ['z5-equals'],
    x: 50,
    y: 74,
  },
  {
    id: 'z5-boss',
    name: 'Crypt Heart',
    topic: 'Truly immutable objects',
    enemyId: 'crypt-heart',
    puzzleIds: ['z5-boss'],
    requires: ['z5-sealed'],
    x: 50,
    y: 90,
    isBoss: true,
  },
]

export const ZONE5_EDGES = linearEdges(ZONE5_ROOMS)
