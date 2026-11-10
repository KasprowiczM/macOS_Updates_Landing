import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Button } from '../ui/Button'
import { INSTALL_NIX, INTERNET_APP_COUNT, REPO_URL, TEST_COUNT } from '../../lib/site'
import { CommandReadout } from './CommandReadout'
import { CONTAINER } from './layout'
import { useCopy } from './useCopy'

export function Hero() {
  const { t } = useTranslation()
  const commandRef = useRef<HTMLElement | null>(null)
  const sectionRef = useRef<HTMLElement | null>(null)
  const { status, copy } = useCopy(INSTALL_NIX, commandRef)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 75])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -4])
  return (
    <section ref={sectionRef} id="poll" aria-labelledby="hero-title" className="hero-section">
      <div className={CONTAINER}>
        <div className="hero-layout">
          <div className="min-w-0 relative z-10">
            <h1 id="hero-title" className="hero-title m-0">
              <span className="block">{t('hero.titleA')}</span>
              <span className="block text-(--accent-text)">{t('hero.titleGo')} {t('hero.titleB')}</span>
            </h1>
            <p className="mt-6 max-w-[31rem] text-[17px] leading-relaxed text-(--fg-muted) md:text-[18px]">{t('hero.sub', { apps: INTERNET_APP_COUNT })}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={copy}>{status === 'copied' ? <Check size={17} /> : <Copy size={17} />}{status === 'copied' ? t('hero.copied') : t('hero.copy')}</Button>
              <Button variant="secondary" size="lg" href={REPO_URL}>{t('hero.github')}<ArrowUpRight size={17} /></Button>
              <span role="status" aria-live="polite" className="sr-only">{status === 'copied' ? t('hero.copied') : status === 'failed' ? t('hero.copyFailed') : ''}</span>
            </div>
            <div className="hero-command"><CommandReadout command={INSTALL_NIX} label={t('hero.commandLabel')} codeRef={commandRef} /></div>
          </div>
          <div className="hero-art-boundary"><motion.div className="hero-art" style={reduced ? undefined : { y, rotate }} aria-hidden="true">
            <img className="hero-image-light" src="/images/update-layers.webp" width="1536" height="1024" alt="" fetchPriority="high" />
            <img className="hero-image-dark" src="/images/update-layers-dark.webp" width="1536" height="1024" alt="" />
          </motion.div></div>
        </div>
        <div className="hero-proof">
          <span><strong>Apple Silicon</strong> · macOS 13+</span>
          <span><strong>{INTERNET_APP_COUNT}</strong> {t('hero.proofApps')}</span>
          <span><strong>{TEST_COUNT}</strong> {t('hero.proofTests')}</span>
          <span><strong>MIT</strong> · {t('hero.proofOpen')}</span>
        </div>
      </div>
    </section>
  )
}
