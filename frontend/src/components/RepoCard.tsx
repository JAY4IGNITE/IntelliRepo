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
    <div className="group rounded-xl border border-surface-800 bg-surface-900 p-5 hover:border-surface-700 hover:bg-surface-800/50 transition-all">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <FiGitBranch className="w-4 h-4 text-surface-500 shrink-0" />
            <h3 className="font-semibold text-white truncate">{repo.name}</h3>
          </div>
          <p className="text-xs text-surface-500 mt-0.5 truncate">{repo.full_name}</p>
        </div>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-lg text-surface-500 hover:text-primary-400 hover:bg-primary-500/10 opacity-0 group-hover:opacity-100 transition-all"
        >
          <FiExternalLink className="w-4 h-4" />
        </a>
      </div>

      {repo.description && (
        <p className="text-sm text-surface-400 mb-4 line-clamp-2">{repo.description}</p>
      )}

      <div className="flex items-center gap-4 text-xs text-surface-500">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${langColor}`} />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <FiStar className="w-3.5 h-3.5" />
          {repo.stars}
        </span>
        <span className="flex items-center gap-1">
          <FiGitBranch className="w-3.5 h-3.5" />
          {repo.forks}
        </span>
        <span className="flex items-center gap-1">
          <FiAlertCircle className="w-3.5 h-3.5" />
          {repo.open_issues}
        </span>
      </div>
    </div>
  )
}
