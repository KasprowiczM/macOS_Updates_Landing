import { useTranslation } from 'react-i18next'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '../ui/Button'
import { INSTALL_NIX, REPO_URL } from '../../lib/site'
import { CommandReadout } from './CommandReadout'
import { CONTAINER } from './layout'

/**
 * #install: the close. The one centered composition on the page: heading,
 * three commands on one instrument stack, two links.
 */
export function InstallClose() {
  const { t } = useTranslation()

  return (
    <section
      id="install"
      aria-labelledby="install-title"
      className="border-t border-(--rule) bg-(--bg-sunk) pb-20 pt-20 md:pb-24 md:pt-28"
    >
      <div className={`${CONTAINER} text-center`}>
        <h2 id="install-title" className="m-0 mx-auto max-w-[20ch]">
          {t('install.title')}
        </h2>
        <p className="mx-auto mt-5 max-w-[34rem] text-(--fg-muted)">{t('install.lead')}</p>

        <div className="mx-auto mt-12 grid max-w-[60rem] gap-3 text-left md:mt-14">
          <CommandReadout command={INSTALL_NIX} label={t('install.stepInstall')} />
          <CommandReadout command="bash update_all.sh --dry-run -y" label={t('install.stepPreview')} />
          <CommandReadout command="bash update_all.sh" label={t('install.stepRun')} />
        </div>

        <p className="mx-auto mt-6 max-w-[40rem] text-[15px] text-(--fg-muted)">{t('install.note')}</p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button variant="primary" size="lg" href="/docs#quick-install">
            {t('install.docs')}
          </Button>
          <Button variant="secondary" size="lg" href={REPO_URL}>
            {t('install.github')}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  )
}
