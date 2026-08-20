import type { ZoneNote } from './notesTypes'

/** Deep lesson notes: theory + real-code bridges + under-taught pitfalls. */
export const ZONE_NOTES: ZoneNote[] = [
  {
    zoneId: 'z0',
    title: 'Foundations',
    why: 'Everything later assumes class, object, encapsulation, and IS-A vs HAS-A.',
    bullets: [
      'Class = blueprint; object = instance from new.',
      'Encapsulation hides representation behind a controlled API.',
      'IS-A is inheritance; HAS-A is composition.',
    ],
    theory: [
      'A class defines type, fields (state), and methods (behavior).',
      'new allocates an object; variables hold references to objects (or null).',
      'Constructors run when you new an object and set up initial state.',
      'Encapsulation: private fields + getters/setters (or better: methods that preserve invariants).',
      'IS-A = inheritance (Dog extends Animal). HAS-A = composition (Car has Engine).',
    ],
    inPractice: [
      'Public fields become your public API forever — callers will depend on them and you cannot change representation safely.',
      'Teams prefer small classes with clear responsibilities over “god objects” that know everything.',
      'Libraries expose interfaces and factories so you depend on contracts, not concrete fields.',
    ],
    untouchables: [
      'Two variables can point at the same object — assignment copies the reference, not a clone.',
      '“extends for reuse” when there is no true IS-A (e.g. Stack extends List) leaks a huge unwanted API.',
      'A class is not an object: counting variables ≠ counting instances.',
    ],
    youCanExplain:
      'Why a public List field on a domain object breaks encapsulation in a real codebase.',
    snippet:
      'class Dog {\n  private String name;\n  Dog(String name) { this.name = name; }\n  String name() { return name; }\n}',
    trap: 'Confusing the class (type) with one object (instance), or using extends when you meant “has a.”',
  },
  {
    zoneId: 'z1',
    title: 'Constructors',
    why: 'Exams love print-order and “does this compile?” constructor questions — production loves half-built bugs.',
    bullets: [
      'Every ctor chains with this(...) or super(...) (else implicit super()).',
      'Init order: parent then child.',
      'Never publish this before construction finishes.',
    ],
    theory: [
      'Every constructor starts with this(...) or super(...); otherwise the compiler inserts super().',
      'You cannot write both this() and super() in one constructor.',
      'Abstract classes can have constructors; subclasses still call them.',
      'Order: parent fields/blocks → parent ctor → child fields/blocks → child ctor.',
      'Do not publish this before construction finishes (leaking this).',
    ],
    inPractice: [
      'UI frameworks and event buses: registering this in a constructor lets listeners see default field values.',
      'Dependency injection containers construct objects carefully so collaborators are ready before use.',
      'Calling overridable methods from a superclass constructor is a classic production footgun.',
    ],
    untouchables: [
      'Fields are 0/false/null before your assignments run — early readers see defaults.',
      'this() does not re-run instance initializers twice; they run with the ctor that calls super().',
      'If the parent has no no-arg ctor, empty subclass ctor still fails (implicit super()).',
    ],
    youCanExplain:
      'What can go wrong if a constructor registers this on a listener list before fields are set.',
    snippet:
      'Child() { /* compiler inserts super(); */ System.out.println("Child"); }',
    trap: 'Thinking the subclass constructor runs before the parent, or that abstract types have no constructors.',
  },
  {
    zoneId: 'z2',
    title: 'Access Rules',
    why: 'Modifier mistakes are free exam points — and real package boundaries.',
    bullets: [
      'public / protected / package / private.',
      'JLS 6.6.2: protected via Super-typed ref across packages fails.',
      'private methods do not override.',
    ],
    theory: [
      'public → everywhere. protected → package + subclasses. (none) → package only. private → this nest only.',
      'From another package, protected via a Super-typed reference is illegal (JLS 6.6.2).',
      'private methods do not override; same name in a subclass is a different method.',
      'Inner classes can read the outer class’s private fields.',
    ],
    inPractice: [
      'Library authors use package-private for “friends in this package only,” not for all subclasses worldwide.',
      'Crossing module/package boundaries is how teams enforce architecture (API vs internal).',
      'Overexposing protected invites fragile subclass coupling across products.',
    ],
    untouchables: [
      'protected is not “any subclass, any reference” — the receiver’s compile-time type matters across packages.',
      'Package-private is invisible to subclasses in another package.',
      'A public method calling a private helper always hits the declaring class’s private method (no polymorphic private).',
    ],
    youCanExplain:
      'Why child.x can compile while parentRef.x fails for a protected field from another package.',
    snippet:
      'void steal(Parent p, Child c) {\n  System.out.println(c.x); // ok\n  System.out.println(p.x); // error (other package)\n}',
    trap: 'Thinking protected means “any subclass, any reference.”',
  },
  {
    zoneId: 'z3',
    title: 'Polymorphism',
    why: 'Override vs hide and overload vs override are classic traps — and framework callback traps.',
    bullets: [
      'Instance methods: runtime type (override).',
      'static/fields: compile-time type (hide).',
      'Overload first (compile-time), then override (runtime).',
    ],
    theory: [
      'Instance methods: runtime type chooses the body (override).',
      'static methods and fields: compile-time type chooses (hide).',
      'Overload resolution: exact → widening → boxing → varargs.',
      'First pick the overload (compile-time), then dispatch overrides (runtime).',
    ],
    inPractice: [
      'GUI/listeners and Spring beans: you hold a base type and expect the subclass override to run — that only works for instance methods.',
      'Logging/helpers overloaded on Object vs String often pick the “wrong” overload because of declared types.',
      'Plugins register as Interface; the runtime implementation’s override is what executes.',
    ],
    untouchables: [
      'Overloads never dispatch on the argument’s runtime type.',
      'Fields do not override — p.x is Parent.x even if Child has another x.',
      'Calling a static via an instance variable still uses the variable’s declared type.',
    ],
    youCanExplain:
      'Why mage.cast(p) with Parent p = new Child() prints cast-parent then Child.act().',
    snippet:
      'Parent p = new Child();\np.speak();        // Child if instance override\np.staticSpeak();  // Parent if static',
    trap: 'Letting the argument’s runtime type pick an overload.',
  },
  {
    zoneId: 'z4',
    title: 'Interfaces',
    why: 'default / static / diamond show up on modern papers — and in Collections/plugins.',
    bullets: [
      'default methods are inherited unless overridden.',
      'Interface static: Interface.m() only.',
      'Defaults do not fill superclass abstract methods.',
    ],
    theory: [
      'default methods are inherited unless the class overrides them.',
      'Interface static methods: call Interface.m() only — not inherited.',
      'Two default methods with the same signature → class must override (A.super.m()).',
      'Interface fields are public static final constants.',
      'A class abstract method is not filled by an interface default.',
    ],
    inPractice: [
      'JDK evolved List with default methods so old implementors kept compiling.',
      'Plugin systems: implement an interface, override what you need, inherit defaults.',
      'Test doubles / mocks are often interface-based so production code depends on contracts.',
    ],
    untouchables: [
      'Interface.default does not satisfy an abstract method from a superclass.',
      'wizard.sage() fails for interface static sage — must be Spell.sage().',
      'Interface fields look like instance fields in syntax but are public static final.',
    ],
    youCanExplain:
      'Why Lion extends Beast implements Cat still fails if Beast.roar is abstract and Cat has default roar.',
    snippet: 'class C implements A, B {\n  public void m() { A.super.m(); }\n}',
    trap: 'Calling Wizard.sage() for an interface static method.',
  },
  {
    zoneId: 'z5',
    title: 'Object Integrity',
    why: 'final, equals/hashCode, and sealed close “object correctness” — HashSet will punish you.',
    bullets: [
      'final blocks reassignment, not deep immutability.',
      'equals and hashCode must agree.',
      'Never leak mutable internals.',
    ],
    theory: [
      'final on a reference blocks reassignment, not mutation of the object.',
      'final methods cannot be overridden; final classes cannot be subclassed.',
      'If a.equals(b), then a.hashCode() should equal b.hashCode().',
      'Broken equals/hashCode makes HashSet.contains fail mysteriously.',
      'sealed + permits lists every allowed direct subtype (Java 17+).',
    ],
    inPractice: [
      'Entities in caches, maps, and sets: wrong hashCode = silent “duplicate” bugs in production.',
      'Money/value objects should be immutable so concurrent code does not race on shared state.',
      'APIs that return live ArrayList fields let callers corrupt your object.',
    ],
    untouchables: [
      'final List still allows list.add — final ≠ immutable.',
      'Overriding only equals without hashCode breaks the contract HashMap relies on.',
      'instanceof-based equals in a subclass often breaks symmetry with the parent type.',
    ],
    youCanExplain:
      'Why set.contains(new Coin(1)) can be false after set.add(new Coin(1)) if hashCode was not overridden.',
    snippet:
      'final List<String> xs = new ArrayList<>();\nxs.add("a"); // ok\n// xs = List.of(); // compile error',
    trap: 'Believing equals alone makes HashSet.contains work, or that final freezes the collection.',
  },
  {
    zoneId: 'z6',
    title: 'Types & Casting',
    why: 'Casting and abstract methods are everyday exam material — and UI handler crashes.',
    bullets: [
      'Upcast is safe/implicit; downcast needs care.',
      'instanceof before downcast.',
      'Abstract methods force concrete subclasses.',
    ],
    theory: [
      'Upcast (Child → Parent) is implicit; you may only call Parent’s API.',
      'Downcast can throw ClassCastException; guard with instanceof.',
      'super.method() calls the parent version from inside the subclass.',
      'abstract methods have no body; concrete subclasses must implement them.',
      'Abstract class = shared state/code + IS-A. Interface = capability (many).',
    ],
    inPractice: [
      'Event handlers often cast Object payloads — missing instanceof → production ClassCastException.',
      'APIs prefer polymorphism (call abstract/interface methods) over casting to concrete types.',
      'Template Method: abstract class defines the skeleton; subclasses fill abstract steps.',
    ],
    untouchables: [
      'Compiling a cast does not mean it is safe at runtime.',
      'Interface default still does not implement a superclass abstract method.',
      'After upcast you cannot call Child-only methods without a checked downcast.',
    ],
    youCanExplain:
      'Why (Dog) animal can crash at runtime even though the cast compiled.',
    snippet:
      'Animal a = new Dog();\nif (a instanceof Dog d) {\n  d.bark();\n}',
    trap: 'Downcasting without a check, or thinking an interface default implements a superclass abstract method.',
  },
  {
    zoneId: 'z7',
    title: 'Nested Types & Object',
    why: 'Enums, records, nested types, and Object methods show up on papers — and in APIs.',
    bullets: [
      'Inner vs static nested.',
      'Enums are typesafe constants with name().',
      'Records are shallow immutable carriers.',
    ],
    theory: [
      'Static nested: no Outer.this. Inner: tied to an Outer instance.',
      'Enums are typesafe constants with name() and values().',
      'Records are shallow immutable data carriers with accessors.',
      'Default Object.toString is Class@hash; override for readable logs.',
      'getClass() is exact class; instanceof allows subtypes.',
    ],
    inPractice: [
      'Prefer enum for closed sets of modes/status over magic strings in APIs.',
      'Records excel as DTOs — but a record of List is still a shallow shell around a mutable list.',
      'Logging with default toString is useless in production incident debugging.',
    ],
    untouchables: [
      'Suit.HEARTS.name() requires an enum — a String constant has no name().',
      'Inner class instances keep a hidden Outer.this (memory / serialization implications).',
      'instanceof accepts subtypes; getClass() equality does not.',
    ],
    youCanExplain:
      'Why an API should expose an enum Status instead of String status codes.',
    snippet:
      'enum Suit { HEARTS, CLUBS }\nrecord Point(int x, int y) {}',
    trap: 'Treating enum as a String, or using instanceof when you needed the exact class.',
  },
  {
    zoneId: 'z8',
    title: 'Composition & Generics',
    why: 'Prefer HAS-A when inheritance is a stretch; generics catch type errors early.',
    bullets: [
      'Composition + delegation over fake IS-A.',
      'List<String> beats raw List.',
      'Generics are compile-time (erasure).',
    ],
    theory: [
      'Composition: one object holds another and may delegate.',
      'Prefer composition when there is no true IS-A relationship.',
      'List<String> is type-safe; raw List loses checks.',
      'Diamond new ArrayList<>() infers the type argument from context.',
      'Generics are compile-time; erasure removes type args at runtime.',
    ],
    inPractice: [
      'Stack extends Vector historically exposed every List method — clients depend on accidents.',
      'Wrap ArrayDeque and expose only push/pop for a clean stack API.',
      'Legacy raw types compile with warnings and hide ClassCastException until runtime.',
    ],
    untouchables: [
      'Inheritance for reuse of fields is usually the wrong tool — prefer a private field.',
      'You cannot new T() for a type parameter (erasure).',
      'Casting through raw types can defeat generic safety silently.',
    ],
    youCanExplain:
      'Why Stack should hold a Deque instead of extending ArrayList, even if extending “works.”',
    snippet:
      'class Car {\n  private final Engine engine = new Engine();\n  void start() { engine.ignite(); }\n}',
    trap: 'Extending a class just to reuse a field, or using raw List because “it still compiles.”',
  },
]

export function getZoneNote(zoneId: string): ZoneNote | undefined {
  return ZONE_NOTES.find((n) => n.zoneId === zoneId)
}
