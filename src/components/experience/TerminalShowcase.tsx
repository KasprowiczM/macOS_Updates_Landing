import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { animate, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, type AnimationPlaybackControls } from 'motion/react'
import { Pause, Play, RotateCcw } from 'lucide-react'
import { useLang } from '../../lib/routes'
import { TerminalWindow } from './TerminalWindow'
import { TERMINAL_LANGUAGES, type TerminalLanguage } from './terminalData'

const mobileQuery = '(max-width: 767px)'
const getMobileSnapshot = () => window.matchMedia(mobileQuery).matches
const getServerMobileSnapshot = () => false
function subscribeToMobile(listener: () => void) {
  const media = window.matchMedia(mobileQuery)
  media.addEventListener('change', listener)
  return () => media.removeEventListener('change', listener)
}

const copy = {
  pl: {
    title: 'Jeden Terminal.\nCały twój Mac.',
    lead: 'Uruchamiasz raz. App Store, narzędzia CLI i npm, Homebrew, aplikacje z internetu i macOS przechodzą przez jeden uporządkowany proces. Komunikaty w siedmiu językach.',
    language: 'Język komunikatów Terminala', play: 'Odtwórz podgląd', pause: 'Zatrzymaj podgląd', reset: 'Od początku',
    note: 'Fragmenty komunikatów programu w trybie --dry-run. Podgląd nie instaluje aktualizacji. Linie [DRY-RUN] pozostają po angielsku, tak jak w narzędziu.',
  },
  en: {
    title: 'One Terminal.\nYour whole Mac.',
    lead: 'Start it once. App Store, CLI tools and npm, Homebrew, internet apps and macOS follow one ordered workflow. Output in seven languages.',
    language: 'Terminal output language', play: 'Play preview', pause: 'Pause preview', reset: 'Start again',
    note: 'Excerpts from the program in --dry-run mode. The preview installs no updates. [DRY-RUN] lines stay in English, just as they do in the toolkit.',
  },
}

export function TerminalShowcase() {
  const siteLanguage = useLang()
  const c = copy[siteLanguage]
  const [language, setLanguage] = useState<TerminalLanguage>(siteLanguage)
  const [playing, setPlaying] = useState(false)
  const section = useRef<HTMLElement>(null)
  const control = useRef<AnimationPlaybackControls | null>(null)
  const isPlaying = useRef(false)
  const reduce = useReducedMotion()
  const mobile = useSyncExternalStore(subscribeToMobile, getMobileSnapshot, getServerMobileSnapshot)
  const progress = useMotionValue(0)
  const { scrollYProgress } = useScroll({ target: section, offset: mobile ? ['start end', 'end start'] : ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', value => {
    control.current?.stop()
    progress.set(value)
    if (isPlaying.current) { isPlaying.current = false; setPlaying(false) }
  })
  useEffect(() => () => { control.current?.stop() }, [])

  const play = () => {
    if (playing) { control.current?.stop(); isPlaying.current = false; setPlaying(false); return }
    if (progress.get() > .99) progress.set(0)
    isPlaying.current = true
    setPlaying(true)
    control.current = animate(progress, 1, {
      duration: 14 * (1 - progress.get()), ease: 'linear',
      onComplete: () => { isPlaying.current = false; setPlaying(false) },
    })
  }

  return <section id="wall" className="terminal-showcase" ref={section} aria-labelledby="terminal-showcase-title">
    <div className="terminal-showcase-sticky">
      <div className="terminal-showcase-heading"><h2 id="terminal-showcase-title">{c.title}</h2><p>{c.lead}</p></div>
      <div className="terminal-showcase-controls"><label><span>{c.language}</span><select value={language} onChange={event => setLanguage(event.target.value as TerminalLanguage)}>{TERMINAL_LANGUAGES.map(item => <option key={item.code} value={item.code}>{item.label}</option>)}</select></label>
        <div><button type="button" onClick={play} aria-pressed={playing}>{playing ? <Pause size={16} /> : <Play size={16} />}{playing ? c.pause : c.play}</button><button type="button" onClick={() => { control.current?.stop(); progress.set(0); isPlaying.current = false; setPlaying(false) }}><RotateCcw size={15} />{c.reset}</button></div>
      </div>
      <TerminalWindow language={language} progress={reduce ? undefined : progress} copy />
      <p className="terminal-showcase-note">{c.note}</p>
    </div>
  </section>
}
