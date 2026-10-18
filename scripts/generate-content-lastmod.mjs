// Generates data/content-lastmod.json: the last real content change date of
// every source file that feeds a sitemap URL. The sitemap route maps URLs to
// these files, so <lastmod> follows content edits instead of the build time.
//
// Run before committing content changes:  npm run sitemap:lastmod
// Uncommitted changes get today's date. Files without git history keep the
// previous value, so a shallow clone never overwrites good dates.
import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outputFile = path.join(root, 'data', 'content-lastmod.json')
const tracked = ['app', 'data', 'components/home', 'components/ui', 'lib/catalog-landings.ts']
const ignored = new Set(['data/content-lastmod.json', 'data/mbx-import.json'])

function walk(relative) {
  const absolute = path.join(root, relative)
  if (!existsSync(absolute)) return []
  if (statSync(absolute).isFile()) return [relative]
  return readdirSync(absolute).flatMap((name) => walk(path.join(relative, name)))
}

function git(args) {
  try {
    return execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim()
  } catch {
    return ''
  }
}

const previous = existsSync(outputFile) ? JSON.parse(readFileSync(outputFile, 'utf8')) : {}
const today = new Date().toISOString().slice(0, 10)
const dirty = new Set(
  git(['-c', 'core.quotePath=false', 'status', '--porcelain', '--untracked-files=all'])
    .split('\n')
    .filter(Boolean)
    .map((line) => line.slice(3).replace(/^"|"$/g, '').split(' -> ').at(-1)),
)

const files = tracked.flatMap(walk)
  .map((file) => file.split(path.sep).join('/'))
  .filter((file) => /\.(tsx?|json)$/.test(file) && !ignored.has(file))
  .sort()

const result = {}
for (const file of files) {
  if (dirty.has(file)) {
    result[file] = today
    continue
  }
  const committed = git(['log', '-1', '--format=%cs', '--', file])
  result[file] = committed || previous[file] || today
}

writeFileSync(outputFile, JSON.stringify(result, null, 2) + '\n')
console.log(`content-lastmod: ${files.length} files, ${[...dirty].filter((f) => result[f]).length} with uncommitted changes`)
