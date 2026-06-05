# AI-Native Real-Time OSINT Narrative Intelligence Dashboard

## System Role

You are an AI engineer designing a **next-generation OSINT intelligence command center** — an AI-powered platform that monitors real-time Twitter/X KOL (Key Opinion Leader) information streams and autonomously discovers emerging narratives, events, anomalies, and relationships.

This is NOT a traditional analytics dashboard. It is an **AI Intelligence Operating System** for narrative discovery and tracking.

## Product Identity

The interface should feel like a fusion of:
- **Palantir Gotham** — dense data overlays, entity resolution, operational tempo
- **Bloomberg Terminal** — information density, keyboard-driven workflows, real-time streaming
- **Cyber Threat Intelligence (CTI) platforms** (Recorded Future / Mandiant) — threat actor tracking, campaign timelines
- **Obsidian Graph View** — interactive knowledge graph, backlinks, cluster emergence
- **AI-native OS** (like rabbit r1 / Humane AI Pin interface concepts) — minimal chrome, AI-first interactions

## Visual Language

| Attribute | Specification |
|---|---|
| **Mode** | Dark mode only (#0a0a0f background, #0d1117 panels) |
| **Accent Palette** | Cyber/neon: cyan (#00f0ff), amber (#ffb800), emerald (#00ff88), red alert (#ff3344) |
| **Typography** | Monospace for data (JetBrains Mono), sans-serif for UI (Inter), uppercase condensed for labels |
| **Panel Style** | Subtle glassmorphism (backdrop-blur-sm, border-white/5), minimal borders |
| **Density** | High information density — Bloomberg-level, not Apple-level |
| **Animations** | Subtle and fast (150-300ms transitions), no gratuitous motion. Streaming text animations for AI feed. Pulsing glow on new signals. |
| **Charts** | Dark themed, grid lines at 10% opacity, neon accent for data series |
| **Graph** | Force-directed with neon edge glow, node pulse on new connections |

## Tech Stack

```
Framework:    Next.js 14 (App Router)
Styling:      TailwindCSS 3.4
Components:   shadcn/ui (New York style, dark)
Graph:        Sigma.js v2 (WebGL) with graphology
Charts:       ECharts 5 (dark theme, custom neon colors)
Animation:    Framer Motion 11
Icons:        Lucide React
State:        React hooks + context (no Redux needed)
Data:         TypeScript-first, Zod schemas for data validation
```

## Core Data Model

```typescript
// A narrative cluster — the atomic unit of tracking
interface NarrativeCluster {
  id: string;
  label: string;           // Human-readable name, e.g. "Strait of Hormuz Control"
  category: 'geopolitical' | 'military' | 'economic' | 'tech' | 'diplomatic' | 'domestic';
  velocity: number;        // Growth rate in % over last 6 hours
  momentum: number;        // 0-100 composite score: velocity × signal count × source authority
  signalCount: number;     // Number of related tweets in tracking window
  firstSeen: string;       // ISO timestamp
  lastUpdated: string;     // ISO timestamp
  parentId?: string;       // For sub-narratives
  relatedEntities: string[];
  relatedKOLs: string[];
  narrativeStage: 'emerging' | 'accelerating' | 'peaking' | 'decaying' | 'dormant';
}

// An entity node in the knowledge graph
interface Entity {
  id: string;
  name: string;
  type: 'person' | 'organization' | 'location' | 'event' | 'topic' | 'technology';
  mentions: number;        // Total mentions in tracking window
  momentum: number;        // 0-100
  properties: Record<string, string>;
}

// A KOL (Key Opinion Leader) source
interface KOL {
  id: string;
  handle: string;          // Twitter/X handle
  displayName: string;
  category: 'media' | 'think-tank' | 'military-analyst' | 'government' | 'intelligence' | 'financial';
  authority: number;       // 0-100 credibility score
  narrativeCount: number;  // Number of narratives currently driving
  recentSignals: number;   // Signals in last 24h
}

// A signal event on the timeline
interface SignalEvent {
  id: string;
  timestamp: string;
  source: string;          // KOL handle
  sourceUrl: string;       // Link to tweet
  title: string;           // One-line summary
  description: string;     // AI-generated context
  clusters: string[];      // Associated narrative cluster IDs
  entities: string[];      // Associated entity IDs
  significance: 'critical' | 'high' | 'medium' | 'low';
  contradictionOf?: string; // If this signal contradicts a prior one
}

// AI analyst observation
interface AIObservation {
  id: string;
  timestamp: string;
  type: 'cluster_emergence' | 'narrative_shift' | 'contradiction' | 'correlation' | 'prediction' | 'anomaly';
  title: string;
  content: string;         // Full analysis text
  confidence: number;      // 0-100
  relatedEvents: string[];
}
```

## Module 1: Velocity Heatmap

**Purpose**: Display emerging topic intensity over time as a color-coded matrix.

| Spec | Detail |
|---|---|
| **Rows** | Narrative clusters (top 15 by momentum) |
| **Columns** | 6-hour time buckets, spanning last 72 hours |
| **Color Encoding** | Velocity growth rate: deep blue (negative) → dark (neutral) → amber (growing) → emerald (accelerating) → cyan (surging) |
| **Interaction** | Hover: tooltip with exact velocity %, signal count, key KOLs. Click: filter entire dashboard to this cluster. |
| **Sorting** | Rows sorted by current velocity (highest at top), auto-reorder on update |
| **Animation** | Rows smoothly reorder (layout animation). New cells fade in. |
| **Empty State** | Dark cells with subtle grid lines |

## Module 2: Emerging Topics Leaderboard

**Purpose**: Ranked list of fastest-growing narratives — the "what's hot right now" board.

| Spec | Detail |
|---|---|
| **Layout** | Vertical list, 10 items max |
| **Each Row** | Rank (#1-10), narrative label, velocity badge (+320%), mini sparkline (last 12h), source KOL avatars (3 max), momentum bar |
| **Sorting** | By velocity % (descending), auto-refresh |
| **Velocity Badge** | Colored: emerald (>+200%), amber (100-200%), gray (<100%) |
| **Interaction** | Click to focus cluster. Hover sparkline for detailed tooltip. |
| **Animation** | Ranks smoothly shift on reorder. New entries slide in from top. |

## Module 3: Narrative Relationship Graph

**Purpose**: Interactive force-directed graph showing relationships between entities, topics, events, and KOLs.

| Spec | Detail |
|---|---|
| **Engine** | Sigma.js v2 with graphology, WebGL renderer |
| **Node Types** | Narrative Cluster (hexagon), Entity (circle), KOL (diamond), Event (square) |
| **Node Size** | Proportional to momentum score (log scale) |
| **Node Color** | By category (geopolitical=amber, military=red, economic=emerald, tech=cyan, diplomatic=blue, domestic=gray) |
| **Edges** | Co-occurrence (thin, cyan at 30% opacity), contradiction (dashed, red), parent-child (solid, white at 20%) |
| **Edge Width** | Proportional to co-occurrence frequency |
| **Clustering** | Built-in ForceAtlas2 layout, auto-cluster by connected components |
| **Interaction** | Pan/zoom (mouse), node hover (highlight neighbors), node click (show detail panel), edge hover (show relationship type) |
| **Animations** | New nodes pulse-enter, edges draw in, clusters gently settle |
| **Legend** | Collapsible legend panel, bottom-right |

## Module 4: AI Analyst Feed

**Purpose**: Autonomous AI-generated intelligence observations, styled as a real-time analyst terminal.

| Spec | Detail |
|---|---|
| **Layout** | Vertical scrolling feed, newest at top, max 20 visible |
| **Each Card** | Timestamp (top-right, monospace), AI avatar (left), observation type badge, title (bold), content preview (2 lines), expand to full |
| **Type Badges** | Color-coded: CLUSTER_EMERGENCE (emerald), NARRATIVE_SHIFT (amber), CONTRADICTION (red), CORRELATION (cyan), PREDICTION (purple), ANOMALY (red pulsing) |
| **Streaming Effect** | New observations "type themselves in" with a subtle character-by-character reveal (300ms stagger) |
| **Auto-scroll** | Smooth scroll to top on new observation arrival |
| **Interaction** | Click card to expand full analysis. Click "focus" to filter dashboard. |
| **Generate Cadence** | New observations appear every 8-15 seconds (simulated) |

## Module 5: Timeline Evolution

**Purpose**: Chronological propagation timeline showing how narratives evolve through events.

| Spec | Detail |
|---|---|
| **Layout** | Horizontal scrolling timeline (ECharts custom timeline or custom component) |
| **X-axis** | Time (last 72 hours), granularity at 1-hour ticks |
| **Y-layers** | One swimlane per narrative cluster |
| **Markers** | Diamond shapes at event timestamps, sized by significance, colored by cluster |
| **Connections** | Dashed vertical lines connecting related events across lanes |
| **Contradictions** | Red lightning-bolt icons between contradictory events |
| **Interaction** | Scroll/pan horizontally, click marker to see event detail, hover for summary |
| **Current Time Line** | Vertical cyan line at "now", pulsing |

## Module 6: KOL Influence Panel

**Purpose**: Show which KOLs (Twitter/X accounts) are driving narrative acceleration.

| Spec | Detail |
|---|---|
| **Layout** | Grid of KOL cards (3 columns), sortable |
| **Each Card** | Avatar, handle, display name, authority score (mini bar), narratives driven (count), recent signals (count), mini sparkline of activity |
| **Sorting** | By influence score (authority × signal count × narrative diversity) |
| **Filtering** | By category (media, think-tank, military-analyst, etc.) |
| **Interaction** | Click to focus this KOL's signals. Hover to see recent tweet summaries. |
| **Animation** | Cards reorder on sort change |

## Global UX Requirements

### Real-Time Feel
- **Simulated Data Stream**: Every 5-10 seconds, inject 1-3 new signal events, update velocities, recalculate momentum
- **Last Updated Counter**: Top-right corner shows "LIVE" pulsing indicator + "Last update: 3s ago"
- **Notification Toasts**: Subtle top-right toasts for critical new signals ("CRITICAL: Iran contradicts Strait narrative")

### Layout (Desktop 1440px+)
```
┌──────────────────────────────────────────────────────────┐
│  HEADER: Logo | LIVE indicator | Clock UTC | Settings ⚙  │
├────────────────────┬─────────────────────────────────────┤
│  VELOCITY HEATMAP  │  EMERGING TOPICS LEADERBOARD         │
│  (70% width)       │  (30% width)                        │
│  15 rows × 12 cols │  Top 10 narratives                  │
├────────────────────┴─────────────────────────────────────┤
│  NARRATIVE RELATIONSHIP GRAPH (full width, 400px height)  │
│  Force-directed interactive graph                         │
├────────────────────────────┬────────────────────────────┤
│  AI ANALYST FEED           │  TIMELINE EVOLUTION         │
│  (40% width, scroll)       │  (60% width, horizontal)    │
├────────────────────────────┴────────────────────────────┤
│  KOL INFLUENCE PANEL (full width, horizontal scroll)      │
│  KOL cards in a row                                       │
└──────────────────────────────────────────────────────────┘
```

### Responsive Breakpoints
- **≥1440px**: Full layout as above
- **1024-1439px**: Heatmap full-width, leaderboard below, graph half-height, feed+timeline stacked
- **<1024px**: Single column, modules stack vertically, graph collapses to mini view

### Keyboard Shortcuts
- `1-6`: Focus module 1-6
- `F`: Focus search (filter narratives)
- `Esc`: Clear focus
- `Space`: Pause/resume live feed
- `← →`: Navigate timeline

## Mock Data Requirements

Generate realistic mock data covering these narrative domains:
- **Tech/AI**: NVIDIA Blackwell architecture, CUDA ecosystem, GPU supply chain, AI datacenter investments
- **Geopolitics**: Strait of Hormuz control, Iran-US negotiations, Pakistan mediation, IRGC statements
- **Military**: US carrier groups, airstrike analysis, force posture changes
- **Economic**: Oil shipping disruptions, Singapore fuel emergencies, semiconductor export controls
- **Diplomatic**: Ceasefire negotiations, think-tank position papers, multilateral talks

Mock data should:
- Include 30-50 entities, 15-20 narrative clusters, 12-15 KOLs, 100+ signal events spanning 72 hours
- Show realistic narrative evolution: emergence → acceleration → peak → decay
- Include 3-4 contradictions between sources for the AI Feed to detect
- Have varying velocities (-50% to +400%)

## Implementation Notes

1. **No API calls** — all data is mock, served from static TypeScript modules
2. **useRef for intervals** — manage simulated data streams with useRef + useEffect cleanup
3. **Sigma.js in useEffect** — initialize graph in useEffect with cleanup, watch data changes
4. **ECharts dark theme** — register custom dark theme with neon accent colors
5. **shadcn/ui components** — use Card, Badge, Tooltip, ScrollArea, Tabs, DropdownMenu
6. **Framer Motion** — AnimatePresence for list reordering, layout animations for dashboard panels
7. **Performance** — use React.memo on heavy components (graph, heatmap), useMemo for data transformations

## Deliverable

A single-page Next.js application at `/work/osint-dashboard/` that:
- `npm install && npm run dev` runs successfully
- Displays all 6 modules with mock data
- Feels like a real-time intelligence platform
- Has the "AI intelligence OS" aesthetic

---

## Appendix: Narrative Tracking Context (for reference)

This dashboard is designed for a continuous intelligence analysis workflow where:
- Twitter/X KOL tweets arrive in hourly batches
- Each batch is analyzed for narrative signals
- Narratives are tracked across batches (cross-batch narrative matrix)
- Key tracking dimensions include: narrative contradictions, mediation roles, military escalation spirals, economic spillover, diplomatic isolation
- Analysis is written to markdown files and pushed to the user
- The dashboard provides visual situational awareness to complement the text analysis
