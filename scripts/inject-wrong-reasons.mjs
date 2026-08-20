/**
 * Injects wrongReasons into each puzzle in src/puzzles/zone*.ts
 * Run: node scripts/inject-wrong-reasons.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const dir = path.join(root, 'src/puzzles')

const authored = {
  'z0-class': {
    b: 'That would mean c pointed at Fido’s object — but c = a aliases Rex’s object.',
    c: 'There is one Dog class and two Dog objects. Variables are not classes.',
    d: 'This code is legal Java; assignment of references does not fail to compile.',
  },
  'z0-fields': {
    a: 'n starts at 0, but bump ran twice — value() is not still 0.',
    b: 'One bump would leave 1; two bumps leave 2.',
    d: 'Instance int fields default to 0; only locals need an explicit initializer.',
  },
  'z0-ctor': {
    a: 'Constructor body runs during new, so lit prints before done.',
    c: 'main still runs after construction and prints done.',
    d: 'new Torch() does run the constructor — lit is not skipped.',
  },
  'z0-boss': {
    a: 'public String name is legal but not encapsulated — the field is wide open.',
    c: 'name = name only assigns the parameter to itself; the field stays null.',
    d: 'String is final — you cannot extend it.',
  },
  'z2-boss': {
    a: 'That access path is illegal under the package / protected rules for this setup.',
    b: 'That access path is illegal under the package / protected rules for this setup.',
    d: 'That access path is illegal under the package / protected rules for this setup.',
  },
  'z3-boss': {
    a: 'That confuses overload resolution with override dispatch.',
    b: 'That confuses overload resolution with override dispatch.',
    d: 'That confuses overload resolution with override dispatch.',
  },
  'z4-boss': {
    a: 'That mishandles default / static / diamond rules on interfaces.',
    b: 'That mishandles default / static / diamond rules on interfaces.',
    d: 'That mishandles default / static / diamond rules on interfaces.',
  },
  'z5-boss': {
    a: 'Public mutable List field — callers can change the collection freely.',
    b: 'Returning the internal List leaks mutability even if the field is final.',
    d: 'That version still allows outside code to mutate the scroll’s state.',
  },
  'z6-boss': {
    a: 'That cast or abstract/override choice does not match the type rules here.',
    b: 'That cast or abstract/override choice does not match the type rules here.',
    d: 'That cast or abstract/override choice does not match the type rules here.',
  },
  'z7-boss': {
    a: 'That nested-type / Object / enum-record sketch breaks a language rule.',
    b: 'That nested-type / Object / enum-record sketch breaks a language rule.',
    d: 'That nested-type / Object / enum-record sketch breaks a language rule.',
  },
  'z8-boss': {
    a: 'That composition or generics sketch is not the sound design here.',
    b: 'That composition or generics sketch is not the sound design here.',
    d: 'That composition or generics sketch is not the sound design here.',
  },
}

function reasonFor(puzzleId, choiceId, label, hint, trap) {
  const custom = authored[puzzleId]?.[choiceId]
  if (custom) return custom
  const shortLabel = (label || choiceId).replace(/\s+/g, ' ').trim()
  const clipped =
    shortLabel.length > 60 ? `${shortLabel.slice(0, 57)}…` : shortLabel
  const base = hint?.trim() || trap?.trim() || 'That is not how this Java rule works.'
  return `“${clipped}” is incorrect. ${base}`
}

function extractString(src, key) {
  const re = new RegExp(`${key}:\\s*'((?:\\\\'|[^'])*)'`)
  const m = src.match(re)
  return m ? m[1].replace(/\\'/g, "'") : null
}

function extractChoiceIds(block) {
  const start = block.indexOf('choices:')
  if (start < 0) return []
  const endKeys = [
    'correctId:',
    'hint:',
    'explanation:',
  ]
  let end = block.length
  for (const key of endKeys) {
    const i = block.indexOf(key, start)
    if (i >= 0 && i < end) end = i
  }
  const slice = block.slice(start, end)
  const ids = []
  const re = /\bid:\s*'([a-z0-9-]+)'/g
  let m
  while ((m = re.exec(slice))) {
    // skip nested accidental ids — choice ids are a/b/c/d or short
    if (/^[a-d]$/.test(m[1]) || m[1].length <= 8) {
      if (!ids.includes(m[1])) ids.push(m[1])
    }
  }
  return ids.filter((id) => /^[a-d]$/.test(id))
}

function extractChoiceLabel(block, choiceId) {
  const re = new RegExp(
    `id:\\s*'${choiceId}'\\s*,\\s*label:\\s*'((?:\\\\'|[^'])*)'`,
  )
  const m = block.match(re)
  return m ? m[1].replace(/\\'/g, "'") : choiceId
}

function findPuzzleBlocks(text) {
  const blocks = []
  const marker = /\n  \{\n    id: '/g
  let match
  const starts = []
  while ((match = marker.exec(text))) {
    starts.push(match.index + 1)
  }
  for (let i = 0; i < starts.length; i++) {
    const start = starts[i]
    const end = i + 1 < starts.length ? starts[i + 1] : text.lastIndexOf('\n]')
    blocks.push({ start, end, text: text.slice(start, end) })
  }
  return blocks
}

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

function injectFile(filePath) {
  let text = fs.readFileSync(filePath, 'utf8')
  if (!text.includes('export const ZONE')) return { filePath, changed: 0 }

  const blocks = findPuzzleBlocks(text)
  let offset = 0
  let changed = 0

  for (const block of blocks) {
    const body = block.text
    if (body.includes('wrongReasons:')) continue

    const idMatch = body.match(/id:\s*'([^']+)'/)
    const correctMatch = body.match(/correctId:\s*'([^']+)'/)
    if (!idMatch || !correctMatch) continue

    const puzzleId = idMatch[1]
    const correctId = correctMatch[1]
    const hint = extractString(body, 'hint')
    const trap = extractString(body, 'commonTrap')
    const choiceIds = extractChoiceIds(body)
    const wrong = choiceIds.filter((id) => id !== correctId)
    if (wrong.length === 0) continue

    const lines = wrong.map((id) => {
      const label = extractChoiceLabel(body, id)
      const r = reasonFor(puzzleId, id, label, hint, trap)
      return `      ${id}: '${esc(r)}',`
    })
    const insert = `    wrongReasons: {\n${lines.join('\n')}\n    },\n`

    const absStart = block.start + offset
    const absBody = text.slice(absStart, absStart + body.length)
    let insertAt
    const trapIdx = absBody.search(/\n    commonTrap:/)
    if (trapIdx >= 0) {
      insertAt = absStart + trapIdx + 1
    } else {
      const expectIdx = absBody.search(/\n    expectCompile:/)
      insertAt =
        expectIdx >= 0
          ? absStart + expectIdx + 1
          : absStart + absBody.lastIndexOf('\n  },') + 1
    }

    text = text.slice(0, insertAt) + insert + text.slice(insertAt)
    offset += insert.length
    changed += 1
  }

  fs.writeFileSync(filePath, text)
  return { filePath: path.basename(filePath), changed }
}

const results = []
for (const name of fs.readdirSync(dir).filter((f) => /^zone\d\.ts$/.test(f))) {
  results.push(injectFile(path.join(dir, name)))
}
console.log(results)
