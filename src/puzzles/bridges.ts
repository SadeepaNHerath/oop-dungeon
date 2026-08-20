import type { Puzzle } from './types'
import { joinLines as j } from './types'

function conceptStub(className: string, comment: string): string {
  return j([
    `public class ${className} {`,
    '    public static void main(String[] args) {',
    `        System.out.println("${comment}");`,
    '    }',
    '}',
  ])
}

/** Theory ↔ real-code concept bridges (second seal on an existing room). */
export const BRIDGE_PUZZLES: Puzzle[] = [
  {
    id: 'z0-bridge',
    kind: 'concept',
    title: 'API Fence',
    prompt:
      'A banking app ships Account with public BigDecimal balance. Why is that a production problem, not just “bad style”?',
    code: conceptStub('ApiFence', 'encap'),
    choices: [
      {
        id: 'a',
        label:
          'Callers can mutate balance freely — the field becomes a permanent API and invariants cannot be enforced.',
      },
      { id: 'b', label: 'public fields are illegal in Java.' },
      { id: 'c', label: 'BigDecimal cannot be public.' },
      { id: 'd', label: 'Only Spring apps care about encapsulation.' },
    ],
    correctId: 'a',
    hint: 'Encapsulation protects invariants and lets you change representation later.',
    explanation:
      'Once balance is public, every caller depends on it. You cannot add validation, switch storage, or audit writes without breaking clients. Real systems hide state behind methods.',
    explanationSteps: [
      'Public fields are part of the published API.',
      'Callers mutate state without going through rules.',
      'You lose the freedom to change representation.',
      'Prefer private fields + controlled operations.',
    ],
    codexId: 'encapsulation-api',
    expectCompile: 'ok',
    wrongReasons: {
      b: 'Java allows public fields — the problem is design, not syntax.',
      c: 'BigDecimal can be public; it still should not be for balance.',
      d: 'Encapsulation matters in every maintainable codebase.',
    },
    commonTrap: 'Treating encapsulation as optional “style” instead of API design.',
  },
  {
    id: 'z1-bridge',
    kind: 'concept',
    title: 'Listener Leak',
    prompt:
      'A Widget constructor does EventBus.register(this) before assigning title. A listener immediately reads widget.title. What can go wrong?',
    code: conceptStub('ListenerLeak', 'leak'),
    choices: [
      {
        id: 'a',
        label:
          'Listeners may observe a half-built object (title still null) — classic leaking-this.',
      },
      { id: 'b', label: 'Constructors cannot call methods.' },
      { id: 'c', label: 'EventBus makes title final automatically.' },
      { id: 'd', label: 'Nothing — construction is always invisible to other code.' },
    ],
    correctId: 'a',
    hint: 'Publishing this before fields are set lets outsiders see defaults.',
    explanation:
      'During construction, fields hold defaults until assigned. Registering this early lets other threads or re-entrant listeners read unfinished state. Finish construction, then publish.',
    explanationSteps: [
      'this exists before the constructor finishes.',
      'title is still null when EventBus may notify.',
      'Listeners assume a ready object.',
      'Register after fields are set (or use factories).',
    ],
    codexId: 'leaking-this',
    expectCompile: 'ok',
    wrongReasons: {
      b: 'Constructors call methods all the time — timing is the issue.',
      c: 'EventBus does not change field initialization rules.',
      d: 'Other code can see this as soon as you publish it.',
    },
    commonTrap: 'Assuming “still in the constructor” means no other code can touch the object.',
  },
  {
    id: 'z2-bridge',
    kind: 'concept',
    title: 'Library Border',
    prompt:
      'Your library package util has package-private Helper. App code in another package subclasses and tries to use Helper. Why does the design block that?',
    code: conceptStub('LibraryBorder', 'pkg'),
    choices: [
      {
        id: 'a',
        label:
          'Package-private means “internal to this package” — library borders, not worldwide subclass access.',
      },
      { id: 'b', label: 'Subclasses always see package-private members.' },
      { id: 'c', label: 'Helper must be private to the JVM.' },
      { id: 'd', label: 'Only modules use packages.' },
    ],
    correctId: 'a',
    hint: 'Default access is a team/architecture boundary.',
    explanation:
      'Library authors hide helpers with package-private so app code cannot couple to internals. Subclasses in other packages do not get a free pass.',
    explanationSteps: [
      'No modifier ⇒ package-private.',
      'Other packages cannot see Helper.',
      'That protects the library’s internal API.',
      'Use public/protected only for intentional extension points.',
    ],
    codexId: 'access-modifiers',
    expectCompile: 'ok',
    wrongReasons: {
      b: 'Package-private is invisible across packages — even to subclasses.',
      c: 'Visibility is a language access rule, not a JVM secret.',
      d: 'Packages matter with or without the module system.',
    },
    commonTrap: 'Confusing package-private with protected.',
  },
  {
    id: 'z3-bridge',
    kind: 'concept',
    title: 'Logger Overload',
    prompt:
      'API has log(Object) and log(String). You write Object msg = "hi"; log(msg). Which overload runs, and why does this bite in real apps?',
    code: conceptStub('LoggerOverload', 'overload'),
    choices: [
      {
        id: 'a',
        label:
          'log(Object) — overloads use declared types; a String held as Object does not pick log(String).',
      },
      { id: 'b', label: 'log(String) because the runtime value is a String.' },
      { id: 'c', label: 'Both overloads run.' },
      { id: 'd', label: 'Compile error — ambiguous.' },
    ],
    correctId: 'a',
    hint: 'Overload resolution is compile-time on declared types.',
    explanation:
      'msg’s declared type is Object, so log(Object) wins even though the value is a String. Frameworks with many overloads surprise people who expect runtime picking.',
    explanationSteps: [
      'Declared type of msg is Object.',
      'Compiler binds log(Object).',
      'Runtime type does not redo overload selection.',
      'Cast or type the variable as String to hit log(String).',
    ],
    codexId: 'overload-then-override',
    expectCompile: 'ok',
    wrongReasons: {
      b: 'That would be true for overrides, not for choosing an overload.',
      c: 'Only one overload is selected.',
      d: 'Object is a clear, applicable match.',
    },
    commonTrap: 'Expecting overloads to dispatch like overrides.',
  },
  {
    id: 'z4-bridge',
    kind: 'concept',
    title: 'Plugin Default',
    prompt:
      'interface Plugin { default void start() {} } and abstract class Service { abstract void start(); }. class App extends Service implements Plugin — why is this a common plugin footgun?',
    code: conceptStub('PluginDefault', 'default'),
    choices: [
      {
        id: 'a',
        label:
          'App still must implement Service.start — interface defaults do not fill superclass abstract methods.',
      },
      { id: 'b', label: 'Defaults always win over abstract classes.' },
      { id: 'c', label: 'App cannot implement interfaces.' },
      { id: 'd', label: 'abstract classes cannot be extended.' },
    ],
    correctId: 'a',
    hint: 'Class method obligations beat interface defaults.',
    explanation:
      'Plugin systems mix abstract bases and interfaces. A default on the interface does not satisfy the abstract method from Service. App must write start() or stay abstract.',
    explanationSteps: [
      'Service requires a real start().',
      'Plugin.default start is an interface method.',
      'It is not injected into Service’s abstract slot.',
      'Implement start() in App (perhaps calling Plugin.super.start()).',
    ],
    codexId: 'class-vs-default',
    expectCompile: 'ok',
    wrongReasons: {
      b: 'Defaults do not override or satisfy superclass abstracts.',
      c: 'Classes implement interfaces routinely.',
      d: 'Extending abstract classes is normal.',
    },
    commonTrap: 'Assuming “default means the class is done.”',
  },
  {
    id: 'z5-bridge',
    kind: 'concept',
    title: 'Cache Miss',
    prompt:
      'A shop caches Product in a HashSet. Product overrides equals by id but not hashCode. Orders “lose” products. Why?',
    code: conceptStub('CacheMiss', 'hash'),
    choices: [
      {
        id: 'a',
        label:
          'Equal products can land in different hash buckets — HashSet.contains misses them (contract breach).',
      },
      { id: 'b', label: 'HashSet ignores equals entirely.' },
      { id: 'c', label: 'id fields are illegal in equals.' },
      { id: 'd', label: 'Only TreeSet needs hashCode.' },
    ],
    correctId: 'a',
    hint: 'If equals is true, hashCodes must match.',
    explanation:
      'HashSet uses hashCode to find a bucket, then equals. Default identity hashCode with value equals makes logical duplicates invisible. Override both together.',
    explanationSteps: [
      'HashSet probes by hashCode first.',
      'Unequal hashes ⇒ equals never consulted.',
      'Value equals + identity hashCode ⇒ misses.',
      'Override hashCode with the same fields as equals.',
    ],
    codexId: 'equals-hashcode',
    expectCompile: 'ok',
    wrongReasons: {
      b: 'HashSet uses equals after hash buckets.',
      c: 'Using id in equals is common for entities — pair it with hashCode.',
      d: 'HashSet/HashMap need the contract; TreeSet uses compareTo.',
    },
    commonTrap: 'Overriding only equals and shipping to production caches.',
  },
  {
    id: 'z6-bridge',
    kind: 'concept',
    title: 'Event Cast',
    prompt:
      'A message bus delivers Object payload. Handler does ((PaymentEvent) payload).process() with no check. What is the real failure mode?',
    code: conceptStub('EventCast', 'cast'),
    choices: [
      {
        id: 'a',
        label:
          'ClassCastException when a different event type arrives — prefer instanceof or typed APIs.',
      },
      { id: 'b', label: 'The cast is always safe if it compiles.' },
      { id: 'c', label: 'Object cannot be cast in Java.' },
      { id: 'd', label: 'process() becomes static automatically.' },
    ],
    correctId: 'a',
    hint: 'A compile-time cast is a promise, not a proof.',
    explanation:
      'Buses and UI toolkits pass Object or base types. Blind downcasts crash when new message types appear. Check with instanceof or use generics/visitor patterns.',
    explanationSteps: [
      'Cast compiles based on hierarchy possibility.',
      'Runtime type may differ.',
      'Wrong type ⇒ ClassCastException.',
      'Guard or redesign the API to be typed.',
    ],
    codexId: 'casting-safety',
    expectCompile: 'ok',
    wrongReasons: {
      b: 'Compiling a cast does not make it safe.',
      c: 'Downcasting from Object is common — carefully.',
      d: 'Casting does not change instance vs static.',
    },
    commonTrap: 'Trusting casts because “the compiler allowed it.”',
  },
  {
    id: 'z7-bridge',
    kind: 'concept',
    title: 'Status Codes',
    prompt:
      'An HTTP client API uses String status with values "OPEN"/"CLOSED". Why is enum Status better for a public library?',
    code: conceptStub('StatusCodes', 'enum'),
    choices: [
      {
        id: 'a',
        label:
          'Enums are a typesafe closed set — illegal values and typos fail at compile time.',
      },
      { id: 'b', label: 'Strings cannot be compared.' },
      { id: 'c', label: 'Enums cannot be serialized.' },
      { id: 'd', label: 'Libraries must avoid enums.' },
    ],
    correctId: 'a',
    hint: 'APIs should make illegal states hard to represent.',
    explanation:
      'Magic strings invite typos and undocumented values. An enum documents the contract and lets the compiler reject nonsense. Prefer enums for closed modes/status.',
    explanationSteps: [
      'String accepts any text.',
      'enum limits instances to the declared constants.',
      'Call sites become switch-friendly and typed.',
      'Public APIs benefit most.',
    ],
    codexId: 'enums-api',
    expectCompile: 'ok',
    wrongReasons: {
      b: 'Strings compare fine — they just are not closed sets.',
      c: 'Enums serialize routinely.',
      d: 'Enums are common in public APIs.',
    },
    commonTrap: 'Shipping Stringly-typed status forever “because JSON is text.”',
  },
  {
    id: 'z8-bridge',
    kind: 'concept',
    title: 'Raw Legacy',
    prompt:
      'Legacy module returns raw List. Callers cast (String) list.get(0). What did List<String> buy modern code?',
    code: conceptStub('RawLegacy', 'generics'),
    choices: [
      {
        id: 'a',
        label:
          'Compile-time type checks — wrong element types fail earlier instead of as ClassCastException in production.',
      },
      { id: 'b', label: 'Generics make lists immutable.' },
      { id: 'c', label: 'Raw lists are required after Java 17.' },
      { id: 'd', label: 'Erasure adds String checks at runtime for every get.' },
    ],
    correctId: 'a',
    hint: 'Generics move errors left to compile time.',
    explanation:
      'Parameterized List<String> rejects add(42) at compile time. Raw lists postpone failure to a cast at runtime — often in production. Prefer generics; avoid raw types.',
    explanationSteps: [
      'Raw List accepts any Object.',
      'Casts fail only when executed.',
      'List<String> rejects bad adds when compiling.',
      'Erasure still drops args at runtime — safety is mostly compile-time.',
    ],
    codexId: 'intro-generics',
    expectCompile: 'ok',
    wrongReasons: {
      b: 'Generics do not imply immutability.',
      c: 'Raw types are legacy; avoid them.',
      d: 'Erasure removes type args — checks are not reified on every get.',
    },
    commonTrap: 'Keeping raw types because “they still compile.”',
  },
]
