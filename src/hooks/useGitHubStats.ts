import { useState, useEffect } from 'react'

interface GitHubStats {
  stars: number
  forks: number
  contributors: number
  loading: boolean
}

const CACHE_KEY = 'macos-updates-gh-stats'
const CACHE_TTL = 1000 * 60 * 30 // 30 minutes

const FALLBACK: Omit<GitHubStats, 'loading'> = {
  stars: 0,
  forks: 0,
  contributors: 1,
}

export function useGitHubStats(): GitHubStats {
  // Initial state must be identical on the server (prerender) and the first client
  // render so hydration never mismatches; the localStorage cache is read in the effect.
  const [stats, setStats] = useState<GitHubStats>({ ...FALLBACK, loading: true })

  useEffect(() => {
    if (!stats.loading) return

    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        const parsed = JSON.parse(cached) as { data: Omit<GitHubStats, 'loading'>; ts: number }
        if (Date.now() - parsed.ts < CACHE_TTL) {
          // eslint-disable-next-line react-hooks/set-state-in-effect -- post-hydration cache read
          setStats({ ...parsed.data, loading: false })
          return
        }
      }
    } catch { /* ignore */ }

    const controller = new AbortController()

    async function fetchStats() {
      try {
        const repoRes = await fetch(
          'https://api.github.com/repos/KasprowiczM/macOS_updates',
          { signal: controller.signal }
        )
        if (!repoRes.ok) throw new Error('repo fetch failed')
        const repo = await repoRes.json()

        let contributorCount = 1
        try {
          const contribRes = await fetch(
            'https://api.github.com/repos/KasprowiczM/macOS_updates/contributors?per_page=1',
            { signal: controller.signal }
          )
          if (contribRes.ok) {
            const linkHeader = contribRes.headers.get('Link')
            if (linkHeader) {
              const match = linkHeader.match(/page=(\d+)>; rel="last"/)
              if (match) contributorCount = parseInt(match[1], 10)
            } else {
              const contribs = await contribRes.json()
              contributorCount = Array.isArray(contribs) ? contribs.length : 1
            }
          }
        } catch { /* fallback to 1 */ }

        const data = {
          stars: repo.stargazers_count ?? 0,
          forks: repo.forks_count ?? 0,
          contributors: contributorCount,
        }

        localStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }))
        setStats({ ...data, loading: false })
      } catch {
        if (!controller.signal.aborted) {
          setStats({ ...FALLBACK, loading: false })
        }
      }
    }

    fetchStats()
    return () => controller.abort()
  }, [stats.loading])

  return stats
}
