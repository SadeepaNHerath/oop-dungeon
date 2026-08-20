import type { Room } from './rooms'
import { linearEdges } from './rooms'

export const ZONE6_ROOMS: Room[] = [
  {
    id: 'z6-upcast',
    name: 'Silent Lift',
    topic: 'Upcast API',
    enemyId: 'silent-lift',
    puzzleIds: ['z6-upcast'],
    requires: [],
    x: 50,
    y: 10,
  },
  {
    id: 'z6-downcast',
    name: 'Brittle Cast',
    topic: 'ClassCastException',
    enemyId: 'brittle-cast',
    puzzleIds: ['z6-downcast'],
    requires: ['z6-upcast'],
    x: 50,
    y: 26,
  },
  {
    id: 'z6-instance',
    name: 'Safe Gate',
    topic: 'instanceof then cast',
    enemyId: 'safe-gate',
    puzzleIds: ['z6-instance'],
    requires: ['z6-downcast'],
    x: 50,
    y: 42,
  },
  {
    id: 'z6-super',
    name: 'Parent Echo',
    topic: 'super.method()',
    enemyId: 'parent-echo',
    puzzleIds: ['z6-super'],
    requires: ['z6-instance'],
    x: 50,
    y: 58,
  },
  {
    id: 'z6-abstract',
    name: 'Obligation',
    topic: 'Abstract methods',
    enemyId: 'obligation',
    puzzleIds: ['z6-abstract'],
    requires: ['z6-super'],
    x: 50,
    y: 74,
  },
  {
    id: 'z6-boss',
    name: 'Forge Heart',
    topic: 'Abstract class vs interface',
    enemyId: 'forge-heart',
    puzzleIds: ['z6-boss'],
    requires: ['z6-abstract'],
    x: 50,
    y: 90,
    isBoss: true,
  },
]

export const ZONE6_EDGES = linearEdges(ZONE6_ROOMS)
