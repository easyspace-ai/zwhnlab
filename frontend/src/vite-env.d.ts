/// <reference types="vite/client" />

declare module '@slideglance/viewer/dist/pptx-worker.js?worker' {
  const WorkerConstructor: new () => Worker
  export default WorkerConstructor
}
