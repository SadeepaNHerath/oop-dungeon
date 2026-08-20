#!/usr/bin/env node
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const npmCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx'
const result = spawnSync(
  npmCmd,
  ['vitest', 'run', 'src/puzzles/java-verify.test.ts'],
  { cwd: root, stdio: 'inherit', shell: process.platform === 'win32' },
)
process.exit(result.status ?? 1)
