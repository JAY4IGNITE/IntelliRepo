import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { FiRefreshCw, FiSearch, FiGitBranch } from 'react-icons/fi'
import { repoApi } from '../lib/api'
import { RepoCard } from '../components/RepoCard'
import { Button } from '../components/Button'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export function RepositoriesPage() {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [syncing, setSyncing] = useState(false)
  const [syncMessage, setSyncMessage] = useState('')

  const { data: repos, isLoading } = useQuery({
    queryKey: ['repos'],
    queryFn: () => repoApi.list().then((r) => r.data),
  })

  const filtered = repos?.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.full_name.toLowerCase().includes(search.toLowerCase()) ||
      r.language?.toLowerCase().includes(search.toLowerCase()),
  )

  const handleSync = async () => {
    setSyncing(true)
    setSyncMessage('')
    try {
      const { data } = await repoApi.sync()
      setSyncMessage(`Synced ${data.total} repositories (${data.synced.length} new, ${data.updated.length} updated)`)
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
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Repositories</h1>
          <p className="text-surface-400 mt-1">
            {repos?.length ?? 0} repositories synced from GitHub
          </p>
        </div>
        <Button
          onClick={handleSync}
          loading={syncing}
          disabled={!user?.github_username}
        >
          <FiRefreshCw className="w-4 h-4" />
          Sync from GitHub
        </Button>
      </div>

      {!user?.github_username && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
          <p className="text-amber-400 font-medium">GitHub not connected</p>
          <p className="text-sm text-surface-400 mt-1">
            Connect your GitHub account in{' '}
            <Link to="/settings" className="text-primary-400 hover:underline">Settings</Link>{' '}
            to sync repositories.
          </p>
        </div>
      )}

      {syncMessage && (
        <div className={`p-3 rounded-lg text-sm border ${
          syncMessage.includes('failed') || syncMessage.includes('not connected')
            ? 'bg-red-500/10 border-red-500/20 text-red-400'
            : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
        }`}>
          {syncMessage}
        </div>
      )}

      <div className="relative">
        <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
        <input
          type="text"
          placeholder="Search repositories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-900 border border-surface-800 text-white placeholder-surface-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500"
        />
      </div>

      {isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-surface-800 bg-surface-900 p-5 animate-pulse h-40" />
          ))}
        </div>
      ) : filtered && filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <FiGitBranch className="w-12 h-12 text-surface-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-surface-300">No repositories found</h3>
          <p className="text-sm text-surface-500 mt-2">
            {search ? 'Try a different search term' : 'Connect GitHub and sync to get started'}
          </p>
        </div>
      )}
    </div>
  )
}
