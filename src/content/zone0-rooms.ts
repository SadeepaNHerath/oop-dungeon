import type { Room } from './rooms'
import { linearEdges } from './rooms'

export const ZONE0_ROOMS: Room[] = [
  {
    id: 'z0-class',
    name: 'Blueprint Hall',
    topic: 'Class vs object',
    enemyId: 'blueprint',
    puzzleIds: ['z0-class'],
    requires: [],
    x: 50,
    y: 10,
  },
  {
    id: 'z0-fields',
    name: 'State Chamber',
    topic: 'Fields and methods',
    enemyId: 'state-keeper',
    puzzleIds: ['z0-fields'],
    requires: ['z0-class'],
    x: 50,
    y: 26,
  },
  {
    id: 'z0-ctor',
    name: 'First Breath',
    topic: 'Simple constructor',
    enemyId: 'first-breath',
    puzzleIds: ['z0-ctor'],
    requires: ['z0-fields'],
    x: 50,
    y: 42,
  },
  {
    id: 'z0-encap',
    name: 'Private Vault',
    topic: 'Encapsulation',
    enemyId: 'private-vault',
    puzzleIds: ['z0-encap'],
    requires: ['z0-ctor'],
    x: 50,
    y: 58,
  },
  {
    id: 'z0-isa',
    name: 'Is / Has Fork',
    topic: 'IS-A vs HAS-A',
    enemyId: 'isa-fork',
    puzzleIds: ['z0-isa'],
    requires: ['z0-encap'],
    x: 50,
    y: 74,
  },
  {
    id: 'z0-boss',
    name: 'Foundation Seal',
    topic: 'Legal class sketch',
    enemyId: 'foundation-seal',
    puzzleIds: ['z0-boss'],
    requires: ['z0-isa'],
    x: 50,
    y: 90,
    isBoss: true,
  },
]

export const ZONE0_EDGES = linearEdges(ZONE0_ROOMS)
