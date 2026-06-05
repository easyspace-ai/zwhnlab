import fs from 'node:fs/promises'
import path from 'node:path'
import { zipSync } from 'fflate'

export async function exportProjectZip(projectDir: string): Promise<Uint8Array> {
  const files: Record<string, Uint8Array> = {}

  async function walk(dir: string, prefix: string): Promise<void> {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    for (const entry of entries) {
      const full = path.join(dir, entry.name)
      const zipPath = prefix ? `${prefix}/${entry.name}` : entry.name
      if (entry.isDirectory()) {
        await walk(full, zipPath)
      } else {
        const buf = await fs.readFile(full)
        files[zipPath] = new Uint8Array(buf)
      }
    }
  }

  await walk(projectDir, '')
  return zipSync(files)
}
