/**
 * Lazy chunk: @remotion/player + remotion + the composition.
 * Imported only through React.lazy from WallDisplay, so none of it lands in
 * the main bundle. The page scroll drives the Player through `playerRef`
 * (seekTo), the Player itself never plays.
 */
import { useEffect, useMemo, useState } from 'react'
import type { RefObject } from 'react'
import { Player } from '@remotion/player'
import type { PlayerRef } from '@remotion/player'
import { FlightPollComposition } from './FlightPollComposition'
import type { FlightPollProps } from './FlightPollComposition'
import { WALL_DURATION, WALL_FPS, WALL_SIZE } from './labels'
import type { WallLabels, WallLayout } from './labels'

export interface WallPlayerProps {
  playerRef: RefObject<PlayerRef | null>
  labels: WallLabels
  layout: WallLayout
  /** Frame for the current scroll position, read once when the Player mounts. */
  getInitialFrame: () => number
  /** Called after the Player has had two frames to paint. */
  onReady: () => void
}

export default function WallPlayer({
  playerRef,
  labels,
  layout,
  getInitialFrame,
  onReady,
}: WallPlayerProps) {
  const inputProps = useMemo<FlightPollProps>(() => ({ labels, layout }), [labels, layout])
  const [initialFrame] = useState(getInitialFrame)
  const size = WALL_SIZE[layout]

  useEffect(() => {
    let second = 0
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(onReady)
    })
    return () => {
      cancelAnimationFrame(first)
      cancelAnimationFrame(second)
    }
  }, [onReady])

  return (
    <Player
      ref={playerRef}
      component={FlightPollComposition}
      inputProps={inputProps}
      durationInFrames={WALL_DURATION}
      fps={WALL_FPS}
      compositionWidth={size.width}
      compositionHeight={size.height}
      initialFrame={initialFrame}
      controls={false}
      clickToPlay={false}
      doubleClickToFullscreen={false}
      spaceKeyToPlayOrPause={false}
      initiallyShowControls={false}
      autoPlay={false}
      loop={false}
      acknowledgeRemotionLicense
      style={{ width: '100%', height: '100%' }}
    />
  )
}
