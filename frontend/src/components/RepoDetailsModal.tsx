import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiGitBranch,
  FiStar,
  FiAlertCircle,
  FiExternalLink,
  FiCopy,
  FiCheck,
  FiX,
  FiCode,
  FiInfo,
} from 'react-icons/fi'
import type { Repository } from '../lib/api'
import { Button } from './Button'

interface RepoDetailsModalProps {
  repo: Repository | null
  isOpen: boolean
  onClose: () => void
}

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

export function RepoDetailsModal({ repo, isOpen, onClose }: RepoDetailsModalProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!repo) return null

  const cloneCommand = `git clone ${repo.html_url}.git`
  const langColor = repo.language
    ? languageColors[repo.language] || 'bg-surface-500'
    : 'bg-surface-500'

  const handleCopyClone = async () => {
    try {
      await navigator.clipboard.writeText(cloneCommand)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="relative w-full max-w-xl rounded-3xl border border-surface-200 bg-card p-6 shadow-2xl dark:border-surface-800 dark:bg-surface-900 z-10 space-y-6"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-3 rounded-2xl bg-primary-500/10 text-primary-500 shrink-0">
                  <FiGitBranch className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground dark:text-white leading-tight">
                    {repo.name}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-0.5">{repo.full_name}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Description
              </h3>
              <p className="text-sm text-foreground/90 dark:text-surface-300 leading-relaxed">
                {repo.description || 'No description provided for this repository.'}
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-surface-200/80 bg-surface-50/50 dark:border-surface-800 dark:bg-surface-800/40 p-3.5 text-center">
                <div className="flex items-center justify-center gap-1.5 text-amber-500 mb-1">
                  <FiStar className="w-4 h-4" />
                  <span className="font-semibold text-foreground text-sm">{repo.stars}</span>
                </div>
                <p className="text-xs text-muted-foreground">Stars</p>
              </div>

              <div className="rounded-2xl border border-surface-200/80 bg-surface-50/50 dark:border-surface-800 dark:bg-surface-800/40 p-3.5 text-center">
                <div className="flex items-center justify-center gap-1.5 text-emerald-500 mb-1">
                  <FiGitBranch className="w-4 h-4" />
                  <span className="font-semibold text-foreground text-sm">{repo.forks}</span>
                </div>
                <p className="text-xs text-muted-foreground">Forks</p>
              </div>

              <div className="rounded-2xl border border-surface-200/80 bg-surface-50/50 dark:border-surface-800 dark:bg-surface-800/40 p-3.5 text-center">
                <div className="flex items-center justify-center gap-1.5 text-rose-500 mb-1">
                  <FiAlertCircle className="w-4 h-4" />
                  <span className="font-semibold text-foreground text-sm">
                    {repo.open_issues}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Open Issues</p>
              </div>
            </div>

            {/* Meta Tags */}
            <div className="flex flex-wrap gap-2 text-xs">
              {repo.language && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-surface-200 px-3 py-1 text-foreground dark:border-surface-700 dark:text-white bg-surface-100/60 dark:bg-surface-800/60">
                  <span className={`h-2.5 w-2.5 rounded-full ${langColor}`} />
                  {repo.language}
                </span>
              )}
              {repo.default_branch && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-surface-200 px-3 py-1 text-muted-foreground dark:border-surface-700 bg-surface-100/60 dark:bg-surface-800/60">
                  <FiCode className="w-3.5 h-3.5 text-primary-400" />
                  Branch: {repo.default_branch}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-surface-200 px-3 py-1 text-muted-foreground dark:border-surface-700 bg-surface-100/60 dark:bg-surface-800/60">
                <FiInfo className="w-3.5 h-3.5 text-primary-400" />
                ID: #{repo.id}
              </span>
            </div>

            {/* Clone Box */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Clone with HTTPS
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-surface-200 bg-surface-100/70 p-1.5 pl-3 dark:border-surface-800 dark:bg-surface-800/60">
                <code className="text-xs text-foreground/90 font-mono flex-1 truncate select-all">
                  {cloneCommand}
                </code>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleCopyClone}
                  className="shrink-0 h-8 text-xs gap-1.5"
                >
                  {copied ? (
                    <>
                      <FiCheck className="w-3.5 h-3.5 text-emerald-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <FiCopy className="w-3.5 h-3.5" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <Button variant="primary" className="gap-2">
                  <FiExternalLink className="w-4 h-4" />
                  Open on GitHub
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
