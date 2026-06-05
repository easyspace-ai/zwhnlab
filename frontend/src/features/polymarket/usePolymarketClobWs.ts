import { useEffect, useRef, useState } from 'react'

const WS_URL = 'wss://ws-subscriptions-clob.polymarket.com/ws/market'

function extractPricePct(raw: unknown, tokenId: string): number | null {
  if (!raw || typeof raw !== 'object') return null
  const msg = raw as Record<string, unknown>
  const aid = String(msg.asset_id ?? '')
  if (aid !== tokenId) return null
  if (msg.event_type === 'best_bid_ask') {
    const b = parseFloat(String(msg.best_bid))
    const a = parseFloat(String(msg.best_ask))
    if (Number.isFinite(b) && Number.isFinite(a)) {
      return ((b + a) / 2) * 100
    }
  }
  if (msg.event_type === 'last_trade_price') {
    const p = parseFloat(String(msg.price))
    if (Number.isFinite(p)) return p * 100
  }
  if (msg.event_type === 'price_change' && Array.isArray(msg.price_changes)) {
    for (const ch of msg.price_changes as Record<string, unknown>[]) {
      if (String(ch.asset_id) !== tokenId) continue
      const bb = parseFloat(String(ch.best_bid ?? ''))
      const ba = parseFloat(String(ch.best_ask ?? ''))
      if (Number.isFinite(bb) && Number.isFinite(ba)) {
        return ((bb + ba) / 2) * 100
      }
    }
  }
  return null
}

/**
 * Subscribe to Polymarket CLOB market channel for the active outcome token.
 * @see https://docs.polymarket.com/api-reference/wss/market
 */
export function usePolymarketClobWs(activeTokenId: string | null) {
  const [livePct, setLivePct] = useState<number | null>(null)
  const [connected, setConnected] = useState(false)
  const tokenRef = useRef<string | null>(null)

  useEffect(() => {
    tokenRef.current = activeTokenId
  }, [activeTokenId])

  useEffect(() => {
    setLivePct(null)
    if (!activeTokenId) {
      setConnected(false)
      return
    }

    let ws: WebSocket | null = null
    let pingTimer: ReturnType<typeof setInterval> | null = null
    let cancelled = false

    ws = new WebSocket(WS_URL)
    ws.onopen = () => {
      if (cancelled || !ws) return
      setConnected(true)
      ws.send(
        JSON.stringify({
          assets_ids: [activeTokenId],
          type: 'market',
          custom_feature_enabled: true,
        }),
      )
      pingTimer = setInterval(() => {
        try {
          if (ws?.readyState === WebSocket.OPEN) ws.send('PING')
        } catch {
          /* ignore */
        }
      }, 10_000)
    }
    ws.onmessage = (ev) => {
      const text = String(ev.data)
      if (text === 'PONG') return
      try {
        const data = JSON.parse(text) as unknown
        const tok = tokenRef.current
        if (!tok) return
        if (Array.isArray(data)) {
          for (const item of data) {
            const pct = extractPricePct(item, tok)
            if (pct != null) setLivePct(pct)
          }
          return
        }
        const pct = extractPricePct(data, tok)
        if (pct != null) setLivePct(pct)
      } catch {
        /* non-json */
      }
    }
    ws.onerror = () => setConnected(false)
    ws.onclose = () => {
      setConnected(false)
      if (pingTimer) clearInterval(pingTimer)
      pingTimer = null
    }

    return () => {
      cancelled = true
      if (pingTimer) clearInterval(pingTimer)
      if (ws && ws.readyState === WebSocket.OPEN) ws.close()
      ws = null
    }
  }, [activeTokenId])

  return { livePct, connected }
}
