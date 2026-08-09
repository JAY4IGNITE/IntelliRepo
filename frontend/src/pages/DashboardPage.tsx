import { useQuery } from '@tanstack/react-query'
import { FiGitBranch, FiStar, FiAlertCircle, FiGitMerge } from 'react-icons/fi'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { repoApi } from '../lib/api'
import { StatCard } from '../components/StatCard'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { Button } from '../components/Button'

const CHART_COLORS = ['#6366f1', '#818cf8', '#a5b4fc', '#4f46e5', '#4338ca', '#3730a3', '#312e81']

export function DashboardPage() {
  const { user } = useAuth()

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: () => repoApi.stats().then((r) => r.data),
  })

  const { data: repos, isLoading: reposLoading } = useQuery({
    queryKey: ['repos'],
    queryFn: () => repoApi.list().then((r) => r.data),
  })

  const languageData = stats
    ? Object.entries(stats.languages)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 7)
        .map(([name, count]) => ({ name, count }))
    : []

  const topRepos = repos?.slice(0, 6) ?? []

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Welcome back, {user?.username}
        </h1>
        <p className="text-surface-400 mt-1">
          Here's an overview of your repository portfolio
        </p>
      </div>

      {!user?.github_username && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5 flex items-center justify-between gap-4">
          <div>
            <p className="font-medium text-amber-400">Connect your GitHub account</p>
            <p className="text-sm text-surface-400 mt-1">
              Link GitHub to sync and analyze your repositories
            </p>
          </div>
          <Link to="/settings">
            <Button size="sm">Connect GitHub</Button>
          </Link>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Repositories"
          value={statsLoading ? '—' : stats?.total_repos ?? 0}
          icon={<FiGitBranch className="w-5 h-5" />}
          color="primary"
        />
        <StatCard
          label="Total Stars"
          value={statsLoading ? '—' : stats?.total_stars ?? 0}
          icon={<FiStar className="w-5 h-5" />}
          color="amber"
        />
        <StatCard
          label="Total Forks"
          value={statsLoading ? '—' : stats?.total_forks ?? 0}
          icon={<FiGitMerge className="w-5 h-5" />}
          color="green"
        />
        <StatCard
          label="Open Issues"
          value={statsLoading ? '—' : stats?.total_issues ?? 0}
          icon={<FiAlertCircle className="w-5 h-5" />}
          color="red"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-surface-800 bg-surface-900 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Languages</h2>
          {languageData.length > 0 ? (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={languageData} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" stroke="#64748b" fontSize={12} />
                <YAxis type="category" dataKey="name" stroke="#64748b" fontSize={12} width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#f1f5f9',
                  }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {languageData.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-60 flex items-center justify-center text-surface-500 text-sm">
              {reposLoading ? 'Loading...' : 'No language data yet. Sync your repositories.'}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-surface-800 bg-surface-900 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Top Repositories</h2>
            <Link to="/repositories" className="text-sm text-primary-400 hover:text-primary-300">
              View all
            </Link>
          </div>
          {topRepos.length > 0 ? (
            <div className="space-y-3">
              {topRepos.map((repo) => (
                <div
                  key={repo.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-surface-800/50 hover:bg-surface-800 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <FiGitBranch className="w-4 h-4 text-surface-500 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{repo.name}</p>
                      <p className="text-xs text-surface-500">{repo.language || 'Unknown'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-surface-400 shrink-0">
                    <span className="flex items-center gap-1">
                      <FiStar className="w-3 h-3" /> {repo.stars}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-60 flex items-center justify-center text-surface-500 text-sm">
              {reposLoading ? 'Loading...' : 'No repositories synced yet.'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
