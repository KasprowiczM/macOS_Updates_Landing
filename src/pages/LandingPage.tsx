import { useTranslation } from 'react-i18next'
import { Seo } from '../components/Seo'
import { SITE_URL } from '../lib/site'
import { FAQ_ITEMS } from '../lib/faq'
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
  const { t, i18n } = useTranslation()

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: t('seo.homeTitle'),
    description: t('seo.homeDesc'),
    url: `${SITE_URL}/`,
    inLanguage: i18n.language,
    isPartOf: {
      '@type': 'WebSite',
      name: 'macOS Updates',
      url: `${SITE_URL}/`,
    },
  }

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }

  return (
    <>
      <Seo
        title={t('seo.homeTitle')}
        description={t('seo.homeDesc')}
        path="/"
        lang={i18n.language}
        jsonLd={[webPage, faqPage]}
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
