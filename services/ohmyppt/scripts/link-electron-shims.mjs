#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, content)
}

function toImportPath(fromFile, targetFile) {
  const rel = path.relative(path.dirname(fromFile), targetFile).replace(/\\/g, '/')
  return rel.startsWith('.') ? rel : `./${rel}`
}

function findPackageDirs(packageName) {
  const dirs = new Set()
  const flat = path.join(root, 'node_modules', ...packageName.split('/'))
  if (fs.existsSync(flat)) {
    try {
      dirs.add(fs.realpathSync(flat))
    } catch {
      dirs.add(flat)
    }
  }
  const pnpmDir = path.join(root, 'node_modules/.pnpm')
  if (fs.existsSync(pnpmDir)) {
    const prefix = packageName.replace('/', '+') + '@'
    for (const entry of fs.readdirSync(pnpmDir)) {
      if (!entry.startsWith(prefix)) continue
      const nested = path.join(pnpmDir, entry, 'node_modules', ...packageName.split('/'))
      if (fs.existsSync(nested)) dirs.add(nested)
    }
  }
  return Array.from(dirs)
}

function patchElectronLog() {
  const stubPath = path.join(root, 'src/adapters/electron-log-stub.ts')
  for (const dir of findPackageDirs('electron-log')) {
    const mainJs = path.join(dir, 'main.js')
    write(
      path.join(dir, 'package.json'),
      `${JSON.stringify({ name: 'electron-log', version: '0.0.0-stub', type: 'module', exports: { './main.js': './main.js' } }, null, 2)}\n`
    )
    write(mainJs, `export { default } from '${toImportPath(mainJs, stubPath)}'\n`)
  }
}

function patchElectron() {
  const stubPath = path.join(root, 'src/adapters/electron-stub.ts')
  const dir = path.join(root, 'node_modules/electron')
  const indexJs = path.join(dir, 'index.js')
  write(
    path.join(dir, 'package.json'),
    `${JSON.stringify({ name: 'electron', version: '0.0.0-stub', type: 'module', main: './index.js' }, null, 2)}\n`
  )
  write(indexJs, `export * from '${toImportPath(indexJs, stubPath)}'\n`)
}

function patchElectronToolkit() {
  const stubPath = path.join(root, 'src/adapters/electron-toolkit-stub.ts')
  const dir = path.join(root, 'node_modules/@electron-toolkit/utils')
  const indexJs = path.join(dir, 'index.js')
  write(
    path.join(dir, 'package.json'),
    `${JSON.stringify({ name: '@electron-toolkit/utils', version: '0.0.0-stub', type: 'module', main: './index.js' }, null, 2)}\n`
  )
  write(indexJs, `export * from '${toImportPath(indexJs, stubPath)}'\n`)
}

function patchShared() {
  const sharedDir = path.join(root, 'src/shared')
  const sharedPkgDir = path.join(root, 'node_modules/@shared')
  fs.mkdirSync(sharedPkgDir, { recursive: true })
  const sharedExports = {}
  for (const file of fs.readdirSync(sharedDir)) {
    if (!file.endsWith('.ts')) continue
    const base = file.replace(/\.ts$/, '')
    const outJs = path.join(sharedPkgDir, `${base}.js`)
    write(outJs, `export * from '${toImportPath(outJs, path.join(sharedDir, file))}'\n`)
    sharedExports[`./${base}`] = `./${base}.js`
  }
  write(
    path.join(sharedPkgDir, 'package.json'),
    `${JSON.stringify({ name: '@shared', version: '0.0.0-stub', type: 'module', exports: sharedExports }, null, 2)}\n`
  )
}

patchElectron()
patchElectronToolkit()
patchElectronLog()
patchShared()

console.log('[ohmyppt] electron adapter shims linked')
