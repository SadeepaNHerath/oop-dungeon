import { spawnSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import type { Puzzle } from './types'

export function hasJdk(): boolean {
  const result = spawnSync('javac', ['-version'], { encoding: 'utf8' })
  return result.error == null
}

function publicClass(source: string): string | null {
  const match = source.match(/public\s+(?:class|interface|enum)\s+(\w+)/)
  return match ? match[1] : null
}

function packageName(source: string): string | null {
  const match = source.match(/package\s+([\w.]+)\s*;/)
  return match ? match[1] : null
}

function findEntryClass(puzzle: Puzzle, source?: string): string | null {
  if (puzzle.entryClass) return puzzle.entryClass
  const blobs = source
    ? [source]
    : puzzle.files
      ? puzzle.files.map((file) => file.contents)
      : [puzzle.code]
  for (const blob of blobs) {
    if (!blob.includes('public static void main')) continue
    const cls = publicClass(blob)
    if (!cls) continue
    const pkg = packageName(blob)
    return pkg ? `${pkg}.${cls}` : cls
  }
  const joined = blobs.join('\n')
  const cls = publicClass(joined)
  if (!cls) return null
  const pkg = packageName(joined)
  return pkg ? `${pkg}.${cls}` : cls
}

function writeSources(
  root: string,
  puzzle: Puzzle,
  sourceOverride?: string,
): string[] {
  if (puzzle.files && !sourceOverride) {
    return puzzle.files.map((file) => {
      const full = join(root, file.path)
      mkdirSync(dirname(full), { recursive: true })
      writeFileSync(full, file.contents)
      return full
    })
  }

  const code = sourceOverride ?? puzzle.code
  const pkg = packageName(code)
  const cls = publicClass(code) ?? puzzle.id.replace(/-/g, '_')
  const rel = pkg ? join(...pkg.split('.'), `${cls}.java`) : `${cls}.java`
  const full = join(root, rel)
  mkdirSync(dirname(full), { recursive: true })
  writeFileSync(full, code)
  return [full]
}

function javac(
  files: string[],
  out: string,
): { ok: boolean; err: string } {
  const result = spawnSync('javac', ['--release', '17', '-d', out, ...files], {
    encoding: 'utf8',
  })
  const err = `${result.stderr ?? ''}${result.stdout ?? ''}`
  return { ok: result.status === 0, err }
}

export function verifyPuzzle(puzzle: Puzzle): string[] {
  const errors: string[] = []
  const root = mkdtempSync(join(tmpdir(), 'arena-'))
  const out = join(root, 'out')
  mkdirSync(out)

  try {
    if (puzzle.kind === 'fix' && (puzzle.fixMode || puzzle.fixMarker)) {
      const marker = puzzle.fixMarker ?? '/*FIX*/'
      const correct = puzzle.choices.find((choice) => choice.id === puzzle.correctId)
      if (!correct) {
        errors.push(`${puzzle.id} missing correct choice`)
        return errors
      }
      const patched = puzzle.code.replace(marker, correct.label)
      const files = writeSources(root, puzzle, patched)
      const compiled = javac(files, out)
      if (!compiled.ok) {
        errors.push(`${puzzle.id} correct fix did not compile:\n${compiled.err}`)
      }
      return errors
    }

    if (puzzle.kind === 'concept') {
      const files = writeSources(root, puzzle)
      const compiled = javac(files, out)
      if (puzzle.expectCompile === 'fail') {
        if (compiled.ok) errors.push(`${puzzle.id} expected javac to fail`)
      } else if (!compiled.ok) {
        errors.push(`${puzzle.id} javac failed:\n${compiled.err}`)
      }
      return errors
    }

    const files = writeSources(root, puzzle)
    const compiled = javac(files, out)

    if (puzzle.expectCompile === 'fail') {
      if (compiled.ok) {
        errors.push(`${puzzle.id} expected javac to fail, but it compiled`)
      }
      return errors
    }

    if (!compiled.ok) {
      errors.push(`${puzzle.id} javac failed:\n${compiled.err}`)
      return errors
    }

    if (puzzle.kind === 'output' || puzzle.kind === 'runtime') {
      const entry = findEntryClass(puzzle)
      if (!entry) {
        errors.push(`${puzzle.id} has no entry class`)
        return errors
      }
      const run = spawnSync('java', ['-cp', out, entry], { encoding: 'utf8' })
      if (run.status !== 0) {
        errors.push(`${puzzle.id} java failed:\n${run.stderr}\n${run.stdout}`)
        return errors
      }
      const got = (run.stdout ?? '').replace(/\r\n/g, '\n').replace(/\n$/, '')
      const expected = (puzzle.expectedOutput ?? '').replace(/\r\n/g, '\n')
      if (got !== expected) {
        errors.push(
          `${puzzle.id} output mismatch\nexpected:\n${JSON.stringify(expected)}\ngot:\n${JSON.stringify(got)}`,
        )
      }
    }
  } finally {
    rmSync(root, { recursive: true, force: true })
  }

  return errors
}
