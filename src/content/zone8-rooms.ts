import type { Room } from './rooms'
import { linearEdges } from './rooms'

export const ZONE8_ROOMS: Room[] = [
  {
    id: 'z8-compose',
    name: 'HAS-A Bay',
    topic: 'Composition',
    enemyId: 'hasa-bay',
    puzzleIds: ['z8-compose'],
    requires: [],
    x: 50,
    y: 10,
  },
  {
    id: 'z8-wrong',
    name: 'False Heir',
    topic: 'Bad extends',
    enemyId: 'false-heir',
    puzzleIds: ['z8-wrong'],
    requires: ['z8-compose'],
    x: 50,
    y: 26,
  },
  {
    id: 'z8-delegate',
    name: 'Forward Desk',
    topic: 'Delegation',
    enemyId: 'forward-desk',
    puzzleIds: ['z8-delegate'],
    requires: ['z8-wrong'],
    x: 50,
    y: 42,
  },
  {
    id: 'z8-raw',
    name: 'Raw List',
    topic: 'Generics vs raw',
    enemyId: 'raw-list',
    puzzleIds: ['z8-raw'],
    requires: ['z8-delegate'],
    x: 50,
    y: 58,
  },
  {
    id: 'z8-diamond',
    name: 'Diamond Tip',
    topic: 'Diamond operator',
    enemyId: 'diamond-tip',
    puzzleIds: ['z8-diamond'],
    requires: ['z8-raw'],
    x: 50,
    y: 74,
  },
  {
    id: 'z8-boss',
    name: 'Yard Seal',
    topic: 'Refactor to composition',
    enemyId: 'yard-seal',
    puzzleIds: ['z8-boss'],
    requires: ['z8-diamond'],
    x: 50,
    y: 90,
    isBoss: true,
  },
]

export const ZONE8_EDGES = linearEdges(ZONE8_ROOMS)
