import { type MotionValue } from 'motion/react'
import { Command, Folder, Terminal, Wifi } from 'lucide-react'
import { useLang } from '../../lib/routes'
import { experienceCopy } from './copy'
import { TerminalWindow } from './TerminalWindow'

export function ModernDesktop({ progress }: { progress?: MotionValue<number> }) {
  const lang = useLang()
  const c = experienceCopy[lang]
  return <div className="modern-desktop" aria-hidden="true">
    <img src="/images/glass-wave.jpg" width="1672" height="941" alt="" className="desktop-wallpaper" />
    <div className="desktop-menubar"><span><Command size={14} /> <b>Terminal</b> {['Shell', ...c.oldMenu.slice(1)].map(s => <span key={s}>{s}</span>)}</span><span><Wifi size={14} /> 9:41</span></div>
    <div className="desktop-folders"><Folder /><span>Macintosh HD</span><Folder /><span>Updates</span></div>
    <div className="desktop-terminal"><TerminalWindow language={lang} progress={progress} compact /></div>
    <div className="desktop-dock"><span><Folder /></span><span><Terminal /></span><span><Command /></span></div>
  </div>
}
