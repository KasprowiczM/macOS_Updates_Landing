import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './i18n'
import App from './App'
import { normalizePath, stripLangPrefix } from './lib/routes'
import { isPagePath, pageLoaders } from './lib/pageLoaders'

const container = document.getElementById('root')!

const tree = (
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
)

async function start() {
  // scripts/prerender.mjs stamps data-prerendered with the route it rendered.
  // Hydrate only when it matches the current URL (404.html carries "*", so it is rendered fresh).
  const here = normalizePath(window.location.pathname)
  const prerendered = container.getAttribute('data-prerendered')
  const canHydrate = container.hasChildNodes() && prerendered === here

  if (!canHydrate) {
    container.replaceChildren()
    createRoot(container).render(tree)
    return
  }

  // Load the current route's chunk first so hydration adopts the server HTML
  // instead of suspending on the lazy page.
  const base = stripLangPrefix(here)
  if (isPagePath(base)) {
    try {
      await pageLoaders[base]()
    } catch { /* hydrate anyway; Suspense handles a late chunk */ }
  }
  hydrateRoot(container, tree)
}

void start()
