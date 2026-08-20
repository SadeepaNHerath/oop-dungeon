# Bytecode Arena — Java OOP course

A browser course for undergraduates learning **Java OOP**: short notes, mini quizzes, then code rooms with compiler-checked snippets.

## Study paths

**New to OOP:** Zone 0 → 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8  

**Exam tonight (edge cases):** Zones 1–5 first, then 6–8 as needed  

**Design / casting gaps:** Zones 6–8  

Flow for each zone: **notes → mini quiz (no HP) → map rooms**. Quiz progress is saved; use **Review notes** on the hub anytime.

## Zones

| Zone | Focus |
| --- | --- |
| 0 Foundations Gate | Class/object, fields, constructors, encapsulation, IS-A vs HAS-A |
| 1 Constructor Citadel | `this()` / `super()`, abstract constructors, init order, leaking `this` |
| 2 Visibility Maze | Access modifiers, JLS 6.6.2, private ≠ override |
| 3 Polymorphism Mirage | Override vs hide, overload, overload-then-override |
| 4 Interface Nexus | `default` / `static`, diamond, constants |
| 5 Immutability Crypt | `final`, equals/hashCode, sealed |
| 6 Type Forge | Casting, `instanceof`, `super.method()`, abstract methods |
| 7 Nest & Object Hall | Nested types, enums, records, `Object` |
| 8 Composition Yard | Composition, delegation, intro generics |

## Run

```bash
npm install
npm run dev
```

```bash
npm test              # grading + notes/quiz integrity
npm run verify:java   # javac/java on every snippet (JDK 17+)
npm run build
```

Progress uses `localStorage` key `bytecode-arena-v3`.

## Layout

```
src/content/   zones, rooms, short notes, quizzes, enemies
src/puzzles/   authored Java + evaluate + javac harness
src/core/      GameEngine (hub → notes → quiz → map → battle)
src/ui/        hub, notes, quiz, maps, Spell Tablet
```
