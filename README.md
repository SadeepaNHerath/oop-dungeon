# Overnight Java OOP

A one-night exam roadmap for undergraduates: **9 levels** with deep theory, **theory ↔ real-code** bridges, under-taught pitfalls, quick checks, then practice with compiler-checked Java snippets.

## Path

**Levels 1→9** unlock in order (Foundations → … → Composition & Generics).

Each level: **theory + in-real-code + untouching points → quick check → challenges** (including a concept bridge). Wrong answers teach what you believed wrongly; after two misses you can show the full lesson. Clear all nine to unlock the **Secrets vault** (full exam pack).

## Levels

| Level | Focus |
| --- | --- |
| 1 Foundations | Class/object, fields, constructors, encapsulation, IS-A vs HAS-A |
| 2 Constructors | `this()` / `super()`, abstract constructors, init order, leaking `this` |
| 3 Access Rules | Access modifiers, JLS 6.6.2, private ≠ override |
| 4 Polymorphism | Override vs hide, overload, overload-then-override |
| 5 Interfaces | `default` / `static`, diamond, constants |
| 6 Object Integrity | `final`, equals/hashCode, sealed |
| 7 Types & Casting | Casting, `instanceof`, `super.method()`, abstract methods |
| 8 Nested Types & Object | Nested types, enums, records, `Object` |
| 9 Composition & Generics | Composition, delegation, intro generics |

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

Progress uses `localStorage` key `bytecode-arena-v4` (older saves migrate).

## Layout

```
src/content/   levels (zones), rooms, deep notes, quizzes, study cards
src/puzzles/   authored Java + evaluate + bridges + javac harness
src/core/      GameEngine (roadmap → notes → quiz → map → battle)
src/ui/        Roadmap, notes, quiz, maps, Spell Tablet, Secrets vault
```
