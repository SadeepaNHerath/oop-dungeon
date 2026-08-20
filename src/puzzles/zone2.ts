import type { Puzzle } from './types'
import { joinLines as j } from './types'

const relic = j([
  'package a;',
  '',
  'public class Relic {',
  '    int charge = 9;',
  '}',
])

const thief = j([
  'package b;',
  '',
  'public class Thief {',
  '    public static void main(String[] args) {',
  '        a.Relic r = new a.Relic();',
  '        System.out.println(r.charge);',
  '    }',
  '}',
])

const relicProt = j([
  'package a;',
  '',
  'public class Relic {',
  '    protected int charge = 9;',
  '}',
])

const heirOk = j([
  'package b;',
  '',
  'public class Heir extends a.Relic {',
  '    public void peek() {',
  '        System.out.println(this.charge);',
  '        Heir other = new Heir();',
  '        System.out.println(other.charge);',
  '    }',
  '',
  '    public static void main(String[] args) {',
  '        new Heir().peek();',
  '    }',
  '}',
])

const heirBad = j([
  'package b;',
  '',
  'public class Heir extends a.Relic {',
  '    void steal(a.Relic r) {',
  '        System.out.println(r.charge);',
  '    }',
  '}',
])

const throneSub = j([
  'package b;',
  '',
  'public class Heir extends a.Relic {',
  '    void test(a.Relic superRef, Heir subRef) {',
  '        System.out.println(this.charge);',
  '        System.out.println(subRef.charge);',
  '        System.out.println(superRef.charge);',
  '        System.out.println(new Heir().charge);',
  '    }',
  '}',
])

export const ZONE2_PUZZLES: Puzzle[] = [
  {
    id: 'z2-pkg',
    kind: 'compile_error',
    title: 'Package Wall',
    prompt:
      'Relic.charge has no access modifier. Why does Thief fail to compile?',
    code: j(['// a/Relic.java', relic, '', '// b/Thief.java', thief]),
    files: [
      { path: 'a/Relic.java', contents: relic },
      { path: 'b/Thief.java', contents: thief },
    ],
    choices: [
      {
        id: 'a',
        label:
          'No modifier means package-private: charge is visible only inside package a, so b.Thief cannot read it.',
      },
      {
        id: 'b',
        label: 'charge is private because fields are private by default.',
      },
      {
        id: 'c',
        label: 'Thief must extend Relic to use a public class from another package.',
      },
      {
        id: 'd',
        label: 'new a.Relic() is illegal because Relic is not public.',
      },
    ],
    correctId: 'a',
    hint: 'Relic itself is public — the field is the problem. Default access is the package, not the world.',
    explanation:
      'A member with no modifier is package-private (JLS 6.6.1). It is visible to code in the same package only. Subclasses in other packages do not get it either. public on the class only makes the type name visible; each member has its own access.',
    explanationSteps: [
      'a.Relic is public, so Thief may mention the type and call new a.Relic().',
      'int charge has no modifier, so it is package-private to package a.',
      'b.Thief is a different package, so r.charge is a compile error.',
      'To share it, Relic would need public or protected (and protected still has extra rules).',
    ],
    codexId: 'access-modifiers',
    expectCompile: 'fail',
    wrongReasons: {
      b: '“charge is private because fields are private by default.” is incorrect. Relic itself is public — the field is the problem. Default access is the package, not the world.',
      c: '“Thief must extend Relic to use a public class from anothe…” is incorrect. Relic itself is public — the field is the problem. Default access is the package, not the world.',
      d: '“new a.Relic() is illegal because Relic is not public.” is incorrect. Relic itself is public — the field is the problem. Default access is the package, not the world.',
    },
    commonTrap: 'Calling the field private-by-default, or thinking the public class makes every member public.',
  },
  {
    id: 'z2-prot-sub',
    kind: 'output',
    title: 'Heir’s Key',
    prompt:
      'Heir is in another package and extends Relic. What does peek print?',
    code: j(['// a/Relic.java', relicProt, '', '// b/Heir.java', heirOk]),
    files: [
      { path: 'a/Relic.java', contents: relicProt },
      { path: 'b/Heir.java', contents: heirOk },
    ],
    entryClass: 'b.Heir',
    choices: [
      { id: 'a', label: '9\n9' },
      { id: 'b', label: 'Compile error on this.charge' },
      { id: 'c', label: 'Compile error on other.charge' },
      { id: 'd', label: '0\n0' },
    ],
    correctId: 'a',
    hint: 'From another package, a subclass may read protected members through its own type — this or another Heir.',
    explanation:
      'protected members are accessible in subclasses, including in other packages, when the access is through the subclass type. this.charge and Heir.charge are both Heir-typed accesses, so both compile and print 9.',
    explanationSteps: [
      'Heir extends a.Relic, so it inherits protected charge.',
      'this.charge is an access through type Heir — legal (JLS 6.6.2).',
      'other has compile-time type Heir, so other.charge is also legal.',
      'Both read the field value 9.',
    ],
    codexId: 'protected-jls',
    expectCompile: 'ok',
    expectedOutput: '9\n9',
    wrongReasons: {
      b: '“Compile error on this.charge” is incorrect. From another package, a subclass may read protected members through its own type — this or another Heir.',
      c: '“Compile error on other.charge” is incorrect. From another package, a subclass may read protected members through its own type — this or another Heir.',
      d: '“0\\n0” is incorrect. From another package, a subclass may read protected members through its own type — this or another Heir.',
    },
    commonTrap: 'Believing protected is package-only, so another package can never touch the field.',
  },
  {
    id: 'z2-prot-super',
    kind: 'compile_error',
    title: 'Stolen Super',
    prompt:
      'Same protected field, but the parameter is typed as a.Relic. Why is this illegal?',
    code: j(['// a/Relic.java', relicProt, '', '// b/Heir.java', heirBad]),
    files: [
      { path: 'a/Relic.java', contents: relicProt },
      { path: 'b/Heir.java', contents: heirBad },
    ],
    choices: [
      {
        id: 'a',
        label:
          'From another package, protected access is legal only through a reference of the subclass type (or a further subtype), not through the superclass type (JLS 6.6.2).',
      },
      {
        id: 'b',
        label: 'protected members are never visible outside the declaring package.',
      },
      {
        id: 'c',
        label: 'Heir is not allowed to declare a method that takes a.Relic.',
      },
      {
        id: 'd',
        label: 'r might be a Relic that is not an Heir, so Java forbids the parameter type.',
      },
    ],
    correctId: 'a',
    hint: 'this.charge would compile. r.charge does not, because r is typed as Relic.',
    explanation:
      'JLS 6.6.2: access to a protected member from another package is allowed only if the access occurs through an object of the subclass type. a.Relic r might even be a Relic that is not an Heir. The language does not let Heir reach into an arbitrary Relic’s protected field. Rewrite the parameter as Heir (or use this).',
    explanationSteps: [
      'steal lives in package b, Relic.charge is protected in package a.',
      'The compile-time type of r is a.Relic — the superclass.',
      'That access is rejected, even though Heir extends Relic.',
      'void steal(Heir h) { System.out.println(h.charge); } would compile.',
    ],
    codexId: 'protected-jls',
    expectCompile: 'fail',
    wrongReasons: {
      b: '“protected members are never visible outside the declaring…” is incorrect. this.charge would compile. r.charge does not, because r is typed as Relic.',
      c: '“Heir is not allowed to declare a method that takes a.Relic.” is incorrect. this.charge would compile. r.charge does not, because r is typed as Relic.',
      d: '“r might be a Relic that is not an Heir, so Java forbids t…” is incorrect. this.charge would compile. r.charge does not, because r is typed as Relic.',
    },
    commonTrap: 'Thinking “I am a subclass, so any Relic reference can see protected charge.”',
  },
  {
    id: 'z2-private',
    kind: 'output',
    title: 'Private Echo',
    prompt:
      'Child declares its own private secret(). What does main print?',
    code: j([
      'class Parent {',
      '    private void secret() {',
      '        System.out.println("parent");',
      '    }',
      '    void go() {',
      '        secret();',
      '    }',
      '}',
      '',
      'class Child extends Parent {',
      '    private void secret() {',
      '        System.out.println("child");',
      '    }',
      '}',
      '',
      'public class Echo {',
      '    public static void main(String[] args) {',
      '        Parent p = new Child();',
      '        p.go();',
      '    }',
      '}',
    ]),
    choices: [
      { id: 'a', label: 'child' },
      { id: 'b', label: 'parent' },
      { id: 'c', label: 'parent\nchild' },
      { id: 'd', label: 'Compile error: secret is private' },
    ],
    correctId: 'b',
    hint: 'go() is in Parent. The secret() it calls is Parent’s private method — not an override.',
    explanation:
      'private methods are not inherited and do not override. Parent.go() contains a compile-time call to Parent.secret(). Child.secret() is an unrelated method that happens to share a name. The object is a Child, but the call inside go() cannot see Child.secret().',
    explanationSteps: [
      'p.go() is a public instance method, so it dispatches to Parent.go() (not overridden).',
      'Inside go(), secret() is private in Parent, resolved at compile time to Parent.secret().',
      'Child.secret() is a different method. It is not an override.',
      'main cannot write p.secret() at all; that would be a compile error. go() is the legal entry.',
    ],
    codexId: 'private-not-override',
    expectCompile: 'ok',
    expectedOutput: 'parent',
    wrongReasons: {
      a: '“child” is incorrect. go() is in Parent. The secret() it calls is Parent’s private method — not an override.',
      c: '“parent\\nchild” is incorrect. go() is in Parent. The secret() it calls is Parent’s private method — not an override.',
      d: '“Compile error: secret is private” is incorrect. go() is in Parent. The secret() it calls is Parent’s private method — not an override.',
    },
    commonTrap: 'Expecting child because the runtime type is Child — that only happens for real overrides.',
  },
  {
    id: 'z2-inner',
    kind: 'output',
    title: 'Inner Vault',
    prompt:
      'Can the inner class read Outer’s private field? What prints?',
    code: j([
      'class Outer {',
      '    private int hidden = 4;',
      '    class Inner {',
      '        int read() {',
      '            return hidden;',
      '        }',
      '    }',
      '}',
      '',
      'public class Vault {',
      '    public static void main(String[] args) {',
      '        Outer.Inner inner = new Outer().new Inner();',
      '        System.out.println(inner.read());',
      '    }',
      '}',
    ]),
    choices: [
      { id: 'a', label: 'Compile error: inner cannot see private hidden' },
      { id: 'b', label: '4' },
      { id: 'c', label: '0' },
      { id: 'd', label: 'Compile error: new Outer().new Inner() is illegal' },
    ],
    correctId: 'b',
    hint: 'A non-static inner class is part of the enclosing instance. private is “this class,” and nested classes count.',
    explanation:
      'private means the top-level class (the nest), not “this curly-brace block only.” The compiler emits an accessor so Inner can read Outer.hidden. new Outer().new Inner() is the normal way to construct an inner instance. The field was initialized to 4.',
    explanationSteps: [
      'hidden is private in Outer, initialized to 4.',
      'Inner is a non-static nested class, so it holds a reference to the enclosing Outer.',
      'Reading hidden from Inner is allowed.',
      'new Outer().new Inner() builds that enclosing pair; read() returns 4.',
    ],
    codexId: 'access-modifiers',
    expectCompile: 'ok',
    expectedOutput: '4',
    wrongReasons: {
      a: '“Compile error: inner cannot see private hidden” is incorrect. A non-static inner class is part of the enclosing instance. private is “this class,” and nested classes count.',
      c: '“0” is incorrect. A non-static inner class is part of the enclosing instance. private is “this class,” and nested classes count.',
      d: '“Compile error: new Outer().new Inner() is illegal” is incorrect. A non-static inner class is part of the enclosing instance. private is “this class,” and nested classes count.',
    },
    commonTrap: 'Treating private as invisible to nested classes, or forgetting the Outer.this relationship.',
  },
  {
    id: 'z2-boss',
    kind: 'compile_error',
    title: 'Visibility Throne',
    prompt:
      'Heir is in package b. Which description of the four statements is correct? (The file as written does not compile.)',
    code: j(['// a/Relic.java', relicProt, '', '// b/Heir.java', throneSub]),
    files: [
      { path: 'a/Relic.java', contents: relicProt },
      { path: 'b/Heir.java', contents: throneSub },
    ],
    choices: [
      {
        id: 'a',
        label:
          'this.charge, subRef.charge, and new Heir().charge compile. superRef.charge does not (superclass-typed access from another package).',
      },
      {
        id: 'b',
        label: 'All four compile because Heir extends Relic.',
      },
      {
        id: 'c',
        label: 'Only this.charge compiles; any other object is illegal.',
      },
      {
        id: 'd',
        label: 'None compile because charge is protected and Heir is in another package.',
      },
    ],
    correctId: 'a',
    hint: 'Ask: is the compile-time type of the receiver Heir (or a subtype), or Relic?',
    explanation:
      'JLS 6.6.2 again. this, subRef, and new Heir() all have type Heir in package b, so protected charge is accessible. superRef has type a.Relic, so that line is the compile error. This is the exam combination of the last two rooms.',
    explanationSteps: [
      'this.charge — receiver type Heir — legal.',
      'subRef.charge — declared Heir — legal.',
      'new Heir().charge — expression type Heir — legal.',
      'superRef.charge — declared a.Relic — illegal from package b.',
    ],
    codexId: 'protected-jls',
    expectCompile: 'fail',
    wrongReasons: {
      b: 'Extending Relic is not enough — protected access still depends on the receiver’s compile-time type.',
      c: 'subRef and new Heir() are also Heir-typed, so those protected reads are legal too.',
      d: 'Protected is not “invisible across packages”; subclass-typed access from Heir is allowed.',
    },
    commonTrap: 'Saying all four compile because “protected means subclasses get everything.”',
  },
]
