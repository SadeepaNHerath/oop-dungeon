import type { ZoneNote } from './notesTypes'

/** Short per-zone notes — scannable, exam-oriented. */
export const ZONE_NOTES: ZoneNote[] = [
  {
    zoneId: 'z0',
    title: 'Foundations',
    why: 'Everything later assumes class, object, encapsulation, and IS-A vs HAS-A.',
    bullets: [
      'A class is a blueprint; an object is an instance created with new.',
      'Fields hold state; methods define behavior.',
      'Constructors run when you new an object; they set up initial state.',
      'Encapsulation: hide fields (private) and expose controlled access (getters).',
      'IS-A = inheritance (Dog extends Animal). HAS-A = composition (Car has Engine).',
    ],
    snippet:
      'class Dog {\n  private String name;\n  Dog(String name) { this.name = name; }\n  String name() { return name; }\n}',
    trap: 'Confusing the class (type) with one object (instance), or using extends when you meant “has a.”',
  },
  {
    zoneId: 'z1',
    title: 'Constructors',
    why: 'Exams love print-order and “does this compile?” constructor questions.',
    bullets: [
      'Every constructor starts with this(...) or super(...); else the compiler inserts super().',
      'You cannot write both this() and super() in one constructor.',
      'Abstract classes can have constructors; subclasses still call them.',
      'Order: parent fields/blocks → parent ctor → child fields/blocks → child ctor.',
      'Do not publish this before construction finishes (leaking this).',
    ],
    snippet:
      'Child() { /* compiler inserts super(); */ System.out.println("Child"); }',
    trap: 'Thinking the subclass constructor runs before the parent, or that abstract types have no constructors.',
  },
  {
    zoneId: 'z2',
    title: 'Access',
    why: 'Modifier mistakes are free exam points if you know the four levels.',
    bullets: [
      'public → everywhere. protected → package + subclasses. (none) → package only. private → this nest only.',
      'From another package, protected via a Super-typed reference is illegal (JLS 6.6.2).',
      'private methods do not override; same name in a subclass is a different method.',
      'Inner classes can read the outer class’s private fields.',
    ],
    snippet:
      'void steal(Parent p, Child c) {\n  System.out.println(c.x); // ok\n  System.out.println(p.x); // error (other package)\n}',
    trap: 'Thinking protected means “any subclass, any reference.”',
  },
  {
    zoneId: 'z3',
    title: 'Polymorphism',
    why: 'Override vs hide and overload vs override are the classic traps.',
    bullets: [
      'Instance methods: runtime type chooses the body (override).',
      'static methods and fields: compile-time type chooses (hide).',
      'Overload resolution: exact → widening → boxing → varargs (most-specific in each phase).',
      'First pick the overload (compile-time), then dispatch overrides (runtime).',
    ],
    snippet:
      'Parent p = new Child();\np.speak();        // Child if instance override\np.staticSpeak();  // Parent if static',
    trap: 'Letting the argument’s runtime type pick an overload.',
  },
  {
    zoneId: 'z4',
    title: 'Interfaces',
    why: 'default / static / diamond show up on every modern Java paper.',
    bullets: [
      'default methods are inherited unless the class overrides them.',
      'Interface static methods: call Interface.m() only — not inherited.',
      'Two default methods with the same signature → class must override (A.super.m()).',
      'Interface fields are public static final constants.',
      'A class abstract method is not filled by an interface default.',
    ],
    snippet: 'class C implements A, B {\n  public void m() { A.super.m(); }\n}',
    trap: 'Calling Wizard.sage() for an interface static method.',
  },
  {
    zoneId: 'z5',
    title: 'Integrity',
    why: 'final, equals/hashCode, and sealed close the “object correctness” chapter.',
    bullets: [
      'final on a reference blocks reassignment, not mutation of the object.',
      'final methods cannot be overridden; final classes cannot be subclassed.',
      'If a.equals(b), then a.hashCode() should equal b.hashCode() — HashSet relies on this.',
      'Broken equals often makes contains return false (typical when hashCode is wrong).',
      'sealed + permits lists every allowed direct subtype (Java 17+).',
    ],
    snippet:
      'final List<String> xs = new ArrayList<>();\nxs.add("a"); // ok\n// xs = List.of(); // compile error',
    trap: 'Believing equals alone makes HashSet.contains work, or that final freezes the collection.',
  },
  {
    zoneId: 'z6',
    title: 'Types & abstracts',
    why: 'Casting and abstract methods are everyday OOP exam material.',
    bullets: [
      'Upcast (Child → Parent) is implicit; you may only call Parent’s API.',
      'Downcast can throw ClassCastException; guard with instanceof.',
      'super.method() calls the parent version from inside the subclass.',
      'abstract methods have no body; concrete subclasses must implement them.',
      'Abstract class = shared state/code + IS-A. Interface = capability contract (can implement many).',
    ],
    snippet:
      'Animal a = new Dog();\nif (a instanceof Dog d) {\n  d.bark();\n}',
    trap: 'Downcasting without a check, or thinking an interface default implements a superclass abstract method.',
  },
  {
    zoneId: 'z7',
    title: 'Nesting & Object',
    why: 'Nested types, enums, records, and Object methods appear on undergrad papers.',
    bullets: [
      'Static nested: no Outer.this. Inner: tied to an Outer instance.',
      'Enums are typesafe constants with name() and values().',
      'Records are shallow immutable data carriers with accessors (Java 16+).',
      'Default Object.toString is Class@hash; override for readable output.',
      'getClass() is exact class; instanceof allows subtypes.',
    ],
    snippet:
      'enum Suit { HEARTS, CLUBS }\nrecord Point(int x, int y) {}',
    trap: 'Treating enum as a String, or using instanceof when you needed the exact class.',
  },
  {
    zoneId: 'z8',
    title: 'Composition & generics',
    why: 'Prefer HAS-A when inheritance is a stretch; generics catch type errors early.',
    bullets: [
      'Composition: one object holds another (Car has Engine) and may delegate.',
      'Prefer composition when there is no true IS-A relationship.',
      'List<String> is type-safe; raw List loses checks and causes warnings.',
      'Diamond new ArrayList<>() infers the type argument from context.',
      'Generics are compile-time; erasure removes type args at runtime.',
    ],
    snippet:
      'class Car {\n  private final Engine engine = new Engine();\n  void start() { engine.ignite(); }\n}',
    trap: 'Extending a class just to reuse a field, or using raw List because “it still compiles.”',
  },
]

export function getZoneNote(zoneId: string): ZoneNote | undefined {
  return ZONE_NOTES.find((n) => n.zoneId === zoneId)
}
