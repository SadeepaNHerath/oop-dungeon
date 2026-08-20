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
    name: 'Foundations Gate',
    short: 'Zone 0',
    topic: 'Class, object, encapsulation, IS-A vs HAS-A',
    group: 'foundations',
    rooms: ZONE0_ROOMS,
    edges: ZONE0_EDGES,
  },
  {
    id: 'z1',
    name: 'Constructor Citadel',
    short: 'Zone 1',
    topic: 'Object lifecycle: this(), super(), init order, leaking this',
    group: 'edge',
    rooms: ZONE1_ROOMS,
    edges: ZONE1_EDGES,
  },
  {
    id: 'z2',
    name: 'Visibility Maze',
    short: 'Zone 2',
    topic: 'public, package-private, protected, private — including JLS 6.6.2',
    group: 'edge',
    rooms: ZONE2_ROOMS,
    edges: ZONE2_EDGES,
  },
  {
    id: 'z3',
    name: 'Polymorphism Mirage',
    short: 'Zone 3',
    topic: 'Override vs hide, overload resolution, compile-time then runtime',
    group: 'edge',
    rooms: ZONE3_ROOMS,
    edges: ZONE3_EDGES,
  },
  {
    id: 'z4',
    name: 'Interface Nexus',
    short: 'Zone 4',
    topic: 'default / static methods, diamond, interface constants',
    group: 'edge',
    rooms: ZONE4_ROOMS,
    edges: ZONE4_EDGES,
  },
  {
    id: 'z5',
    name: 'Immutability Crypt',
    short: 'Zone 5',
    topic: 'final, equals/hashCode, sealed classes (Java 17+)',
    group: 'edge',
    rooms: ZONE5_ROOMS,
    edges: ZONE5_EDGES,
  },
  {
    id: 'z6',
    name: 'Type Forge',
    short: 'Zone 6',
    topic: 'Casting, instanceof, super.method(), abstract methods',
    group: 'types',
    rooms: ZONE6_ROOMS,
    edges: ZONE6_EDGES,
  },
  {
    id: 'z7',
    name: 'Nest & Object Hall',
    short: 'Zone 7',
    topic: 'Nested types, enums, records, Object methods',
    group: 'types',
    rooms: ZONE7_ROOMS,
    edges: ZONE7_EDGES,
  },
  {
    id: 'z8',
    name: 'Composition Yard',
    short: 'Zone 8',
    topic: 'Composition, delegation, intro generics',
    group: 'types',
    rooms: ZONE8_ROOMS,
    edges: ZONE8_EDGES,
  },
]

export const ZONE_GROUPS: Array<{
  id: Zone['group']
  title: string
  blurb: string
}> = [
  {
    id: 'foundations',
    title: 'Foundations',
    blurb: 'Start here if OOP is new.',
  },
  {
    id: 'edge',
    title: 'Edge cases',
    blurb: 'Exam traps: constructors, access, polymorphism, interfaces, integrity.',
  },
  {
    id: 'types',
    title: 'Types & design',
    blurb: 'Casting, nesting, composition, generics.',
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
