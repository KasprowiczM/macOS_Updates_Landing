import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Apple, CheckCircle2, Search, Filter, Sparkles, Code2, FolderKanban, Lock, Cloud, AppWindow } from 'lucide-react'
import { SectionReveal } from '../ui/SectionReveal'
import { Badge } from '../ui/Badge'

interface AppItem {
  name: string
  method: string
  category: 'ai' | 'dev' | 'prod' | 'security' | 'cloud_media' | 'appstore'
}

const SUPPORTED_APPS: AppItem[] = [
  { name: 'Google Chrome', method: 'keystone', category: 'prod' },
  { name: 'Firefox Developer Edition', method: 'github_dmg', category: 'dev' },
  { name: 'Brave Browser', method: 'silent_launch', category: 'prod' },
  { name: 'ChatGPT Atlas', method: 'github_dmg', category: 'ai' },
  { name: 'ChatGPT / Codex', method: 'silent_launch', category: 'ai' },
  { name: 'Claude', method: 'silent_launch', category: 'ai' },
  { name: 'Comet', method: 'silent_launch', category: 'ai' },
  { name: 'Gemini', method: 'silent_launch', category: 'ai' },
  { name: 'Perplexity', method: 'silent_launch', category: 'ai' },
  { name: 'Antigravity', method: 'silent_launch', category: 'ai' },
  { name: 'Antigravity IDE', method: 'silent_launch', category: 'dev' },
  { name: 'LM Studio', method: 'silent_launch', category: 'ai' },
  { name: 'OpenCode', method: 'silent_launch', category: 'dev' },
  { name: 'Cursor', method: 'silent_launch', category: 'dev' },
  { name: 'Ascendo', method: 'silent_launch', category: 'dev' },
  { name: 'Obsidian', method: 'silent_launch', category: 'prod' },
  { name: 'ProtonVPN', method: 'silent_launch', category: 'security' },
  { name: 'KeePassXC', method: 'github_dmg', category: 'security' },
  { name: 'Proton Mail', method: 'silent_launch', category: 'prod' },
  { name: 'zoom.us', method: 'silent_launch', category: 'prod' },
  { name: 'Google Drive', method: 'keystone', category: 'cloud_media' },
  { name: 'MEGAsync', method: 'silent_launch', category: 'cloud_media' },
  { name: 'Proton Drive', method: 'silent_launch', category: 'cloud_media' },
  { name: 'Microsoft Excel', method: 'msupdate', category: 'prod' },
  { name: 'Microsoft Word', method: 'msupdate', category: 'prod' },
  { name: 'Microsoft Outlook', method: 'msupdate', category: 'prod' },
  { name: 'Microsoft PowerPoint', method: 'msupdate', category: 'prod' },
  { name: 'Microsoft OneNote', method: 'msupdate', category: 'prod' },
  { name: 'Microsoft Teams', method: 'mau_fallback_self_update', category: 'prod' },
  { name: 'Visual Studio Code', method: 'github_dmg', category: 'dev' },
  { name: 'Warp', method: 'silent_launch', category: 'dev' },
  { name: 'CodeEdit', method: 'github_dmg', category: 'dev' },
  { name: 'Docker Desktop', method: 'docker_cli', category: 'dev' },
  { name: 'AppCleaner', method: 'silent_launch', category: 'prod' },
  { name: 'Spotify', method: 'silent_launch', category: 'cloud_media' },
  { name: 'CapCut', method: 'silent_launch', category: 'cloud_media' },
  { name: 'Ledger Live', method: 'github_dmg', category: 'security' },
  { name: 'Trezor Suite', method: 'github_dmg', category: 'security' },
  { name: 'Remote Desktop Manager', method: 'silent_launch', category: 'dev' },
  { name: 'IPMIView', method: 'manual', category: 'dev' },
  { name: 'Inkscape', method: 'brew_cask', category: 'cloud_media' },
  { name: 'DJI Assistant 2', method: 'manual', category: 'prod' },
  { name: 'UniFi', method: 'appstore_gui', category: 'appstore' },
  { name: 'WiFiman', method: 'appstore_gui', category: 'appstore' },
  { name: 'Picsart', method: 'appstore_gui', category: 'appstore' },
]

const CATEGORIES = [
  { id: 'all', label: 'All (48)', icon: Filter },
  { id: 'ai', label: 'AI & LLMs', icon: Sparkles },
  { id: 'dev', label: 'Developer', icon: Code2 },
  { id: 'prod', label: 'Productivity', icon: FolderKanban },
  { id: 'security', label: 'Security & Crypto', icon: Lock },
  { id: 'cloud_media', label: 'Cloud & Media', icon: Cloud },
  { id: 'appstore', label: 'App Store Track 2', icon: AppWindow },
] as const

export function PlatformSupport() {
  const { t, i18n } = useTranslation()
  const pl = i18n.language === 'pl'
  const managers = t(`platformSupport.macos.managers`, { returnObjects: true }) as string[]

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredApps = useMemo(() => {
    return SUPPORTED_APPS.filter((app) => {
      const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            app.method.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32 overflow-hidden">
      <SectionReveal>
        <div className="font-mono text-[11px] uppercase tracking-normal text-(--accent-strong) mb-4">
          {pl ? 'POKRYCIE I PLATFORMA' : 'COVERAGE & PLATFORM'}
        </div>
        <h2
          className="font-bold text-(--fg) font-sans tracking-tight mb-4 max-w-[780px]"
          style={{ fontSize: 'clamp(2rem, 3vw + 1rem, 3rem)', lineHeight: '1.05', letterSpacing: '-0.03em' }}
        >
          {t('platformSupport.title')}
        </h2>
        <p className="text-(--fg-muted) text-[17px] leading-normal font-sans max-w-[620px] mb-14" style={{ textWrap: 'pretty' as const }}>
          {t('platformSupport.subtitle')}
        </p>
      </SectionReveal>

      {/* Package Managers */}
      <SectionReveal delay={0.15}>
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* Left: Platform Card */}
          <div className="bg-(--bg-elev) border border-(--border) rounded-xl overflow-hidden shadow-(--shadow-md) min-w-0">
            <div className="flex px-5 py-3.5 font-mono font-semibold text-[13px] tracking-wide uppercase border-b border-(--border) bg-(--bg-sunk) text-(--fg)">
              <Apple size={16} className="mr-2" />
              {t(`platformSupport.macos.name`)}
            </div>

            <div className="p-6 sm:p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <Badge variant="accent">
                  <CheckCircle2 size={12} />
                  Supported
                </Badge>
              </div>

              <h3 className="font-semibold text-xl font-sans tracking-tight mb-3">
                {t(`platformSupport.macos.name`)}
              </h3>

              <p className="font-mono text-[12px] leading-[1.6] text-(--fg-muted) mb-6 break-words">
                {t(`platformSupport.macos.status`)}
              </p>

              <div className="font-mono text-[11px] uppercase tracking-normal text-(--fg-faint) mb-3">
                Package managers covered
              </div>
              <div className="flex gap-2 flex-wrap">
                {managers.map((mgr: string) => (
                  <span
                    key={mgr}
                    className="font-mono text-[11px] font-medium px-2.5 py-1 rounded-(--radius-xs) bg-(--accent-soft) text-(--accent-strong) border border-(--border)"
                  >
                    {mgr}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Manager explanations */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="bg-(--bg-elev) border border-(--border) rounded-xl p-6 sm:p-8 md:p-10 shadow-(--shadow-md) min-w-0"
          >
            <div className="font-mono text-[11px] uppercase tracking-normal text-(--accent-strong) mb-6">
              Manager details
            </div>

            <div className="space-y-5">
              {managers.map((mgr: string) => (
                <div key={mgr} className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-(--accent-strong) mt-2 shrink-0" />
                  <div className="min-w-0">
                    <span className="font-mono text-[13px] font-semibold text-(--fg)">
                      {mgr}
                    </span>
                    <p className="text-(--fg-muted) text-[13px] leading-[1.55] font-sans mt-0.5 m-0 break-words">
                      {t(`platformSupport.managerDetail.${mgr}`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </SectionReveal>

      {/* 48 Internet Apps Catalog Grid */}
      <SectionReveal delay={0.25}>
        <div className="bg-(--bg-elev) border border-(--border) rounded-xl p-6 sm:p-8 shadow-(--shadow-md)">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-bold text-xl font-sans tracking-tight text-(--fg)">
                {pl ? 'Katalog 48 Aplikacji Internetowych' : 'Supported 48 Internet Apps Catalog'}
              </h3>
              <p className="text-(--fg-muted) text-[14px] font-sans mt-1">
                {pl
                  ? 'Faktyczny spis 48 aplikacji oraz 9 metod ich automatycznej aktualizacji.'
                  : 'Complete registry of 48 applications and their 9 exact update methods.'}
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-(--fg-faint)" />
              <input
                type="text"
                placeholder={pl ? 'Szukaj aplikacji lub metody...' : 'Search app or method...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-[13px] font-mono rounded-md border border-(--border) bg-(--bg-sunk) text-(--fg) placeholder:(text-(--fg-faint)) focus:outline-none focus:border-(--accent)"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-3 mb-6 border-b border-(--border)">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon
              const isSelected = selectedCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-[12px] whitespace-nowrap transition-colors border ${
                    isSelected
                      ? 'bg-(--accent-soft) text-(--accent-strong) border-(--accent)'
                      : 'text-(--fg-muted) border-transparent hover:bg-(--bg-sunk) hover:text-(--fg)'
                  }`}
                >
                  <Icon size={13} />
                  <span>{cat.label}</span>
                </button>
              )
            })}
          </div>

          {/* App Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <AnimatePresence mode="popLayout">
              {filteredApps.map((app) => (
                <motion.div
                  key={app.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="p-3.5 rounded-lg border border-(--border) bg-(--bg-sunk) flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="font-sans font-semibold text-[14px] text-(--fg) truncate">
                      {app.name}
                    </div>
                    <div className="font-mono text-[11px] text-(--fg-faint) mt-0.5">
                      {app.method}
                    </div>
                  </div>
                  <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-(--bg-elev) text-(--accent-strong) border border-(--border) shrink-0">
                    {app.method === 'github_dmg' ? 'DMG' :
                     app.method === 'keystone' ? 'Keystone' :
                     app.method === 'msupdate' ? 'MS365' :
                     app.method === 'appstore_gui' ? 'Track 2' :
                     app.method === 'mau_fallback_self_update' ? 'MAU' :
                     app.method === 'docker_cli' ? 'Docker' :
                     app.method === 'brew_cask' ? 'Cask' :
                     app.method === 'manual' ? 'Manual' : 'Launch'}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredApps.length === 0 && (
            <div className="py-12 text-center text-(--fg-muted) font-mono text-[13px]">
              {pl ? 'Brak aplikacji pasujących do wyszukiwania.' : 'No applications match your search query.'}
            </div>
          )}
        </div>

        <p className="text-(--fg-faint) text-[13px] leading-[1.6] font-sans mt-8 max-w-[640px]" style={{ textWrap: 'pretty' as const }}>
          {t('platformSupport.note')}
        </p>
      </SectionReveal>
    </section>
  )
}
