import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { FiGithub, FiCheck, FiUser, FiMail } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { githubApi } from '../lib/api'
import { Button } from '../components/Button'

export function SettingsPage() {
  const { user, refreshUser } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const [connecting, setConnecting] = useState(false)
  const [notification, setNotification] = useState('')

  useEffect(() => {
    const githubStatus = searchParams.get('github')
    if (githubStatus === 'connected') {
      setNotification('GitHub account connected successfully!')
      refreshUser()
      setSearchParams({})
    } else if (githubStatus === 'error') {
      const reason = searchParams.get('reason') || 'unknown'
      setNotification(`Failed to connect GitHub: ${reason.replace(/_/g, ' ')}`)
      setSearchParams({})
    }
  }, [searchParams, refreshUser, setSearchParams])

  const handleConnect = async () => {
    setConnecting(true)
    try {
      const { data } = await githubApi.connect()
      window.location.href = data.url
    } catch {
      setNotification('Failed to initiate GitHub connection')
      setConnecting(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="p-6 lg:p-8 max-w-3xl mx-auto space-y-6 bg-background text-foreground">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and integrations</p>
      </div>

      {notification && (
        <div className={`p-4 rounded-xl border text-sm ${notification.includes('success')
          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
          : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}>
          {notification}
        </div>
      )}

      <motion.div whileHover={{ y: -2 }} className="rounded-3xl border border-surface-200 bg-card overflow-hidden shadow-sm shadow-slate-900/10 dark:border-surface-800 dark:bg-surface-900">
        <div className="p-5 border-b border-surface-200 dark:border-surface-800">
          <h2 className="font-semibold text-foreground dark:text-white">Profile</h2>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-4">
            {user?.github_avatar_url ? (
              <img src={user.github_avatar_url} alt="" className="w-14 h-14 rounded-full" />
            ) : (
              <div className="w-14 h-14 rounded-full bg-primary-600 flex items-center justify-center text-white text-xl font-bold">
                {user?.username?.[0]?.toUpperCase()}
              </div>
            )}
            <div>
              <p className="font-medium text-foreground dark:text-white text-lg">{user?.username}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-100/90 dark:bg-surface-800/70">
              <FiUser className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Username</p>
                <p className="text-sm text-foreground dark:text-white">{user?.username}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-100/90 dark:bg-surface-800/70">
              <FiMail className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm text-foreground dark:text-white">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div whileHover={{ y: -2 }} className="rounded-3xl border border-surface-200 bg-card overflow-hidden shadow-sm shadow-slate-900/10 dark:border-surface-800 dark:bg-surface-900">
        <div className="p-5 border-b border-surface-200 dark:border-surface-800">
          <h2 className="font-semibold text-foreground dark:text-white">Integrations</h2>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-surface-100 flex items-center justify-center dark:bg-surface-800">
                <FiGithub className="w-5 h-5 text-foreground dark:text-white" />
              </div>
              <div>
                <p className="font-medium text-foreground dark:text-white">GitHub</p>
                {user?.github_username ? (
                  <p className="text-sm text-emerald-400 flex items-center gap-1">
                    <FiCheck className="w-3.5 h-3.5" />
                    Connected as @{user.github_username}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">Not connected</p>
                )}
              </div>
            </div>
            <Button
              variant={user?.github_username ? 'secondary' : 'primary'}
              size="sm"
              onClick={handleConnect}
              loading={connecting}
            >
              {user?.github_username ? 'Reconnect' : 'Connect'}
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
