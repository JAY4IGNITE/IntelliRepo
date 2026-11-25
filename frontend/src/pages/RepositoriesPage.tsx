import { useState, useMemo } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  FiRefreshCw,
  FiSearch,
  FiGitBranch,
  FiArrowUp,
  FiArrowDown,
  FiX,
  FiSliders,
} from 'react-icons/fi'
import { motion } from 'framer-motion'
import { repoApi } from '../lib/api'
import { RepoCard } from '../components/RepoCard'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { fadeUp, staggerContainer } from '../animations/variants'

type SortField = 'stars' | 'forks' | 'open_issues' | 'name'
type SortOrder = 'asc' | 'desc'

export function RepositoriesPage() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const [search, setSearch] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState<string>('ALL')
  const [sortBy, setSortBy] = useState<SortField>('stars')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [syncing, setSyncing] = useState(false)
  const [syncMessage, setSyncMessage] = useState('')

  const { data: repos, isLoading } = useQuery({
    queryKey: ['repos'],
    queryFn: () => repoApi.list().then((r) => r.data),
  })

  // Extract unique languages and counts from repositories
  const languageOptions = useMemo(() => {
    if (!repos) return []
    const counts: Record<string, number> = {}
    repos.forEach((r) => {
      if (r.language) {
        counts[r.language] = (counts[r.language] || 0) + 1
      }
    })
    return Object.entries(counts).sort(([, a], [, b]) => b - a)
  }, [repos])

  // Filter and sort repositories
  const filteredAndSorted = useMemo(() => {
    if (!repos) return []

    const query = search.trim().toLowerCase()

    const result = repos.filter((r) => {
      const matchesSearch =
        !query ||
        r.name.toLowerCase().includes(query) ||
        r.full_name.toLowerCase().includes(query) ||
        (r.description && r.description.toLowerCase().includes(query)) ||
        (r.language && r.language.toLowerCase().includes(query))

      const matchesLanguage =
        selectedLanguage === 'ALL' || r.language === selectedLanguage

      return matchesSearch && matchesLanguage
    })

    result.sort((a, b) => {
      let comparison = 0
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name)
      } else {
        const valA = a[sortBy] ?? 0
        const valB = b[sortBy] ?? 0
        comparison = valA - valB
      }
      return sortOrder === 'asc' ? comparison : -comparison
    })

    return result
  }, [repos, search, selectedLanguage, sortBy, sortOrder])

  const hasActiveFilters = search.trim() !== '' || selectedLanguage !== 'ALL'

  const handleResetFilters = () => {
    setSearch('')
    setSelectedLanguage('ALL')
    setSortBy('stars')
    setSortOrder('desc')
  }

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
  }

  const handleSync = async () => {
    setSyncing(true)
    setSyncMessage('')
    try {
      const { data } = await repoApi.sync()
      setSyncMessage(
        `Synced ${data.total} repositories (${data.synced.length} new, ${data.updated.length} updated)`,
      )
      queryClient.invalidateQueries({ queryKey: ['repos'] })
      queryClient.invalidateQueries({ queryKey: ['stats'] })
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      setSyncMessage(typeof msg === 'string' ? msg : 'Sync failed')
    } finally {
      setSyncing(false)
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6 bg-background text-foreground"
    >
      {/* Page Header */}
      <motion.div
        variants={fadeUp}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Repositories</h1>
          <p className="text-muted-foreground mt-1">
            {repos?.length ?? 0} repositories synced from GitHub
          </p>
        </div>
        <Button
          onClick={handleSync}
          loading={syncing}
          disabled={!user?.github_username}
          variant="secondary"
        >
          <FiRefreshCw className="w-4 h-4" />
          Sync from GitHub
        </Button>
      </motion.div>

      {/* GitHub Unconnected Alert */}
      {!user?.github_username && (
        <motion.div
          variants={fadeUp}
          className="rounded-3xl border border-amber-500/20 bg-amber-500/10 p-5"
        >
          <p className="text-amber-400 font-medium">GitHub not connected</p>
          <p className="text-sm text-muted-foreground mt-1">
            Connect your GitHub account in{' '}
            <Link to="/settings" className="text-primary-400 hover:underline">
              Settings
            </Link>{' '}
            to sync repositories.
          </p>
        </motion.div>
      )}

      {/* Sync Status Banner */}
      {syncMessage && (
        <motion.div
          variants={fadeUp}
          className={`p-3 rounded-lg text-sm border ${
            syncMessage.includes('failed') || syncMessage.includes('not connected')
              ? 'bg-red-500/10 border-red-500/20 text-red-400'
              : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
          }`}
        >
          {syncMessage}
        </motion.div>
      )}

      {/* Controls: Search, Sort and Direction */}
      <motion.div
        variants={fadeUp}
        className="flex flex-col md:flex-row items-stretch md:items-center gap-3"
      >
        <div className="relative flex-1">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by repository name, description, or language..."
            className="pl-10 h-10 w-full"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="relative flex items-center">
            <FiSliders className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortField)}
              className="h-10 pl-9 pr-8 text-sm rounded-xl border border-surface-200 bg-card text-foreground dark:border-surface-800 dark:bg-surface-900 focus:outline-none focus:ring-2 focus:ring-primary-500/40 cursor-pointer appearance-none"
              aria-label="Sort repositories by"
            >
              <option value="stars">Sort by Stars</option>
              <option value="forks">Sort by Forks</option>
              <option value="open_issues">Sort by Open Issues</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>

          <button
            type="button"
            onClick={toggleSortOrder}
            title={sortOrder === 'asc' ? 'Ascending (click for descending)' : 'Descending (click for ascending)'}
            className="h-10 px-3 flex items-center justify-center rounded-xl border border-surface-200 bg-card hover:bg-surface-100 text-foreground dark:border-surface-800 dark:bg-surface-900 dark:hover:bg-surface-800 transition-colors"
          >
            {sortOrder === 'asc' ? (
              <FiArrowUp className="w-4 h-4 text-primary-500" />
            ) : (
              <FiArrowDown className="w-4 h-4 text-primary-500" />
            )}
          </button>
        </div>
      </motion.div>

      {/* Language Filter Chips */}
      {languageOptions.length > 0 && (
        <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => setSelectedLanguage('ALL')}
            className={`text-xs px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              selectedLanguage === 'ALL'
                ? 'bg-primary-600 text-white font-medium shadow-sm'
                : 'bg-card border border-surface-200 dark:border-surface-800 text-muted-foreground hover:text-foreground hover:border-surface-300 dark:hover:border-surface-700'
            }`}
          >
            <span>All Languages</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                selectedLanguage === 'ALL'
                  ? 'bg-white/20 text-white'
                  : 'bg-surface-200 dark:bg-surface-800 text-muted-foreground'
              }`}
            >
              {repos?.length ?? 0}
            </span>
          </button>

          {languageOptions.map(([lang, count]) => {
            const isSelected = selectedLanguage === lang
            return (
              <button
                key={lang}
                type="button"
                onClick={() => setSelectedLanguage(lang)}
                className={`text-xs px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-primary-600 text-white font-medium shadow-sm'
                    : 'bg-card border border-surface-200 dark:border-surface-800 text-muted-foreground hover:text-foreground hover:border-surface-300 dark:hover:border-surface-700'
                }`}
              >
                <span>{lang}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-surface-200 dark:bg-surface-800 text-muted-foreground'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </motion.div>
      )}

      {/* Active Filter Summary */}
      {hasActiveFilters && (
        <motion.div
          variants={fadeUp}
          className="flex items-center justify-between text-xs text-muted-foreground bg-surface-100/50 dark:bg-surface-900/50 px-3.5 py-2 rounded-xl border border-surface-200/50 dark:border-surface-800/50"
        >
          <span>
            Showing <strong className="text-foreground">{filteredAndSorted.length}</strong> of{' '}
            <strong className="text-foreground">{repos?.length ?? 0}</strong> repositories
          </span>
          <button
            type="button"
            onClick={handleResetFilters}
            className="flex items-center gap-1 text-primary-500 hover:text-primary-600 hover:underline"
          >
            <FiX className="w-3.5 h-3.5" />
            Reset filters
          </button>
        </motion.div>
      )}

      {/* Repositories Grid / Empty State */}
      {isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-3xl border border-surface-200 bg-card p-5 animate-pulse h-40 dark:border-surface-800 dark:bg-surface-900"
            />
          ))}
        </div>
      ) : filteredAndSorted.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAndSorted.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-card rounded-3xl border border-surface-200 dark:border-surface-800 p-8">
          <FiGitBranch className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium text-foreground">No repositories match your criteria</h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
            {hasActiveFilters
              ? 'Try modifying your search term or selecting a different language filter.'
              : 'Connect your GitHub account in Settings and sync to explore your repositories.'}
          </p>
          {hasActiveFilters && (
            <div className="mt-5">
              <Button variant="secondary" size="sm" onClick={handleResetFilters}>
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}
