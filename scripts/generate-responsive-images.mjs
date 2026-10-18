// Generates 640w/1024w WebP variants of every local image referenced in the
// source and writes data/responsive-images.json for lib/image-loader.ts.
// Originals stay untouched and are used for desktop widths.
//
// Run after adding or replacing an image:  npm run images:responsive
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, unlinkSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = path.join(root, 'public')
const outputPrefix = '/images/responsive'
const manifestFile = path.join(root, 'data', 'responsive-images.json')
const WIDTHS = [640, 1024]
const SOURCE_ROOTS = ['app', 'components', 'data', 'lib']
const SKIP_FILES = new Set(['mbx-catalog.json', 'mbx-import.json', 'responsive-images.json', 'content-lastmod.json'])
// Social cards are fetched by crawlers at full size only.
const SKIP_PREFIXES = ['/images/og/', outputPrefix + '/']

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name)
    if (entry.isDirectory()) return walk(absolute)
    return /\.(tsx?|json|mjs)$/.test(entry.name) && !SKIP_FILES.has(entry.name) ? [absolute] : []
  })
}

const referenced = new Set()
for (const file of SOURCE_ROOTS.flatMap((dir) => walk(path.join(root, dir)))) {
  const source = readFileSync(file, 'utf8')
  for (const match of source.matchAll(/\/(?:images|portfolio)\/[A-Za-z0-9_./-]+\.(?:webp|jpe?g|png)/g)) {
    if (!SKIP_PREFIXES.some((prefix) => match[0].startsWith(prefix))) referenced.add(match[0])
  }
}

const manifest = {}
let created = 0
for (const src of [...referenced].sort()) {
  const input = path.join(publicDir, src)
  if (!existsSync(input)) {
    console.warn(`missing: ${src}`)
    continue
  }
  const { width } = await sharp(input).metadata()
  const variants = {}
  for (const target of WIDTHS.filter((candidate) => candidate < width)) {
    const variantSrc = `${outputPrefix}${src.replace(/^\/images/, '').replace(/\.[a-z]+$/i, '')}-${target}w.webp`
    const output = path.join(publicDir, variantSrc)
    if (!existsSync(output) || statSync(output).mtimeMs < statSync(input).mtimeMs) {
      mkdirSync(path.dirname(output), { recursive: true })
      await sharp(input).resize({ width: target }).webp({ quality: 82, effort: 5 }).toFile(output)
      created++
    }
    // A downscaled file that is not lighter than the original brings nothing.
    if (statSync(output).size >= statSync(input).size) {
      unlinkSync(output)
      continue
    }
    variants[target] = variantSrc
  }
  if (Object.keys(variants).length) manifest[src] = { width, variants }
}

writeFileSync(manifestFile, JSON.stringify(manifest, null, 2) + '\n')
console.log(`responsive-images: ${referenced.size} referenced, ${Object.keys(manifest).length} with variants, ${created} files written`)
