import { useRef } from 'react'
import { m, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { useLang } from '../../lib/routes'
import { experienceCopy } from './copy'
import { ModernDesktop } from './ModernDesktop'
import { TerminalWindow } from './TerminalWindow'
import type { TerminalLanguage } from './terminalData'

const journeyCopy = {
  en: {
    first: 'Updates, taken care of.', second: 'More time for you.',
    lead: 'One toolkit for your system and apps. Spend less time checking for updates and more time on your work.',
    compatibility: 'For Apple silicon Macs. Historical models are illustrative.',
    update: 'Software Update', checking: 'Checking for updates', today: 'Today',
    history: 'From the white MacBook of 2006 through the MacBook Air, Retina and contemporary MacBook designs. This visual journey illustrates the history of the Mac. The toolkit supports Apple silicon Macs; it does not upgrade these historical computers.',
  },
  pl: {
    first: 'Aktualizacje z głowy.', second: 'Więcej czasu dla ciebie.',
    lead: 'Jeden automat dla systemu i aplikacji. Mniej ręcznego sprawdzania aktualizacji, więcej czasu na twoją pracę.',
    compatibility: 'Dla Maców z Apple silicon. Historyczne modele są ilustracją.',
    update: 'Uaktualnienia', checking: 'Sprawdzanie aktualizacji', today: 'Dziś',
    history: 'Od białego MacBooka z 2006 roku przez MacBooka Air i Retina po współczesnego MacBooka. Ta podróż przedstawia historię komputerów Mac. Narzędzie obsługuje komputery Mac z Apple silicon i nie aktualizuje przedstawionych historycznych modeli.',
  },
} as const

const photos = [
  { src: '/images/macbook-2006.webp', year: '2006', label: 'MacBook', system: 'Mac OS X', start: 0, end: .19 },
  { src: '/images/macbook-air-2010.webp', year: '2010', label: 'MacBook Air', system: 'Mac OS X', start: .19, end: .38 },
  { src: '/images/macbook-retina-2015.webp', year: '2015', label: 'MacBook Pro Retina', system: 'OS X', start: .38, end: .57 },
  { src: '/images/macbook-modern.webp', year: '2026', label: 'MacBook Pro', system: 'macOS', start: .57, end: .76 },
] as const

type Photo = (typeof photos)[number]

const ramp = (value: number, start: number, end: number) => Math.max(0, Math.min(1, (value - start) / (end - start)))

function JourneyPhoto({ photo, progress, first }: { photo: Photo; progress: MotionValue<number>; first: boolean }) {
  const text = journeyCopy[useLang()]
  const opacity = useTransform(progress, (value) => (first ? 1 : ramp(value, photo.start - .02, photo.start + .02)) * (1 - ramp(value, photo.end - .02, photo.end + .02)))
  const scale = useTransform(progress, [photo.start, photo.end], [.96, 1.04])
  return <m.div className="journey-photo" style={{ opacity, scale }}>
    <div className="journey-device"><img src={photo.src} width="1536" height="1024" alt="" fetchPriority={first ? 'high' : undefined} loading={first ? undefined : 'eager'} />
      <div className={`journey-terminal-window journey-terminal-${photo.year}`}><TerminalWindow language={(['en', 'pl', 'de', 'fr'] as TerminalLanguage[])[photos.indexOf(photo)]} progress={progress} compact era={photo.year === '2006' ? 'aqua' : photo.year === '2010' ? 'snow' : photo.year === '2015' ? 'yosemite' : 'latest'} /></div>
    </div>
    <span className="journey-photo-caption">{photo.label} · {photo.year === '2026' ? text.today : photo.year}</span>
  </m.div>
}

function JourneyYear({ photo, progress, first }: { photo: Photo; progress: MotionValue<number>; first: boolean }) {
  const opacity = useTransform(progress, value => .35 + .65 * (first ? 1 : ramp(value, photo.start - .02, photo.start + .02)) * (1 - ramp(value, photo.end - .02, photo.end + .02)))
  return <m.span style={{ opacity }}>{photo.year}</m.span>
}

export function MacBookJourney() {
  const lang = useLang()
  const c = experienceCopy[lang]
  const text = journeyCopy[lang]
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress: progress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const desktopOpacity = useTransform(progress, value => ramp(value, .74, .78))
  const desktopScale = useTransform(progress, [.74, 1], [.96, 1.04])
  const initialHeading = useTransform(progress, value => 1 - ramp(value, .7, .74))
  const finalHeading = useTransform(progress, value => ramp(value, .78, .82))
  const updateProgress = useTransform(progress, [.78, 1], [.05, 1])

  return <section ref={ref} className="macbook-journey" aria-labelledby="journey-title">
    <div className="journey-sticky">
      <div className="journey-heading">
        <m.div className="journey-heading-initial" style={reduce ? undefined : { opacity: initialHeading }}>
          <h1 id="journey-title">{text.first}<br /><span>{text.second}</span></h1>
          <p>{text.lead}</p>
        </m.div>
        <m.div className="journey-heading-final" aria-hidden="true" style={reduce ? undefined : { opacity: finalHeading }}>
          <h2>{c.nowA}<br /><span>{c.nowB}</span></h2>
          <p>{c.nowLead}</p>
        </m.div>
        <div className="journey-actions">
          <a className="experience-button" href="#install">{c.start}<ArrowRight size={16} /></a>
          <a className="experience-link" href="#wall">{c.explore}<ArrowRight size={16} /></a>
        </div>
      </div>
      <div className="journey-stage" aria-hidden="true">
        {!reduce && photos.map((photo, index) => <JourneyPhoto key={photo.src} photo={photo} progress={progress} first={index === 0} />)}
        <m.div className="journey-desktop" style={reduce ? undefined : { opacity: desktopOpacity, scale: desktopScale }}><ModernDesktop progress={reduce ? undefined : updateProgress} /></m.div>
      </div>
      {!reduce && <div className="journey-ruler" aria-hidden="true">{photos.map((photo, index) => <JourneyYear key={photo.year} photo={photo} progress={progress} first={index === 0} />)}</div>}
      <p className="journey-compatibility">{text.compatibility}</p>
    </div>
    <p className="sr-only">{text.history} {c.nowLead}</p>
  </section>
}
