import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const root = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      '@shared': path.join(root, 'src/shared'),
      electron: path.join(root, 'src/adapters/electron-stub.ts'),
      'electron-log/main.js': path.join(root, 'src/adapters/electron-log-stub.ts'),
      '@electron-toolkit/utils': path.join(root, 'src/adapters/electron-toolkit-stub.ts')
    }
  },
  test: {
    include: ['tests/**/*.test.ts']
  }
})
