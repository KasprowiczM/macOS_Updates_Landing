import { useCallback, useEffect, useRef, useState } from 'react'
import { animate, useMotionValue, type AnimationPlaybackControls } from 'motion/react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { Pause, Play, RotateCcw } from 'lucide-react'
import { useLang } from '../../lib/routes'
import { TerminalWindow } from './TerminalWindow'
import { TERMINAL_LANGUAGES, type TerminalLanguage } from './terminalData'

const copy = {
  pl: { title: 'Jedno polecenie.\nDobra kolejność.', lead: 'Zajrzyj do środka. Siedem etapów podglądu, komunikaty z kodu programu i żadnych zmian na Twoim Macu.', language: 'Język komunikatów Terminala', play: 'Odtwórz', pause: 'Zatrzymaj', reset: 'Od początku', note: 'Fragmenty rzeczywistych komunikatów w trybie --dry-run. Demonstracja niczego nie instaluje. Linie [DRY-RUN] pozostają po angielsku, jak w narzędziu.' },
  en: { title: 'One command.\nThe right order.', lead: 'Look inside. Seven preview stages, messages from the source, and no changes to your Mac.', language: 'Terminal output language', play: 'Play', pause: 'Pause', reset: 'Start again', note: 'Excerpts from actual --dry-run messages. This demonstration installs nothing. [DRY-RUN] lines stay in English, as they do in the toolkit.' },
}

export function TerminalShowcase() {
  const lang = useLang()
  const c = copy[lang]
  const [language, setLanguage] = useState<TerminalLanguage>(lang)
  const [playing, setPlaying] = useState(false)
  const section = useRef<HTMLElement>(null)
  const control = useRef<AnimationPlaybackControls | null>(null)
  const started = useRef(false)
  const progress = useMotionValue(0)
  const reduce = usePrefersReducedMotion()
  const pause = useCallback(() => { control.current?.stop(); setPlaying(false) }, [])
  const play = useCallback(() => {
    control.current?.stop()
    if (progress.get() >= .99) progress.set(0)
    setPlaying(true)
    control.current = animate(progress, 1, { duration: 14 * (1 - progress.get()), ease: 'linear', onComplete: () => setPlaying(false) })
  }, [progress])
  useEffect(() => {
    const node = section.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) pause()
      else if (!started.current && !reduce && document.visibilityState === 'visible') { started.current = true; play() }
    }, { threshold: .35 })
    observer.observe(node)
    const visibility = () => { if (document.hidden) pause() }
    document.addEventListener('visibilitychange', visibility)
    return () => { observer.disconnect(); control.current?.stop(); document.removeEventListener('visibilitychange', visibility) }
  }, [pause, play, reduce])
  return <section id="wall" className="terminal-showcase workshop-terminal" ref={section} aria-labelledby="terminal-showcase-title">
    <div className="terminal-showcase-sticky">
      <div className="terminal-showcase-heading"><h2 id="terminal-showcase-title">{c.title}</h2><p>{c.lead}</p></div>
      <div className="terminal-showcase-controls"><label><span>{c.language}</span><select value={language} onChange={event => { pause(); progress.set(0); setLanguage(event.target.value as TerminalLanguage) }}>{TERMINAL_LANGUAGES.map(item => <option key={item.code} value={item.code}>{item.label}</option>)}</select></label>
        {!reduce && <div><button type="button" onClick={playing ? pause : play} aria-pressed={playing}>{playing ? <Pause size={16} /> : <Play size={16} />}{playing ? c.pause : c.play}</button><button type="button" onClick={() => { pause(); progress.set(0) }}><RotateCcw size={16} />{c.reset}</button></div>}
      </div>
      <TerminalWindow language={language} progress={reduce ? undefined : progress} copy />
      <p className="terminal-showcase-note">{c.note}</p>
    </div>
  </section>
}
