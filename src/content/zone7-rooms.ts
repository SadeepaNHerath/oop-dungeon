import type { Room } from './rooms'
import { linearEdges } from './rooms'

export const ZONE7_ROOMS: Room[] = [
  {
    id: 'z7-nested',
    name: 'Inner / Nested',
    topic: 'Static nested vs inner',
    enemyId: 'nested-ward',
    puzzleIds: ['z7-nested'],
    requires: [],
    x: 50,
    y: 10,
  },
  {
    id: 'z7-enum',
    name: 'Enum Court',
    topic: 'Enum name and values',
    enemyId: 'enum-court',
    puzzleIds: ['z7-enum'],
    requires: ['z7-nested'],
    x: 50,
    y: 26,
  },
  {
    id: 'z7-record',
    name: 'Record Shelf',
    topic: 'Records',
    enemyId: 'record-shelf',
    puzzleIds: ['z7-record'],
    requires: ['z7-enum'],
    x: 50,
    y: 42,
  },
  {
    id: 'z7-tostring',
    name: 'Name Plate',
    topic: 'toString',
    enemyId: 'name-plate',
    puzzleIds: ['z7-tostring'],
    requires: ['z7-record'],
    x: 50,
    y: 58,
  },
  {
    id: 'z7-getclass',
    name: 'Exact Mirror',
    topic: 'getClass vs instanceof',
    enemyId: 'exact-mirror',
    puzzleIds: ['z7-getclass'],
    requires: ['z7-tostring'],
    x: 50,
    y: 74,
  },
  {
    id: 'z7-boss',
    name: 'Object Hall',
    topic: 'Nest + enum',
    enemyId: 'object-hall',
    puzzleIds: ['z7-boss'],
    requires: ['z7-getclass'],
    x: 50,
    y: 90,
    isBoss: true,
  },
]

export const ZONE7_EDGES = linearEdges(ZONE7_ROOMS)
