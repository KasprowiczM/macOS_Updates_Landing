/**
 * Recorded update workflow: the page section.
 *
 * On desktop, a tall track holds a sticky workflow. Scroll progress is
 * mapped to a Remotion frame (PlayerRef.seekTo). The Player and composition
 * live in a lazy chunk (WallPlayer) that mounts about one viewport before the
 * section. Before that, during SSR, for reduced-motion users and if the chunk
 * fails, the section renders a native semantic <ol> of the
 * seven steps. That list stays in the DOM (visually hidden) while the
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
import { CONTAINER } from '../sections/layout'

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

function StationItem({ station, index, labels, compact }: {
  station: WallStation; index: number; labels: WallLabels; compact: boolean
}) {
  const outcome = stationOutcome(station)
  return <li className={`workflow-step ${compact ? 'workflow-step-compact' : ''}`}>
    <span className="workflow-step-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
    <div className="workflow-step-content">
      <h3>{labels[station.name]}</h3>
      <p className={compact ? 'sr-only' : undefined}>{labels[station.desc]}</p>
      {station.rows.map(row => {
        if (!rowIsInformative(station, row)) return null
        const text = rowReadout(row, labels)
        return text ? <p key={row.id} className={`${compact ? 'sr-only' : 'workflow-step-result'} ${row.outcome === 'hold' ? 'workflow-step-warning' : ''}`}>{text}</p> : null
      })}
      {station.note && <p className={compact ? 'sr-only' : 'workflow-step-note'}>{labels[station.note]}</p>}
    </div>
    <span className={`workflow-step-status workflow-step-status-${outcome}`}>{stationFinalLabel(station, labels)}</span>
  </li>
}

function StationList({ labels, mode }: {
  labels: WallLabels; mode: 'flow' | 'fill' | 'hidden'
}) {
  return <ol role="list" aria-label={labels['wall.listLabel']} className={
    mode === 'hidden' ? 'sr-only' : `workflow-static ${mode === 'fill' ? 'absolute inset-0 overflow-hidden' : ''}`
  }>
    {WALL_STATIONS.map((station, index) => <StationItem key={station.id} station={station} index={index} labels={labels} compact={mode === 'fill'} />)}
  </ol>
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

  const scrub = isClient && !reduceMotion && !failed && layout === 'landscape'
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
      <header className={`${CONTAINER} pb-10 pt-20 md:pb-14 md:pt-28`}>
        <h2 id={headingId} className="m-0 max-w-[20ch]">
          {labels['wall.heading']}
        </h2>
        <p className="mt-5 max-w-[40rem]" style={{ color: 'var(--fg-muted, inherit)' }}>
          {labels['wall.intro']}
        </p>
      </header>

      <div ref={trackRef} className={scrub ? 'relative h-[260svh]' : 'relative'}>
        <div
          className={
            scrub
              ? 'sticky top-0 flex h-[100svh] w-full items-center justify-center px-4 pb-4 pt-20 sm:px-6 lg:px-8'
              : `${CONTAINER} flex flex-col gap-4 pb-24`
          }
        >
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-3">
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

            <div
              className="mx-auto flex items-center justify-between gap-4 text-[0.8125rem]"
              style={{ width: stageStyle.width ?? '100%', maxWidth: '100%' }}
            >
              <p className="m-0" style={{ color: 'var(--fg-muted, inherit)' }}>
                {labels['wall.caption']}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
