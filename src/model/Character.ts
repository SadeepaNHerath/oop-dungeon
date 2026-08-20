/** Abstract-style base for every combatant. HP is the only shared resource in Zone 1. */
export abstract class Character {
  name: string
  hp: number
  maxHp: number

  constructor(name: string, hp: number, maxHp: number) {
    this.name = name
    this.hp = hp
    this.maxHp = maxHp
  }

  takeDamage(amount: number): void {
    this.hp = Math.max(0, this.hp - amount)
  }

  restore(): void {
    this.hp = this.maxHp
  }

  get isDefeated(): boolean {
    return this.hp <= 0
  }
}
