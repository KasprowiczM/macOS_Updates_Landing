import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'motion/react'
import { Check, ArrowRight } from 'lucide-react'
import { CommandReadout } from './CommandReadout'
import { CONTAINER, SECTION_PAD } from './layout'
const STAGES = ['scan', 'vendor', 'ready'] as const
export function TerminalPreview() {
 const { t } = useTranslation()
 const reduced = useReducedMotion()
 return <section aria-labelledby="terminal-title" className={`border-t border-(--rule) ${SECTION_PAD}`}>
  <div className={`${CONTAINER} terminal-layout`}>
   <div><h2 id="terminal-title" className="m-0 max-w-[19ch]">{t('terminal.title')}</h2><p className="mt-5 max-w-[27rem] text-(--fg-muted)">{t('terminal.pending')}</p></div>
   <div className="terminal-demo">
    <div className="terminal-demo-header"><span>{t('terminal.demo')}</span><span>--dry-run</span></div>
    <CommandReadout command="cd ~/Dev_Env/macOS_updates && bash update_all.sh --dry-run" label={t('install.stepPreview')} />
    <div className="terminal-demo-lines">
     {STAGES.map((stage,i)=><motion.div key={stage} className="terminal-demo-line" initial={false} whileInView={reduced ? undefined : { clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'] }} transition={{ duration: 0.8, delay:i*0.65, ease:[0.16,1,0.3,1] }} viewport={{ once:true, amount:0.8 }}><Check size={16} aria-hidden="true" /><span>{t(`terminal.${stage}`)}</span></motion.div>)}
     <motion.div className="terminal-demo-line terminal-ready" initial={false} whileInView={reduced ? undefined : { opacity:[0.45,1], x:[-8,0] }} transition={{ duration:0.8, delay:2 }} viewport={{ once:true }}><ArrowRight size={16} aria-hidden="true" /><code>bash update_all.sh</code></motion.div>
    </div>
    <p className="terminal-demo-caption">{t('terminal.caption')}</p>
   </div>
  </div>
 </section>
}
