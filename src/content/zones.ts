import type { Room } from './rooms'
import { unlockedRoomIdsFor } from './rooms'
import { ZONE0_EDGES, ZONE0_ROOMS } from './zone0-rooms'
import { ZONE1_EDGES, ZONE1_ROOMS } from './zone1-rooms'
import { ZONE2_EDGES, ZONE2_ROOMS } from './zone2-rooms'
import { ZONE3_EDGES, ZONE3_ROOMS } from './zone3-rooms'
import { ZONE4_EDGES, ZONE4_ROOMS } from './zone4-rooms'
import { ZONE5_EDGES, ZONE5_ROOMS } from './zone5-rooms'
import { ZONE6_EDGES, ZONE6_ROOMS } from './zone6-rooms'
import { ZONE7_EDGES, ZONE7_ROOMS } from './zone7-rooms'
import { ZONE8_EDGES, ZONE8_ROOMS } from './zone8-rooms'

export interface Zone {
  id: string
  /** Player-facing level number 1–9 */
  displayNumber: number
  /** Short hub title without fantasy dungeon branding */
  friendlyName: string
  name: string
  short: string
  topic: string
  group: 'foundations' | 'edge' | 'types'
  rooms: Room[]
  edges: Array<[string, string]>
}

export const ZONES: Zone[] = [
  {
    id: 'z0',
    displayNumber: 1,
    friendlyName: 'Foundations',
    name: 'Foundations',
    short: 'Level 1',
    topic: 'Class, object, encapsulation, IS-A vs HAS-A',
    group: 'foundations',
    rooms: ZONE0_ROOMS,
    edges: ZONE0_EDGES,
  },
  {
    id: 'z1',
    displayNumber: 2,
    friendlyName: 'Constructors',
    name: 'Constructors',
    short: 'Level 2',
    topic: 'this(), super(), init order, leaking this',
    group: 'edge',
    rooms: ZONE1_ROOMS,
    edges: ZONE1_EDGES,
  },
  {
    id: 'z2',
    displayNumber: 3,
    friendlyName: 'Access Rules',
    name: 'Access Rules',
    short: 'Level 3',
    topic: 'public, package-private, protected, private (JLS 6.6.2)',
    group: 'edge',
    rooms: ZONE2_ROOMS,
    edges: ZONE2_EDGES,
  },
  {
    id: 'z3',
    displayNumber: 4,
    friendlyName: 'Polymorphism',
    name: 'Polymorphism',
    short: 'Level 4',
    topic: 'Override vs hide, overload, then dispatch',
    group: 'edge',
    rooms: ZONE3_ROOMS,
    edges: ZONE3_EDGES,
  },
  {
    id: 'z4',
    displayNumber: 5,
    friendlyName: 'Interfaces',
    name: 'Interfaces',
    short: 'Level 5',
    topic: 'default / static methods, diamond, constants',
    group: 'edge',
    rooms: ZONE4_ROOMS,
    edges: ZONE4_EDGES,
  },
  {
    id: 'z5',
    displayNumber: 6,
    friendlyName: 'Object Integrity',
    name: 'Object Integrity',
    short: 'Level 6',
    topic: 'final, equals/hashCode, sealed classes',
    group: 'edge',
    rooms: ZONE5_ROOMS,
    edges: ZONE5_EDGES,
  },
  {
    id: 'z6',
    displayNumber: 7,
    friendlyName: 'Types & Casting',
    name: 'Types & Casting',
    short: 'Level 7',
    topic: 'Casting, instanceof, super.method(), abstract methods',
    group: 'types',
    rooms: ZONE6_ROOMS,
    edges: ZONE6_EDGES,
  },
  {
    id: 'z7',
    displayNumber: 8,
    friendlyName: 'Nested Types & Object',
    name: 'Nested Types & Object',
    short: 'Level 8',
    topic: 'Nested types, enums, records, Object methods',
    group: 'types',
    rooms: ZONE7_ROOMS,
    edges: ZONE7_EDGES,
  },
  {
    id: 'z8',
    displayNumber: 9,
    friendlyName: 'Composition & Generics',
    name: 'Composition & Generics',
    short: 'Level 9',
    topic: 'Composition, delegation, intro generics',
    group: 'types',
    rooms: ZONE8_ROOMS,
    edges: ZONE8_EDGES,
  },
]

export function getZone(id: string): Zone {
  const zone = ZONES.find((item) => item.id === id)
  if (!zone) {
    throw new Error(`Unknown zone: ${id}`)
  }
  return zone
}

export function getRoom(id: string): Room {
  for (const zone of ZONES) {
    const room = zone.rooms.find((item) => item.id === id)
    if (room) return room
  }
  throw new Error(`Unknown room: ${id}`)
}

export function zoneForRoom(roomId: string): Zone {
  for (const zone of ZONES) {
    if (zone.rooms.some((room) => room.id === roomId)) return zone
  }
  throw new Error(`No zone owns room: ${roomId}`)
}

export function unlockedInZone(zoneId: string, cleared: string[]): string[] {
  return unlockedRoomIdsFor(getZone(zoneId).rooms, cleared)
}

export function zoneCleared(zoneId: string, cleared: string[]): boolean {
  return getZone(zoneId).rooms.every((room) => cleared.includes(room.id))
}

export function zoneProgress(zoneId: string, cleared: string[]): {
  done: number
  total: number
} {
  const rooms = getZone(zoneId).rooms
  const done = rooms.filter((room) => cleared.includes(room.id)).length
  return { done, total: rooms.length }
}

export function levelIndex(zoneId: string): number {
  return ZONES.findIndex((z) => z.id === zoneId)
}

/** Sequential overnight path: Level N unlocks after Level N−1 challenges are done. */
export function isLevelUnlocked(zoneId: string, cleared: string[]): boolean {
  const idx = levelIndex(zoneId)
  if (idx <= 0) return true
  if (idx < 0) return false
  return zoneCleared(ZONES[idx - 1].id, cleared)
}

export function nextLevel(zoneId: string): Zone | null {
  const idx = levelIndex(zoneId)
  if (idx < 0 || idx >= ZONES.length - 1) return null
  return ZONES[idx + 1]
}

export function courseCleared(cleared: string[]): boolean {
  return ZONES.every((z) => zoneCleared(z.id, cleared))
}

export function currentRoadmapLevel(cleared: string[]): Zone {
  for (const zone of ZONES) {
    if (!zoneCleared(zone.id, cleared)) return zone
  }
  return ZONES[ZONES.length - 1]
}

export function levelLabel(zone: Zone): string {
  return `Level ${zone.displayNumber}`
}
