import { useTranslation } from 'react-i18next'
import { Seo } from '../components/Seo'
import { getFaqItems } from '../lib/faq'
import { buildPageJsonLd, faqPageNode, howToNode } from '../lib/jsonld'
import { useLang } from '../lib/routes'
import { MacBookJourney } from '../components/experience/MacBookJourney'
import { ProductStory } from '../components/experience/ProductStory'
import { AppCoverage } from '../components/experience/AppCoverage'
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
      <main id="main" className="mac-experience">
        <MacBookJourney />
        <ProductStory />
        <AppCoverage />
        <FaqSection />
        <InstallClose />
      </main>
    </>
  )
}

export default LandingPage
