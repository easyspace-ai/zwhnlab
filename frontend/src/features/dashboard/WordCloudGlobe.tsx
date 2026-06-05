import { Suspense, useMemo, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import * as THREE from 'three'
import { Loader2, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GROUP_COLORS, type WordCloudWord } from '@/lib/dashboardApi'

const GLOBE_RADIUS = 2.2
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5))

function fibonacciPosition(index: number, total: number, radius: number): THREE.Vector3 {
  const y = 1 - (index / Math.max(total - 1, 1)) * 2
  const r = Math.sqrt(Math.max(0, 1 - y * y))
  const theta = GOLDEN_ANGLE * index
  return new THREE.Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius)
}

function weightToFontSize(weight: number, minW: number, maxW: number): number {
  if (maxW <= minW) return 0.28
  const t = (weight - minW) / (maxW - minW)
  return 0.12 + t * 0.38
}

function groupToColor(group: string): string {
  return GROUP_COLORS[group as keyof typeof GROUP_COLORS] || GROUP_COLORS.general
}

function WordLabel({
  word,
  position,
  fontSize,
  color,
  onClick,
}: {
  word: string
  position: THREE.Vector3
  fontSize: number
  color: string
  onClick?: (word: string) => void
}) {
  return (
    <Text
      position={position}
      fontSize={fontSize}
      color={color}
      anchorX="center"
      anchorY="middle"
      maxWidth={2}
      outlineWidth={0.02}
      outlineColor="#0b0e14"
      onClick={() => onClick?.(word)}
      onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer' }}
      onPointerOut={(e) => { e.stopPropagation(); document.body.style.cursor = 'auto' }}
    >
      {word}
    </Text>
  )
}

function GlobeScene({ words, onWordClick }: { words: WordCloudWord[]; onWordClick?: (word: string) => void }) {
  const layout = useMemo(() => {
    if (words.length === 0) return []
    const weights = words.map((w) => w.weight)
    const minW = Math.min(...weights)
    const maxW = Math.max(...weights)
    return words.map((w, i) => ({
      text: w.text,
      position: fibonacciPosition(i, words.length, GLOBE_RADIUS),
      fontSize: weightToFontSize(w.weight, minW, maxW),
      color: groupToColor(w.group),
    }))
  }, [words])

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1.2} />
      <pointLight position={[-8, -6, -4]} intensity={0.4} color="#3b82f6" />
      {layout.map((item) => (
        <WordLabel
          key={item.text}
          word={item.text}
          position={item.position}
          fontSize={item.fontSize}
          color={item.color}
          onClick={onWordClick}
        />
      ))}
      <OrbitControls
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.35}
        minDistance={3}
        maxDistance={8}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  )
}

/** 仅 3D 球面画布，不含顶栏 */
export function WordCloudGlobeView({ words, onWordClick }: { words: WordCloudWord[]; onWordClick?: (word: string) => void }) {
  const handleCreated = useCallback(({ gl }: { gl: THREE.WebGLRenderer }) => {
    gl.setClearColor('#0b0e14')
  }, [])

  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 50 }}
      onCreated={handleCreated}
      className="h-full w-full"
    >
      <Suspense fallback={null}>
        <GlobeScene words={words} onWordClick={onWordClick} />
      </Suspense>
    </Canvas>
  )
}

interface WordCloudGlobeProps {
  words: WordCloudWord[]
  loading: boolean
  error: string | null
  itemCount?: number
  onRefresh: () => void
  refreshing?: boolean
}

export function WordCloudGlobe({
  words,
  loading,
  error,
  itemCount,
  onRefresh,
  refreshing,
}: WordCloudGlobeProps) {
  return (
    <div className="relative flex h-full min-h-0 flex-col bg-[#0b0e14]">
      <div className="absolute right-2 top-2 z-10 flex items-center gap-2">
        {itemCount != null && (
          <span className="text-[10px] text-slate-500">近24h · {itemCount} 条</span>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onRefresh}
          disabled={refreshing || loading}
          className="h-7 w-7 p-0 text-slate-400 hover:text-slate-200"
          title="刷新词云"
        >
          {refreshing || loading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <RefreshCw className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>

      <div className="flex-1 min-h-0">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
          </div>
        ) : error ? (
          <div className="flex h-full items-center justify-center px-4 text-center text-[12px] text-red-400">
            {error}
          </div>
        ) : words.length === 0 ? (
          <div className="flex h-full items-center justify-center text-[12px] text-slate-500">
            近 24 小时暂无足够文本生成词云
          </div>
        ) : (
          <WordCloudGlobeView words={words} />
        )}
      </div>
      <p className="shrink-0 border-t border-slate-800 px-3 py-1 text-center text-[10px] text-slate-600">
        拖拽旋转 · 滚轮缩放
      </p>
    </div>
  )
}
