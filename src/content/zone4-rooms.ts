import type { Room } from './rooms'
import { linearEdges } from './rooms'

export const ZONE4_ROOMS: Room[] = [
  {
    id: 'z4-default',
    name: 'Default Spark',
    topic: 'Inherited default methods',
    enemyId: 'default-spark',
    puzzleIds: ['z4-default', 'z4-bridge'],
    requires: [],
    x: 50,
    y: 10,
  },
  {
    id: 'z4-static',
    name: 'Static Altar',
    topic: 'Interface static methods are not inherited',
    enemyId: 'static-altar',
    puzzleIds: ['z4-static'],
    requires: ['z4-default'],
    x: 50,
    y: 26,
  },
  {
    id: 'z4-diamond',
    name: 'Diamond Split',
    topic: 'Two default methods with the same signature',
    enemyId: 'diamond-split',
    puzzleIds: ['z4-diamond'],
    requires: ['z4-static'],
    x: 50,
    y: 42,
  },
  {
    id: 'z4-super',
    name: 'Named Super',
    topic: 'InterfaceName.super.method()',
    enemyId: 'named-super',
    puzzleIds: ['z4-super'],
    requires: ['z4-diamond'],
    x: 50,
    y: 58,
  },
  {
    id: 'z4-field',
    name: 'Constant Well',
    topic: 'Interface fields are public static final',
    enemyId: 'constant-well',
    puzzleIds: ['z4-field'],
    requires: ['z4-super'],
    x: 50,
    y: 74,
  },
  {
    id: 'z4-boss',
    name: 'Nexus Core',
    topic: 'Class vs interface default methods',
    enemyId: 'nexus-core',
    puzzleIds: ['z4-boss'],
    requires: ['z4-field'],
    x: 50,
    y: 90,
    isBoss: true,
  },
]

export const ZONE4_EDGES = linearEdges(ZONE4_ROOMS)
