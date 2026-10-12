export type PollState = 'go' | 'hold' | 'standby'

export interface Station {
  id: 'prescan' | 'appstore' | 'cli' | 'brew' | 'internet' | 'post' | 'macos'
  lamp: PollState
  /** Which readout text the state shows. */
  text: 'go' | 'goHold' | 'standbyRestart'
}

/** Final state of each station after a poll. macOS stays on STANDBY: it runs last. */
export const STATIONS: readonly Station[] = [
  { id: 'prescan', lamp: 'go', text: 'go' },
  { id: 'appstore', lamp: 'go', text: 'go' },
  { id: 'cli', lamp: 'go', text: 'go' },
  { id: 'brew', lamp: 'go', text: 'go' },
  { id: 'internet', lamp: 'hold', text: 'goHold' },
  { id: 'post', lamp: 'go', text: 'go' },
  { id: 'macos', lamp: 'standby', text: 'standbyRestart' },
]

export const POLL_LAMPS: readonly PollState[] = STATIONS.map((station) => station.lamp)
export const POLL_GO = POLL_LAMPS.filter((lamp) => lamp === 'go').length
export const POLL_HOLD = POLL_LAMPS.filter((lamp) => lamp === 'hold').length
