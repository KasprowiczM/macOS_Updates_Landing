import { useTranslation } from 'react-i18next'
import { Seo } from '../components/Seo'
import { buildPageJsonLd, howToNode } from '../lib/jsonld'
import { useLang } from '../lib/routes'
import { AppCoverage } from '../components/experience/AppCoverage'
import { TerminalShowcase } from '../components/experience/TerminalShowcase'
import { WorkshopHero, WorkshopStatement, WorkshopWorkflow, WorkshopClose } from '../components/workshop/Workshop'

export function LandingPage() {
  const { t } = useTranslation()

  const lang = useLang()
  const jsonLd = buildPageJsonLd({
    lang,
    path: '/',
    name: t('seo.homeTitle'),
    description: t('seo.homeDesc'),
    extra: [howToNode('/', lang)],
  })

  return (
    <>
      <Seo
        title={t('seo.homeTitle')}
        description={t('seo.homeDesc')}
        path="/"
        lang={lang}
        jsonLd={jsonLd}
      />
      <main id="main" className="mac-experience workshop">
        <WorkshopHero />
        <WorkshopStatement />
        <TerminalShowcase />
        <WorkshopWorkflow />
        <AppCoverage />
        <WorkshopClose />
      </main>
    </>
  )
}

export default LandingPage
