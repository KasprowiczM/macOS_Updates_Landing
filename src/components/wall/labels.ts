/**
 * Recorded update workflow: labels, i18n hook and the shared run model.
 *
 * - `WALL_LABELS_EN` holds the flat dotted `wall.*` defaults (and the key type).
 *   The real copy lives nested under `wall` in en.json / pl.json;
 *   `useWallLabels()` reads it through i18n and falls back to these defaults.
 * - `WALL_STATIONS` is the single source of truth for the run: station order,
 *   readouts, version numbers and the frame at which each readout is polled and
 *   confirmed. The desktop composition and the native semantic sequence both
 *   read it, so the views share the same recorded evidence.
 *
 * Readouts are replays of real runs (2026-10-05 and 2026-10-11).
 * macOS did not install an update in either run, so it ends on STANDBY.
 */
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { INTERNET_APP_COUNT, UPDATE_METHOD_COUNT } from '../../lib/site'

/* ── Timeline constants ───────────────────────────────────── */

export type WallLayout = 'landscape' | 'portrait'

export const WALL_FPS = 30
export const WALL_DURATION = 420

export const WALL_SIZE = {
  landscape: { width: 1600, height: 900 },
  portrait: { width: 900, height: 1560 },
} as const satisfies Record<WallLayout, { width: number; height: number }>

/* ── Labels ───────────────────────────────────────────────── */

const EN = {
  'wall.heading': 'Example update results.',
  'wall.intro':
    'This replay combines records from two real runs. Each row shows an example step and its reported status.',
  'wall.caption': 'Readouts from real runs on 2026-10-05 and 2026-10-11.',
  'wall.listLabel': 'Update stations in run order',

  'wall.screen.title': 'Update workflow',
  'wall.screen.running': 'Checking',
  'wall.screen.complete': 'Review complete',
  'wall.screen.tMinus': 'Step',
  'wall.screen.dryRun': 'Preview',
  'wall.screen.confirmed': 'Confirmed by the live Mac',
  'wall.screen.plotTitle': 'Steps remaining',
  'wall.screen.result': 'Summary',
  'wall.screen.current': 'Current step',
  'wall.screen.progress': '{{done}} of {{total}} steps reviewed',
  'wall.screen.example': 'Recorded example',
  'wall.screen.changed': 'Updated',
  'wall.screen.unchanged': 'No change',

  'wall.state.go': 'Confirmed',
  'wall.state.hold': 'Needs attention',
  'wall.state.standby': 'Not run',
  'wall.state.polling': 'Checking',

  'wall.line.pending': 'Pending',
  'wall.line.standby': 'Not run',
  'wall.line.confirmed': 'Confirmed',
  'wall.line.hold': 'Needs attention',

  'wall.station.prescan.name': 'Inventory',
  'wall.station.prescan.desc':
    'Inventory of this Mac into APPLICATIONS.md. Only installed software.',
  'wall.station.appstore.name': 'App Store',
  'wall.station.appstore.desc': 'sudo mas with measured IDs, then AppleScript Track 2.',
  'wall.station.cli.name': 'Command line + npm',
  'wall.station.cli.desc':
    'Native vendor CLIs first (claude update, codex, opencode, agy), then Node/npm globals.',
  'wall.station.brew.name': 'Homebrew',
  'wall.station.brew.desc':
    'brew upgrade --greedy, orphan casks skipped, cleanup, doctor.',
  'wall.station.internet.name': 'Internet apps',
  'wall.station.internet.desc':
    '{{apps}} apps, {{methods}} update methods. Each version is checked against the vendor’s own feed first.',
  'wall.station.post.name': 'Run records',
  'wall.station.post.desc':
    'APPLICATIONS.md and UPDATES.md history written only after the step succeeded.',
  'wall.station.macos.name': 'macOS',
  'wall.station.macos.desc':
    'softwareupdate -i <label> -R. Runs last because it may restart.',

  'wall.row.prescan.pending': 'inventory of this Mac',
  'wall.row.prescan.done': 'APPLICATIONS.md written, installed only',
  'wall.row.cli.pending': 'claude, codex, opencode, agy, then npm',
  'wall.row.cli.done': 'native first, npm after',
  'wall.row.brew.pending': 'brew upgrade --greedy',
  'wall.row.brew.done': 'orphan casks skipped, cleanup, doctor',
  'wall.row.opencode.done': 'verified vendor install: Gatekeeper, bundle ID, Apple Team ID',
  'wall.row.proton.pending': 'checking the manufacturer feed',
  'wall.row.proton.done': 'manufacturer feed older than installed, nothing installed',
  'wall.row.post.pending': 'APPLICATIONS.md, UPDATES.md',
  'wall.row.post.done': 'history written only after the step succeeded',
  'wall.row.macos.pending': 'softwareupdate -i <label> -R',
  'wall.row.macos.done': 'not run in this replay',

  'wall.note.openApps':
    'Open apps are never closed. Only what the toolkit launched is asked to quit.',
} as const

export type WallLabelKey = keyof typeof EN
export type WallLabels = Readonly<Record<WallLabelKey, string>>

/** English defaults (merge into en.json under `wall`). Contains `{{apps}}` and `{{methods}}` tokens. */
export const WALL_LABELS_EN: WallLabels = EN

const WALL_LABEL_KEYS = Object.keys(EN) as WallLabelKey[]

/**
 * Builds the label dictionary through react-i18next. Works before the
 * translations are merged because every key carries its English default.
 */
export function useWallLabels(): WallLabels {
  const { t } = useTranslation()
  return useMemo(() => {
    const out: Partial<Record<WallLabelKey, string>> = {}
    for (const key of WALL_LABEL_KEYS) {
      out[key] = t(key, {
        defaultValue: WALL_LABELS_EN[key],
        apps: INTERNET_APP_COUNT,
        methods: UPDATE_METHOD_COUNT,
      })
    }
    return out as WallLabels
  }, [t])
}

/* ── Run model (shared by composition, plotter and static board) ── */

export type StationId = 'prescan' | 'appstore' | 'cli' | 'brew' | 'internet' | 'post' | 'macos'
export type Outcome = 'go' | 'hold' | 'standby'

export interface WallRow {
  readonly id: string
  /** Product name. Not localized. */
  readonly subject?: string
  /** Installed version before the run. Not localized. */
  readonly from?: string
  /** Version after the run. Not localized. */
  readonly to?: string
  readonly pending?: WallLabelKey
  readonly done?: WallLabelKey
  readonly outcome: Outcome
  /** Frame at which the dry-run ghost line appears and polling starts. */
  readonly start: number
  /** Frame at which the live Mac confirms (lamp lights, ghost becomes solid). */
  readonly confirm: number
}

export interface WallStation {
  readonly id: StationId
  readonly name: WallLabelKey
  readonly desc: WallLabelKey
  /** macOS: runs last and may restart, so it settles on STANDBY, never lit GO. */
  readonly restart?: boolean
  readonly rows: readonly WallRow[]
  readonly note?: WallLabelKey
  /** Frame at which the persistent note fades in. */
  readonly noteAt?: number
}

export const WALL_STATIONS: readonly WallStation[] = [
  {
    id: 'prescan',
    name: 'wall.station.prescan.name',
    desc: 'wall.station.prescan.desc',
    rows: [
      {
        id: 'prescan',
        pending: 'wall.row.prescan.pending',
        done: 'wall.row.prescan.done',
        outcome: 'go',
        start: 8,
        confirm: 34,
      },
    ],
  },
  {
    id: 'appstore',
    name: 'wall.station.appstore.name',
    desc: 'wall.station.appstore.desc',
    rows: [
      {
        id: 'unifi',
        subject: 'UniFi',
        from: '10.38.1',
        to: '11.0.0',
        outcome: 'go',
        start: 58,
        confirm: 86,
      },
    ],
  },
  {
    id: 'cli',
    name: 'wall.station.cli.name',
    desc: 'wall.station.cli.desc',
    rows: [
      {
        id: 'cli',
        pending: 'wall.row.cli.pending',
        done: 'wall.row.cli.done',
        outcome: 'go',
        start: 108,
        confirm: 136,
      },
    ],
  },
  {
    id: 'brew',
    name: 'wall.station.brew.name',
    desc: 'wall.station.brew.desc',
    rows: [
      {
        id: 'brew',
        pending: 'wall.row.brew.pending',
        done: 'wall.row.brew.done',
        outcome: 'go',
        start: 158,
        confirm: 186,
      },
    ],
  },
  {
    id: 'internet',
    name: 'wall.station.internet.name',
    desc: 'wall.station.internet.desc',
    rows: [
      {
        id: 'opencode',
        subject: 'OpenCode Desktop',
        from: '1.18.35',
        to: '1.19.0',
        done: 'wall.row.opencode.done',
        outcome: 'go',
        start: 208,
        confirm: 232,
      },
      {
        id: 'proton',
        subject: 'Proton Drive',
        pending: 'wall.row.proton.pending',
        done: 'wall.row.proton.done',
        outcome: 'hold',
        start: 238,
        confirm: 262,
      },
    ],
    note: 'wall.note.openApps',
    noteAt: 266,
  },
  {
    id: 'post',
    name: 'wall.station.post.name',
    desc: 'wall.station.post.desc',
    rows: [
      {
        id: 'post',
        pending: 'wall.row.post.pending',
        done: 'wall.row.post.done',
        outcome: 'go',
        start: 278,
        confirm: 304,
      },
    ],
  },
  {
    id: 'macos',
    name: 'wall.station.macos.name',
    desc: 'wall.station.macos.desc',
    restart: true,
    rows: [
      {
        id: 'macos',
        pending: 'wall.row.macos.pending',
        done: 'wall.row.macos.done',
        outcome: 'standby',
        start: 334,
        confirm: 386,
      },
    ],
  },
]

export function stationStart(station: WallStation): number {
  return station.rows[0].start
}

export function stationConfirm(station: WallStation): number {
  return station.rows[station.rows.length - 1].confirm
}

/** Worst-of: any HOLD row holds the whole station, and it stays that way. */
export function stationOutcome(station: WallStation): Outcome {
  if (station.rows.some((row) => row.outcome === 'hold')) return 'hold'
  if (station.restart) return 'standby'
  return 'go'
}

/** Rows worth showing in the static board: versions and warnings, plus the STANDBY note. The rest repeats the station description. */
export function rowIsInformative(station: WallStation, row: WallRow): boolean {
  return Boolean(row.subject) || station.restart === true
}

/** Plain-text readout of a row, used by the static board and screen readers. */
export function rowReadout(row: WallRow, labels: WallLabels): string {
  const parts: string[] = []
  if (row.subject) parts.push(row.subject)
  if (row.from && row.to) parts.push(`${row.from} → ${row.to}`)
  if (row.done) parts.push(labels[row.done])
  return parts.join(' · ')
}

/** Final state label of a station: GO, HOLD or STANDBY. */
export function stationFinalLabel(station: WallStation, labels: WallLabels): string {
  const outcome = stationOutcome(station)
  if (outcome === 'hold') return labels['wall.state.hold']
  if (outcome === 'standby') return labels['wall.state.standby']
  return labels['wall.state.go']
}
