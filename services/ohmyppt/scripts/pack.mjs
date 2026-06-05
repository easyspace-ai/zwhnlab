import { execSync } from 'child_process'
import { existsSync, mkdirSync, cpSync, rmSync, writeFileSync } from 'fs'
import { readFile } from 'fs/promises'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const deployDir = resolve(root, 'deploy')

// Step 1: bundle
console.log('📦 bundling...')
execSync('node scripts/bundle.mjs', { cwd: root, stdio: 'inherit' })

if (!existsSync(resolve(root, 'dist/index.js'))) {
  console.error('❌ bundle failed: dist/index.js not found')
  process.exit(1)
}

// Step 2: prepare deploy directory
rmSync(deployDir, { recursive: true, force: true })
mkdirSync(deployDir, { recursive: true })

// dist/
cpSync(resolve(root, 'dist'), resolve(deployDir, 'dist'), { recursive: true })

// resources/ (slide-pack binaries, fonts, etc.)
cpSync(resolve(root, 'resources'), resolve(deployDir, 'resources'), { recursive: true })

// package.json (needed for type: module & imports map)
const pkg = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf-8'))
const slimPkg = {
  name: pkg.name,
  version: pkg.version,
  type: pkg.type,
  imports: pkg.imports,
}
writeFileSync(resolve(deployDir, 'package.json'), JSON.stringify(slimPkg, null, 2))

// Step 3: copy only external (native) modules + their transitive deps
const externals = [
  'playwright',
  'playwright-core',
  '@node-rs/jieba',
  '@libsql/client',
  'tiktoken',
]

mkdirSync(resolve(deployDir, 'node_modules'), { recursive: true })
mkdirSync(resolve(deployDir, 'node_modules', '@node-rs'), { recursive: true })
mkdirSync(resolve(deployDir, 'node_modules', '@libsql'), { recursive: true })

for (const mod of externals) {
  const src = resolve(root, 'node_modules', mod)
  const dst = resolve(deployDir, 'node_modules', mod)
  if (existsSync(src)) {
    cpSync(src, dst, { recursive: true, dereference: true })
    console.log(`  ✓ ${mod}`)
  } else {
    console.warn(`  ⚠ ${mod} not found, skipping`)
  }
}

// playwright depends on playwright-core via symlink (pnpm)
// Also copy .bin if exists
const binDir = resolve(root, 'node_modules', '.bin')
if (existsSync(binDir)) {
  cpSync(binDir, resolve(deployDir, 'node_modules', '.bin'), { recursive: true, dereference: true })
}

// playwright's browser binaries — playwright-core needs them
// They might be in node_modules/.pnpm/playwright-core@x.x.x/node_modules/playwright-core/
// or at node_modules/playwright-core/
// pnpm creates symlinks; with dereference: true we get the real files

// Step 4: create tarball
const tarball = `ohmyppt-deploy.tar.gz`
execSync(`tar -czf ${tarball} -C ${deployDir} .`, { cwd: root, stdio: 'inherit' })
console.log(`\n✅ deploy package → ${tarball}`)

const { statSync } = await import('fs')
const sz = statSync(resolve(root, tarball)).size
console.log(`   size: ${(sz / 1024 / 1024).toFixed(1)} MB`)
console.log(`\n📋 部署步骤:`)
console.log(`   1. scp ${tarball} user@server:/path/to/services/ohmyppt/`)
console.log(`   2. ssh user@server "cd /path/to/services/ohmyppt && tar -xzf ${tarball}"`)
console.log(`   3. pm2 restart zwhnlab-ohmyppt`)
