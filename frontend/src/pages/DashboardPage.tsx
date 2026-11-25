import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import {
  FiGitBranch,
  FiStar,
  FiAlertCircle,
  FiGitMerge,
  FiArrowRight,
  FiPlusCircle,
  FiBarChart2,
} from 'react-icons/fi'
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

  const languageData = stats?.languages
    ? Object.entries(stats.languages)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 7)
        .map(([name, count]) => ({ name, count }))
    : []

  const topRepos = repos?.slice(0, 6) ?? []
  const hasRepositories = (stats?.total_repos ?? 0) > 0

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8 bg-background text-foreground"
    >
      {/* Welcome Banner */}
      <motion.div variants={fadeUp} className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Welcome back, {user?.username}</h1>
        <p className="text-muted-foreground">Here's an overview of your repository portfolio</p>
      </motion.div>

      {/* GitHub Account Link Callout (if not linked) */}
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

      {/* Stat Cards / Skeletons */}
      <motion.div variants={fadeUp} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-3xl border border-surface-200 bg-card p-5 dark:border-surface-800 dark:bg-surface-900 animate-pulse space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="h-4 w-24 bg-surface-200 dark:bg-surface-800 rounded-md" />
                <div className="h-9 w-9 rounded-2xl bg-surface-200 dark:bg-surface-800" />
              </div>
              <div className="h-8 w-16 bg-surface-200 dark:bg-surface-800 rounded-md" />
            </div>
          ))
        ) : (
          <>
            <StatCard
              label="Repositories"
              value={stats?.total_repos ?? 0}
              icon={<FiGitBranch className="w-5 h-5" />}
              color="primary"
            />
            <StatCard
              label="Total Stars"
              value={stats?.total_stars ?? 0}
              icon={<FiStar className="w-5 h-5" />}
              color="amber"
            />
            <StatCard
              label="Total Forks"
              value={stats?.total_forks ?? 0}
              icon={<FiGitMerge className="w-5 h-5" />}
              color="green"
            />
            <StatCard
              label="Open Issues"
              value={stats?.total_issues ?? 0}
              icon={<FiAlertCircle className="w-5 h-5" />}
              color="red"
            />
          </>
        )}
      </motion.div>

      {/* Main Charts & Repos Section */}
      <motion.div variants={fadeUp} className="grid lg:grid-cols-2 gap-6">
        {/* Language Breakdown Card */}
        <div className="rounded-3xl border border-surface-200 bg-card p-6 shadow-lg shadow-slate-900/10 dark:border-surface-800 dark:bg-surface-900 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Languages</h2>
                <p className="text-sm text-muted-foreground">
                  Top languages across your synced repositories.
                </p>
              </div>
            </div>

            {reposLoading || statsLoading ? (
              <div className="space-y-4 py-6">
                {[75, 55, 40, 25, 15].map((width, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-20 h-3.5 bg-surface-200 dark:bg-surface-800 rounded animate-pulse" />
                    <div
                      className="h-6 bg-primary-500/20 dark:bg-primary-500/10 rounded-r-md animate-pulse"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                ))}
              </div>
            ) : languageData.length > 0 ? (
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
              <div className="h-60 flex flex-col items-center justify-center text-center p-6 text-muted-foreground text-sm">
                <FiBarChart2 className="w-10 h-10 mb-2 opacity-40 text-muted-foreground" />
                <p className="font-medium text-foreground">No language data available</p>
                <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                  Connect GitHub and sync your repositories to view breakdown charts.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Top Repositories Card */}
        <div className="rounded-3xl border border-surface-200 bg-card p-6 shadow-lg shadow-slate-900/10 dark:border-surface-800 dark:bg-surface-900 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Top Repositories</h2>
                <p className="text-sm text-muted-foreground">Your most active repositories at a glance.</p>
              </div>
              {hasRepositories && (
                <Link to="/repositories" className="text-sm text-primary-400 hover:text-primary-300">
                  View all
                </Link>
              )}
            </div>

            {reposLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-3 rounded-2xl bg-surface-100/70 p-4 dark:bg-surface-800/70 animate-pulse"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-4 h-4 rounded-full bg-surface-200 dark:bg-surface-700 shrink-0" />
                      <div className="space-y-1.5 flex-1">
                        <div className="h-4 w-32 bg-surface-200 dark:bg-surface-700 rounded" />
                        <div className="h-3 w-16 bg-surface-200 dark:bg-surface-700 rounded" />
                      </div>
                    </div>
                    <div className="h-3 w-10 bg-surface-200 dark:bg-surface-700 rounded shrink-0" />
                  </div>
                ))}
              </div>
            ) : topRepos.length > 0 ? (
              <div className="space-y-3">
                {topRepos.map((repo) => (
                  <motion.div
                    key={repo.id}
                    whileHover={{ y: -2 }}
                    className="flex items-center justify-between gap-3 rounded-2xl bg-surface-100/70 p-4 transition-all dark:bg-surface-800/70"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <FiGitBranch className="w-4 h-4 text-primary-400 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground dark:text-white truncate">
                          {repo.name}
                        </p>
                        <p className="text-xs text-muted-foreground">{repo.language || 'Unknown'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
                      <FiStar className="w-3.5 h-3.5 text-amber-400" /> {repo.stars}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="h-60 flex flex-col items-center justify-center text-center p-6 text-muted-foreground text-sm">
                <FiGitBranch className="w-10 h-10 mb-2 opacity-40 text-muted-foreground" />
                <p className="font-medium text-foreground">No repositories synced yet</p>
                <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                  Once connected, your synced repositories will appear here with instant analytics.
                </p>
                <Link to="/repositories" className="mt-4">
                  <Button variant="secondary" size="sm" className="gap-1.5">
                    <FiPlusCircle className="w-3.5 h-3.5" />
                    Sync Repositories
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
