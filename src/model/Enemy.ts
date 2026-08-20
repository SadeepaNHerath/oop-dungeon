import { Character } from './Character'

export class Enemy extends Character {
  id: string
  title: string
  taunt: string

  constructor(id: string, name: string, title: string, taunt: string, hp = 100) {
    super(name, hp, hp)
    this.id = id
    this.title = title
    this.taunt = taunt
  }
}
