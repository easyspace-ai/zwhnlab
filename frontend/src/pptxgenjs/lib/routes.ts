/** PptxGenJS 工作台路由（挂载于主应用 /pptxgenjs） */
export const PPTXGENJS_ROUTE_BASE = '/pptxgenjs'

export function pptxgenjsHomePath(): string {
  return PPTXGENJS_ROUTE_BASE
}

export function pptxgenjsProjectPath(projectId: string): string {
  return `${PPTXGENJS_ROUTE_BASE}/p/${projectId}`
}
