export interface StudyCard {
  id: string
  zoneId: string
  title: string
  summary: string
  theory: string[]
  snippet: string
  trap: string
}

export const STUDY_CARDS: StudyCard[] = [
  {
    id: 'class-vs-object',
    zoneId: 'z0',
    title: 'Class vs object',
    summary:
      'A class is a type blueprint. An object is one instance created with new. Variables hold references.',
    theory: [
      'Dog a = new Dog("Rex"); Dog b = a; means two variables, one object.',
      'Methods run on an object’s state; static members belong to the class.',
      'Exams ask “how many objects?”. You should count new, not variable names.',
    ],
    snippet:
      'Dog a = new Dog("Rex");\nDog b = a;\n// one object, two references',
    trap: 'Counting three objects because there are three variables.',
  },
  {
    id: 'encapsulation-api',
    zoneId: 'z0',
    title: 'Encapsulation as API design',
    summary:
      'private fields + controlled methods protect invariants. It is not just “Java style.”',
    theory: [
      'Callers should not depend on how you store data.',
      'Getters can return copies; setters can validate.',
      'Public fields freeze your representation forever.',
    ],
    snippet:
      'private int hp;\nvoid damage(int n) { if (n > 0) hp = Math.max(0, hp - n); }',
    trap: 'Thinking encapsulation is only “add getters,” with a public mutable collection still exposed.',
  },
  {
    id: 'isa-hasa',
    zoneId: 'z0',
    title: 'IS-A vs HAS-A',
    summary:
      'extends means true subtype. A field means “has / uses.” Mixing them is a design smell.',
    theory: [
      'Dog extends Animal is IS-A.',
      'Car has Engine is HAS-A (composition).',
      'Prefer composition when you only wanted to reuse a field or a few methods.',
    ],
    snippet:
      'class Car {\n  private final Engine engine = new Engine();\n}',
    trap: 'Extending a class just to get its fields for free.',
  },
  {
    id: 'chaining',
    zoneId: 'z1',
    title: 'Constructor chaining',
    summary:
      'Every constructor starts with this(...) or super(...). If you write neither, the compiler inserts super().',
    theory: [
      'this(args) jumps to another constructor in the same class. That other constructor must eventually call super.',
      'You cannot write both this() and super() in one constructor. The chaining call must be the first statement.',
      'If the superclass has no no-arg constructor, implicit super() does not compile. Write super(args) yourself.',
    ],
    snippet:
      'class Child extends Parent {\n    Child(int n) {\n        this();\n        // super() already ran inside Child()\n    }\n}',
    trap: 'Thinking Child() runs before Parent(), or that you can call this() and super() together.',
  },
  {
    id: 'abstract-ctors',
    zoneId: 'z1',
    title: 'Abstract class constructors',
    summary:
      'abstract means “do not write new AbstractType()”, not “this type has no constructor.”',
    theory: [
      'Abstract classes can have constructors. Subclasses still call them via super().',
      'You may declare a variable of an abstract type. That is a reference, not an allocation.',
      'Use the abstract constructor to initialize shared fields for every subclass.',
    ],
    snippet:
      'abstract class Specter {\n    Specter() { System.out.println("specter"); }\n}\nclass Wraith extends Specter {}\nSpecter s = new Wraith(); // prints specter',
    trap: 'Believing an abstract class cannot have a constructor, or that new Wraith() skips it.',
  },
  {
    id: 'init-order',
    zoneId: 'z1',
    title: 'Initialization order',
    summary:
      'Static work runs once at class load (superclass first). Each object then finishes parent instance state before child instance state.',
    theory: [
      'On first use: superclass static fields/blocks, then subclass static fields/blocks.',
      'On new: parent instance fields and instance blocks (source order), parent constructor body, then the same for the child.',
      'this() does not run instance initializers twice. They run with the constructor that actually calls super().',
    ],
    snippet:
      '// parent field, parent block, parent ctor,\n// child field, child block, child ctor',
    trap: 'Printing child state before the parent constructor finishes, or repeating static blocks for every new.',
  },
  {
    id: 'leaking-this',
    zoneId: 'z1',
    title: 'Leaking this',
    summary:
      'During construction the object exists but may not be finished. Sharing this too early exposes default field values.',
    theory: [
      'Fields are defaulted (0, false, null) before the constructor body assigns real values.',
      'Storing this in a static list or listener lets other code read a half-built object.',
      'A superclass constructor calling an overridable method is the same bug: the override runs before subclass fields initialize.',
    ],
    snippet:
      'Rune() {\n    Archive.leaked = this;\n    System.out.println(leaked.charge); // 0\n    charge = 7;\n}',
    trap: 'Expecting the later assignment (7) to already be visible, or expecting a NullPointerException.',
  },
  {
    id: 'access-modifiers',
    zoneId: 'z2',
    title: 'Access modifiers',
    summary:
      'public: everywhere. protected: package + subclasses. (no modifier): package only. private: this class only (including nested classes).',
    theory: [
      'Package-private (default) members are invisible from any other package, even to subclasses.',
      'private members are not inherited. A subclass method with the same signature is a new method, not an override.',
      'Nested classes may access the enclosing instance’s private members.',
    ],
    snippet:
      'package a;\npublic class Relic { int charge; } // package-private\n// package b cannot read relic.charge',
    trap: 'Treating “no modifier” as public, or assuming a subclass in another package can see package-private fields.',
  },
  {
    id: 'protected-jls',
    zoneId: 'z2',
    title: 'protected across packages (JLS 6.6.2)',
    summary:
      'From another package, a subclass may use protected members through a reference of its own type (or a further subtype), not through a superclass-typed reference.',
    theory: [
      'this.x and subclassRef.x are legal in the subclass, even if the field was declared in the parent in another package.',
      'superRef.x is illegal when superRef’s compile-time type is the parent and the access is from another package.',
      'This is the most-missed access question on undergrad papers. Memorize the Super vs Sub reference rule.',
    ],
    snippet:
      'void steal(Parent p, Child c) {\n    System.out.println(this.x); // ok\n    System.out.println(c.x);    // ok\n    System.out.println(p.x);    // compile error\n}',
    trap: 'Thinking protected means “any subclass can use it through any reference.”',
  },
  {
    id: 'private-not-override',
    zoneId: 'z2',
    title: 'private is not polymorphic',
    summary:
      'private methods do not override. A call that resolves to Parent.secret() inside Parent always runs Parent’s body.',
    theory: [
      '@Override on a private method is a compile error because there is nothing to override.',
      'From outside the class you cannot write p.secret() if secret is private.',
      'A public method in Parent that calls secret() will still call Parent.secret(), even on a Child instance.',
    ],
    snippet:
      'class Parent {\n    private void secret() { System.out.println("parent"); }\n    void go() { secret(); }\n}',
    trap: 'Expecting Child’s private secret() to run because the object is a Child.',
  },
  {
    id: 'override-dispatch',
    zoneId: 'z3',
    title: 'Dynamic dispatch',
    summary:
      'For instance methods, the JVM uses the runtime class of the object, not the compile-time type of the variable.',
    theory: [
      'Parent p = new Child(); p.speak(); runs Child.speak() if speak is an instance method overridden in Child.',
      'The compiler still checks that speak exists on Parent. You can only call methods the declared type knows.',
      'This is overriding. It applies to instance methods only.',
    ],
    snippet: 'Parent p = new Child();\np.speak(); // Child.speak()',
    trap: 'Using the variable type (Parent) to predict the instance-method body.',
  },
  {
    id: 'static-hiding',
    zoneId: 'z3',
    title: 'Hiding static methods and fields',
    summary:
      'static methods and all fields are chosen by the compile-time type. They hide; they do not override.',
    theory: [
      'Parent p = new Child(); p.staticSpeak(); calls Parent.staticSpeak() (and also warns: call it on the class).',
      'p.x reads Parent.x even if Child declares another x.',
      'Instance methods dispatch; fields and static methods do not.',
    ],
    snippet:
      'Parent p = new Child();\nSystem.out.println(p.x); // Parent.x\np.staticSpeak();         // Parent.staticSpeak()',
    trap: 'Treating static methods or fields as if they were overridden like instance methods.',
  },
  {
    id: 'overload-resolution',
    zoneId: 'z3',
    title: 'Overload resolution',
    summary:
      'The compiler picks an overload in this order: exact match, then widening, then boxing/unboxing, then varargs. Never the reverse.',
    theory: [
      'm(1) prefers m(int) over m(long) over m(Integer) over m(int...).',
      'Widening beats boxing: m(long) beats m(Integer) for a primitive int argument if m(int) is absent.',
      'Boxing beats varargs: m(Integer) beats m(int...) for m(1).',
    ],
    snippet:
      'void m(int n) {}\nvoid m(long n) {}\nvoid m(Integer n) {}\nm(1); // int',
    trap: 'Picking Integer or varargs because “1 can be boxed,” ignoring that an exact primitive match exists.',
  },
  {
    id: 'overload-then-override',
    zoneId: 'z3',
    title: 'Overload, then override',
    summary:
      'Overload resolution is compile-time (argument declared types). Then, if that method is instance and overridden, dispatch is runtime.',
    theory: [
      'Parent p = new Child(); mage.cast(p); picks cast(Parent) because p’s declared type is Parent.',
      'If Quiet overrides cast(Parent), the body that runs is Quiet.cast(Parent).',
      'cast(new Child()) can pick cast(Child) because that argument’s declared type is Child.',
    ],
    snippet:
      'void cast(Parent p) { p.act(); }\nvoid cast(Child c) { c.act(); }\nParent p = new Child();\ncast(p); // overload: Parent; then p.act() dispatches',
    trap: 'Letting the runtime class of the argument choose the overload. Overloads do not dispatch on the argument’s runtime type.',
  },
  {
    id: 'default-methods',
    zoneId: 'z4',
    title: 'default methods',
    summary:
      'Interfaces may provide instance method bodies with default. Implementing classes inherit them unless they override.',
    theory: [
      'A class that implements the interface can call the default method with no extra code.',
      'If the class already has a concrete method of the same signature (from a superclass), the class method wins. Interface defaults do not override class methods.',
      'An abstract method in another interface with the same signature is satisfied by a default method. The class does not have to re-implement it.',
    ],
    snippet:
      'interface Spell {\n    default void cast() { System.out.println("spark"); }\n}\nclass Wizard implements Spell {}\nnew Wizard().cast();',
    trap: 'Thinking implementing an interface with a default still requires an empty method body in the class.',
  },
  {
    id: 'interface-static',
    zoneId: 'z4',
    title: 'Interface static methods',
    summary:
      'static methods in an interface belong to the interface. They are not inherited by implementing classes.',
    theory: [
      'Call them as InterfaceName.method().',
      'wizard.sage() and Wizard.sage() do not compile merely because Wizard implements the interface.',
      'This is different from class static methods, which subclasses can mention by subclass name (hiding).',
    ],
    snippet: 'Spell.sage(); // ok\nnew Wizard().sage(); // compile error',
    trap: 'Calling the interface static method on the implementing class or on an instance.',
  },
  {
    id: 'diamond',
    zoneId: 'z4',
    title: 'Diamond defaults',
    summary:
      'Two superinterfaces that both declare a default method with the same signature force the class to override. Pick one with Interface.super.m().',
    theory: [
      'class C implements A, B {} does not compile if A and B both have default m().',
      'Inside C.m() you may write A.super.m() or B.super.m().',
      'If one side is abstract and the other is default with the same signature, the default is inherited (no conflict).',
    ],
    snippet:
      'class C implements A, B {\n    public void m() { A.super.m(); }\n}',
    trap: 'Assuming the compiler picks one default, or using super.m() without naming the interface.',
  },
  {
    id: 'interface-fields',
    zoneId: 'z4',
    title: 'Interface fields',
    summary:
      'Every field in an interface is implicitly public static final. It is a constant, not an instance variable.',
    theory: [
      'int X = 1; in an interface means public static final int X = 1;',
      'I.X++ and I.X = 2 do not compile.',
      'Implementing classes do not get a per-object copy of X.',
    ],
    snippet: 'interface I { int X = 1; }\n// I.X++  // compile error',
    trap: 'Treating interface fields as mutable instance state.',
  },
  {
    id: 'class-vs-default',
    zoneId: 'z4',
    title: 'Class methods beat interface defaults',
    summary:
      'A default method does not satisfy or override an abstract method declared in a superclass. The class must still implement that abstract method.',
    theory: [
      'Interface defaults are not injected into the superclass method table.',
      'abstract class Beast { abstract void roar(); } plus interface Cat { default void roar() {...} } still leaves Lion abstract unless Lion implements roar().',
      'This is the opposite of “two interfaces, one abstract + one default,” where the default does satisfy the other interface.',
    ],
    snippet:
      'abstract class Beast { abstract void roar(); }\ninterface Cat { default void roar() { System.out.println("meow"); } }\nclass Lion extends Beast implements Cat {} // does not compile',
    trap: 'Believing an interface default can stand in for a superclass abstract method.',
  },
  {
    id: 'final-ref',
    zoneId: 'z5',
    title: 'final references',
    summary:
      'final on a reference forbids reassignment of the variable. It does not make the object deeply immutable.',
    theory: [
      'final List<String> items = new ArrayList<>(); then items.add("x") is legal.',
      'items = new ArrayList<>() is a compile error.',
      'For real immutability: private final fields, no setters, and never return a live mutable collection.',
    ],
    snippet:
      'final List<String> items = new ArrayList<>();\nitems.add("rune"); // ok\n// items = new ArrayList<>(); // compile error',
    trap: 'Thinking items.add is illegal because the variable is final.',
  },
  {
    id: 'final-method',
    zoneId: 'z5',
    title: 'final methods and classes',
    summary:
      'A final method cannot be overridden. A final class cannot be subclassed.',
    theory: [
      'The subclass may overload a final method (different parameters) but may not override it.',
      'private methods are already not overridable; final is for public/protected/package methods you want frozen.',
      'sealed (Java 17+) is a different tool: named subclasses only, via permits.',
    ],
    snippet:
      'class Keep {\n    final void seal() {}\n}\nclass Ruin extends Keep {\n    void seal() {} // compile error\n}',
    trap: 'Trying to “override” a final method, or confusing final with sealed.',
  },
  {
    id: 'equals-hashcode',
    zoneId: 'z5',
    title: 'equals and hashCode',
    summary:
      'If a.equals(b) then a.hashCode() == b.hashCode(). HashSet and HashMap rely on this.',
    theory: [
      'Override both together. Use the same fields in both.',
      'Object’s default equals is identity (==). Default hashCode is identity-based.',
      'If you override equals but not hashCode, HashSet/HashMap typically fail to find equal objects (contains returns false). That is a contract breach and should be treated as broken design, not a language guarantee about every hash.',
    ],
    snippet:
      'set.add(new Coin(1));\nset.contains(new Coin(1)); // false if hashCode was not overridden',
    trap: 'Overriding only equals and expecting HashSet to find the logical duplicate.',
  },
  {
    id: 'equals-symmetric',
    zoneId: 'z5',
    title: 'equals symmetry',
    summary:
      'a.equals(b) must equal b.equals(a). instanceof-based equals in a subclass often breaks this with the parent type.',
    theory: [
      'Point.equals(NamedPoint) may be true while NamedPoint.equals(Point) is false.',
      'A robust pattern for value types is getClass() == o.getClass() instead of instanceof, or avoid subclassing value types.',
      'hashCode must stay consistent with whatever equals you choose.',
    ],
    snippet:
      'p.equals(n)  // true via instanceof Point\nn.equals(p)  // false: p is not a NamedPoint',
    trap: 'Using instanceof in both parent and child equals without checking symmetry.',
  },
  {
    id: 'sealed',
    zoneId: 'z5',
    title: 'sealed classes (Java 17+)',
    summary:
      'A sealed class lists every allowed direct subtype in permits. Any other subclass is a compile error.',
    theory: [
      'Each permitted subtype must be final, sealed, or non-sealed.',
      'The permitted types are usually in the same module/package as the sealed type.',
      'This is how Java models a closed type hierarchy without using enum for data.',
    ],
    snippet:
      'sealed class Shape permits Circle, Square {}\nfinal class Circle extends Shape {}\nfinal class Triangle extends Shape {} // compile error',
    trap: 'Adding a subclass that is not named in permits, or forgetting final/sealed/non-sealed on a permitted type.',
  },
  {
    id: 'immutability',
    zoneId: 'z5',
    title: 'Deep immutability',
    summary:
      'An immutable object never changes after construction and never hands out a mutable alias to its internals.',
    theory: [
      'Fields are private and final. No setters.',
      'If you accept a List in the constructor, copy it (new ArrayList<>(in) or List.copyOf(in)).',
      'Getters for collections must return a copy or an unmodifiable view, not the field itself.',
    ],
    snippet:
      'this.runes = new ArrayList<>(runes);\nList<String> runes() { return new ArrayList<>(this.runes); }',
    trap: 'Returning the internal list from a getter, or storing the constructor argument list without copying.',
  },
  {
    id: 'casting-safety',
    zoneId: 'z6',
    title: 'Casting safety',
    summary:
      'Upcasts are free. Downcasts are promises to the compiler, but the JVM can still throw ClassCastException.',
    theory: [
      'Animal a = new Dog(); is an upcast; you only see Animal’s API.',
      '((Dog) a).bark() is safe only if a really is a Dog (or subtype).',
      'Prefer instanceof (pattern matching) before downcasting.',
    ],
    snippet:
      'if (a instanceof Dog d) {\n  d.bark();\n}',
    trap: 'Assuming a cast that compiles cannot crash at runtime.',
  },
  {
    id: 'abstract-vs-interface',
    zoneId: 'z6',
    title: 'Abstract class vs interface',
    summary:
      'Abstract class shares code and state under one IS-A. Interface is a capability you can mix in.',
    theory: [
      'A class can extend one class and implement many interfaces.',
      'Abstract methods force subclasses to fill in behavior.',
      'Interface defaults do not replace superclass abstract methods.',
    ],
    snippet:
      'abstract class Shape { abstract double area(); }\ninterface Drawable { void draw(); }',
    trap: 'Treating abstract class and interface as interchangeable on exams.',
  },
  {
    id: 'super-method',
    zoneId: 'z6',
    title: 'super.method()',
    summary:
      'From inside a subclass, super.m() calls the parent implementation. This is useful when you extend behavior.',
    theory: [
      'Override replaces the method for polymorphic callers.',
      'Inside the override you may still call super.m() for shared work.',
      'There is no “super field access” special case for instance methods beyond the parent body.',
    ],
    snippet:
      '@Override\nvoid speak() {\n  super.speak();\n  System.out.println("child");\n}',
    trap: 'Thinking super.speak() uses the variable’s declared type from outside the class.',
  },
  {
    id: 'enums-api',
    zoneId: 'z7',
    title: 'Enums as API',
    summary:
      'Enums are typesafe constant sets with name(), ordinal(), and values(). They are better than magic strings.',
    theory: [
      'enum Suit { HEARTS, CLUBS } defines a closed set of instances.',
      'Suit.HEARTS.name() returns "HEARTS".',
      'A String constant is not an enum and has no name().',
    ],
    snippet: 'enum Status { OPEN, CLOSED }\nStatus s = Status.OPEN;',
    trap: 'Using String status everywhere and calling .name() on it.',
  },
  {
    id: 'records-shallow',
    zoneId: 'z7',
    title: 'Records are shallow',
    summary:
      'Records give immutable carriers for components, but mutable component objects can still change.',
    theory: [
      'record Point(int x, int y) {} generates accessors, equals, hashCode, toString.',
      'record Box(List<String> items) {} does not deep-freeze the list.',
      'Copy mutable inputs if you need true immutability.',
    ],
    snippet: 'record Point(int x, int y) {}',
    trap: 'Assuming a record of List is deeply immutable.',
  },
  {
    id: 'object-methods',
    zoneId: 'z7',
    title: 'Object methods you actually use',
    summary:
      'toString for logs, equals/hashCode for collections, getClass for exact type.',
    theory: [
      'Default toString is Class@identityHash. You should override it for humans.',
      'getClass() is the exact runtime class; instanceof allows subtypes.',
      'Override equals and hashCode together for value types.',
    ],
    snippet: '@Override public String toString() { return "Point(" + x + "," + y + ")"; }',
    trap: 'Using instanceof when the exam asked for exact-class equality.',
  },
  {
    id: 'composition-over-inheritance',
    zoneId: 'z8',
    title: 'Composition over inheritance',
    summary:
      'Hold a collaborator and delegate. Do not extend just to reuse storage.',
    theory: [
      'Inheritance couples you to the parent’s full API and evolution.',
      'A private final Deque field keeps your Stack API tiny.',
      'HAS-A is the usual real-world default when IS-A is shaky.',
    ],
    snippet:
      'class Stack {\n  private final Deque<String> q = new ArrayDeque<>();\n  void push(String x) { q.push(x); }\n}',
    trap: 'extends ArrayList so you “get add for free,” then clients call removeRange.',
  },
  {
    id: 'intro-generics',
    zoneId: 'z8',
    title: 'Intro generics',
    summary:
      'List<String> catches wrong types at compile time. Raw List postpones pain to runtime.',
    theory: [
      'Type arguments are checked by the compiler.',
      'Erasure removes them at runtime, so you cannot new T().',
      'Diamond <> infers the argument from context.',
    ],
    snippet: 'List<String> names = new ArrayList<>();\nnames.add("Ada");',
    trap: 'Using raw List because “it still compiles.”',
  },
]

export function getStudyCard(id: string): StudyCard | undefined {
  return STUDY_CARDS.find((card) => card.id === id)
}

export function studyCardsForZone(zoneId: string): StudyCard[] {
  return STUDY_CARDS.filter((card) => card.zoneId === zoneId)
}

/** @deprecated use getStudyCard */
export const getCodexCard = getStudyCard
export const CODEX_CARDS = STUDY_CARDS
