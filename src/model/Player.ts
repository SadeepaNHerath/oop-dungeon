import { Character } from './Character'

export const PLAYER_MAX_HP = 100

export class Player extends Character {
  constructor(name: string) {
    super(name, PLAYER_MAX_HP, PLAYER_MAX_HP)
  }
}
