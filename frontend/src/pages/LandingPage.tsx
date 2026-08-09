import { Link } from 'react-router-dom'
import { FiGitBranch, FiShield, FiBarChart2, FiZap, FiArrowRight } from 'react-icons/fi'
import { Button } from '../components/Button'

const features = [
  {
    icon: FiGitBranch,
    title: 'Repository Sync',
    description: 'Connect GitHub and automatically sync all your repositories with real-time metadata.',
  },
  {
    icon: FiBarChart2,
    title: 'Analytics Dashboard',
    description: 'Visualize stars, forks, languages, and open issues across your entire codebase portfolio.',
  },
  {
    icon: FiShield,
    title: 'Code Intelligence',
    description: 'AI-powered analysis to detect risks, complexity hotspots, and security vulnerabilities.',
  },
  {
    icon: FiZap,
    title: 'Smart Insights',
    description: 'Get actionable recommendations to improve code quality and engineering health.',
  },
]

export function LandingPage() {
  return (
    <div className="min-h-screen bg-surface-950">
      <nav className="border-b border-surface-800/50 backdrop-blur-sm sticky top-0 z-50 bg-surface-950/80">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
              <span className="text-white font-bold text-sm">IR</span>
            </div>
            <span className="font-semibold text-white text-lg">IntelliRepo</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Get started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm mb-8">
          <FiZap className="w-4 h-4" />
          AI-Powered Code Intelligence
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
          Understand your codebase
          <br />
          <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            like never before
          </span>
        </h1>
        <p className="text-lg text-surface-400 max-w-2xl mx-auto mb-10">
          IntelliRepo connects to your GitHub repositories and provides deep analytics,
          risk predictions, and engineering insights to help your team ship better code.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link to="/register">
            <Button size="lg">
              Start for free
              <FiArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary" size="lg">Sign in</Button>
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-surface-800 bg-surface-900/50 p-6 hover:border-surface-700 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-primary-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">{title}</h3>
              <p className="text-sm text-surface-400">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-surface-800 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-surface-500">
          IntelliRepo — AI-powered codebase analysis platform
        </div>
      </footer>
    </div>
  )
}
