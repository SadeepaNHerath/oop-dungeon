export interface EnemyBlueprint {
  id: string
  name: string
  title: string
  taunt: string
}

export const ENEMIES: EnemyBlueprint[] = [
  {
    id: 'gate-warden',
    name: 'Gate Warden',
    title: 'Keeper of first statements',
    taunt: 'Every child pays the parent first. Predict the tribute.',
  },
  {
    id: 'twin-scribe',
    name: 'Twin Scribe',
    title: 'Weaver of this()',
    taunt: 'One constructor calling another — which ink dries first?',
  },
  {
    id: 'dual-hexer',
    name: 'Dual-Tongue Hexer',
    title: 'Illegal chaining',
    taunt: 'I spoke two constructor calls. The compiler heard a curse.',
  },
  {
    id: 'specter',
    name: 'Abstract Specter',
    title: 'Unnewable, still constructed',
    taunt: 'You cannot summon me directly. My constructor still walks.',
  },
  {
    id: 'ritualist',
    name: 'Init Ritualist',
    title: 'Fields before flesh',
    taunt: 'Fields, blocks, constructors — the rite has an order.',
  },
  {
    id: 'sentinel',
    name: 'Static Sentinel',
    title: 'Wakes once',
    taunt: 'I wake once. The instance wakes every time you knock.',
  },
  {
    id: 'leaker',
    name: 'This-Leaker',
    title: 'Half-built messenger',
    taunt: 'I published myself too early. What did the watcher see?',
  },
  {
    id: 'heart',
    name: 'Citadel Heart',
    title: 'Boss of construction',
    taunt: 'Chain, initialize, survive. Then repair the vault door.',
  },
  {
    id: 'pkg-warden',
    name: 'Package Warden',
    title: 'Default is not public',
    taunt: 'No modifier means this package only. Not the whole dungeon.',
  },
  {
    id: 'heir-key',
    name: 'Heir of Relics',
    title: 'protected through this',
    taunt: 'A subclass key opens the field — if the reference is the subclass.',
  },
  {
    id: 'stolen-super',
    name: 'Reference Thief',
    title: 'JLS 6.6.2',
    taunt: 'You inherited me, but you pointed at me as my parent. Denied.',
  },
  {
    id: 'private-echo',
    name: 'Private Echo',
    title: 'Same name, not an override',
    taunt: 'I kept my method private. Yours is a different method.',
  },
  {
    id: 'inner-vault',
    name: 'Inner Vault',
    title: 'Nested access',
    taunt: 'The inner class lives in my enclosure. It may read my secrets.',
  },
  {
    id: 'vis-throne',
    name: 'Visibility Throne',
    title: 'Boss of access',
    taunt: 'Four lines. Not all are legal. Choose with the language spec, not hope.',
  },
  {
    id: 'true-voice',
    name: 'True Voice',
    title: 'Dynamic dispatch',
    taunt: 'The variable type is a mask. The object type speaks.',
  },
  {
    id: 'static-mask',
    name: 'Static Mask',
    title: 'Hiding, not overriding',
    taunt: 'static binds to the declared type. Do not call it polymorphism.',
  },
  {
    id: 'field-mirage',
    name: 'Field Mirage',
    title: 'Fields do not override',
    taunt: 'p.x is chosen at compile time. Methods are the ones that dispatch.',
  },
  {
    id: 'exact-match',
    name: 'Exact Match',
    title: 'Overload resolution',
    taunt: 'int beats long. long beats Integer. Exact, then widen, then box.',
  },
  {
    id: 'varargs-last',
    name: 'Last Resort',
    title: 'Varargs are weakest',
    taunt: 'Boxing is still a better fit than int...',
  },
  {
    id: 'two-clocks',
    name: 'Two Clocks',
    title: 'Boss of dispatch',
    taunt: 'Overload picks the method family. Override picks the body.',
  },
  {
    id: 'default-spark',
    name: 'Default Spark',
    title: 'Interface bodies',
    taunt: 'I shipped an implementation. Classes inherit it unless they replace it.',
  },
  {
    id: 'static-altar',
    name: 'Static Altar',
    title: 'Call it on the interface',
    taunt: 'Interface static methods are not members of the class. Spell.sage(), never wizard.sage().',
  },
  {
    id: 'diamond-split',
    name: 'Diamond Split',
    title: 'Two defaults collide',
    taunt: 'I will not guess which default you wanted. Override, or do not compile.',
  },
  {
    id: 'named-super',
    name: 'Named Super',
    title: 'A.super.m()',
    taunt: 'Name the interface, then super. That is how you pick a diamond facet.',
  },
  {
    id: 'constant-well',
    name: 'Constant Well',
    title: 'public static final',
    taunt: 'Interface fields are constants. You do not increment a constant.',
  },
  {
    id: 'nexus-core',
    name: 'Nexus Core',
    title: 'Boss of contracts',
    taunt: 'A class method and an interface default are not the same inheritance path.',
  },
  {
    id: 'frozen-handle',
    name: 'Frozen Handle',
    title: 'final means the variable',
    taunt: 'You cannot retarget the reference. The object behind it may still change.',
  },
  {
    id: 'last-word',
    name: 'Last Word',
    title: 'final methods',
    taunt: 'I declared the last implementation. Subclasses may not override it.',
  },
  {
    id: 'broken-contract',
    name: 'Broken Contract',
    title: 'equals vs hashCode',
    taunt: 'Equal objects must share a hash. HashSet believes the contract.',
  },
  {
    id: 'one-way',
    name: 'One-Way Mirror',
    title: 'Symmetry',
    taunt: 'If a.equals(b) then b.equals(a). instanceof hierarchies often lie.',
  },
  {
    id: 'sealed-gate',
    name: 'Sealed Gate',
    title: 'permits (Java 17+)',
    taunt: 'Only the named subtypes may extend me. Triangle was not invited.',
  },
  {
    id: 'crypt-heart',
    name: 'Crypt Heart',
    title: 'Boss of integrity',
    taunt: 'private final fields, no setters, never leak a live collection.',
  },
  {
    id: 'blueprint',
    name: 'Blueprint Shade',
    title: 'Class vs object',
    taunt: 'I am the plan. How many of me did you actually build?',
  },
  {
    id: 'state-keeper',
    name: 'State Keeper',
    title: 'Fields and methods',
    taunt: 'Count the bumps. Defaults are quieter than you think.',
  },
  {
    id: 'first-breath',
    name: 'First Breath',
    title: 'Constructor',
    taunt: 'I speak when new calls me — before your next line.',
  },
  {
    id: 'private-vault',
    name: 'Private Vault',
    title: 'Encapsulation',
    taunt: 'You may look, but not through the wall. Ask politely.',
  },
  {
    id: 'isa-fork',
    name: 'Is/Has Fork',
    title: 'IS-A vs HAS-A',
    taunt: 'One path inherits. The other holds. Do not mix the signs.',
  },
  {
    id: 'foundation-seal',
    name: 'Foundation Seal',
    title: 'Boss of basics',
    taunt: 'Sketch a hero that hides its name.',
  },
  {
    id: 'silent-lift',
    name: 'Silent Lift',
    title: 'Upcast',
    taunt: 'I rose to Animal. My bark stayed below.',
  },
  {
    id: 'brittle-cast',
    name: 'Brittle Cast',
    title: 'Bad downcast',
    taunt: 'Force me into the wrong shape. Hear the crack.',
  },
  {
    id: 'safe-gate',
    name: 'Safe Gate',
    title: 'instanceof',
    taunt: 'Ask first. Then cast.',
  },
  {
    id: 'parent-echo',
    name: 'Parent Echo',
    title: 'super.method()',
    taunt: 'Call your elder without forgetting yourself.',
  },
  {
    id: 'obligation',
    name: 'Obligation',
    title: 'Abstract methods',
    taunt: 'I named area(). You must write it.',
  },
  {
    id: 'forge-heart',
    name: 'Forge Heart',
    title: 'Boss of types',
    taunt: 'Abstract family. Interface gift. Choose both wisely.',
  },
  {
    id: 'nested-ward',
    name: 'Nested Ward',
    title: 'Nested types',
    taunt: 'Some of me need Outer. Some do not.',
  },
  {
    id: 'enum-court',
    name: 'Enum Court',
    title: 'Enums',
    taunt: 'Name the constant. Count the realm.',
  },
  {
    id: 'record-shelf',
    name: 'Record Shelf',
    title: 'Records',
    taunt: 'Data with doors named like fields.',
  },
  {
    id: 'name-plate',
    name: 'Name Plate',
    title: 'toString',
    taunt: 'Tell println who you are.',
  },
  {
    id: 'exact-mirror',
    name: 'Exact Mirror',
    title: 'getClass',
    taunt: 'instanceof is kind. getClass is exact.',
  },
  {
    id: 'object-hall',
    name: 'Object Hall',
    title: 'Boss of nests',
    taunt: 'Only an enum answers to name().',
  },
  {
    id: 'hasa-bay',
    name: 'HAS-A Bay',
    title: 'Composition',
    taunt: 'I carry an engine. I do not become one.',
  },
  {
    id: 'false-heir',
    name: 'False Heir',
    title: 'Bad extends',
    taunt: 'Wearing a list’s crown does not make you a stack.',
  },
  {
    id: 'forward-desk',
    name: 'Forward Desk',
    title: 'Delegation',
    taunt: 'I pass the message. The logger speaks.',
  },
  {
    id: 'raw-list',
    name: 'Raw List',
    title: 'Raw types',
    taunt: 'Without <String>, I swallow anything.',
  },
  {
    id: 'diamond-tip',
    name: 'Diamond Tip',
    title: '<>',
    taunt: 'Leave the right side empty. I infer.',
  },
  {
    id: 'yard-seal',
    name: 'Yard Seal',
    title: 'Boss of composition',
    taunt: 'Hide a deque. Expose only push and pop.',
  },
]

export function getEnemy(id: string): EnemyBlueprint {
  const enemy = ENEMIES.find((item) => item.id === id)
  if (!enemy) {
    throw new Error(`Unknown enemy: ${id}`)
  }
  return enemy
}
