/** PPT 生成引擎（统一 /ppt 工作台） */
export type PptEngine =  'pptxgenjs'|'ohmyppt' 

export const PPT_ENGINE_OPTIONS: { value: PptEngine; label: string; hint: string }[] = [
  {
    value: 'pptxgenjs',
    label: '原生ppt',
    hint: '可编辑 PPTX',
  },
  {
    value: 'ohmyppt',
    label: 'HTML转ppt',
    hint: '精美 HTML 演示稿',
  }
  
]

export function isPptEngine(v: string | null | undefined): v is PptEngine {
  return v === 'ohmyppt' || v === 'pptxgenjs'
}
