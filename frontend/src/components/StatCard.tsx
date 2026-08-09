import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

interface StatCardProps {
  label: string
  value: string | number
  icon: ReactNode
  trend?: string
  color?: 'primary' | 'green' | 'amber' | 'red'
}

const colorMap = {
  primary: 'from-primary-500/20 to-primary-600/5 border-primary-500/20 text-primary-400',
  green: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/20 text-emerald-400',
  amber: 'from-amber-500/20 to-amber-600/5 border-amber-500/20 text-amber-400',
  red: 'from-red-500/20 to-red-600/5 border-red-500/20 text-red-400',
}

export function StatCard({ label, value, icon, trend, color = 'primary' }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      className={`rounded-3xl border bg-gradient-to-br p-5 shadow-sm shadow-black/10 ${colorMap[color]}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-surface-400 mb-2">{label}</p>
          <p className="text-3xl font-semibold text-white">{value}</p>
          {trend && <p className="text-xs text-surface-300 mt-1">{trend}</p>}
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-white">{icon}</div>
      </div>
    </motion.div>
  )
}
