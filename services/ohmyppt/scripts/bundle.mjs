import * as esbuild from 'esbuild'
import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

// 原生模块 / WASM 模块 — esbuild 无法打包，需 external
const externals = [
  'playwright',
  'playwright-core',
  '@node-rs/jieba',
  '@libsql/client',
  'tiktoken',
]

await esbuild.build({
  entryPoints: [resolve(root, 'src/index.ts')],
  bundle: true,
  platform: 'node',
  target: 'node20',
  format: 'esm',
  outfile: resolve(root, 'dist/index.js'),
  external: externals,
  // 保留路径别名（如 @shared/*）让 tsconfig paths 生效
  tsconfig: resolve(root, 'tsconfig.json'),
  // 打包但保留 external 的 import（不打包进 bundle）
  packages: 'bundle',
  minify: false,
  sourcemap: true,
  metafile: true,
}).then(async (result) => {
  const text = await esbuild.analyzeMetafile(result.metafile)
  console.log(text)

  // 通过大小确认打包成功（metafile 的 key 可能是相对或绝对路径）
  const keys = Object.keys(result.metafile.outputs)
  const outKey = keys.find(k => k.includes('dist/index.js'))
  if (outKey) {
    const kb = (result.metafile.outputs[outKey].bytes / 1024).toFixed(0)
    console.log(`\n✅ bundle → dist/index.js (${kb} KB)`)
  } else {
    console.log(`\n✅ bundle → dist/index.js`)
  }
})
