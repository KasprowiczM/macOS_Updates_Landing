import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { m, useReducedMotion, useScroll } from 'motion/react'
import { useLang, useLocalizedPath } from '../../lib/routes'
import { INTERNET_APP_COUNT, TEST_COUNT, UPDATE_METHOD_COUNT } from '../../lib/site'
import { experienceCopy } from './copy'
import { TerminalShowcase } from './TerminalShowcase'
import { TerminalWindow } from './TerminalWindow'

export function ProductStory() {
  const lang = useLang()
  const c = experienceCopy[lang]
  const localize = useLocalizedPath()
  const reduce = useReducedMotion()
  const promise = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: promise, offset: ['start end', 'end start'] })
  return <>
    <section className="experience-intro" aria-labelledby="intro-title"><m.div initial={false} whileInView={reduce ? undefined : { opacity: [0.65, 1], y: [22, 0] }} viewport={{ once: true, amount: .4 }} transition={{ duration: .6 }}><h2 id="intro-title">{c.storyTitle}</h2><p>{c.storyLead}</p></m.div><div className="experience-facts">{[INTERNET_APP_COUNT, UPDATE_METHOD_COUNT, TEST_COUNT].map((n, i) => <div key={n}><strong>{n}</strong><span>{c.facts[i]}</span></div>)}</div><small>{c.factNote}</small></section>
    <TerminalShowcase />
    <section className="promise-section" ref={promise} aria-labelledby="promise-title"><div className="promise-art" aria-hidden="true"><TerminalWindow language={lang} progress={reduce ? undefined : scrollYProgress} compact /></div><div className="promise-copy"><h2 id="promise-title">{c.promiseTitle}</h2><p>{c.promiseLead}</p><a href={localize('/security')} className="experience-link">{c.promiseLink}<ArrowUpRight size={16} /></a></div></section>
    <section className="experience-film" aria-labelledby="film-title"><div><h2 id="film-title">{c.filmTitle}</h2><p>{c.filmLead}</p></div><video controls playsInline preload="none" poster="/images/desktop-film-poster.webp" aria-label={c.filmLabel} width="1280" height="720"><source src="/images/desktop-film.mp4" type="video/mp4" /><a href="/images/desktop-film.mp4">{c.filmLabel}</a></video></section>
  </>
}
