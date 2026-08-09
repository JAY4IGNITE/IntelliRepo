import { Link } from 'react-router-dom'
import { FiGitBranch, FiShield, FiBarChart2, FiZap, FiArrowRight } from 'react-icons/fi'
import { Button } from '../components/Button'
import { ThemeToggle } from '../components/ThemeToggle'

const features = [
  {
    icon: FiGitBranch,
    title: 'Repository sync',
    description: 'Connect GitHub and sync repos automatically with full metadata tracking.',
  },
  {
    icon: FiBarChart2,
    title: 'Analytics dashboard',
    description: 'Explore AI-backed charts for stars, forks, languages, and risk trends.',
  },
  {
    icon: FiShield,
    title: 'Code intelligence',
    description: 'Detect vulnerabilities, complexity hotspots, and architectural drift.',
  },
  {
    icon: FiZap,
    title: 'Actionable insights',
    description: 'Get prioritized recommendations to improve reliability and velocity.',
  },
]

const stats = [
  { label: 'Trusted by teams', value: '120+' },
  { label: 'Repositories analyzed', value: '18K+' },
  { label: 'Risk checks', value: '10M+' },
]

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="sticky top-0 z-50 border-b border-surface-200/70 bg-card/95 backdrop-blur-xl dark:border-surface-800 dark:bg-surface-900/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-primary-500 shadow-lg shadow-primary-500/20">
              <span className="text-sm font-semibold text-white">IR</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground dark:text-white">IntelliRepo</p>
              <p className="text-xs text-muted-foreground">AI-driven codebase intelligence</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Get started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-6 pb-24 pt-20">
        <section className="grid gap-12 lg:grid-cols-[1.2fr,0.8fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-500/10 px-4 py-2 text-sm text-primary-300 ring-1 ring-primary-500/20">
              <FiZap className="h-4 w-4" />
              Enterprise-grade insights for engineering teams
            </div>
            <div className="max-w-3xl space-y-6">
              <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                Professional codebase intelligence,
                <span className="block bg-gradient-to-r from-primary-400 to-cyan-300 bg-clip-text text-transparent">
                  engineered for modern teams.
                </span>
              </h1>
              <p className="text-lg leading-8 text-surface-400">
                IntelliRepo helps you understand architecture, detect risks, and improve developer productivity with a clean, data-driven dashboard built for GitHub repositories.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/register">
                <Button size="lg">
                  Start for free
                  <FiArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" size="lg">Sign in</Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-3xl border border-surface-800 bg-surface-900/70 p-5 text-center shadow-sm shadow-black/10">
                  <p className="text-3xl font-semibold text-white">{stat.value}</p>
                  <p className="text-sm text-surface-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-surface-800 bg-surface-900/80 p-8 shadow-[0_32px_120px_-90px_rgba(56,189,248,0.85)] backdrop-blur-xl">
            <div className="rounded-3xl border border-surface-800 bg-surface-950 p-6">
              <div className="flex items-center justify-between gap-4 pb-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-primary-300">Live analysis</p>
                  <h2 className="mt-3 text-xl font-semibold text-white">Repository health overview</h2>
                </div>
                <span className="rounded-full bg-primary-500/15 px-3 py-1 text-sm text-primary-200">AI</span>
              </div>

              <div className="space-y-4">
                <div className="rounded-3xl bg-surface-950/90 p-5 ring-1 ring-surface-800">
                  <div className="flex items-center justify-between text-sm text-surface-400">
                    <span>Open issues</span>
                    <span className="font-semibold text-white">24</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-800">
                    <div className="h-2 w-3/5 rounded-full bg-primary-500" />
                  </div>
                </div>

                <div className="rounded-3xl bg-surface-950/90 p-5 ring-1 ring-surface-800">
                  <div className="flex items-center justify-between text-sm text-surface-400">
                    <span>Risk coverage</span>
                    <span className="font-semibold text-white">87%</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-800">
                    <div className="h-2 w-4/5 rounded-full bg-cyan-400" />
                  </div>
                </div>

                <div className="rounded-3xl bg-surface-950/90 p-5 ring-1 ring-surface-800">
                  <p className="text-sm text-surface-400">Top language</p>
                  <p className="mt-2 text-lg font-semibold text-white">TypeScript</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-6 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="group rounded-3xl border border-surface-800 bg-surface-900/80 p-6 transition hover:-translate-y-1 hover:border-primary-500/40 hover:bg-surface-900 shadow-sm shadow-black/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-500/10 text-primary-300 transition group-hover:bg-primary-500/15">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-surface-400">{description}</p>
            </div>
          ))}
        </section>

        <section className="mt-20 rounded-[2rem] border border-surface-800 bg-surface-900/80 p-8 shadow-xl shadow-black/20">
          <div className="grid gap-8 lg:grid-cols-[1fr,0.9fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-primary-300">How it works</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">From GitHub sync to intelligent recommendations.</h2>
              <p className="mt-4 max-w-xl text-surface-400">
                IntelliRepo gives your team the visibility to see repository health, prioritize technical debt, and act on AI-generated guidance without leaving your workflow.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-surface-800 bg-surface-950/95 p-5">
                <p className="text-lg font-semibold text-white">1. Connect GitHub</p>
                <p className="mt-3 text-sm text-surface-400">Link your account and authorize IntelliRepo to analyze your repositories securely.</p>
              </div>
              <div className="rounded-3xl border border-surface-800 bg-surface-950/95 p-5">
                <p className="text-lg font-semibold text-white">2. Review insights</p>
                <p className="mt-3 text-sm text-surface-400">Access dashboard metrics, risk summaries, and code quality signals in one place.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20 rounded-[2rem] border border-surface-800 bg-surface-900/80 p-10 text-center shadow-sm shadow-black/20">
          <p className="text-sm uppercase tracking-[0.24em] text-primary-300">Ready to launch</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">Build better software with confidence</h2>
          <p className="mx-auto mt-4 max-w-2xl text-surface-400">
            Use IntelliRepo to turn GitHub data into meaningful engineering signals, so your team can ship faster and safer.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/register">
              <Button size="lg">Create account</Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" size="lg">Explore dashboard</Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-surface-800 bg-surface-950/80 py-8 text-center text-sm text-surface-500">
        IntelliRepo — AI-powered codebase intelligence for engineering teams
      </footer>
    </div>
  )
}
