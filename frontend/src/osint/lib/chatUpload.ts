/** Mirrors backend upload limits in project_handler.uploadFile */
export const CHAT_UPLOAD_MAX_BYTES = 20 * 1024 * 1024

const ALLOWED_EXT = new Set([
  '.pdf',
  '.doc',
  '.docx',
  '.txt',
  '.md',
  '.jpg',
  '.jpeg',
  '.png',
])

export function getFileExtension(name: string): string {
  const i = name.lastIndexOf('.')
  return i >= 0 ? name.slice(i).toLowerCase() : ''
}

export function validateChatUploadFile(file: File): string | null {
  if (file.size <= 0) return '文件为空'
  if (file.size > CHAT_UPLOAD_MAX_BYTES) {
    return `文件超过 ${CHAT_UPLOAD_MAX_BYTES / (1024 * 1024)}MB 限制`
  }
  const ext = getFileExtension(file.name)
  if (!ALLOWED_EXT.has(ext)) {
    return `不支持的文件类型 (${ext || '无扩展名'})`
  }
  return null
}
