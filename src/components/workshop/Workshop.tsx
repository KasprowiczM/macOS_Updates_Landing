import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, Copy, RotateCcw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLang, useLocalizedPath } from '../../lib/routes'
import { INSTALL_NIX, INTERNET_APP_COUNT, REPO_URL, TEST_COUNT, UPDATE_METHOD_COUNT } from '../../lib/site'
import { UpdateMark } from '../ui/UpdateMark'
import { MacWindowChrome } from '../ui/MacWindowChrome'
import { useCopy } from '../sections/useCopy'
import { workshopCopy } from './copy'

function Photograph({ name, alt, eager = false, className = '' }: { name: string; alt: string; eager?: boolean; className?: string }) {
  return <img className={className} src={`/images/workshop/${name}.webp`} srcSet={`/images/workshop/${name}-small.webp 900w, /images/workshop/${name}.webp 1672w`} sizes="100vw" width="1672" height="941" alt={alt} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async" />
}

export function WorkshopHero() {
  const c = workshopCopy[useLang()]
  const [era, setEra] = useState<'modern' | 'heritage'>('modern')
  const [switching, setSwitching] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])
  const changeEra = (next: typeof era) => {
    if (next === era) return
    setEra(next)
    setSwitching(true)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setSwitching(false), 700)
  }
  return <section className={`workshop-hero${switching ? ' workshop-switching' : ''}`} aria-labelledby="workshop-title">
    <div className="workshop-photographs">
      <Photograph name="modern" alt={era === 'modern' ? c.modernAlt : ''} eager className={era === 'modern' ? 'era-active' : 'era-inactive'} />
      {era === 'heritage' && <Photograph name="heritage" alt={c.oldAlt} eager className="era-active heritage-photo" />}
    </div>
    <div className="workshop-hero-copy">
      <h1 id="workshop-title">{c.title}</h1>
      <p>{c.intro}</p>
      <div className="workshop-actions"><a href="#install" className="workshop-button">{c.install}<ArrowUpRight size={18} aria-hidden="true" /></a><a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="workshop-text-link">{c.source}</a></div>
    </div>
    <div className="workshop-hero-bottom">
      <p aria-live="polite">{era === 'modern' ? c.caption : c.oldCaption}</p>
      <div className="workshop-era" role="group" aria-label={c.era}><button type="button" aria-pressed={era === 'heritage'} onClick={() => changeEra('heritage')}>1984</button><span aria-hidden="true">/</span><button type="button" aria-pressed={era === 'modern'} onClick={() => changeEra('modern')}>2026</button></div>
    </div>
  </section>
}

export function WorkshopStatement() {
  const c = workshopCopy[useLang()]
  return <section className="workshop-statement workshop-width" aria-labelledby="workshop-statement-title">
    <div><h2 id="workshop-statement-title">{c.statement}</h2><p>{c.statementLead}</p></div>
    <div className="workshop-facts">{[INTERNET_APP_COUNT, UPDATE_METHOD_COUNT, TEST_COUNT].map((count, i) => <div key={i}><strong>{count}</strong><span>{c.facts[i]}</span></div>)}<p>{c.factNote}</p></div>
  </section>
}

export function WorkshopWorkflow() {
  const c = workshopCopy[useLang()]
  const [active, setActive] = useState(0)
  const [replay, setReplay] = useState(0)
  const step = c.steps[active]
  return <section className="workshop-workflow workshop-width" aria-labelledby="workshop-workflow-title">
    <div className="workshop-section-heading"><h2 id="workshop-workflow-title">{c.workflow}</h2><p>{c.workflowLead}</p></div>
    <div className="workshop-workflow-grid">
      <div className="workshop-step-list" role="group" aria-label={c.workflow.replace('\n', ' ')}>{c.steps.map((item, index) => <button type="button" key={item.title} aria-pressed={active === index} aria-controls="workflow-detail" onClick={() => setActive(index)}><span className="workshop-step-number">0{index + 1}</span><span>{item.title}</span><ArrowUpRight size={20} aria-hidden="true" /></button>)}</div>
      <div id="workflow-detail" className="workshop-step-detail" aria-live="polite"><h3>{step.title}</h3><p>{step.body}</p><code>{step.command}</code><small>{c.sequenceNote}</small></div>
      <div className="workshop-mark-stage"><UpdateMark key={replay} animated loop width="100%" height="100%" /><div><p>{c.markCaption}</p><button type="button" onClick={() => setReplay(value => value + 1)} aria-label={c.replayLogo}><RotateCcw size={18} aria-hidden="true" /></button></div></div>
    </div>
  </section>
}

export function WorkshopClose() {
  const lang = useLang()
  const c = workshopCopy[lang]
  const localize = useLocalizedPath()
  const command = useRef<HTMLElement>(null)
  const { copy, status } = useCopy(INSTALL_NIX, command)
  const previewCommand = 'cd ~/Dev_Env/macOS_updates && bash update_all.sh --dry-run -y'
  const previewNode = useRef<HTMLElement>(null)
  const { copy: copyPreview, status: previewStatus } = useCopy(previewCommand, previewNode)
  const feedback = status === 'failed' || previewStatus === 'failed'
    ? (lang === 'pl' ? 'Zaznacz polecenie i skopiuj ręcznie.' : 'Select and copy the command manually.')
    : status === 'copied' || previewStatus === 'copied'
      ? (lang === 'pl' ? 'Skopiowano.' : 'Copied.') : ''
  return <section id="install" className="workshop-close" aria-labelledby="workshop-close-title">
    <div className="workshop-office"><Photograph name="office" alt={c.officeAlt} /><div className="workshop-close-copy"><h2 id="workshop-close-title">{c.close}</h2><p>{c.closeLead}</p></div></div>
    <div className="workshop-install workshop-width">
      <div><h3>{c.commandTitle}</h3><Link to={localize('/docs#quick-install')} className="workshop-text-link">{c.docs}<ArrowUpRight size={17} aria-hidden="true" /></Link></div>
      <div className="workshop-install-commands">
        <div className="workshop-install-terminal mac-window">
          <MacWindowChrome title="Terminal" subtitle="bash" action={<button type="button" onClick={() => void copy()} aria-label={status === 'copied' ? (lang === 'pl' ? 'Skopiowano instalację' : 'Install command copied') : (lang === 'pl' ? 'Kopiuj instalację' : 'Copy install command')}>{status === 'copied' ? <Check size={18} /> : <Copy size={18} />}</button>} />
          <div className="workshop-install-terminal-body">
            <div className="workshop-install-prompt"><span aria-hidden="true">$</span><code ref={command}>{INSTALL_NIX}</code></div>
            <p>{c.previewHint}</p>
            <div className="workshop-install-prompt"><span aria-hidden="true">$</span><code ref={previewNode}>{previewCommand}</code><button type="button" onClick={() => void copyPreview()} aria-label={previewStatus === 'copied' ? (lang === 'pl' ? 'Skopiowano podgląd' : 'Preview command copied') : (lang === 'pl' ? 'Kopiuj podgląd' : 'Copy preview command')}>{previewStatus === 'copied' ? <Check size={17} /> : <Copy size={17} />}</button></div>
          </div>
        </div>
        <p className="workshop-install-feedback" role="status">{feedback}</p>
      </div>
    </div>
    <div className="workshop-support workshop-width"><p>{c.supportNote}</p><Link to={localize('/support')} className="workshop-text-link">{c.support}<ArrowUpRight size={18} aria-hidden="true" /></Link></div>
  </section>
}
