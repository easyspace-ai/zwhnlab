declare module 'wordcloud' {
  interface WordCloudOptions {
    list?: [string, number][]
    gridSize?: number
    weightFactor?: number | ((size: number) => number)
    fontFamily?: string
    fontWeight?: string | number
    color?: string | ((word: string, weight: number) => string)
    rotateRatio?: number
    rotationSteps?: number
    backgroundColor?: string
    shrinkToFit?: boolean
    drawOutOfBound?: boolean
    minSize?: number
    origin?: [number, number]
    shape?: string | ((theta: number) => number)
    ellipticity?: number
    click?: (item: [string, number]) => void
  }

  interface WordCloudFn {
    (canvas: HTMLCanvasElement, options: WordCloudOptions): void
    stop(): void
  }

  const WordCloud: WordCloudFn
  export default WordCloud
}
