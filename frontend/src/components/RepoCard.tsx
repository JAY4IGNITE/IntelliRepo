import { motion } from 'framer-motion'
import { FiStar, FiGitBranch, FiAlertCircle, FiExternalLink } from 'react-icons/fi'
import type { Repository } from '../lib/api'

const languageColors: Record<string, string> = {
  JavaScript: 'bg-yellow-400',
  TypeScript: 'bg-blue-500',
  Python: 'bg-blue-400',
  Java: 'bg-orange-500',
  Go: 'bg-cyan-400',
  Rust: 'bg-orange-600',
  Ruby: 'bg-red-500',
  'C++': 'bg-pink-500',
  C: 'bg-gray-400',
  HTML: 'bg-orange-400',
  CSS: 'bg-purple-400',
  Shell: 'bg-green-500',
}

interface RepoCardProps {
  repo: Repository
}

export function RepoCard({ repo }: RepoCardProps) {
  const langColor = repo.language ? languageColors[repo.language] || 'bg-surface-500' : 'bg-surface-500'

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="rounded-3xl border border-surface-200 bg-card p-5 shadow-sm shadow-slate-900/10 dark:border-surface-800 dark:bg-surface-900"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <FiGitBranch className="w-4 h-4 text-primary-400 shrink-0" />
            <h3 className="font-semibold text-foreground dark:text-white truncate">{repo.name}</h3>
          </div>
          <p className="text-xs text-muted-foreground mt-1 truncate">{repo.full_name}</p>
        </div>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-2xl text-muted-foreground hover:text-primary-300 hover:bg-primary-500/10 transition"
        >
          <FiExternalLink className="w-4 h-4" />
        </a>
      </div>

      {repo.description && (
        <p className="text-sm text-muted-foreground mb-5 line-clamp-2">{repo.description}</p>
      )}

      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
        {repo.language && (
          <span className="inline-flex items-center gap-1 rounded-full bg-surface-200/80 px-3 py-1 text-foreground dark:bg-surface-700/80 dark:text-white">
            <span className={`h-2.5 w-2.5 rounded-full ${langColor}`} />
            {repo.language}
          </span>
        )}
        <span className="inline-flex items-center gap-1 rounded-full bg-surface-200/80 px-3 py-1 text-foreground dark:bg-surface-700/80 dark:text-white">
          <FiStar className="w-3.5 h-3.5" />
          {repo.stars}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-surface-200/80 px-3 py-1 text-foreground dark:bg-surface-700/80 dark:text-white">
          <FiGitBranch className="w-3.5 h-3.5" />
          {repo.forks}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-surface-200/80 px-3 py-1 text-foreground dark:bg-surface-700/80 dark:text-white">
          <FiAlertCircle className="w-3.5 h-3.5" />
          {repo.open_issues}
        </span>
      </div>
    </motion.article>
  )
}
