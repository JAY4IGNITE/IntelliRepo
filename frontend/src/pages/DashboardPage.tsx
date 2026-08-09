import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { FiGitBranch, FiStar, FiAlertCircle, FiGitMerge } from 'react-icons/fi'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { repoApi } from '../lib/api'
import { StatCard } from '../components/StatCard'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { fadeUp, staggerContainer } from '../animations/variants'
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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8 bg-background text-foreground"
    >
      <motion.div variants={fadeUp} className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Welcome back, {user?.username}</h1>
        <p className="text-muted-foreground">Here's an overview of your repository portfolio</p>
      </motion.div>

      {!user?.github_username && (
        <motion.div
          variants={fadeUp}
          className="rounded-3xl border border-amber-500/20 bg-amber-500/5 p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <p className="font-semibold text-amber-300">Connect your GitHub account</p>
            <p className="text-sm text-muted-foreground mt-1">
              Link GitHub to sync and analyze your repositories.
            </p>
          </div>
          <Link to="/settings">
            <motion.div whileHover={{ y: -1 }}>
              <Button variant="primary" size="sm">
                Connect GitHub
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      )}

      <motion.div variants={fadeUp} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
      </motion.div>

      <motion.div variants={fadeUp} className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-surface-200 bg-card p-6 shadow-lg shadow-slate-900/10 dark:border-surface-800 dark:bg-surface-900">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Languages</h2>
              <p className="text-sm text-muted-foreground">Top languages across your synced repositories.</p>
            </div>
          </div>
          {languageData.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={languageData} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" stroke="#94a3b8" fontSize={12} />
                <YAxis type="category" dataKey="name" stroke="#94a3b8" fontSize={12} width={90} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '10px',
                    color: '#f8fafc',
                  }}
                />
                <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                  {languageData.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-60 flex items-center justify-center text-muted-foreground text-sm">
              {reposLoading ? 'Loading...' : 'No language data yet. Sync your repositories.'}
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-surface-200 bg-card p-6 shadow-lg shadow-slate-900/10 dark:border-surface-800 dark:bg-surface-900">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Top Repositories</h2>
              <p className="text-sm text-muted-foreground">Your most active repositories at a glance.</p>
            </div>
            <Link to="/repositories" className="text-sm text-primary-400 hover:text-primary-300">
              View all
            </Link>
          </div>
          {topRepos.length > 0 ? (
            <div className="space-y-3">
              {topRepos.map((repo) => (
                <motion.div
                  key={repo.id}
                  whileHover={{ y: -2 }}
                  className="flex items-center justify-between gap-3 rounded-3xl bg-surface-100/70 p-4 transition-all dark:bg-surface-800/70"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <FiGitBranch className="w-4 h-4 text-primary-300 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground dark:text-white truncate">{repo.name}</p>
                      <p className="text-xs text-muted-foreground">{repo.language || 'Unknown'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
                    <FiStar className="w-3 h-3" /> {repo.stars}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="h-60 flex items-center justify-center text-muted-foreground text-sm">
              {reposLoading ? 'Loading...' : 'No repositories synced yet.'}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
