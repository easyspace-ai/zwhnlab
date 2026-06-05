import { tryParseProductSchema } from './productSchema'

const MAX_BYTES = 5 * 1024 * 1024

export type UploadedContentKind = 'markdown' | 'product_schema'

export function validateContentFile(file: File): string | null {
  const name = file.name.toLowerCase()
  const okExt = name.endsWith('.md') || name.endsWith('.json')
  if (!okExt) return '仅支持 .md 或 .json（产品 schema）文件'
  if (file.size <= 0) return '文件为空'
  if (file.size > MAX_BYTES) return '文件超过 5MB'
  return null
}

export async function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result || ''))
    reader.onerror = () => reject(new Error('读取文件失败'))
    reader.readAsText(file)
  })
}

export function detectUploadedContent(text: string, fileName: string): {
  kind: UploadedContentKind
  productSchema: ReturnType<typeof tryParseProductSchema>
} {
  const lower = fileName.toLowerCase()
  if (lower.endsWith('.json')) {
    const doc = tryParseProductSchema(text)
    if (doc) return { kind: 'product_schema', productSchema: doc }
    return { kind: 'markdown', productSchema: null }
  }
  const doc = tryParseProductSchema(text)
  if (doc) return { kind: 'product_schema', productSchema: doc }
  return { kind: 'markdown', productSchema: null }
}
