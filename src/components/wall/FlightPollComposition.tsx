/**
 * Flight director poll: the Remotion composition behind the wall display.
 *
 * A pure function of the current frame. The page scroll position seeks the
 * Player, so this file never reads time, scroll or window state.
 *
 * Visual rules: a dark "screen" in both site themes, sharp 2px corners,
 * hairline rules, one accent (GO blue), amber only for HOLD. No glow.
 */
import { Fragment } from 'react'
import type { CSSProperties, FC, ReactNode } from 'react'
import { AbsoluteFill, Easing, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import {
  WALL_STATIONS,
  stationConfirm,
  stationOutcome,
  stationStart,
} from './labels'
import type { WallLabels, WallLayout, WallRow, WallStation } from './labels'

export type FlightPollProps = {
  labels: WallLabels
  layout: WallLayout
}

/* ── Tokens ───────────────────────────────────────────────── */

const C = {
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
  lineHeight: 1,
}

const MONO: CSSProperties = {
  fontFamily: FONT_MONO,
  fontVariantNumeric: 'tabular-nums',
}

interface Metrics {
  pad: number
  title: number
  status: number
  clockLabel: number
  clock: number
  headerH: number
  stripH: number
  stripGap: number
  indexW: number
  index: number
  name: number
  line: number
  mono: number
  tag: number
  tileH: number
  tileFont: number
  tileSuffix: number
  tileW: number
  tileWideW: number
  rowH: number
  rowPadY: number
  rowPadX: number
  marker: number
  count: number
  countLabel: number
}

const METRICS: Record<WallLayout, Metrics> = {
  landscape: {
    pad: 44,
    title: 22,
    status: 16,
    clockLabel: 15,
    clock: 64,
    headerH: 92,
    stripH: 8,
    stripGap: 6,
    indexW: 46,
    index: 16,
    name: 25,
    line: 19,
    mono: 19,
    tag: 13,
    tileH: 30,
    tileFont: 16,
    tileSuffix: 12,
    tileW: 150,
    tileWideW: 172,
    rowH: 72,
    rowPadY: 5,
    rowPadX: 18,
    marker: 12,
    count: 58,
    countLabel: 15,
  },
  portrait: {
    pad: 36,
    title: 28,
    status: 22,
    clockLabel: 22,
    clock: 76,
    headerH: 130,
    stripH: 12,
    stripGap: 8,
    indexW: 68,
    index: 26,
    name: 38,
    line: 28,
    mono: 28,
    tag: 20,
    tileH: 42,
    tileFont: 24,
    tileSuffix: 18,
    tileW: 232,
    tileWideW: 262,
    rowH: 96,
    rowPadY: 6,
    rowPadX: 18,
    marker: 18,
    count: 60,
    countLabel: 22,
  },
}

/* ── Motion helpers ───────────────────────────────────────── */

const EASE = Easing.bezier(0.16, 1, 0.3, 1)

/** 0 → 1 between two frames, ease-out, clamped. */
function ramp(frame: number, from: number, to: number): number {
  return interpolate(frame, [from, to], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE,
  })
}

/** 0 → 1 between two frames, linear, clamped. */
function linear(frame: number, from: number, to: number): number {
  return interpolate(frame, [from, to], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
}

const LAST = WALL_STATIONS[WALL_STATIONS.length - 1]
const RUN_START = stationStart(WALL_STATIONS[0])
const RUN_END = stationConfirm(LAST)
const STATION_COUNT = WALL_STATIONS.length

function outcomeColor(outcome: 'go' | 'hold'): string {
  return outcome === 'hold' ? C.hold : C.go
}

/* ── Roll: a clipped slot that scrolls from one text to the next ── */

const RollText: FC<{ from: string; to: string; at: number; duration?: number }> = ({
  from,
  to,
  at,
  duration = 9,
}) => {
  const frame = useCurrentFrame()
  if (from === to) return <span style={{ whiteSpace: 'pre' }}>{to}</span>
  const p = ramp(frame, at, at + duration)
  const width = from.length + (to.length - from.length) * p
  const slot: CSSProperties = { position: 'absolute', left: 0, top: 0, whiteSpace: 'pre' }
  return (
    <span
      style={{
        display: 'inline-block',
        position: 'relative',
        overflow: 'hidden',
        verticalAlign: 'bottom',
        height: '1.25em',
        lineHeight: '1.25em',
        width: `${width}ch`,
      }}
    >
      <span style={{ ...slot, translate: `0 ${-p * 100}%` }}>{from}</span>
      <span style={{ ...slot, translate: `0 ${(1 - p) * 100}%` }}>{to}</span>
    </span>
  )
}

/** Version number that flips digit group by group, left to right. */
const Version: FC<{ from: string; to: string; at: number }> = ({ from, to, at }) => {
  const a = from.split('.')
  const b = to.split('.')
  return (
    <span style={MONO}>
      {a.map((group, i) => (
        <Fragment key={i}>
          {i > 0 ? '.' : null}
          <RollText from={group} to={b[i] ?? group} at={at + i * 5} />
        </Fragment>
      ))}
    </span>
  )
}

/* ── Backdrop: the plotting grid ──────────────────────────── */

const Backdrop: FC<{ width: number; height: number }> = ({ width, height }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    style={{ position: 'absolute', inset: 0 }}
    aria-hidden="true"
  >
    <defs>
      <pattern id="wall-grid-minor" width="25" height="25" patternUnits="userSpaceOnUse">
        <path d="M25 0H0V25" fill="none" style={{ stroke: C.rule }} strokeWidth="1" opacity="0.35" />
      </pattern>
      <pattern id="wall-grid-major" width="100" height="100" patternUnits="userSpaceOnUse">
        <path d="M100 0H0V100" fill="none" style={{ stroke: C.rule }} strokeWidth="1" opacity="0.8" />
      </pattern>
    </defs>
    <rect width={width} height={height} fill="url(#wall-grid-minor)" />
    <rect width={width} height={height} fill="url(#wall-grid-major)" />
  </svg>
)

/* ── Header: title, status, T-minus ───────────────────────── */

function clockState(frame: number): { sec: number; prev: number; at: number } {
  const marks = [...WALL_STATIONS.slice(1).map(stationStart), RUN_END]
  const passed = marks.filter((mark) => frame >= mark).length
  const sec = Math.max(0, STATION_COUNT - passed)
  return { sec, prev: Math.min(STATION_COUNT, sec + 1), at: passed > 0 ? marks[passed - 1] : 0 }
}

const Header: FC<{ m: Metrics; labels: WallLabels; frame: number; layout: WallLayout }> = ({
  m,
  labels,
  frame,
  layout,
}) => {
  const done = frame >= RUN_END
  const { sec, prev, at } = clockState(frame)
  return (
    <div
      style={{
        position: 'absolute',
        left: m.pad,
        right: m.pad,
        top: m.pad,
        height: m.headerH,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: layout === 'portrait' ? 'flex-start' : 'flex-end',
        gap: 24,
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div style={{ ...PLACARD, fontSize: m.title, color: C.fg, lineHeight: 1.15 }}>
          {labels['wall.screen.title']}
        </div>
        <div
          style={{
            ...MONO,
            fontSize: m.status,
            color: C.dim,
            marginTop: layout === 'portrait' ? 14 : 10,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            lineHeight: 1.3,
          }}
        >
          <span
            style={{
              flex: 'none',
              width: m.status * 0.6,
              height: m.status * 0.6,
              borderRadius: 1,
              background: done ? C.go : 'transparent',
              border: `2px solid ${done ? C.go : C.dim}`,
            }}
          />
          <span>{done ? labels['wall.screen.complete'] : labels['wall.screen.running']}</span>
        </div>
      </div>
      <div style={{ textAlign: 'right', flex: 'none' }}>
        <div style={{ ...PLACARD, fontSize: m.clockLabel, color: C.dim }}>
          {labels['wall.screen.tMinus']}
        </div>
        <div
          style={{
            ...MONO,
            fontSize: m.clock,
            fontWeight: 500,
            lineHeight: 1.1,
            marginTop: 8,
            color: sec === 0 ? C.go : C.fg,
            whiteSpace: 'nowrap',
          }}
        >
          {'T-00:0'}
          <RollText from={String(prev)} to={String(sec)} at={at} duration={8} />
        </div>
      </div>
    </div>
  )
}

/* ── Progress strip ───────────────────────────────────────── */

const Strip: FC<{ m: Metrics; frame: number }> = ({ m, frame }) => (
  <div
    style={{
      position: 'absolute',
      left: m.pad,
      right: m.pad,
      top: m.pad + m.headerH + 14,
      height: m.stripH,
      display: 'flex',
      gap: m.stripGap,
    }}
  >
    {WALL_STATIONS.map((station) => {
      const start = stationStart(station)
      const confirm = stationConfirm(station)
      const fill = linear(frame, start, confirm)
      const settled = frame >= confirm
      return (
        <div
          key={station.id}
          style={{ flex: 1, position: 'relative', overflow: 'hidden', background: C.rule, borderRadius: 1 }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              transformOrigin: 'left center',
              scale: `${fill} 1`,
              background: settled ? outcomeColor(stationOutcome(station)) : C.dim,
            }}
          />
        </div>
      )
    })}
  </div>
)

/* ── Annunciator tile ─────────────────────────────────────── */

const Tile: FC<{ m: Metrics; labels: WallLabels; station: WallStation; frame: number }> = ({
  m,
  labels,
  station,
  frame,
}) => {
  const { fps } = useVideoConfig()
  const start = stationStart(station)
  const confirm = stationConfirm(station)
  const outcome = stationOutcome(station)
  const started = frame >= start
  const lit = frame >= confirm
  const p = spring({ frame: frame - confirm, fps, config: { damping: 200 }, durationInFrames: 14 })
  const pollP = linear(frame, start, confirm)
  const waiting = station.restart === true
  const baseLabel = !started
    ? '- - -'
    : waiting
      ? labels['wall.state.standby']
      : labels['wall.state.polling']
  const baseColor = !started ? C.dim : C.fg
  const litLabel = outcome === 'hold' ? labels['wall.state.hold'] : labels['wall.state.go']
  const width = station.restart ? m.tileWideW : m.tileW
  const centered: CSSProperties = {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    whiteSpace: 'nowrap',
    ...PLACARD,
    fontSize: m.tileFont,
  }
  return (
    <div
      style={{
        position: 'relative',
        flex: 'none',
        width,
        height: m.tileH,
        borderRadius: 2,
        overflow: 'hidden',
        background: C.bg,
        border: `1px solid ${lit ? outcomeColor(outcome) : started ? (waiting ? C.fg : C.dim) : C.rule}`,
      }}
    >
      <div style={{ ...centered, color: baseColor, opacity: started ? 1 : 0.7 }}>{baseLabel}</div>
      {started && !lit && !waiting ? (
        <div
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            height: 3,
            width: '100%',
            transformOrigin: 'left center',
            scale: `${pollP} 1`,
            background: C.dim,
          }}
        />
      ) : null}
      <div
        style={{
          ...centered,
          background: outcomeColor(outcome),
          color: C.bg,
          clipPath: `inset(0 ${(1 - p) * 100}% 0 0)`,
        }}
      >
        <span>{litLabel}</span>
        {outcome === 'go' && station.restart ? (
          <span style={{ fontSize: m.tileSuffix, letterSpacing: '0.04em' }}>
            {labels['wall.state.restart']}
          </span>
        ) : null}
      </div>
    </div>
  )
}

/* ── Row readout (lives inside a Sequence: local frame) ───── */

const RowReadout: FC<{ m: Metrics; labels: WallLabels; row: WallRow }> = ({ m, labels, row }) => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const lc = row.confirm - row.start
  const confirmed = f >= lc
  const isHold = confirmed && row.outcome === 'hold'
  const enter = ramp(f, 0, 10)
  const settle = ramp(f, lc - 2, lc + 8)
  const tagColor = isHold ? C.hold : confirmed ? C.go : C.dim
  const textColor = isHold ? C.hold : confirmed ? C.fg : C.dim
  const opacity = enter * (confirmed ? 0.72 + 0.28 * settle : 0.72)
  const prefix = !confirmed
    ? labels['wall.line.pending']
    : isHold
      ? labels['wall.line.hold']
      : labels['wall.line.confirmed']
  const text = confirmed
    ? row.done
      ? labels[row.done]
      : ''
    : row.pending
      ? labels[row.pending]
      : ''
  const markerP = spring({ frame: f - lc, fps, config: { damping: 200 }, durationInFrames: 10 })

  const tag = (
    <span
      style={{
        ...PLACARD,
        display: 'inline-block',
        fontSize: m.tag,
        color: tagColor,
        border: `1px ${confirmed ? 'solid' : 'dashed'} ${tagColor}`,
        borderRadius: 2,
        padding: '3px 7px 2px',
        marginRight: row.subject ? 0 : 10,
        verticalAlign: 'middle',
        whiteSpace: 'nowrap',
        flex: 'none',
      }}
    >
      {prefix}
    </span>
  )

  const body: ReactNode = (
    <div
      style={{
        fontFamily: FONT_SANS,
        fontSize: m.line,
        lineHeight: 1.3,
        color: textColor,
        overflowWrap: 'anywhere',
      }}
    >
      {row.subject ? null : tag}
      {row.from && row.to ? (
        <span style={{ ...MONO, fontSize: m.mono * 0.95, marginRight: text ? 10 : 0 }}>
          {row.from} {'→'} {row.to}
        </span>
      ) : null}
      {text}
    </div>
  )

  if (!row.subject) {
    return <div style={{ opacity, translate: `0 ${(1 - enter) * 6}px` }}>{body}</div>
  }

  return (
    <div style={{ opacity, translate: `0 ${(1 - enter) * 6}px` }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          marginBottom: 4,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
          <span
            style={{
              flex: 'none',
              width: m.marker,
              height: m.marker,
              borderRadius: 1,
              border: `2px solid ${confirmed ? outcomeColor(row.outcome) : C.dim}`,
              background: confirmed ? outcomeColor(row.outcome) : 'transparent',
              scale: confirmed ? `${0.8 + 0.2 * markerP}` : '1',
            }}
          />
          <span
            style={{
              fontFamily: FONT_SANS,
              fontSize: m.line * 1.08,
              fontWeight: 600,
              color: C.fg,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'clip',
            }}
          >
            {row.subject}
          </span>
          {tag}
        </div>
        {row.from && row.to ? (
          <span
            style={{
              flex: 'none',
              fontSize: m.mono * 1.05,
              color: confirmed ? C.fg : C.dim,
              background: C.elev,
              border: `1px solid ${C.rule}`,
              borderRadius: 2,
              padding: '2px 10px',
            }}
          >
            <Version from={row.from} to={row.to} at={lc} />
          </span>
        ) : null}
      </div>
      <div style={{ paddingLeft: m.marker + 12 + 4 }}>{body}</div>
    </div>
  )
}

/* ── Station row ──────────────────────────────────────────── */

const StationRow: FC<{
  m: Metrics
  labels: WallLabels
  station: WallStation
  index: number
  frame: number
}> = ({ m, labels, station, index, frame }) => {
  const start = stationStart(station)
  const confirm = stationConfirm(station)
  const outcome = stationOutcome(station)
  const multi = station.rows.length > 1
  const tall = station.rows.some((row) => row.subject !== undefined)
  const active = Math.max(0, ramp(frame, start, start + 6) - ramp(frame, confirm, confirm + 10))
  const holdBar = outcome === 'hold' ? ramp(frame, confirm, confirm + 10) : 0
  const bar = Math.max(active, holdBar)
  const barColor = outcome === 'hold' && frame >= confirm ? C.hold : C.go
  const started = frame >= start
  const noteAt = station.noteAt

  return (
    <div
      style={{
        position: 'relative',
        flex: multi ? '1 1 0' : 'none',
        height: multi || tall ? undefined : m.rowH,
        minHeight: multi ? 0 : m.rowH,
        boxSizing: 'border-box',
        overflow: 'hidden',
        padding: `${m.rowPadY}px ${m.rowPadX}px`,
        borderTop: index === 0 ? 'none' : `1px solid ${C.rule}`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: multi ? 'flex-start' : 'center',
        gap: 4,
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: C.elev, opacity: active }} />
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          background: barColor,
          opacity: bar,
        }}
      />
      <div
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: `${m.indexW}px minmax(0, 1fr) auto`,
          alignItems: 'center',
        }}
      >
        <span style={{ ...MONO, fontSize: m.index, color: C.dim }}>{String(index + 1).padStart(2, '0')}</span>
        <span
          style={{
            ...PLACARD,
            fontSize: m.name,
            color: started ? C.fg : C.dim,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {labels[station.name]}
        </span>
        <Tile m={m} labels={labels} station={station} frame={frame} />
      </div>
      <div
        style={{
          position: 'relative',
          paddingLeft: m.indexW,
          display: 'flex',
          flexDirection: 'column',
          gap: multi ? 6 : 0,
          minHeight: 0,
        }}
      >
        {station.rows.map((row) => (
          <Sequence key={row.id} from={row.start} layout="none">
            <RowReadout m={m} labels={labels} row={row} />
          </Sequence>
        ))}
        {station.note && noteAt !== undefined ? (
          <Sequence from={noteAt} layout="none">
            <Note m={m} text={labels[station.note]} />
          </Sequence>
        ) : null}
      </div>
    </div>
  )
}

const Note: FC<{ m: Metrics; text: string }> = ({ m, text }) => {
  const f = useCurrentFrame()
  const p = ramp(f, 0, 12)
  return (
    <div
      style={{
        opacity: p,
        translate: `0 ${(1 - p) * 6}px`,
        borderLeft: `2px solid ${C.dim}`,
        paddingLeft: 12,
        fontFamily: FONT_SANS,
        fontSize: m.line,
        lineHeight: 1.3,
        color: C.fg,
        marginTop: 2,
      }}
    >
      {text}
    </div>
  )
}

/* ── Plotter (landscape wall plotter) ─────────────────────── */

const PLOT = { w: 472, h: 512, x0: 64, x1: 448, y0: 96, y1: 464 } as const

function plotX(f: number): number {
  return PLOT.x0 + linear(f, RUN_START, RUN_END) * (PLOT.x1 - PLOT.x0)
}

/** y for "stations still to go" (7 at the top, 0 on the axis). */
function plotY(remaining: number): number {
  return PLOT.y1 - (remaining / STATION_COUNT) * (PLOT.y1 - PLOT.y0)
}

const STAIR_PATH = (() => {
  let d = `M ${plotX(RUN_START)} ${plotY(STATION_COUNT)}`
  WALL_STATIONS.forEach((station, k) => {
    const x = plotX(stationConfirm(station))
    d += ` H ${x} V ${plotY(STATION_COUNT - k - 1)}`
  })
  return d
})()

const Plotter: FC<{ labels: WallLabels; frame: number }> = ({ labels, frame }) => {
  const { fps } = useVideoConfig()
  const cursor = plotX(frame)
  const traceW = Math.max(0, cursor - PLOT.x0)
  const innerW = PLOT.x1 - PLOT.x0
  const innerH = PLOT.y1 - PLOT.y0
  const minorX = Array.from({ length: 15 }, (_, i) => PLOT.x0 + (innerW / 14) * i)
  const minorY = Array.from({ length: 15 }, (_, i) => PLOT.y0 + (innerH / 14) * i)
  const svgText: CSSProperties = { fontFamily: FONT_MONO, fontVariantNumeric: 'tabular-nums' }

  return (
    <svg
      viewBox={`0 0 ${PLOT.w} ${PLOT.h}`}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      style={{ display: 'block', background: C.bg }}
      aria-hidden="true"
    >
      <defs>
        <clipPath id="wall-trace-clip">
          <rect x={PLOT.x0 - 4} y={PLOT.y0 - 12} width={traceW + 4} height={innerH + 24} />
        </clipPath>
      </defs>
      <rect x="0.5" y="0.5" width={PLOT.w - 1} height={PLOT.h - 1} fill="none" style={{ stroke: C.rule }} rx="2" />

      <text x="22" y="38" style={{ ...PLACARD, fontSize: 15, fill: C.fg }}>
        {labels['wall.screen.plotTitle']}
      </text>
      <line x1="22" x2="50" y1="60" y2="60" strokeWidth="2" strokeDasharray="6 4" style={{ stroke: C.dim }} />
      <text x="60" y="65" style={{ fontFamily: FONT_SANS, fontSize: 14, fill: C.dim }}>
        {labels['wall.screen.dryRun']}
      </text>
      <line x1="22" x2="50" y1="80" y2="80" strokeWidth="3" style={{ stroke: C.go }} />
      <text x="60" y="85" style={{ fontFamily: FONT_SANS, fontSize: 14, fill: C.dim }}>
        {labels['wall.screen.confirmed']}
      </text>

      {minorX.map((x, i) => (
        <line
          key={`vx-${i}`}
          x1={x}
          x2={x}
          y1={PLOT.y0}
          y2={PLOT.y1}
          strokeWidth="1"
          opacity={i % 2 === 0 ? 0.9 : 0.35}
          style={{ stroke: C.rule }}
        />
      ))}
      {minorY.map((y, i) => (
        <line
          key={`hy-${i}`}
          x1={PLOT.x0}
          x2={PLOT.x1}
          y1={y}
          y2={y}
          strokeWidth="1"
          opacity={i % 2 === 0 ? 0.9 : 0.35}
          style={{ stroke: C.rule }}
        />
      ))}
      <rect
        x={PLOT.x0}
        y={PLOT.y0}
        width={innerW}
        height={innerH}
        fill="none"
        strokeWidth="1"
        style={{ stroke: C.dim }}
      />

      {Array.from({ length: STATION_COUNT + 1 }, (_, i) => (
        <text
          key={`yl-${i}`}
          x={PLOT.x0 - 10}
          y={plotY(STATION_COUNT - i) + 5}
          textAnchor="end"
          style={{ ...svgText, fontSize: 14, fill: C.dim }}
        >
          {`T-0${STATION_COUNT - i}`}
        </text>
      ))}
      {WALL_STATIONS.map((station, k) => (
        <text
          key={`xl-${station.id}`}
          x={(plotX(stationStart(station)) + plotX(stationConfirm(station))) / 2}
          y={PLOT.y1 + 26}
          textAnchor="middle"
          style={{ ...svgText, fontSize: 14, fill: C.dim }}
        >
          {k + 1}
        </text>
      ))}

      <path d={STAIR_PATH} fill="none" strokeWidth="2" strokeDasharray="6 4" style={{ stroke: C.dim }} />
      <g clipPath="url(#wall-trace-clip)">
        <path d={STAIR_PATH} fill="none" strokeWidth="3" strokeLinejoin="miter" style={{ stroke: C.go }} />
      </g>

      {frame >= RUN_START ? (
        <line
          x1={cursor}
          x2={cursor}
          y1={PLOT.y0}
          y2={PLOT.y1}
          strokeWidth="1"
          opacity="0.7"
          style={{ stroke: C.fg }}
        />
      ) : null}

      {WALL_STATIONS.map((station, k) => {
        const confirm = stationConfirm(station)
        if (frame < confirm) return null
        const p = spring({ frame: frame - confirm, fps, config: { damping: 200 }, durationInFrames: 12 })
        const cx = plotX(confirm)
        const cy = plotY(STATION_COUNT - k - 1)
        const hold = stationOutcome(station) === 'hold'
        return (
          <g key={`node-${station.id}`} style={{ transformOrigin: `${cx}px ${cy}px`, scale: `${p}` }}>
            {hold ? (
              <>
                <rect x={cx - 8} y={cy - 8} width="16" height="16" rx="1" style={{ fill: C.hold, stroke: C.bg }} strokeWidth="2" />
                <text x={cx + 14} y={cy + 5} style={{ ...PLACARD, fontSize: 13, fill: C.hold }}>
                  {labels['wall.state.hold']}
                </text>
              </>
            ) : (
              <circle cx={cx} cy={cy} r="7" style={{ fill: C.go, stroke: C.bg }} strokeWidth="2" />
            )}
          </g>
        )
      })}
    </svg>
  )
}

/* ── Tally: GO and HOLD counts ────────────────────────────── */

function tallyAt(frame: number, outcome: 'go' | 'hold'): { n: number; at: number } {
  const confirms = WALL_STATIONS.filter((s) => stationOutcome(s) === outcome)
    .map(stationConfirm)
    .filter((c) => frame >= c)
  return { n: confirms.length, at: confirms.length > 0 ? Math.max(...confirms) : 0 }
}

const Counter: FC<{ m: Metrics; label: string; color: string; n: number; at: number }> = ({
  m,
  label,
  color,
  n,
  at,
}) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
    <span style={{ ...PLACARD, fontSize: m.countLabel, color }}>{label}</span>
    <span style={{ ...MONO, fontSize: m.count, fontWeight: 500, color: n > 0 ? color : C.dim, lineHeight: 1.1 }}>
      <RollText from={String(Math.max(0, n - 1))} to={String(n)} at={at} duration={9} />
    </span>
  </div>
)

const Tally: FC<{ m: Metrics; labels: WallLabels; frame: number; layout: WallLayout }> = ({
  m,
  labels,
  frame,
  layout,
}) => {
  const go = tallyAt(frame, 'go')
  const hold = tallyAt(frame, 'hold')
  return (
    <div
      style={{
        height: '100%',
        boxSizing: 'border-box',
        background: C.bg,
        border: `1px solid ${C.rule}`,
        borderRadius: 2,
        padding: '16px 20px',
        display: 'flex',
        flexDirection: layout === 'portrait' ? 'row' : 'column',
        justifyContent: 'space-between',
        alignItems: layout === 'portrait' ? 'center' : 'stretch',
        gap: 12,
      }}
    >
      <div style={{ ...PLACARD, fontSize: m.countLabel, color: C.dim, lineHeight: 1.2 }}>
        {labels['wall.screen.result']}
      </div>
      <div style={{ display: 'flex', gap: layout === 'portrait' ? 28 : 40, flexWrap: 'wrap' }}>
        <Counter m={m} label={labels['wall.state.go']} color={C.go} n={go.n} at={go.at} />
        <Counter m={m} label={labels['wall.state.hold']} color={hold.n > 0 ? C.hold : C.dim} n={hold.n} at={hold.at} />
      </div>
    </div>
  )
}

/* ── Composition ──────────────────────────────────────────── */

export const FlightPollComposition: FC<FlightPollProps> = ({ labels, layout }) => {
  const frame = useCurrentFrame()
  const { width, height } = useVideoConfig()
  const m = METRICS[layout]
  const landscape = layout === 'landscape'
  const boardTop = m.pad + m.headerH + 14 + m.stripH + 16
  const footerH = landscape ? 0 : 100

  const board = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        boxSizing: 'border-box',
        background: C.bg,
        border: `1px solid ${C.rule}`,
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      {WALL_STATIONS.map((station, index) => (
        <StationRow key={station.id} m={m} labels={labels} station={station} index={index} frame={frame} />
      ))}
    </div>
  )

  return (
    <AbsoluteFill style={{ background: C.bg, color: C.fg, overflow: 'hidden', fontFamily: FONT_SANS }}>
      <Backdrop width={width} height={height} />
      <Header m={m} labels={labels} frame={frame} layout={layout} />
      <Strip m={m} frame={frame} />
      {landscape ? (
        <>
          <div style={{ position: 'absolute', left: m.pad, top: boardTop, bottom: m.pad, width: 1000 }}>{board}</div>
          <div
            style={{
              position: 'absolute',
              left: m.pad + 1000 + 40,
              right: m.pad,
              top: boardTop,
              bottom: m.pad,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            <div style={{ flex: 1, minHeight: 0 }}>
              <Plotter labels={labels} frame={frame} />
            </div>
            <div style={{ height: 150, flex: 'none' }}>
              <Tally m={m} labels={labels} frame={frame} layout={layout} />
            </div>
          </div>
        </>
      ) : (
        <>
          <div style={{ position: 'absolute', left: m.pad, right: m.pad, top: boardTop, bottom: m.pad + footerH + 16 }}>
            {board}
          </div>
          <div style={{ position: 'absolute', left: m.pad, right: m.pad, bottom: m.pad, height: footerH }}>
            <Tally m={m} labels={labels} frame={frame} layout={layout} />
          </div>
        </>
      )}
    </AbsoluteFill>
  )
}
