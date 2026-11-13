import { useEffect, useRef, useState } from 'react'
import { m, useMotionValue, useTransform, type MotionValue } from 'motion/react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { CopyButton } from '../ui/CopyButton'
import { MacWindowChrome } from '../ui/MacWindowChrome'
import { terminalRuns, type TerminalLanguage, type TerminalStage } from './terminalData'

const clamp = (value: number) => Math.max(0, Math.min(1, value))

function OutputStage({ stage, index, progress, animated }: { stage: TerminalStage; index: number; progress: MotionValue<number>; animated: boolean }) {
  const opacity = useTransform(progress, value => clamp((value * 7 - index) * 2 + 1))
  return <m.span className="terminal-source-stage" style={animated ? { opacity } : undefined}>
    <span className="terminal-source-heading">{stage.title}</span>
    {stage.lines.map(line => <span className="terminal-source-action" key={line}>{line}</span>)}
  </m.span>
}

export type TerminalWindowEra = 'latest' | 'aqua' | 'snow' | 'yosemite'

export function TerminalWindow({ language = 'en', progress, compact = false, copy = false, era = 'latest' }: {
  language?: TerminalLanguage
  progress?: MotionValue<number>
  compact?: boolean
  copy?: boolean
  era?: TerminalWindowEra
}) {
  const run = terminalRuns[language]
  const reduce = usePrefersReducedMotion()
  const fallback = useMotionValue(1)
  const value = progress ?? fallback
  const viewport = useRef<HTMLDivElement>(null)
  const stream = useRef<HTMLPreElement>(null)
  const [overflow, setOverflow] = useState(0)
  const y = useTransform(value, current => -clamp((current - .15) / .85) * overflow)
  const command = `cd ~/Dev_Env/macOS_updates\nMAC_UPDATE_LANG=${language} bash update_all.sh --dry-run -y`

  useEffect(() => {
    const frame = viewport.current
    const content = stream.current
    if (!frame || !content) return
    const measure = () => setOverflow(Math.max(0, content.scrollHeight - frame.clientHeight))
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(frame)
    observer.observe(content)
    return () => observer.disconnect()
  }, [language])

  return <div data-window-era={era} className={`source-terminal source-terminal-mac mac-window${compact ? ' source-terminal-compact' : ''}${!progress || reduce ? ' source-terminal-static' : ''}`}>
    <MacWindowChrome title="Terminal" subtitle="bash" action={copy ? <CopyButton text={command} /> : undefined} />
    <div className="source-terminal-command"><code><span aria-hidden="true">$ </span>{command}</code></div>
    <div className="source-terminal-viewport" ref={viewport} tabIndex={!compact && (!progress || reduce) ? 0 : undefined}>
      <m.pre ref={stream} className="source-terminal-output" lang={language} style={progress && !reduce ? { y } : undefined}>
        <code><span className="terminal-source-intro">{run.intro}</span>{run.stages.map((stage, index) => <OutputStage key={`${language}-${index}`} stage={stage} index={index} progress={value} animated={Boolean(progress) && !reduce} />)}</code>
      </m.pre>
    </div>
  </div>
}
