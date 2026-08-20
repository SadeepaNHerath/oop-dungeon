import type { ZoneQuiz } from './notesTypes'

function q(
  id: string,
  prompt: string,
  choices: [string, string, string, string],
  correctIndex: 0 | 1 | 2 | 3,
  tip: string,
) {
  const ids = ['a', 'b', 'c', 'd'] as const
  return {
    id,
    prompt,
    choices: choices.map((label, i) => ({ id: ids[i], label })),
    correctId: ids[correctIndex],
    tip,
  }
}

export const ZONE_QUIZZES: ZoneQuiz[] = [
  {
    zoneId: 'z0',
    questions: [
      q(
        'z0q1',
        'What does new Dog("Rex") create?',
        [
          'A new class named Dog',
          'A new object (instance) of type Dog',
          'A static method call',
          'A package',
        ],
        1,
        'new allocates an object from the class blueprint.',
      ),
      q(
        'z0q2',
        'Why make a field private and expose a getter?',
        [
          'Java requires every field to be private',
          'To hide representation and control how state is read',
          'So the field becomes static',
          'So subclasses can override the field',
        ],
        1,
        'Encapsulation keeps invariants and hides how data is stored.',
      ),
      q(
        'z0q3',
        'Car has an Engine field. That relationship is:',
        ['IS-A (inheritance)', 'HAS-A (composition)', 'override', 'autoboxing'],
        1,
        'HAS-A means one object contains or uses another.',
      ),
      q(
        'z0q4',
        'When does a constructor run?',
        [
          'Only if you call it like a normal method',
          'When the class is compiled',
          'When you create an object with new',
          'Once per program, at startup',
        ],
        2,
        'Constructors run as part of object creation.',
      ),
    ],
  },
  {
    zoneId: 'z1',
    questions: [
      q(
        'z1q1',
        'If a constructor writes neither this() nor super(), the compiler:',
        [
          'Inserts this()',
          'Inserts super()',
          'Leaves it empty',
          'Makes the class abstract',
        ],
        1,
        'Implicit super() is always inserted when you omit chaining.',
      ),
      q(
        'z1q2',
        'Can one constructor call both this() and super()?',
        ['Yes', 'No', 'Only in abstract classes', 'Only if final'],
        1,
        'Exactly one chaining call, and it must be first (Java 17).',
      ),
      q(
        'z1q3',
        'Can an abstract class have a constructor?',
        ['No', 'Yes — subclasses call it via super()', 'Only if public', 'Only static'],
        1,
        'abstract blocks new Abstract(), not constructors.',
      ),
      q(
        'z1q4',
        'Instance initializers of the parent run:',
        [
          'After the child constructor body',
          'Before the parent constructor body (after super returns into the parent)',
          'Only once per JVM',
          'Never',
        ],
        1,
        'Parent fields/blocks, then parent ctor, then child fields/blocks, then child ctor.',
      ),
    ],
  },
  {
    zoneId: 'z2',
    questions: [
      q(
        'z2q1',
        'No access modifier on a member means:',
        ['public', 'private', 'package-private', 'protected'],
        2,
        'Default access is the package only.',
      ),
      q(
        'z2q2',
        'From another package, Child reads protected Parent.x via a Parent reference. Result?',
        ['OK', 'Compile error (JLS 6.6.2)', 'Runtime error', 'Always 0'],
        1,
        'Use a Child-typed (or further subtype) reference.',
      ),
      q(
        'z2q3',
        'private methods:',
        [
          'Override if the name matches',
          'Do not override; subclass same-name is a new method',
          'Are always public at runtime',
          'Must be final',
        ],
        1,
        'No dynamic dispatch for private methods.',
      ),
      q(
        'z2q4',
        'Can a non-static inner class read Outer’s private field?',
        ['No', 'Yes', 'Only if protected', 'Only via reflection'],
        1,
        'private is nest-scoped; nested types can access.',
      ),
    ],
  },
  {
    zoneId: 'z3',
    questions: [
      q(
        'z3q1',
        'Parent p = new Child(); p.speak(); (instance override) runs:',
        ['Parent.speak', 'Child.speak', 'Neither', 'Compile error'],
        1,
        'Dynamic dispatch uses the runtime class.',
      ),
      q(
        'z3q2',
        'static methods:',
        ['Override', 'Hide (compile-time type)', 'Are abstract', 'Dispatch on runtime type'],
        1,
        'static binds to the declared type.',
      ),
      q(
        'z3q3',
        'm(1) with m(int), m(long), m(Integer) prefers:',
        ['long', 'Integer', 'int', 'ambiguous'],
        2,
        'Exact match beats widening and boxing.',
      ),
      q(
        'z3q4',
        'Overload of cast(Parent)/cast(Child) with Parent p = new Child():',
        [
          'Always cast(Child)',
          'cast(Parent) by declared type, then overrides may run inside',
          'Runtime picks overload',
          'Does not compile',
        ],
        1,
        'Overload is compile-time; override is runtime.',
      ),
    ],
  },
  {
    zoneId: 'z4',
    questions: [
      q(
        'z4q1',
        'A class that implements an interface with only default methods:',
        [
          'Must re-declare every method',
          'Can inherit the defaults',
          'Must be abstract',
          'Cannot be constructed',
        ],
        1,
        'Defaults are inherited unless overridden.',
      ),
      q(
        'z4q2',
        'Interface static method call style:',
        ['obj.m()', 'Impl.m()', 'Interface.m()', 'super.m()'],
        2,
        'Not inherited by the implementing class.',
      ),
      q(
        'z4q3',
        'Two default m() on A and B; class C implements both:',
        [
          'Compiler picks A',
          'C must override m()',
          'C is fine empty',
          'Only B’s default is used',
        ],
        1,
        'Diamond conflict requires an override.',
      ),
      q(
        'z4q4',
        'int X = 1 in an interface means:',
        [
          'instance field',
          'public static final',
          'private',
          'package-private mutable',
        ],
        1,
        'Interface fields are constants.',
      ),
    ],
  },
  {
    zoneId: 'z5',
    questions: [
      q(
        'z5q1',
        'final List<String> xs = new ArrayList<>(); xs.add("a");',
        ['Compile error', 'OK — reference fixed, list mutable', 'Clears the list', 'Makes xs null'],
        1,
        'final locks the variable, not deep immutability.',
      ),
      q(
        'z5q2',
        'equals true but different hashCode:',
        [
          'Fine for HashSet',
          'Breaks the contract; HashSet may miss the object',
          'Compile error',
          'Only matters for TreeSet',
        ],
        1,
        'Equal objects should share a hashCode.',
      ),
      q(
        'z5q3',
        'sealed class Shape permits Circle, Square — Triangle extends Shape:',
        ['OK', 'Compile error', 'Runtime warning', 'OK if final'],
        1,
        'Only permitted direct subtypes may extend.',
      ),
      q(
        'z5q4',
        'Deep immutability requires:',
        [
          'public fields',
          'private final fields, no setters, no leaked mutable aliases',
          'only final on the class',
          'synchronized',
        ],
        1,
        'Copy in / copy out collections; never return the live field.',
      ),
    ],
  },
  {
    zoneId: 'z6',
    questions: [
      q(
        'z6q1',
        'Animal a = new Dog(); a.bark() when bark is only on Dog:',
        ['Runs Dog.bark', 'Compile error — not on Animal', 'ClassCastException', 'null'],
        1,
        'Upcast limits the callable API to the declared type.',
      ),
      q(
        'z6q2',
        'Unsafe (Dog) animal when animal is a Cat:',
        ['OK', 'Compile error always', 'ClassCastException at runtime', 'Returns null'],
        2,
        'Check with instanceof before downcasting.',
      ),
      q(
        'z6q3',
        'super.speak() inside Child.speak():',
        [
          'Calls Child again (infinite)',
          'Calls Parent.speak',
          'Is illegal',
          'Calls Object.speak',
        ],
        1,
        'super.method() bypasses the override for that call.',
      ),
      q(
        'z6q4',
        'A concrete class that extends an abstract class with abstract void f():',
        [
          'May ignore f',
          'Must implement f (or stay abstract)',
          'Gets a default empty f',
          'Must be final',
        ],
        1,
        'Abstract methods are obligations for concrete subclasses.',
      ),
    ],
  },
  {
    zoneId: 'z7',
    questions: [
      q(
        'z7q1',
        'Static nested class vs inner class:',
        [
          'Same thing',
          'Static nested has no Outer.this; inner is tied to an Outer instance',
          'Inner cannot exist',
          'Static nested cannot be public',
        ],
        1,
        'new Outer().new Inner() builds an inner instance.',
      ),
      q(
        'z7q2',
        'Suit.HEARTS.name() for enum Suit { HEARTS, CLUBS } returns:',
        ['0', '"HEARTS"', 'Suit', 'null'],
        1,
        'name() is the constant identifier.',
      ),
      q(
        'z7q3',
        'A Java record is best described as:',
        [
          'A mutable bean',
          'A shallow immutable data carrier with accessors',
          'An interface',
          'A package',
        ],
        1,
        'Records generate ctor, accessors, equals, hashCode, toString.',
      ),
      q(
        'z7q4',
        'getClass() vs instanceof:',
        [
          'Identical',
          'getClass is exact; instanceof allows subtypes',
          'instanceof is exact; getClass allows subtypes',
          'Neither works on interfaces',
        ],
        1,
        'Choose carefully in equals implementations.',
      ),
    ],
  },
  {
    zoneId: 'z8',
    questions: [
      q(
        'z8q1',
        'Car holds private Engine engine and calls engine.ignite(). This is:',
        ['Inheritance', 'Composition / delegation', 'Overload', 'Autoboxing'],
        1,
        'HAS-A plus forwarding methods.',
      ),
      q(
        'z8q2',
        'Prefer composition when:',
        [
          'Always extend everything',
          'There is no true IS-A relationship',
          'You need dynamic dispatch',
          'The class is abstract',
        ],
        1,
        'Inheritance is for specialization, not mere reuse of a part.',
      ),
      q(
        'z8q3',
        'List<String> vs raw List:',
        [
          'Identical at compile time',
          'Parameterized List catches wrong types earlier',
          'Raw List is required in Java 17+',
          'Generics exist only at runtime',
        ],
        1,
        'Prefer parameterized types; avoid raw types.',
      ),
      q(
        'z8q4',
        'new ArrayList<>() (diamond):',
        [
          'Illegal',
          'Infers type args from the left-hand context',
          'Creates List<Object> only',
          'Disables generics',
        ],
        1,
        'The compiler fills <> from the target type.',
      ),
    ],
  },
]

export function getZoneQuiz(zoneId: string): ZoneQuiz | undefined {
  return ZONE_QUIZZES.find((z) => z.zoneId === zoneId)
}
