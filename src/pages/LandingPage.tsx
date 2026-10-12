import { useTranslation } from 'react-i18next'
import { Seo } from '../components/Seo'
import { getFaqItems } from '../lib/faq'
import { buildPageJsonLd, faqPageNode, howToNode } from '../lib/jsonld'
import { useLang } from '../lib/routes'
import { Hero } from '../components/sections/Hero'
import { SocialProof } from '../components/sections/SocialProof'
import { ProblemSolution } from '../components/sections/ProblemSolution'
import { WhyUpdate } from '../components/sections/WhyUpdate'
import { UpdatePipeline } from '../components/sections/UpdatePipeline'
import { Features } from '../components/sections/Features'
import { PlatformSupport } from '../components/sections/PlatformSupport'
import { HowItWorks } from '../components/sections/HowItWorks'
import { OpenSource } from '../components/sections/OpenSource'
import { Installation } from '../components/sections/Installation'



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
      <main>
        <Hero />
        <SocialProof />
        <ProblemSolution />
        <WhyUpdate />
        <UpdatePipeline />
        <Features />
        <PlatformSupport />
        <HowItWorks />
        <OpenSource />
        <Installation />
      </main>
    </>
  )
}

export default LandingPage
