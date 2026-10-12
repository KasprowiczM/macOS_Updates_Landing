import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { Button } from '../ui/Button'
import { INSTALL_NIX, INTERNET_APP_COUNT, REPO_URL } from '../../lib/site'
import { CommandReadout } from './CommandReadout'
import { PollConsole } from './PollConsole'
import { POLL_GO, POLL_HOLD, POLL_LAMPS } from './pollData'
import { CONTAINER } from './layout'
import { useCopy } from './useCopy'

/**
 * #poll: the hero. Left: the claim, the two actions and the install line.
 * Right: the poll console, a live instrument that ticks to GO once on load.
 */
export function Hero() {
  const { t } = useTranslation()
  const commandRef = useRef<HTMLElement | null>(null)
  const { status, copy } = useCopy(INSTALL_NIX, commandRef)
  const copied = status === 'copied'

  return (
    <section
      id="poll"
      aria-labelledby="hero-title"
      className="pb-16 pt-[calc(var(--nav-h)+2rem)] md:pb-20"
    >
      <div className={`${CONTAINER} grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-12`}>
        <div className="min-w-0 lg:col-span-7">
          <h1
            id="hero-title"
            className="m-0 text-[clamp(2.25rem,5.2vw-4px,4rem)] tracking-[-0.03em] [word-spacing:0.07em] [font-stretch:90%]"
          >
            <span className="block">{t('hero.titleA')}</span>
            <span className="block">
              <span className="text-(--go)">{t('hero.titleGo')}</span> {t('hero.titleB')}
            </span>
          </h1>
          <p className="mt-6 max-w-[34rem] text-[17px] leading-relaxed text-(--fg-muted) md:text-[18px]">
            {t('hero.sub', { apps: INTERNET_APP_COUNT })}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button variant="primary" size="lg" onClick={copy} className="min-w-[13.5rem]">
              <span className="inline-grid">
                <span className={`col-start-1 row-start-1 inline-flex items-center justify-center gap-2 ${copied ? 'invisible' : ''}`} aria-hidden={copied}>
                  <Copy size={16} aria-hidden="true" />
                  {t('hero.copy')}
                </span>
                <span className={`col-start-1 row-start-1 inline-flex items-center justify-center gap-2 ${copied ? '' : 'invisible'}`} aria-hidden={!copied}>
                  <Check size={16} aria-hidden="true" />
                  {t('hero.copied')}
                </span>
              </span>
            </Button>
            <Button variant="secondary" size="lg" href={REPO_URL}>
              {t('hero.github')}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Button>
            <span role="status" aria-live="polite" className="sr-only">
              {status === 'copied' ? t('hero.copied') : status === 'failed' ? t('hero.copyFailed') : ''}
            </span>
          </div>

          <a
            href="#poll-console"
            aria-label={t('hero.strip.aria', { go: POLL_GO, hold: POLL_HOLD })}
            className="mt-5 inline-flex min-h-[44px] items-center gap-3 text-[13px] font-medium text-(--fg) no-underline md:hidden"
          >
            <span className="flex gap-1" aria-hidden="true">
              {POLL_LAMPS.map((lamp, i) => (
                <span key={i} className={`lamp lamp-${lamp}`} />
              ))}
            </span>
            <span className="readout text-[12px]">{t('hero.strip.text', { go: POLL_GO, hold: POLL_HOLD })}</span>
          </a>

          <div className="mt-3 max-w-[40rem] md:mt-8">
            <CommandReadout command={INSTALL_NIX} label={t('hero.commandLabel')} codeRef={commandRef} />
          </div>
        </div>

        <div className="min-w-0 lg:col-span-5">
          <PollConsole />
        </div>
      </div>
    </section>
  )
}
