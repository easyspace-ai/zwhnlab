import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class SlideglanceErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  override render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-sm text-gray-500">
            <p className="text-red-500">PPTX 预览加载失败</p>
            <p className="text-xs text-gray-400">{this.state.error?.message}</p>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false, error: null })}
              className="mt-2 rounded-lg border border-gray-200 px-3 py-1.5 text-xs hover:bg-gray-50"
            >
              重试
            </button>
          </div>
        )
      )
    }
    return this.props.children
  }
}
