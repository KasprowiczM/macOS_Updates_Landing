import { useTranslation } from 'react-i18next'
import { Seo } from '../components/Seo'
import { getFaqItems } from '../lib/faq'
import { buildPageJsonLd, faqPageNode, howToNode } from '../lib/jsonld'
import { useLang } from '../lib/routes'
import { FeatureVisual } from '../components/sections/FeatureVisual'
import { TerminalPreview } from '../components/sections/TerminalPreview'
import { Hero } from '../components/sections/Hero'
import { FlightRules } from '../components/sections/FlightRules'
import { WallDisplay } from '../components/wall/WallDisplay'
import { FlightPlan } from '../components/sections/FlightPlan'
import { CoverageRoster } from '../components/sections/CoverageRoster'
import { MissionLog } from '../components/sections/MissionLog'
import { FaqSection } from '../components/sections/FaqSection'
import { InstallClose } from '../components/sections/InstallClose'

export function LandingPage() {
  const { t } = useTranslation()

  const lang = useLang()
  const jsonLd = buildPageJsonLd({
    lang,
    path: '/',
    name: t('seo.homeTitle'),
    description: t('seo.homeDesc'),
    extra: [faqPageNode(getFaqItems(t), '/', lang), howToNode('/', lang)],
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
      <main id="main">
        <Hero />
        <FeatureVisual />
        <FlightRules />
        <WallDisplay />
        <FlightPlan />
        <CoverageRoster />
        <MissionLog />
        <FaqSection />
        <TerminalPreview />
        <InstallClose />
      </main>
    </>
  )
}

export default LandingPage
