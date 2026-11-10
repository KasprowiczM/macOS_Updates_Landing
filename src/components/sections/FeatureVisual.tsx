import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { CONTAINER, SECTION_PAD } from './layout'
const FEATURES = ['coverage', 'safety', 'process'] as const
export function FeatureArtwork({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const lift = useTransform(scrollYProgress, [0, 1], [24, -24])
  return <motion.div ref={ref} className="feature-art" style={reduced ? undefined : { y: lift }} aria-hidden="true">
    <img className="feature-image-light" src="/images/workflow-triptych.webp" alt="" width="2172" height="724" loading="lazy" style={{ left: `${index * -100}%` }} />
    <img className="feature-image-dark" src="/images/workflow-triptych-dark.webp" alt="" width="2172" height="724" loading="lazy" style={{ left: `${index * -100}%` }} />
  </motion.div>
}
export function FeatureVisual() {
 const { t } = useTranslation()
 return <section aria-labelledby="visual-title" className={`border-t border-(--rule) ${SECTION_PAD}`}>
  <div className={CONTAINER}>
   <h2 id="visual-title" className="m-0 max-w-[24ch]">{t('visual.title')}</h2>
   <p className="mt-5 max-w-[40rem] text-(--fg-muted)">{t('visual.lead')}</p>
   <div className="feature-visual-grid">
    {FEATURES.map((feature,index)=><article key={feature} className="min-w-0">
     <FeatureArtwork index={index} />
     <h3 className="m-0 mt-8 text-[24px] font-medium leading-tight">{t(`visual.items.${feature}.title`)}</h3>
     <p className="mt-4 text-[15px] leading-relaxed text-(--fg-muted)">{t(`visual.items.${feature}.body`)}</p>
    </article>)}
   </div>
  </div>
 </section>
}
