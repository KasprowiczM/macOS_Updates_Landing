/**
 * Flight director wall display: the page section.
 *
 * A tall track with a sticky screen. Scroll progress through the track is
 * mapped to a Remotion frame (PlayerRef.seekTo). The Player and composition
 * live in a lazy chunk (WallPlayer) that mounts about one viewport before the
 * section. Before that, during SSR, for reduced-motion users and if the chunk
 * fails, the section renders a static console board: a semantic <ol> of the
 * seven stations. That list stays in the DOM (visually hidden) while the
 * animated screen is shown, so screen readers and crawlers always get it.
 */
import {
  Component,
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'
import type { CSSProperties, ReactNode } from 'react'
import type { PlayerRef } from '@remotion/player'
import { useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import {
  WALL_DURATION,
  WALL_SIZE,
  WALL_STATIONS,
  rowIsInformative,
  rowReadout,
  stationFinalLabel,
  stationOutcome,
  useWallLabels,
} from './labels'
import type { WallLabels, WallLayout, WallStation } from './labels'

const WallPlayer = lazy(() => import('./WallPlayer'))

/* ── Environment, read without touching window during render ─ */

const MOBILE_QUERY = '(max-width: 767.98px)'

function subscribeNever(): () => void {
  return () => {}
}

function subscribeLayout(onChange: () => void): () => void {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return () => {}
  const query = window.matchMedia(MOBILE_QUERY)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

function getLayout(): WallLayout {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return 'landscape'
  return window.matchMedia(MOBILE_QUERY).matches ? 'portrait' : 'landscape'
}

function getServerLayout(): WallLayout {
  return 'landscape'
}

function toFrame(progress: number): number {
  return Math.min(WALL_DURATION - 1, Math.max(0, Math.round(progress * (WALL_DURATION - 1))))
}

/* ── Error boundary: a failed chunk falls back to the static board ─ */

class PlayerBoundary extends Component<
  { onError: () => void; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError(): { failed: boolean } {
    return { failed: true }
  }

  componentDidCatch(): void {
    this.props.onError()
  }

  render(): ReactNode {
    return this.state.failed ? null : this.props.children
  }
}

/* ── Static console board (semantic list) ─────────────────── */

const SCREEN = {
  bg: 'var(--screen-bg, #0B1621)',
  elev: 'var(--screen-elev, #112131)',
  rule: 'var(--screen-rule, #1F3347)',
  fg: 'var(--screen-fg, #D9E6F2)',
  dim: 'var(--screen-dim, #7D93A8)',
  go: 'var(--screen-go, #5DB0FF)',
  hold: 'var(--screen-hold, #F2B544)',
} as const

const FONT_SANS = 'var(--font-sans, "Archivo Variable", system-ui)'
const FONT_MONO = 'var(--font-mono, "Martian Mono Variable", ui-monospace)'

const PLACARD: CSSProperties = {
  fontFamily: FONT_SANS,
  textTransform: 'uppercase',
  fontStretch: '125%',
  fontWeight: 600,
  letterSpacing: '0.06em',
}

function StationItem({
  station,
  index,
  labels,
  compact,
}: {
  station: WallStation
  index: number
  labels: WallLabels
  compact: boolean
}) {
  const outcome = stationOutcome(station)
  const detail = compact ? 'sr-only' : undefined
  return (
    <li
      className={`grid grid-cols-[2rem_minmax(0,1fr)_auto] items-start gap-x-3 px-4 py-3 md:px-5 md:py-4 ${
        compact ? 'flex-1 items-center' : ''
      }`}
      style={{ borderTop: index === 0 ? 'none' : `1px solid ${SCREEN.rule}` }}
    >
      <span
        className="pt-1 text-xs"
        style={{ fontFamily: FONT_MONO, fontVariantNumeric: 'tabular-nums', color: SCREEN.dim }}
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="min-w-0">
        <p className="text-sm md:text-base" style={{ ...PLACARD, textTransform: 'none', color: SCREEN.fg }}>
          {labels[station.name]}
        </p>
        <p
          className={`mt-1 text-sm leading-snug ${detail ?? ''}`}
          style={{ fontFamily: FONT_SANS, color: SCREEN.dim }}
        >
          {labels[station.desc]}
        </p>
        {station.rows.map((row) => {
          if (!rowIsInformative(station, row)) return null
          const text = rowReadout(row, labels)
          return text ? (
            <p
              key={row.id}
              className={`mt-1.5 text-[0.8125rem] leading-snug ${detail ?? ''}`}
              style={{ fontFamily: FONT_SANS, color: row.outcome === 'hold' ? SCREEN.hold : SCREEN.fg }}
            >
              {text}
            </p>
          ) : null
        })}
        {station.note ? (
          <p
            className={`mt-1.5 text-[0.8125rem] leading-snug ${detail ?? ''}`}
            style={{ fontFamily: FONT_SANS, color: SCREEN.fg }}
          >
            {labels[station.note]}
          </p>
        ) : null}
      </div>
      <span
        className="inline-flex h-7 min-w-[4.5rem] items-center justify-center whitespace-nowrap px-3 text-xs"
        style={{
          ...PLACARD,
          borderRadius: 2,
          background: outcome === 'hold' ? SCREEN.hold : outcome === 'standby' ? 'transparent' : SCREEN.go,
          border: outcome === 'standby' ? `1px solid ${SCREEN.dim}` : undefined,
          color: outcome === 'standby' ? SCREEN.fg : SCREEN.bg,
        }}
      >
        {stationFinalLabel(station, labels)}
      </span>
    </li>
  )
}

function StationList({
  labels,
  mode,
}: {
  labels: WallLabels
  /** flow: normal block. fill: absolute, clipped placeholder. hidden: screen reader only. */
  mode: 'flow' | 'fill' | 'hidden'
}) {
  const layoutClass =
    mode === 'hidden'
      ? 'sr-only'
      : mode === 'fill'
        ? 'absolute inset-0 flex flex-col overflow-hidden'
        : 'flex flex-col'
  return (
    <ol
      role="list"
      aria-label={labels['wall.listLabel']}
      className={`m-0 list-none p-0 ${layoutClass}`}
      style={
        mode === 'hidden'
          ? undefined
          : {
              background: SCREEN.bg,
              color: SCREEN.fg,
              border: `1px solid ${SCREEN.rule}`,
              borderRadius: 2,
            }
      }
    >
      {WALL_STATIONS.map((station, index) => (
        <StationItem
          key={station.id}
          station={station}
          index={index}
          labels={labels}
          compact={mode === 'fill'}
        />
      ))}
    </ol>
  )
}

/* ── Section ──────────────────────────────────────────────── */

/** Viewport height not available to the screen: nav clearance, padding, caption row. */
const RESERVED_PX = 140

export function WallDisplay() {
  const labels = useWallLabels()
  const reduceMotion = useReducedMotion()
  const headingId = useId()

  const isClient = useSyncExternalStore(subscribeNever, () => true, () => false)
  const layout = useSyncExternalStore(subscribeLayout, getLayout, getServerLayout)

  const [failed, setFailed] = useState(false)
  const [near, setNear] = useState(false)
  const [playerReady, setPlayerReady] = useState(false)

  const scrub = isClient && !reduceMotion && !failed
  const showScreen = scrub && playerReady

  const trackRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<PlayerRef | null>(null)
  const lastFrame = useRef(-1)

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })

  // Scroll position becomes the Remotion frame. No scroll listener, no React state per frame.
  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (!scrub) return
    const frame = toFrame(progress)
    if (frame === lastFrame.current) return
    lastFrame.current = frame
    playerRef.current?.seekTo(frame)
  })

  const getInitialFrame = useCallback(() => {
    const frame = toFrame(scrollYProgress.get())
    lastFrame.current = frame
    return frame
  }, [scrollYProgress])

  const handleReady = useCallback(() => setPlayerReady(true), [])
  const handleError = useCallback(() => setFailed(true), [])

  // Mount the Player (and fetch its chunk) once the track is within about one viewport.
  useEffect(() => {
    const track = trackRef.current
    if (!scrub || near || !track || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true)
          observer.disconnect()
        }
      },
      { rootMargin: '100% 0px 100% 0px' },
    )
    observer.observe(track)
    return () => observer.disconnect()
  }, [scrub, near])

  const portrait = layout === 'portrait'
  const aspect = portrait ? WALL_SIZE.portrait.width / WALL_SIZE.portrait.height : 16 / 9
  const stageStyle: CSSProperties = scrub
    ? {
        aspectRatio: portrait
          ? `${WALL_SIZE.portrait.width} / ${WALL_SIZE.portrait.height}`
          : `${WALL_SIZE.landscape.width} / ${WALL_SIZE.landscape.height}`,
        width: `min(100%, calc((100svh - ${RESERVED_PX}px) * ${aspect}))`,
      }
    : {}

  return (
    <section id="wall" aria-labelledby={headingId} className="border-t border-(--rule)">
      <header className="mx-auto max-w-7xl px-4 pb-10 pt-20 sm:px-6 md:pb-14 md:pt-28 lg:px-8">
        <h2 id={headingId} className="m-0 max-w-[20ch]">
          {labels['wall.heading']}
        </h2>
        <p className="mt-5 max-w-[40rem]" style={{ color: 'var(--fg-muted, inherit)' }}>
          {labels['wall.intro']}
        </p>
      </header>

      <div ref={trackRef} className={scrub ? 'relative h-[340svh] md:h-[380svh]' : 'relative'}>
        <div
          className={
            scrub
              ? 'sticky top-0 flex h-[100svh] flex-col items-center justify-center gap-3 px-4 pb-4 pt-20 md:px-8'
              : 'mx-auto flex max-w-7xl flex-col gap-4 px-4 pb-24 sm:px-6 lg:px-8'
          }
        >
          <div
            className="relative mx-auto w-full"
            style={stageStyle}
          >
            {scrub && near ? (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 select-none"
                style={{ opacity: playerReady ? 1 : 0 }}
              >
                <PlayerBoundary onError={handleError}>
                  <Suspense fallback={null}>
                    <WallPlayer
                      playerRef={playerRef}
                      labels={labels}
                      layout={layout}
                      getInitialFrame={getInitialFrame}
                      onReady={handleReady}
                    />
                  </Suspense>
                </PlayerBoundary>
              </div>
            ) : null}
            <StationList
              labels={labels}
              mode={showScreen ? 'hidden' : scrub ? 'fill' : 'flow'}
            />
          </div>

          <div className="flex w-full items-center justify-between gap-4 text-[0.8125rem]">
            <p className="m-0" style={{ color: 'var(--fg-muted, inherit)' }}>
              {labels['wall.caption']}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
