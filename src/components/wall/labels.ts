/**
 * Flight-director wall display: labels, i18n hook and the shared run model.
 *
 * - `WALL_LABELS_EN` / `WALL_LABELS_PL` are flat dotted keys under `wall.*`.
 *   They are meant to be merged (nested) into en.json / pl.json by the
 *   orchestrator. Until then `useWallLabels()` falls back to the English
 *   defaults through `t(key, { defaultValue })`.
 * - `WALL_STATIONS` is the single source of truth for the run: station order,
 *   readouts, version numbers and the frame at which each readout is polled and
 *   confirmed. The Remotion composition, the static board and the plotter all
 *   read it, so the three views can never disagree.
 *
 * Readouts are replays of real runs (2026-10-05 and 2026-10-11).
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
  portrait: { width: 900, height: 1400 },
} as const satisfies Record<WallLayout, { width: number; height: number }>

/* ── Labels ───────────────────────────────────────────────── */

const EN = {
  'wall.heading': 'Watch one run, station by station.',
  'wall.intro':
    'Each update layer reports GO only after the live Mac confirms it. A stale vendor feed reports HOLD, and the warning stays on the board. macOS goes last, because it can restart.',
  'wall.caption': 'Readouts from real runs on 2026-10-05 and 2026-10-11.',
  'wall.scrollHint': 'Scroll to advance the poll',
  'wall.listLabel': 'Update stations in run order',

  'wall.screen.title': 'Flight director poll',
  'wall.screen.running': 'Replay: poll in progress',
  'wall.screen.complete': 'Replay: poll complete',
  'wall.screen.tMinus': 'T-minus',
  'wall.screen.dryRun': 'Dry-run',
  'wall.screen.confirmed': 'Confirmed by the live Mac',
  'wall.screen.plotTitle': 'Stations to go',
  'wall.screen.result': 'Poll result',

  'wall.state.go': 'GO',
  'wall.state.hold': 'HOLD',
  'wall.state.standby': 'STANDBY',
  'wall.state.polling': 'POLLING',
  'wall.state.restart': '(restart)',

  'wall.line.pending': 'pending',
  'wall.line.confirmed': 'confirmed',
  'wall.line.hold': 'hold',

  'wall.station.prescan.name': 'PRESCAN',
  'wall.station.prescan.desc':
    'Inventory of this Mac into APPLICATIONS.md. Only installed software.',
  'wall.station.appstore.name': 'APP STORE',
  'wall.station.appstore.desc': 'sudo mas with measured IDs, then AppleScript Track 2.',
  'wall.station.cli.name': 'CLI + NPM',
  'wall.station.cli.desc':
    'Native vendor CLIs first (claude update, codex, opencode, agy), then Node/npm globals.',
  'wall.station.brew.name': 'HOMEBREW',
  'wall.station.brew.desc':
    'brew upgrade --greedy, orphan casks skipped, cleanup, doctor.',
  'wall.station.internet.name': 'INTERNET APPS',
  'wall.station.internet.desc':
    '{{apps}} apps, {{methods}} update methods. Each version is checked against the vendor’s own feed first.',
  'wall.station.post.name': 'POSTUPDATE',
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
  'wall.row.macos.done': 'runs last because it may restart',

  'wall.note.openApps':
    'Open apps are never closed. Only what the toolkit launched is asked to quit.',
} as const

export type WallLabelKey = keyof typeof EN
export type WallLabels = Readonly<Record<WallLabelKey, string>>

/** English defaults (merge into en.json under `wall`). Contains `{{apps}}` and `{{methods}}` tokens. */
export const WALL_LABELS_EN: WallLabels = EN

/** Polish copy (merge into pl.json under `wall`). */
export const WALL_LABELS_PL: WallLabels = {
  'wall.heading': 'Zobacz jeden przebieg, stacja po stacji.',
  'wall.intro':
    'Każda warstwa aktualizacji zgłasza GO dopiero po potwierdzeniu przez działającego Maca. Nieświeży kanał producenta zgłasza HOLD, a ostrzeżenie zostaje na tablicy. macOS idzie ostatni, bo może się zrestartować.',
  'wall.caption': 'Odczyty z prawdziwych uruchomień z 2026-10-05 i 2026-10-11.',
  'wall.scrollHint': 'Przewiń, aby przesunąć odpytywanie',
  'wall.listLabel': 'Stacje aktualizacji w kolejności uruchamiania',

  'wall.screen.title': 'Odpytanie dyrektora lotu',
  'wall.screen.running': 'Powtórka: odpytanie w toku',
  'wall.screen.complete': 'Powtórka: odpytanie zakończone',
  'wall.screen.tMinus': 'T-minus',
  'wall.screen.dryRun': 'Próba (dry-run)',
  'wall.screen.confirmed': 'Potwierdzone przez Maca',
  'wall.screen.plotTitle': 'Stacje do końca',
  'wall.screen.result': 'Wynik odpytania',

  'wall.state.go': 'GO',
  'wall.state.hold': 'HOLD',
  'wall.state.standby': 'GOTOWOŚĆ',
  'wall.state.polling': 'ODPYTANIE',
  'wall.state.restart': '(restart)',

  'wall.line.pending': 'oczekuje',
  'wall.line.confirmed': 'gotowe',
  'wall.line.hold': 'wstrzymane',

  'wall.station.prescan.name': 'PRESCAN',
  'wall.station.prescan.desc':
    'Inwentarz tego Maca do APPLICATIONS.md. Tylko zainstalowane oprogramowanie.',
  'wall.station.appstore.name': 'APP STORE',
  'wall.station.appstore.desc':
    'sudo mas ze zmierzonymi identyfikatorami, potem AppleScript Track 2.',
  'wall.station.cli.name': 'CLI + NPM',
  'wall.station.cli.desc':
    'Najpierw natywne CLI producentów (claude update, codex, opencode, agy), potem globalne pakiety Node/npm.',
  'wall.station.brew.name': 'HOMEBREW',
  'wall.station.brew.desc':
    'brew upgrade --greedy, pominięte osierocone caski, czyszczenie, doctor.',
  'wall.station.internet.name': 'INTERNET APPS',
  'wall.station.internet.desc':
    '{{apps}} aplikacji, {{methods}} metod aktualizacji. Każda wersja jest najpierw sprawdzana w kanale samego producenta.',
  'wall.station.post.name': 'POSTUPDATE',
  'wall.station.post.desc':
    'Historia APPLICATIONS.md i UPDATES.md zapisywana dopiero po udanym kroku.',
  'wall.station.macos.name': 'macOS',
  'wall.station.macos.desc':
    'softwareupdate -i <label> -R. Idzie na końcu, bo może zrestartować Maca.',

  'wall.row.prescan.pending': 'inwentarz tego Maca',
  'wall.row.prescan.done': 'APPLICATIONS.md, tylko zainstalowane',
  'wall.row.cli.pending': 'claude, codex, opencode, agy, potem npm',
  'wall.row.cli.done': 'najpierw natywne, potem npm',
  'wall.row.brew.pending': 'brew upgrade --greedy',
  'wall.row.brew.done': 'osierocone caski pominięte, cleanup, doctor',
  'wall.row.opencode.done':
    'zweryfikowana instalacja od producenta: Gatekeeper, bundle ID, Apple Team ID',
  'wall.row.proton.pending': 'sprawdzanie kanału producenta',
  'wall.row.proton.done': 'kanał producenta starszy niż zainstalowana wersja, nic nie zainstalowano',
  'wall.row.post.pending': 'APPLICATIONS.md, UPDATES.md',
  'wall.row.post.done': 'historia zapisana dopiero po udanym kroku',
  'wall.row.macos.pending': 'softwareupdate -i <label> -R',
  'wall.row.macos.done': 'idzie na końcu, bo może zrestartować',

  'wall.note.openApps':
    'Otwarte aplikacje nigdy nie są zamykane. Zamknięcie jest zlecane tylko temu, co uruchomił sam toolkit.',
}

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
export type Outcome = 'go' | 'hold'

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
  /** macOS: lit state reads GO (restart). */
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
        outcome: 'go',
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
  return station.rows.some((row) => row.outcome === 'hold') ? 'hold' : 'go'
}

/** Plain-text readout of a row, used by the static board and screen readers. */
export function rowReadout(row: WallRow, labels: WallLabels): string {
  const parts: string[] = []
  if (row.subject) parts.push(row.subject)
  if (row.from && row.to) parts.push(`${row.from} → ${row.to}`)
  if (row.done) parts.push(labels[row.done])
  return parts.join(' · ')
}

/** Final state label of a station: GO, HOLD or GO (restart). */
export function stationFinalLabel(station: WallStation, labels: WallLabels): string {
  if (stationOutcome(station) === 'hold') return labels['wall.state.hold']
  return station.restart
    ? `${labels['wall.state.go']} ${labels['wall.state.restart']}`
    : labels['wall.state.go']
}
