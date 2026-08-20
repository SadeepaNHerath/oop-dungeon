export interface Room {
  id: string
  name: string
  topic: string
  enemyId: string
  puzzleIds: string[]
  requires: string[]
  x: number
  y: number
  isBoss?: boolean
}

export function unlockedRoomIdsFor(
  rooms: Room[],
  cleared: string[],
): string[] {
  return rooms
    .filter((room) => room.requires.every((id) => cleared.includes(id)))
    .map((room) => room.id)
}

export function linearEdges(rooms: Room[]): Array<[string, string]> {
  const edges: Array<[string, string]> = []
  for (let i = 0; i < rooms.length - 1; i += 1) {
    edges.push([rooms[i].id, rooms[i + 1].id])
  }
  return edges
}
