import { listStyleCatalog } from '../ohmyppt/utils/style-skills.js'

export async function listStyles(): Promise<
  Array<{
    id: string
    style_key: string
    label: string
    description: string
    category: string
    source: string
  }>
> {
  const catalog = listStyleCatalog()
  return catalog.map((item) => ({
    id: item.id,
    style_key: item.styleKey,
    label: item.label,
    description: item.description,
    category: item.category,
    source: item.source
  }))
}
