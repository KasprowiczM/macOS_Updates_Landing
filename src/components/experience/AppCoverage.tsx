import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { INTERNET_APP_COUNT } from '../../lib/site'
import { useLang, type Lang } from '../../lib/routes'
import { METHOD_GROUPS } from '../sections/coverageData'

const copy = {
  en: {
    title: 'Find your apps.',
    lead: `${INTERNET_APP_COUNT} registry rows describe legacy capabilities. Entries do not guarantee an enabled update path.`,
    search: 'Search apps or update methods',
    placeholder: 'Try Firefox or Homebrew',
    method: 'Legacy category',
    all: 'All methods',
    reset: 'Clear filters',
    results: (count: number) => `${count} ${count === 1 ? 'app' : 'apps'} found`,
    collapsedResults: (shown: number, count: number) => `Showing ${shown} of ${count} apps`,
    showAll: (count: number) => `Show all ${count} apps`,
    showFewer: 'Show fewer',
    empty: 'No apps match these filters.',
    emptyHint: 'Try another search or clear the filters to see the full list.',
    appColumn: 'Application',
    methodColumn: 'Legacy category',
  },
  pl: {
    title: 'Znajdź swoje aplikacje.',
    lead: `Rejestr obejmuje ${INTERNET_APP_COUNT} wpisów dawnych możliwości. Wpis nie gwarantuje aktywnej ścieżki aktualizacji.`,
    search: 'Szukaj aplikacji lub sposobu aktualizacji',
    placeholder: 'Wpisz Firefox lub Homebrew',
    method: 'Dawna kategoria',
    all: 'Wszystkie sposoby',
    reset: 'Wyczyść filtry',
    results: (count: number) => `Znaleziono aplikacji: ${count}`,
    collapsedResults: (shown: number, count: number) => `Wyświetlono ${shown} z ${count} aplikacji`,
    showAll: (count: number) => `Pokaż wszystkie aplikacje (${count})`,
    showFewer: 'Pokaż mniej',
    empty: 'Brak aplikacji pasujących do filtrów.',
    emptyHint: 'Zmień wyszukiwanie lub wyczyść filtry, aby zobaczyć całą listę.',
    appColumn: 'Aplikacja',
    methodColumn: 'Dawna kategoria',
  },
} satisfies Record<Lang, {
  title: string
  lead: string
  search: string
  placeholder: string
  method: string
  all: string
  reset: string
  results: (count: number) => string
  collapsedResults: (shown: number, count: number) => string
  showAll: (count: number) => string
  showFewer: string
  empty: string
  emptyHint: string
  appColumn: string
  methodColumn: string
}>

export function AppCoverage() {
  const lang = useLang()
  const { t } = useTranslation()
  const text = copy[lang]
  const [query, setQuery] = useState('')
  const [method, setMethod] = useState('all')
  const [expanded, setExpanded] = useState(false)
  const apps = useMemo(() => METHOD_GROUPS.flatMap((group) => {
    const methodName = t(`coverage.methods.${group.method}.name`)
    return group.apps.map((name) => ({ name, method: group.method, methodName }))
  }).sort((a, b) => a.name.localeCompare(b.name, lang)), [lang, t])
  const normalizedQuery = query.trim().toLocaleLowerCase(lang)
  const results = apps.filter((app) =>
    (method === 'all' || app.method === method)
    && `${app.name} ${app.method} ${app.methodName}`.toLocaleLowerCase(lang).includes(normalizedQuery),
  )
  const filtered = normalizedQuery !== '' || method !== 'all'
  const collapsed = !filtered && !expanded && results.length > 8
  const visibleResults = collapsed ? results.slice(0, 8) : results
  const reset = () => {
    setQuery('')
    setMethod('all')
    setExpanded(false)
  }

  return (
    <section id="coverage" className="app-catalog" aria-labelledby="app-catalog-title">
      <div className="app-catalog__inner">
        <header className="app-catalog__intro">
          <h2 id="app-catalog-title">{text.title}</h2>
          <p>{text.lead}</p>
        </header>
        <div className="app-catalog__controls">
          <label className="app-catalog__field">
            <span>{text.search}</span>
            <input className="app-catalog__input min-h-[44px] focus-visible:ring-2 focus-visible:ring-(--accent)" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={text.placeholder} />
          </label>
          <label className="app-catalog__field app-catalog__field--method">
            <span>{text.method}</span>
            <select className="app-catalog__select min-h-[44px] focus-visible:ring-2 focus-visible:ring-(--accent)" value={method} onChange={(event) => setMethod(event.target.value)}>
              <option value="all">{text.all}</option>
              {METHOD_GROUPS.map((group) => <option key={group.method} value={group.method}>{t(`coverage.methods.${group.method}.name`)}</option>)}
            </select>
          </label>
          <button className="app-catalog__reset min-h-[44px] min-w-[44px] focus-visible:ring-2 focus-visible:ring-(--accent)" type="button" onClick={reset}>{text.reset}</button>
        </div>
        <div className="app-catalog__summary" role="status" aria-live="polite">{collapsed ? text.collapsedResults(visibleResults.length, results.length) : text.results(results.length)}</div>
        {results.length > 0 ? (
          <>
          <table id="app-catalog-results" className="app-catalog__table">
            <thead><tr><th scope="col">{text.appColumn}</th><th scope="col">{text.methodColumn}</th></tr></thead>
            <tbody>{visibleResults.map((app) => <tr key={`${app.method}-${app.name}`}><th scope="row">{app.name}</th><td>{app.methodName}</td></tr>)}</tbody>
          </table>
          {!filtered && results.length > 8 && (
            <button className="app-catalog__reset min-h-[44px] min-w-[44px] focus-visible:ring-2 focus-visible:ring-(--accent)" type="button" aria-expanded={expanded} aria-controls="app-catalog-results" onClick={() => setExpanded((value) => !value)}>
              {expanded ? text.showFewer : text.showAll(results.length)}
            </button>
          )}
          </>
        ) : (
          <div className="app-catalog__empty"><p>{text.empty}</p><p>{text.emptyHint}</p><button className="app-catalog__reset min-h-[44px] min-w-[44px] focus-visible:ring-2 focus-visible:ring-(--accent)" type="button" onClick={reset}>{text.reset}</button></div>
        )}
      </div>
    </section>
  )
}
