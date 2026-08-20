import type { Room } from './rooms'
import { linearEdges } from './rooms'

export const ZONE2_ROOMS: Room[] = [
  {
    id: 'z2-pkg',
    name: 'Package Wall',
    topic: 'Package-private across packages',
    enemyId: 'pkg-warden',
    puzzleIds: ['z2-pkg'],
    requires: [],
    x: 50,
    y: 10,
  },
  {
    id: 'z2-prot-sub',
    name: 'Heir’s Key',
    topic: 'protected via subclass reference',
    enemyId: 'heir-key',
    puzzleIds: ['z2-prot-sub'],
    requires: ['z2-pkg'],
    x: 50,
    y: 26,
  },
  {
    id: 'z2-prot-super',
    name: 'Stolen Super',
    topic: 'protected via superclass reference',
    enemyId: 'stolen-super',
    puzzleIds: ['z2-prot-super'],
    requires: ['z2-prot-sub'],
    x: 50,
    y: 42,
  },
  {
    id: 'z2-private',
    name: 'Private Echo',
    topic: 'private methods are not overrides',
    enemyId: 'private-echo',
    puzzleIds: ['z2-private'],
    requires: ['z2-prot-super'],
    x: 50,
    y: 58,
  },
  {
    id: 'z2-inner',
    name: 'Inner Vault',
    topic: 'Inner class sees outer private',
    enemyId: 'inner-vault',
    puzzleIds: ['z2-inner'],
    requires: ['z2-private'],
    x: 50,
    y: 74,
  },
  {
    id: 'z2-boss',
    name: 'Visibility Throne',
    topic: 'Which lines compile?',
    enemyId: 'vis-throne',
    puzzleIds: ['z2-boss'],
    requires: ['z2-inner'],
    x: 50,
    y: 90,
    isBoss: true,
  },
]

export const ZONE2_EDGES = linearEdges(ZONE2_ROOMS)
