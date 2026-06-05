/**
 * Polymarket Data Bridge - Background Script
 * 负责从浏览器直接调用 Polymarket API，返回数据给前端
 */

const GAMMA_API = 'https://gamma-api.polymarket.com';
const CLOB_API = 'https://clob.polymarket.com';

const CACHE_TTL = 60000; // 1分钟缓存
const cache = new Map();

/**
 * 解析 Polymarket URL 或 slug
 */
function parsePolymarketInput(input) {
  const s = input.trim();
  if (s.includes('polymarket.com')) {
    const i = s.indexOf('/event/');
    if (i >= 0) {
      const rest = s.slice(i + '/event/'.length);
      const end = rest.search(/[/?#]/);
      if (end >= 0) return rest.slice(0, end).trim();
      return rest.trim();
    }
  }
  if (s.startsWith('http://') || s.startsWith('https://')) return '';
  return s;
}

/**
 * 选取主市场（成交量最高的活跃市场）
 */
function pickPrimaryMarket(event) {
  let best = null;
  let bestVol = 0;
  for (const m of event.markets) {
    if (m.closed || !m.active) continue;
    const v = m.volumeNum || m.volume24hr;
    if (!best || v > bestVol) {
      best = m;
      bestVol = v;
    }
  }
  if (best) return best;
  return event.markets?.[0] ?? null;
}

/**
 * 解析 CLOB Token IDs
 */
function parseClobTokenIds(jsonStr) {
  const s = jsonStr?.trim();
  if (!s) return [];
  try {
    return JSON.parse(s);
  } catch {
    return [];
  }
}

/**
 * 解析赔率数据
 */
function parseOutcomePrices(jsonStr) {
  const s = jsonStr?.trim();
  if (!s) return { yes: 0, no: 0 };
  try {
    const prices = JSON.parse(s);
    if (Array.isArray(prices) && typeof prices[0] === 'string') {
      const y = parseFloat(prices[0]) * 100;
      const n = prices.length >= 2 ? parseFloat(prices[1]) * 100 : (1 - parseFloat(prices[0])) * 100;
      return { yes: y, no: n };
    }
    if (Array.isArray(prices)) {
      const y = prices[0] * 100;
      const n = prices.length >= 2 ? prices[1] * 100 : (1 - prices[0]) * 100;
      return { yes: y, no: n };
    }
  } catch {}
  return { yes: 0, no: 0 };
}

/**
 * 获取规则和背景信息
 */
function getRulesAndBackground(event, market) {
  let rules = market?.description?.trim() || event.description?.trim() || '';
  if (!rules && event.markets?.length) {
    let best = '';
    for (const m of event.markets) {
      const d = m.description?.trim() || '';
      if (d.length > best.length) best = d;
    }
    rules = best;
  }

  let background = '';
  if (event.eventMetadata) {
    background = event.eventMetadata.context_description?.trim() || event.eventMetadata.contextDescription?.trim() || '';
  }
  if (!background && event.description?.trim() && event.description?.trim() !== rules) {
    background = event.description.trim();
  }

  return { rules, background };
}

/**
 * 从 Gamma API 获取事件数据
 */
async function fetchEventFromGamma(slug) {
  const cacheKey = `event_${slug}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return cached.data;
  }

  const url = `${GAMMA_API}/events?slug=${encodeURIComponent(slug)}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Gamma API error: ${res.status}`);
  }
  const events = await res.json();
  if (!events?.length) {
    throw new Error('Event not found');
  }

  const data = events[0];
  cache.set(cacheKey, { data, ts: Date.now() });
  return data;
}

/**
 * 转换数据格式为后端 save 接口所需格式
 */
function transformToSaveFormat(event, market) {
  const { rules, background } = getRulesAndBackground(event, market);
  const tokens = parseClobTokenIds(market?.clobTokenIds);
  const { yes, no } = parseOutcomePrices(market?.outcomePrices);
  const vol = market?.volumeNum || event.volume;
  const img = event.image || event.icon;

  return {
    eventSlug: event.slug,
    eventId: event.id,
    conditionId: market?.conditionId || '',
    marketSlug: market?.slug || '',
    title: event.title,
    imageUrl: img,
    clobTokenIds: tokens,
    yesPct: yes,
    noPct: no,
    volume: vol,
    rules,
    background
  };
}

/**
 * 转换数据格式为 resolve 接口返回格式
 */
function transformToResolveFormat(event, market, input) {
  const { rules, background } = getRulesAndBackground(event, market);
  const tokens = parseClobTokenIds(market?.clobTokenIds);
  const { yes, no } = parseOutcomePrices(market?.outcomePrices);
  const vol = market?.volumeNum || event.volume;
  const img = event.image || event.icon;

  return {
    input,
    eventSlug: event.slug,
    eventId: event.id,
    title: event.title,
    imageUrl: img,
    eventVolume: event.volume,
    rules,
    background,
    market: {
      conditionId: market?.conditionId || '',
      marketSlug: market?.slug || '',
      question: market?.question || '',
      clobTokenIds: tokens,
      yesPct: yes,
      noPct: no,
      volume: vol
    }
  };
}

/**
 * 获取价格历史
 * 需要先获取 tokenId，再通过 prices-history 接口获取历史数据
 */
async function fetchPriceHistory(conditionId, outcome, timeframe) {
  console.log('[Plugin] fetchPriceHistory called:', { conditionId, outcome, timeframe });

  const cacheKey = `history_${conditionId}_${outcome}_${timeframe}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    console.log('[Plugin] Price history from cache:', cacheKey, cached.data.points?.length, 'points');
    return cached.data;
  }

  console.log('[Plugin] Fetching market info from Gamma API...');
  // 先通过 gamma 获取 tokenId
  const marketUrl = `${GAMMA_API}/markets?condition_ids=${encodeURIComponent(conditionId)}`;
  const marketRes = await fetch(marketUrl);
  if (!marketRes.ok) {
    console.error('[Plugin] Gamma API error:', marketRes.status, marketRes.statusText);
    throw new Error(`Gamma API error: ${marketRes.status}`);
  }
  const markets = await marketRes.json();
  console.log('[Plugin] Gamma API response:', markets?.length, 'markets');
  if (!markets?.length) {
    throw new Error('Market not found');
  }

  const tokens = parseClobTokenIds(markets[0].clobTokenIds);
  console.log('[Plugin] Parsed tokens:', tokens);
  if (tokens.length < 2) {
    throw new Error('Missing token IDs');
  }

  const tokenId = outcome === 'no' ? tokens[1] : tokens[0];
  console.log('[Plugin] Selected tokenId:', tokenId, 'for outcome:', outcome);

  // 根据 timeframe 设置 interval 和 fidelity
  let interval = '1d', fidelity = 15;
  const tf = (timeframe || '').toUpperCase();
  if (tf === 'ALL' || tf === 'MAX') {
    interval = 'max'; fidelity = 1440;
  } else if (tf === '24H' || tf === '1D' || tf === '') {
    interval = '1d'; fidelity = 15;
  } else if (tf === '7D') {
    interval = '7d'; fidelity = 60;
  } else if (tf === '1M' || tf === '30D') {
    interval = '30d'; fidelity = 240;
  }

  console.log('[Plugin] Fetching price history from CLOB API...');
  // 获取价格历史
  const historyUrl = `${CLOB_API}/prices-history?market=${tokenId}&interval=${interval}&fidelity=${fidelity}`;
  console.log('[Plugin] History URL:', historyUrl);
  const historyRes = await fetch(historyUrl);
  if (!historyRes.ok) {
    console.error('[Plugin] CLOB history API error:', historyRes.status, historyRes.statusText);
    throw new Error(`CLOB history API error: ${historyRes.status}`);
  }
  const historyData = await historyRes.json();
  console.log('[Plugin] CLOB history response:', historyData?.history?.length, 'points');

  const result = {
    conditionId,
    tokenId,
    outcome,
    timeframe: tf || '1D',
    points: (historyData?.history || [])
      .map(p => ({
        t: p.t || p.timestamp || Math.floor(new Date(p.date).getTime() / 1000),
        p: p.p || p.price || 0
      }))
      // 去重：相同时间戳只保留最后一个
      .reduce((acc, curr) => {
        const existing = acc.find(p => p.t === curr.t);
        if (existing) {
          existing.p = curr.p;
        } else {
          acc.push(curr);
        }
        return acc;
      }, [])
      // 按时间升序排序
      .sort((a, b) => a.t - b.t)
  };

  cache.set(cacheKey, { data: result, ts: Date.now() });
  return result;
}

// 监听前端消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'FETCH_EVENT') {
    handleFetchEvent(request.input)
      .then(data => sendResponse({ success: true, data }))
      .catch(err => sendResponse({ success: false, error: err.message }));
    return true;
  }

  if (request.type === 'FETCH_SAVE_DATA') {
    handleFetchSaveData(request.input)
      .then(data => sendResponse({ success: true, data }))
      .catch(err => sendResponse({ success: false, error: err.message }));
    return true;
  }

  if (request.type === 'FETCH_PRICE_HISTORY') {
    handleFetchPriceHistory(request.conditionId, request.outcome, request.timeframe)
      .then(data => sendResponse({ success: true, data }))
      .catch(err => sendResponse({ success: false, error: err.message }));
    return true;
  }

  if (request.type === 'CHECK_PLUGIN') {
    sendResponse({ success: true, available: true });
    return true;
  }

  return false;
});

/**
 * 处理获取事件数据（resolve 格式）
 */
async function handleFetchEvent(input) {
  const slug = parsePolymarketInput(input);
  if (!slug) {
    throw new Error('无法解析 Polymarket 链接或 slug');
  }

  const event = await fetchEventFromGamma(slug);
  const market = pickPrimaryMarket(event);

  if (!market) {
    throw new Error('该事件没有可用市场');
  }

  if (!market.clobTokenIds) {
    throw new Error('缺少 CLOB Token ID');
  }

  return transformToResolveFormat(event, market, input);
}

/**
 * 处理获取保存数据（save 格式）
 */
async function handleFetchSaveData(input) {
  const slug = parsePolymarketInput(input);
  if (!slug) {
    throw new Error('无法解析 Polymarket 链接或 slug');
  }

  const event = await fetchEventFromGamma(slug);
  const market = pickPrimaryMarket(event);

  if (!market) {
    throw new Error('该事件没有可用市场');
  }

  if (!market.clobTokenIds) {
    throw new Error('缺少 CLOB Token ID');
  }

  return transformToSaveFormat(event, market);
}

/**
 * 处理获取价格历史
 */
async function handleFetchPriceHistory(conditionId, outcome, timeframe) {
  return fetchPriceHistory(conditionId, outcome, timeframe || '1d');
}

// 清理过期缓存（每5分钟）
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of cache.entries()) {
    if (now - val.ts > CACHE_TTL * 2) {
      cache.delete(key);
    }
  }
}, 300000);

console.log('[Polymarket Bridge] Plugin loaded');